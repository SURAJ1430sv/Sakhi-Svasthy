import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/lib/translations";

export default function Header() {
  const [location] = useLocation();
  const { user, logoutMutation, language } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-3">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5C13.925 5 9 9.925 9 16C9 22.075 13.925 27 20 27C26.075 27 31 22.075 31 16C31 9.925 26.075 5 20 5Z" fill="#E85B81"/>
                <path d="M16 16C16 19.866 18.2386 23.2047 21.5 24.4772C24.7614 25.7498 28.5 24.366 30.5 21.5C28.5 18.634 24.7614 17.2502 21.5 18.5228C18.2386 19.7953 16 23.134 16 27" stroke="#8C6BA0" strokeWidth="2"/>
                <path d="M20 27C13.925 27 9 31.925 9 38H31C31 31.925 26.075 27 20 27Z" fill="#8C6BA0" fillOpacity="0.3"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-heading font-bold">
                <span>Sakhi Svasthya</span>
                <span className="text-primary" lang="hi"> सखीस्वास्थ्य</span>
              </h1>
              <p className="text-sm text-neutral-600">Women's Health & Wellness</p>
            </div>
          </div>
          
          <nav className="flex items-center">
            <LanguageSwitcher />
            
            <div className="hidden md:flex space-x-6">
              <Link href="/">
                <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/' ? 'text-primary' : ''}`}>
                  {t("home", language)}
                </a>
              </Link>
              <Link href="/education">
                <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/education' ? 'text-primary' : ''}`}>
                  {t("education", language)}
                </a>
              </Link>
              <Link href="/research">
                <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/research' ? 'text-primary' : ''}`}>
                  {t("research", language)}
                </a>
              </Link>
              <Link href="/health-assessment">
                <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/health-assessment' ? 'text-primary' : ''}`}>
                  {t("healthAssessment", language)}
                </a>
              </Link>
              {user && (
                <Link href="/period-tracker">
                  <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/period-tracker' ? 'text-primary' : ''}`}>
                    {t("trackPeriod", language)}
                  </a>
                </Link>
              )}
            </div>
            
            {user ? (
              <div className="ml-6 flex items-center">
                <span className="mr-3 hidden md:block text-sm text-neutral-600">
                  {user.name}
                </span>
                <Button 
                  variant="default" 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full" 
                  onClick={handleLogout}
                >
                  {t("logout", language)}
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="default" className="ml-6 bg-primary hover:bg-primary/90 text-white rounded-full">
                  {t("loginSignup", language)}
                </Button>
              </Link>
            )}
            
            <button 
              className="ml-4 block md:hidden text-neutral-700"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-neutral-200">
            <div className="flex flex-col space-y-4">
              <Link href="/">
                <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/' ? 'text-primary' : ''}`} 
                  onClick={() => setMobileMenuOpen(false)}>
                  {t("home", language)}
                </a>
              </Link>
              <Link href="/education">
                <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/education' ? 'text-primary' : ''}`} 
                  onClick={() => setMobileMenuOpen(false)}>
                  {t("education", language)}
                </a>
              </Link>
              <Link href="/research">
                <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/research' ? 'text-primary' : ''}`} 
                  onClick={() => setMobileMenuOpen(false)}>
                  {t("research", language)}
                </a>
              </Link>
              <Link href="/health-assessment">
                <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/health-assessment' ? 'text-primary' : ''}`} 
                  onClick={() => setMobileMenuOpen(false)}>
                  {t("healthAssessment", language)}
                </a>
              </Link>
              {user && (
                <Link href="/period-tracker">
                  <a className={`text-neutral-700 hover:text-primary font-medium ${location === '/period-tracker' ? 'text-primary' : ''}`} 
                    onClick={() => setMobileMenuOpen(false)}>
                    {t("trackPeriod", language)}
                  </a>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
