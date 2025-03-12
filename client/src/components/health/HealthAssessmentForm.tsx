import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { t } from "@/lib/translations";
import { 
  healthAssessmentSchema, 
  type HealthAssessmentInput,
  type HealthAssessment 
} from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

interface HealthAssessmentFormProps {
  condition: "pcos" | "pcod" | "breast_cancer";
  onComplete: (assessment: HealthAssessment) => void;
  language: string;
}

export default function HealthAssessmentForm({ 
  condition, 
  onComplete, 
  language 
}: HealthAssessmentFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const getDefaultValues = () => {
    if (condition === "pcos" || condition === "pcod") {
      return {
        conditionType: condition,
        age: "",
        irregularPeriods: "",
        weightGain: "",
        excessiveHairGrowth: "",
        skinDarkening: "",
        hairLoss: "",
        pimples: "",
        familyHistory: "",
        additionalSymptoms: "",
      };
    } else {
      return {
        conditionType: condition,
        age: "",
        lumpInBreast: "",
        breastPain: "",
        nippleDischarge: "",
        breastShapeChange: "",
        familyHistory: "",
        previousBiopsies: "",
        additionalSymptoms: "",
      };
    }
  };

  const form = useForm<HealthAssessmentInput>({
    resolver: zodResolver(healthAssessmentSchema),
    defaultValues: getDefaultValues(),
  });

  const assessmentMutation = useMutation({
    mutationFn: async (data: HealthAssessmentInput) => {
      const res = await apiRequest(
        "POST", 
        "/api/health-assessment", 
        { ...data, anonymous: isAnonymous }
      );
      return await res.json();
    },
    onSuccess: (data: HealthAssessment) => {
      queryClient.invalidateQueries({ queryKey: ["/api/health-assessment"] });
      onComplete(data);
    },
    onError: (error: Error) => {
      toast({
        title: t("assessmentError", language),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: HealthAssessmentInput) => {
    assessmentMutation.mutate(data);
  };

  const renderQuestions = () => {
    if (condition === "pcos" || condition === "pcod") {
      return (
        <>
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("ageQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="under_20" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("under20", language)}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="21_30" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("21to30", language)}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="31_40" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("31to40", language)}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="above_40" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("above40", language)}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="irregularPeriods"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("irregularPeriodsQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("yes", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("no", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sometimes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("sometimes", language)}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weightGain"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("weightGainQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("yes", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("no", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="slight" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("slight", language)}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excessiveHairGrowth"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("excessiveHairGrowthQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("yes", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("no", language)}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="familyHistory"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("familyHistoryQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("yes", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("no", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="unknown" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("unknown", language)}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    } else {
      return (
        <>
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("ageQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="under_30" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("under30", language)}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="31_45" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("31to45", language)}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="46_60" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("46to60", language)}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="above_60" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("above60", language)}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lumpInBreast"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("lumpInBreastQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("yes", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("no", language)}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breastPain"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("breastPainQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("yes", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("no", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sometimes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("sometimes", language)}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="familyHistory"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("familyHistoryQuestion", language)}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("yes", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("no", language)}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="unknown" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("unknown", language)}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {renderQuestions()}

        <FormField
          control={form.control}
          name="additionalSymptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("additionalSymptomsQuestion", language)}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("additionalSymptomsPlaceholder", language)}
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("additionalSymptomsDescription", language)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Switch
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
          <label
            htmlFor="anonymous"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("anonymousSubmission", language)}
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={assessmentMutation.isPending}
        >
          {assessmentMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("submitting", language)}
            </>
          ) : (
            t("submitAssessment", language)
          )}
        </Button>
      </form>
    </Form>
  );
}