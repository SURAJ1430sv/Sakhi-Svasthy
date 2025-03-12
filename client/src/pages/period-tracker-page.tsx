import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PeriodCalendar from "@/components/PeriodCalendar";
import PeriodLogger from "@/components/PeriodLogger";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";
import { useQuery } from "@tanstack/react-query";
import { PeriodData } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function PeriodTrackerPage() {
  const { language, user } = useAuth();
  
  const { 
    data: periodData, 
    isLoading,
    refetch
  } = useQuery<PeriodData[]>({
    queryKey: ["/api/period-data"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 bg-gradient-to-r from-accent/20 to-secondary/10">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-8 text-center">
            {t("trackCycle", language)}
          </h1>
          <p className="text-neutral-700 mb-10 max-w-3xl mx-auto text-center">
            {t("trackCycleDescription", language)}
          </p>
          
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <PeriodLogger onSuccess={refetch} />
            </div>
            
            <div className="md:w-1/2">
              {isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <PeriodCalendar periodData={periodData || []} />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
