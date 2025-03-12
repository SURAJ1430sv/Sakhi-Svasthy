import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";

export default function CallToAction() {
  const { language } = useAuth();

  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              {t("joinCommunity", language)}
            </h2>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              {t("joinDescription", language)}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto rounded-full font-medium transition w-full sm:w-auto">
                  {t("registerNow", language)}
                </Button>
              </Link>
              <Link href="/education">
                <Button variant="outline" className="bg-white hover:bg-neutral-50 text-primary border border-primary px-8 py-6 h-auto rounded-full font-medium transition w-full sm:w-auto">
                  {t("learnMore", language)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
