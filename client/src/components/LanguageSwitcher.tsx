import { useAuth } from "@/hooks/use-auth";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useAuth();

  const handleToggle = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <div className="flex items-center mr-4">
      <Label className="mr-2 text-sm">ENG</Label>
      <Switch 
        checked={language === "hi"} 
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary"
      />
      <Label className="ml-2 text-sm" lang="hi">हिंदी</Label>
    </div>
  );
}
