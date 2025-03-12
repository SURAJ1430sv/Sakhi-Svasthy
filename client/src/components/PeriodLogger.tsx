import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertPeriodDataSchema, InsertPeriodData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const symptoms = [
  { id: "cramps", label: "cramps" },
  { id: "headache", label: "headache" },
  { id: "bloating", label: "bloating" },
  { id: "moodSwings", label: "moodSwings" },
  { id: "fatigue", label: "fatigue" },
  { id: "nausea", label: "nausea" },
  { id: "acne", label: "acne" },
  { id: "backPain", label: "backPain" },
];

export default function PeriodLogger({ onSuccess }: { onSuccess: () => void }) {
  const { language } = useAuth();
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const today = new Date().toISOString().split('T')[0];

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<InsertPeriodData>({
    resolver: zodResolver(insertPeriodDataSchema),
    defaultValues: {
      startDate: today,
      endDate: undefined,
      cycleLength: undefined,
      symptoms: "",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertPeriodData) => {
      const res = await apiRequest("POST", "/api/period-data", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Period data saved",
        description: "Your period data has been successfully recorded.",
      });
      reset();
      setSelectedSymptoms([]);
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving period data",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      const newSymptoms = prev.includes(symptomId)
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId];
      
      setValue("symptoms", newSymptoms.join(","));
      return newSymptoms;
    });
  };

  const onSubmit = (data: InsertPeriodData) => {
    mutation.mutate(data);
  };

  return (
    <Card className="bg-white p-6 rounded-lg shadow-sm">
      <CardContent className="p-0">
        <h3 className="font-heading font-semibold mb-4">
          {t("logPeriod", language)}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="startDate" className="block text-neutral-700 mb-2 font-medium">
              {t("lastPeriodDate", language)}
            </Label>
            <Input
              id="startDate"
              type="date"
              max={today}
              {...register("startDate")}
              className={errors.startDate ? "border-error" : ""}
            />
            {errors.startDate && (
              <p className="text-error text-sm mt-1">{errors.startDate.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="cycleLength" className="block text-neutral-700 mb-2 font-medium">
              {t("periodDuration", language)}
            </Label>
            <Select onValueChange={(value) => setValue("cycleLength", parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectDuration", language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="4">4 days</SelectItem>
                <SelectItem value="5">5 days</SelectItem>
                <SelectItem value="6">6 days</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="8">8+ days</SelectItem>
              </SelectContent>
            </Select>
            {errors.cycleLength && (
              <p className="text-error text-sm mt-1">{errors.cycleLength.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="symptoms" className="block text-neutral-700 mb-2 font-medium">
              {t("symptoms", language)}
            </Label>
            <input type="hidden" {...register("symptoms")} />
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <Badge
                  key={symptom.id}
                  variant={selectedSymptoms.includes(symptom.id) ? "default" : "outline"}
                  onClick={() => toggleSymptom(symptom.id)}
                  className="cursor-pointer"
                >
                  {t(symptom.label, language)}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white w-full mt-4"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("savePeriodData", language)}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
