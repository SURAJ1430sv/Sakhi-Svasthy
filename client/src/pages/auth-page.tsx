import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, loginUserSchema } from "@shared/schema";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { t } from "@/lib/translations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const extendedRegisterSchema = insertUserSchema.extend({
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof extendedRegisterSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation, language } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // Login form
  const loginForm = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  // Register form
  const registerForm = useForm({
    resolver: zodResolver(extendedRegisterSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onLoginSubmit = (data: z.infer<typeof loginUserSchema>) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  // Redirect if the user is already logged in
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden shadow-md">
            {/* Left side - Auth forms */}
            <div className="lg:w-1/2 p-8">
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">{t("login", language)}</TabsTrigger>
                  <TabsTrigger value="register">{t("register", language)}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">{t("loginTitle", language)}</h2>
                      <p className="text-neutral-600 mt-2">
                        {t("dontHaveAccount", language)} 
                        <button 
                          onClick={() => setActiveTab("register")}
                          className="text-primary font-medium ml-1 hover:underline"
                        >
                          {t("register", language)}
                        </button>
                      </p>
                    </div>
                    
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      {loginMutation.isError && (
                        <Alert variant="destructive">
                          <AlertTitle>{t("login", language)} failed</AlertTitle>
                          <AlertDescription>
                            {loginMutation.error?.message || "Login failed"}
                          </AlertDescription>
                        </Alert>
                      )}
                      <div>
                        <Label htmlFor="login-username">{t("username", language)}</Label>
                        <Input 
                          id="login-username"
                          {...loginForm.register("username")}
                          className={loginForm.formState.errors.username ? "border-error" : ""}
                        />
                        {loginForm.formState.errors.username && (
                          <p className="text-error text-sm mt-1">{loginForm.formState.errors.username.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="login-password">{t("password", language)}</Label>
                        <Input 
                          id="login-password"
                          type="password"
                          {...loginForm.register("password")}
                          className={loginForm.formState.errors.password ? "border-error" : ""}
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-error text-sm mt-1">{loginForm.formState.errors.password.message}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Logging in..." : t("login", language)}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
                
                <TabsContent value="register">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">{t("registerTitle", language)}</h2>
                      <p className="text-neutral-600 mt-2">
                        {t("alreadyHaveAccount", language)}
                        <button 
                          onClick={() => setActiveTab("login")}
                          className="text-primary font-medium ml-1 hover:underline"
                        >
                          {t("login", language)}
                        </button>
                      </p>
                    </div>
                    
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      {registerMutation.isError && (
                        <Alert variant="destructive">
                          <AlertTitle>{t("register", language)} failed</AlertTitle>
                          <AlertDescription>
                            {registerMutation.error?.message || "Registration failed"}
                          </AlertDescription>
                        </Alert>
                      )}
                      <div>
                        <Label htmlFor="name">{t("name", language)}</Label>
                        <Input 
                          id="name"
                          {...registerForm.register("name")}
                          className={registerForm.formState.errors.name ? "border-error" : ""}
                        />
                        {registerForm.formState.errors.name && (
                          <p className="text-error text-sm mt-1">{registerForm.formState.errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="username">{t("username", language)}</Label>
                        <Input 
                          id="username"
                          {...registerForm.register("username")}
                          className={registerForm.formState.errors.username ? "border-error" : ""}
                        />
                        {registerForm.formState.errors.username && (
                          <p className="text-error text-sm mt-1">{registerForm.formState.errors.username.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">{t("email", language)}</Label>
                        <Input 
                          id="email"
                          type="email"
                          {...registerForm.register("email")}
                          className={registerForm.formState.errors.email ? "border-error" : ""}
                        />
                        {registerForm.formState.errors.email && (
                          <p className="text-error text-sm mt-1">{registerForm.formState.errors.email.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="password">{t("password", language)}</Label>
                        <Input 
                          id="password"
                          type="password"
                          {...registerForm.register("password")}
                          className={registerForm.formState.errors.password ? "border-error" : ""}
                        />
                        {registerForm.formState.errors.password && (
                          <p className="text-error text-sm mt-1">{registerForm.formState.errors.password.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword">{t("confirmPassword", language)}</Label>
                        <Input 
                          id="confirmPassword"
                          type="password"
                          {...registerForm.register("confirmPassword")}
                          className={registerForm.formState.errors.confirmPassword ? "border-error" : ""}
                        />
                        {registerForm.formState.errors.confirmPassword && (
                          <p className="text-error text-sm mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Registering..." : t("register", language)}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right side - Information */}
            <div className="lg:w-1/2 bg-gradient-to-r from-primary to-secondary p-8 text-white flex items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Sakhi Svasthya सखीस्वास्थ्य</h2>
                <p className="text-lg mb-6">Your trusted companion for women's health awareness and education.</p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="ri-shield-check-line text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Health Education</h3>
                      <p>Learn about PCOS, PCOD, and Breast Cancer from reliable sources.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="ri-calendar-check-line text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Period Tracking</h3>
                      <p>Monitor your menstrual cycle to understand your body better.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="ri-user-heart-line text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Community Support</h3>
                      <p>Join a supportive community of women on their health journey.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
