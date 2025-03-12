import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";

const healthIssues = [
  {
    id: 1,
    title: "pcos",
    description: "pcosDescription",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
    alt: "PCOS Awareness",
    tag1: "Common symptoms",
    tag2: "Management"
  },
  {
    id: 2,
    title: "pcod",
    description: "pcodDescription",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
    alt: "PCOD Information",
    tag1: "Key differences",
    tag2: "Treatment"
  },
  {
    id: 3,
    title: "breastCancer",
    description: "breastCancerDescription",
    image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
    alt: "Breast Cancer Awareness",
    tag1: "Warning signs",
    tag2: "Prevention"
  }
];

export default function HealthIssues() {
  const { language } = useAuth();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">
            {t("healthIssuesTitle", language)}
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            {t("healthIssuesSubtitle", language)}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {healthIssues.map((issue) => (
            <div 
              key={issue.id}
              className="bg-neutral-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 article-card hover:shadow-md"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={issue.image} 
                  alt={issue.alt} 
                  className="w-full h-full object-cover" 
                  width="500" 
                  height="300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {t(issue.title, language)}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {t(issue.description, language)}
                </p>
                <div className="flex items-center text-sm text-neutral-500 mb-4">
                  <span className="mr-4"><i className="ri-eye-line mr-1"></i> {issue.tag1}</span>
                  <span><i className="ri-heart-pulse-line mr-1"></i> {issue.tag2}</span>
                </div>
                <Link href="/education">
                  <a className="text-primary font-medium hover:underline inline-flex items-center">
                    {t("learnMore", language)} <i className="ri-arrow-right-line ml-1"></i>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
