
import { useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [authType, setAuthType] = useState(location.pathname === "/signup" ? "signup" : "login");
  
  // Redirect if already logged in
  if (currentUser) {
    // Redirect based on user role
    switch (currentUser.role) {
      case "driver":
        return <Navigate to="/driver-dashboard" replace />;
      case "admin":
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Illustration/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-medical-primary to-medical-secondary flex-col justify-center items-center text-white p-8">
        <div className="max-w-md text-center">
          <Logo size="lg" className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Arogya Sathi</h1>
          <p className="text-xl mb-6">Your Complete Healthcare Companion</p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-2">24/7 Emergency</h3>
              <p className="text-sm">Instant ambulance service when you need it the most</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-2">Telemedicine</h3>
              <p className="text-sm">Talk to doctors from the comfort of your home</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-2">Online Pharmacy</h3>
              <p className="text-sm">Medicines delivered to your doorstep</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-2">Health Records</h3>
              <p className="text-sm">Keep all your medical data in one secure place</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4">
          <Logo size="sm" className="md:hidden" />
          <ThemeToggle />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            
            <Tabs 
              value={authType} 
              onValueChange={(value) => setAuthType(value)}
              className="mb-6"
            >
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="login" asChild>
                  <a href="/login" className="cursor-pointer">Login</a>
                </TabsTrigger>
                <TabsTrigger value="signup" asChild>
                  <a href="/signup" className="cursor-pointer">Sign Up</a>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
