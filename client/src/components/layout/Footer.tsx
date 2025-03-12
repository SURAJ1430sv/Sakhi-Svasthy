import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";

export default function Footer() {
  const { language } = useAuth();

  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5C13.925 5 9 9.925 9 16C9 22.075 13.925 27 20 27C26.075 27 31 22.075 31 16C31 9.925 26.075 5 20 5Z" fill="#E85B81"/>
                  <path d="M16 16C16 19.866 18.2386 23.2047 21.5 24.4772C24.7614 25.7498 28.5 24.366 30.5 21.5C28.5 18.634 24.7614 17.2502 21.5 18.5228C18.2386 19.7953 16 23.134 16 27" stroke="#FFFFFF" strokeWidth="2"/>
                  <path d="M20 27C13.925 27 9 31.925 9 38H31C31 31.925 26.075 27 20 27Z" fill="#FFFFFF" fillOpacity="0.3"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">
                  <span>Sakhi Svasthya</span>
                  <span className="text-primary" lang="hi"> सखीस्वास्थ्य</span>
                </h3>
              </div>
            </div>
            <p className="text-neutral-300 mb-4">Empowering women through health awareness and education.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="ri-youtube-fill text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">{t("quickLinks", language)}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-neutral-300 hover:text-primary transition">{t("home", language)}</a>
                </Link>
              </li>
              <li>
                <Link href="/education">
                  <a className="text-neutral-300 hover:text-primary transition">{t("education", language)}</a>
                </Link>
              </li>
              <li>
                <Link href="/research">
                  <a className="text-neutral-300 hover:text-primary transition">{t("researchFindings", language)}</a>
                </Link>
              </li>
              <li>
                <Link href="/period-tracker">
                  <a className="text-neutral-300 hover:text-primary transition">{t("trackPeriod", language)}</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">{t("healthTopics", language)}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-primary transition">PCOS/PCOD</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-primary transition">{t("breastCancer", language)}</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-primary transition">{t("menstrualHealth", language)}</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-primary transition">{t("hormonalBalance", language)}</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-primary transition">{t("mentalWellbeing", language)}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">{t("contactUs", language)}</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-mail-line mr-3 mt-1 text-primary"></i>
                <span className="text-neutral-300">contact@sakhisvasthya.org</span>
              </li>
              <li className="flex items-start">
                <i className="ri-phone-line mr-3 mt-1 text-primary"></i>
                <span className="text-neutral-300">+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <i className="ri-map-pin-line mr-3 mt-1 text-primary"></i>
                <span className="text-neutral-300">Research Center, University Campus, New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Sakhi Svasthya. {t("copyright", language)} | <a href="#" className="hover:text-primary">{t("privacyPolicy", language)}</a> | <a href="#" className="hover:text-primary">{t("termsOfService", language)}</a></p>
        </div>
      </div>
    </footer>
  );
}
