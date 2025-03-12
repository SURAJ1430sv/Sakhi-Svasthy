import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HealthAssessmentForm from "@/components/health/HealthAssessmentForm";
import AssessmentResults from "@/components/health/AssessmentResults";
import ConditionSelector from "@/components/health/ConditionSelector";
import { HealthAssessment } from "@shared/schema";

type AssessmentStep = "select-condition" | "questionnaire" | "results";

export default function HealthAssessmentPage() {
  const { user, language } = useAuth();
  const [step, setStep] = useState<AssessmentStep>("select-condition");
  const [condition, setCondition] = useState<"pcos" | "pcod" | "breast_cancer" | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<HealthAssessment | null>(null);

  const handleConditionSelect = (selectedCondition: "pcos" | "pcod" | "breast_cancer") => {
    setCondition(selectedCondition);
    setStep("questionnaire");
  };

  const handleAssessmentComplete = (result: HealthAssessment) => {
    setAssessmentResult(result);
    setStep("results");
  };

  const handleRestart = () => {
    setStep("select-condition");
    setCondition(null);
    setAssessmentResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            {t("healthAssessmentTitle", language)}
          </h1>
          <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
            {t("healthAssessmentDescription", language)}
          </p>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {step === "select-condition" && t("selectCondition", language)}
                {step === "questionnaire" && t("answerQuestions", language)}
                {step === "results" && t("yourResults", language)}
              </CardTitle>
              <CardDescription>
                {step === "select-condition" && t("selectConditionDescription", language)}
                {step === "questionnaire" && t("answerQuestionsDescription", language)}
                {step === "results" && t("resultsDescription", language)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "select-condition" && (
                <ConditionSelector onSelect={handleConditionSelect} language={language} />
              )}
              
              {step === "questionnaire" && condition && (
                <HealthAssessmentForm 
                  condition={condition} 
                  onComplete={handleAssessmentComplete}
                  language={language}
                />
              )}
              
              {step === "results" && assessmentResult && (
                <AssessmentResults 
                  assessment={assessmentResult} 
                  onRestart={handleRestart}
                  language={language}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}