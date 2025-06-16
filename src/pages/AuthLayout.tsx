import { useState, ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Ambulance, Stethoscope, Pill, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [authType, setAuthType] = useState(location.pathname === "/signup" ? "signup" : "login");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 flex-col justify-center items-center p-8 relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/login_collage.jpeg"
            alt="Medical Collage"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-indigo-50/70 to-sky-50/70"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 text-center">
          <Link to="/" className="inline-block">
            <Logo
              className="w-40 h-auto mb-4"
              size="lg"
              showText={true}
              forceLightMode={true}
            />
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 text-gray-800"
          >
            Arogya Sathi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl mb-12 text-gray-600"
          >
            Your Complete Healthcare Companion
          </motion.p>

          <div className="grid grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 p-6 rounded-xl backdrop-blur-sm hover:bg-white/90 transition-colors shadow-sm"
            >
              <Ambulance className="w-8 h-8 mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2 text-gray-800">24/7 Emergency</h3>
              <p className="text-sm text-gray-600">Instant ambulance service when you need it the most</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 p-6 rounded-xl backdrop-blur-sm hover:bg-white/90 transition-colors shadow-sm"
            >
              <Stethoscope className="w-8 h-8 mb-3 text-indigo-600" />
              <h3 className="font-semibold mb-2 text-gray-800">Telemedicine</h3>
              <p className="text-sm text-gray-600">Talk to doctors from the comfort of your home</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/80 p-6 rounded-xl backdrop-blur-sm hover:bg-white/90 transition-colors shadow-sm"
            >
              <Pill className="w-8 h-8 mb-3 text-sky-600" />
              <h3 className="font-semibold mb-2 text-gray-800">Online Pharmacy</h3>
              <p className="text-sm text-gray-600">Medicines delivered to your doorstep</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/80 p-6 rounded-xl backdrop-blur-sm hover:bg-white/90 transition-colors shadow-sm"
            >
              <Heart className="w-8 h-8 mb-3 text-rose-600" />
              <h3 className="font-semibold mb-2 text-gray-800">Health Records</h3>
              <p className="text-sm text-gray-600">Keep all your medical data in one secure place</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right side - Auth Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex justify-between items-center p-6">
          <Link to="/" className="md:hidden">
            <Logo size="sm" showText={true} forceLightMode={true} />
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </motion.div>

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
      </motion.div>
    </div>
  );
}
