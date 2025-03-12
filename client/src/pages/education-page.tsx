import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function EducationPage() {
  const { language } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">Health Education</h1>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Learn about common women's health issues including PCOS, PCOD, and Breast Cancer
            </p>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="pcos" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-3xl grid-cols-3">
                  <TabsTrigger value="pcos">PCOS</TabsTrigger>
                  <TabsTrigger value="pcod">PCOD</TabsTrigger>
                  <TabsTrigger value="breastcancer">Breast Cancer</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="pcos" className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80" 
                      alt="PCOS Illustration" 
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Common Symptoms</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-primary mr-2"></i>
                          <span>Irregular periods</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-primary mr-2"></i>
                          <span>Excess body hair</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-primary mr-2"></i>
                          <span>Weight gain</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-primary mr-2"></i>
                          <span>Acne</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-primary mr-2"></i>
                          <span>Hair thinning</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold font-heading mb-4">{t("pcos", language)}</h2>
                    <p className="text-neutral-700 mb-4">
                      Polycystic ovary syndrome (PCOS) is a common hormonal disorder affecting women of reproductive age. Women with PCOS may have enlarged ovaries that contain small collections of fluid — called follicles — located in each ovary as seen during an ultrasound.
                    </p>
                    <p className="text-neutral-700 mb-4">
                      PCOS can cause irregular menstrual periods, excess male hormone (androgen) levels, and polycystic ovaries. The exact cause of PCOS isn't known, but factors like insulin resistance and inflammation have been linked to excess androgen production.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-6 mb-3">PCOS and Your Health</h3>
                    <p className="text-neutral-700 mb-4">
                      PCOS is associated with various health conditions including:
                    </p>
                    <ul className="list-disc pl-6 mb-6 text-neutral-700 space-y-2">
                      <li>Type 2 diabetes</li>
                      <li>Metabolic syndrome</li>
                      <li>Heart disease</li>
                      <li>High blood pressure</li>
                      <li>Sleep apnea</li>
                      <li>Depression and anxiety</li>
                      <li>Endometrial cancer</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-6 mb-3">Management and Treatment</h3>
                    <p className="text-neutral-700 mb-4">
                      Treatment for PCOS focuses on managing individual concerns such as infertility, hirsutism, acne or obesity. Specific treatment might include:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Lifestyle Changes</h4>
                        <ul className="space-y-1 text-neutral-700">
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                            <span>Weight loss through healthy diet</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                            <span>Regular exercise</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                            <span>Quitting smoking</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Medication</h4>
                        <ul className="space-y-1 text-neutral-700">
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                            <span>Hormonal birth control</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                            <span>Anti-androgen medications</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-primary mt-1 mr-2"></i>
                            <span>Metformin to improve insulin resistance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="bg-primary hover:bg-primary/90 text-white rounded-full">
                        Download PCOS Information Guide
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pcod" className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <img 
                      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80" 
                      alt="PCOD Illustration" 
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Key Differences from PCOS</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-secondary mr-2"></i>
                          <span>PCOD is a condition, while PCOS is a syndrome</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-secondary mr-2"></i>
                          <span>PCOD is more common than PCOS</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-secondary mr-2"></i>
                          <span>Less severe hormonal imbalance</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-checkbox-circle-fill text-secondary mr-2"></i>
                          <span>May have normal ovulation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold font-heading mb-4">{t("pcod", language)}</h2>
                    <p className="text-neutral-700 mb-4">
                      Polycystic Ovarian Disease (PCOD) is a condition in which the ovaries produce many immature or partially mature eggs, which eventually turn into cysts. These cysts produce hormones called androgens which lead to hormonal imbalance in the body.
                    </p>
                    <p className="text-neutral-700 mb-4">
                      PCOD is one of the most common health issues among women of reproductive age, affecting 1 in 10 women worldwide. It's often related to irregular hormone production, which interferes with ovulation.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-6 mb-3">Symptoms of PCOD</h3>
                    <p className="text-neutral-700 mb-4">
                      The symptoms of PCOD can vary from woman to woman, but may include:
                    </p>
                    <ul className="list-disc pl-6 mb-6 text-neutral-700 space-y-2">
                      <li>Irregular menstrual cycles</li>
                      <li>Heavy bleeding during periods</li>
                      <li>Mild weight gain</li>
                      <li>Mild acne</li>
                      <li>Male pattern hair growth (hirsutism)</li>
                      <li>Fertility issues</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-6 mb-3">Treatment Options</h3>
                    <p className="text-neutral-700 mb-4">
                      PCOD can be managed effectively with the right approach:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Lifestyle Management</h4>
                        <ul className="space-y-1 text-neutral-700">
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                            <span>Balanced diet with reduced sugar</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                            <span>Regular moderate exercise</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                            <span>Stress management techniques</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Medical Treatment</h4>
                        <ul className="space-y-1 text-neutral-700">
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                            <span>Hormonal treatments</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                            <span>Ovulation induction for fertility</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-arrow-right-s-fill text-secondary mt-1 mr-2"></i>
                            <span>Regular monitoring by gynecologist</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full">
                        Download PCOD Management Guide
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="breastcancer" className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <img 
                      src="https://images.unsplash.com/photo-1559757175-7cb057fba93c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80" 
                      alt="Breast Cancer Awareness" 
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Warning Signs</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <i className="ri-alert-fill text-error mr-2"></i>
                          <span>New lump in breast or armpit</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-alert-fill text-error mr-2"></i>
                          <span>Thickening or swelling of part of the breast</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-alert-fill text-error mr-2"></i>
                          <span>Change in size or shape of the breast</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-alert-fill text-error mr-2"></i>
                          <span>Nipple discharge other than breast milk</span>
                        </li>
                        <li className="flex items-center">
                          <i className="ri-alert-fill text-error mr-2"></i>
                          <span>Pain in any area of the breast</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold font-heading mb-4">{t("breastCancer", language)}</h2>
                    <p className="text-neutral-700 mb-4">
                      Breast cancer is a disease in which cells in the breast grow out of control. There are different kinds of breast cancer depending on which cells in the breast turn into cancer. Breast cancer can begin in different parts of the breast, most commonly in the ducts that carry milk to the nipple or in the glands that make breast milk.
                    </p>
                    <p className="text-neutral-700 mb-4">
                      Although breast cancer primarily affects older women, it's important for young women to be aware of the risk factors and early detection methods. About 11% of all breast cancer cases are diagnosed in women younger than 45 years of age.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-6 mb-3">Risk Factors for Young Women</h3>
                    <p className="text-neutral-700 mb-4">
                      Several factors can increase a young woman's risk of breast cancer:
                    </p>
                    <ul className="list-disc pl-6 mb-6 text-neutral-700 space-y-2">
                      <li>Family history of breast or ovarian cancer</li>
                      <li>Genetic mutations (BRCA1, BRCA2)</li>
                      <li>Previous radiation therapy to the chest</li>
                      <li>Dense breast tissue</li>
                      <li>Previous history of certain non-cancerous breast diseases</li>
                      <li>Early menstruation (before age 12) or late menopause (after age 55)</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-6 mb-3">Early Detection and Prevention</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Self-Examinations</h4>
                        <ul className="space-y-1 text-neutral-700">
                          <li className="flex items-start">
                            <i className="ri-check-line text-success mt-1 mr-2"></i>
                            <span>Perform monthly self-examinations</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-check-line text-success mt-1 mr-2"></i>
                            <span>Know your normal breast appearance and feel</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-check-line text-success mt-1 mr-2"></i>
                            <span>Report any changes to a healthcare provider</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Professional Screening</h4>
                        <ul className="space-y-1 text-neutral-700">
                          <li className="flex items-start">
                            <i className="ri-check-line text-success mt-1 mr-2"></i>
                            <span>Clinical breast exams as part of regular check-ups</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-check-line text-success mt-1 mr-2"></i>
                            <span>Mammograms based on risk factors and doctor recommendations</span>
                          </li>
                          <li className="flex items-start">
                            <i className="ri-check-line text-success mt-1 mr-2"></i>
                            <span>Genetic counseling if you have family history</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="bg-accent hover:bg-accent/90 text-neutral-800 rounded-full">
                        Learn Breast Self-Examination Technique
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
