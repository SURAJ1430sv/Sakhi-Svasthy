import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/translations";
import { HeartPulse, Droplets, Search } from "lucide-react";

interface ConditionSelectorProps {
  onSelect: (condition: "pcos" | "pcod" | "breast_cancer") => void;
  language: string;
}

export default function ConditionSelector({ onSelect, language }: ConditionSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-2 border-muted hover:border-primary cursor-pointer transition-all overflow-hidden">
        <CardHeader className="bg-primary/5 pb-2">
          <div className="flex justify-center mb-2">
            <HeartPulse className="h-14 w-14 text-primary" />
          </div>
          <CardTitle className="text-center text-lg">{t("pcosTitle", language)}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <CardDescription className="text-sm min-h-[100px]">
            {t("pcosDescription", language)}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center pb-4">
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => onSelect("pcos")}
          >
            {t("selectAssessment", language)}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-2 border-muted hover:border-primary cursor-pointer transition-all overflow-hidden">
        <CardHeader className="bg-primary/5 pb-2">
          <div className="flex justify-center mb-2">
            <Droplets className="h-14 w-14 text-primary" />
          </div>
          <CardTitle className="text-center text-lg">{t("pcodTitle", language)}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <CardDescription className="text-sm min-h-[100px]">
            {t("pcodDescription", language)}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center pb-4">
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => onSelect("pcod")}
          >
            {t("selectAssessment", language)}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-2 border-muted hover:border-primary cursor-pointer transition-all overflow-hidden">
        <CardHeader className="bg-primary/5 pb-2">
          <div className="flex justify-center mb-2">
            <Search className="h-14 w-14 text-primary" />
          </div>
          <CardTitle className="text-center text-lg">{t("breastCancerTitle", language)}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <CardDescription className="text-sm min-h-[100px]">
            {t("breastCancerDescription", language)}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center pb-4">
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => onSelect("breast_cancer")}
          >
            {t("selectAssessment", language)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}