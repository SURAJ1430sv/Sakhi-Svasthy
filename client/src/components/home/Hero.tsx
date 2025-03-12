import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";

export default function Hero() {
  const { language } = useAuth();

  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
              {t("heroTitle", language)}
            </h1>
            <p className="text-neutral-700 text-lg mb-6">
              {t("heroSubtitle", language)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/education">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 h-auto rounded-full font-medium transition w-full sm:w-auto">
                  {t("learnAboutPcos", language)}
                </Button>
              </Link>
              <Link href="/period-tracker">
                <Button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-6 h-auto rounded-full font-medium transition w-full sm:w-auto">
                  {t("trackPeriod", language)}
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" 
              alt="Women supporting each other" 
              className="rounded-lg shadow-lg max-w-full h-auto" 
              width="600" 
              height="500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
