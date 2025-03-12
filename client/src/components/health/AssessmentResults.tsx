import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { t } from "@/lib/translations";
import { HealthAssessment } from "@shared/schema";
import { AlertTriangle, CheckCircle, InfoIcon } from "lucide-react";

interface AssessmentResultsProps {
  assessment: HealthAssessment;
  onRestart: () => void;
  language: string;
}

export default function AssessmentResults({
  assessment,
  onRestart,
  language,
}: AssessmentResultsProps) {
  const { riskScore, recommendations } = assessment;

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: "low", color: "bg-green-500" };
    if (score < 60) return { level: "moderate", color: "bg-amber-500" };
    return { level: "high", color: "bg-red-500" };
  };

  const { level, color } = getRiskLevel(riskScore);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">{t("riskAssessmentResults", language)}</h3>
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2">{t("yourRiskScore", language)}</p>
          <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-neutral-200 mb-4">
            <span className="text-2xl font-bold">{riskScore}%</span>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            {level === "low" && <CheckCircle className="h-5 w-5 text-green-500" />}
            {level === "moderate" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
            {level === "high" && <AlertTriangle className="h-5 w-5 text-red-500" />}
            <span className="font-medium">
              {level === "low" && t("lowRisk", language)}
              {level === "moderate" && t("moderateRisk", language)}
              {level === "high" && t("highRisk", language)}
            </span>
          </div>
          <div className="w-full max-w-md mb-2">
            <Progress value={riskScore} className={`h-3 ${color}`} />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <InfoIcon className="h-5 w-5 mr-2 text-primary" />
            {t("recommendationsTitle", language)}
          </CardTitle>
          <CardDescription>
            {t("recommendationsDescription", language)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            {recommendations.split('\n').map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-neutral-500">
            {t("disclaimerText", language)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onRestart}>
          {t("startNewAssessment", language)}
        </Button>
      </div>
    </div>
  );
}