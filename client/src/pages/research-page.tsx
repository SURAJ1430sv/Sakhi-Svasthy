import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResearchCharts from "@/components/ResearchCharts";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";

export default function ResearchPage() {
  const { language } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">{t("researchFindings", language)}</h1>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              {t("researchDescription", language)}
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <ResearchCharts />
            
            <div className="bg-neutral-50 p-6 rounded-lg shadow-sm mt-12">
              <h3 className="font-heading text-xl font-semibold mb-4">Key Findings from ANOVA Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded border border-neutral-200">
                  <h4 className="font-medium text-lg mb-2">Regional Differences</h4>
                  <p className="text-neutral-600 text-sm">Significant variation in awareness levels across different states and regions (p &lt; 0.05), with urban areas showing higher awareness.</p>
                </div>
                <div className="bg-white p-4 rounded border border-neutral-200">
                  <h4 className="font-medium text-lg mb-2">Age Correlation</h4>
                  <p className="text-neutral-600 text-sm">Positive correlation between age and awareness levels, with older students demonstrating better understanding of symptoms and preventive measures.</p>
                </div>
                <div className="bg-white p-4 rounded border border-neutral-200">
                  <h4 className="font-medium text-lg mb-2">Educational Impact</h4>
                  <p className="text-neutral-600 text-sm">Students from health-related disciplines showed significantly higher awareness (p &lt; 0.01) compared to other fields of study.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <h3 className="font-heading text-2xl font-bold mb-6">Research Methodology</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-heading text-lg font-semibold mb-3">Data Collection</h4>
                  <p className="text-neutral-700 mb-4">
                    Primary data was collected from female students studying at undergraduate and postgraduate levels in different colleges and states across India. A structured questionnaire was used to assess awareness levels about PCOS, PCOD, and Breast Cancer.
                  </p>
                  <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                    <h5 className="font-medium mb-2">Sample Demographics</h5>
                    <ul className="space-y-1 text-neutral-700">
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                        <span>Total Participants: 1,248 female students</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                        <span>Age Range: 18-28 years</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                        <span>Education Level: 68% UG, 32% PG</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                        <span>Geographic Distribution: 12 states across India</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-heading text-lg font-semibold mb-3">Statistical Analysis</h4>
                  <p className="text-neutral-700 mb-4">
                    Analysis of Variance (ANOVA) test was applied to analyze the difference in awareness levels based on various demographic factors such as age, education level, geographic location, and field of study.
                  </p>
                  <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                    <h5 className="font-medium mb-2">Key Variables Analyzed</h5>
                    <ul className="space-y-1 text-neutral-700">
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                        <span>Knowledge of symptoms and causes</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                        <span>Awareness of risk factors</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                        <span>Understanding of preventive measures</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                        <span>Knowledge of treatment options</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <h3 className="font-heading text-2xl font-bold mb-6">Conclusions and Recommendations</h3>
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3 text-primary">Key Conclusions</h4>
                    <ul className="space-y-3 text-neutral-700">
                      <li className="flex items-start">
                        <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</div>
                        <span>Overall awareness about women's health issues among young female students is insufficient, with only 42% demonstrating adequate knowledge.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</div>
                        <span>Awareness about PCOS (35%) and PCOD (28%) is significantly lower than awareness about Breast Cancer (60%).</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</div>
                        <span>Educational level has a strong positive correlation with health awareness, with awareness increasing from 30% in first-year undergraduates to 68% in postgraduate students.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3 text-secondary">Recommendations</h4>
                    <ul className="space-y-3 text-neutral-700">
                      <li className="flex items-start">
                        <div className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</div>
                        <span>Integrate women's health education into college curriculum, especially for first and second-year students.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</div>
                        <span>Develop targeted awareness campaigns about PCOS and PCOD to address the knowledge gap compared to breast cancer awareness.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</div>
                        <span>Create mobile applications and digital resources in multiple languages to improve accessibility of health information.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</div>
                        <span>Conduct regular health workshops in educational institutions, especially in rural areas and smaller towns.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
