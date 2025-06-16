import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthLayout } from "@/pages/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"patient" | "driver" | "admin">("patient");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      // Get the redirect path from location state or default to role-based dashboard
      const redirectTo = location.state?.redirectTo;
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        // Default role-based redirection
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        switch (user.role) {
          case "patient":
            navigate("/patient/dashboard");
            break;
          case "driver":
            navigate("/driver/dashboard");
            break;
          case "admin":
            navigate("/admin/dashboard");
            break;
          default:
            navigate("/patient/dashboard");
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (userType: "patient" | "driver" | "admin") => {
    // Set demo credentials
    const demoCredentials = {
      patient: { email: "patient@example.com", password: "password" },
      driver: { email: "driver@example.com", password: "password" },
      admin: { email: "admin@example.com", password: "password" },
    };

    const credentials = demoCredentials[userType];
    setEmail(credentials.email);
    setPassword(credentials.password);
    setRole(userType);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to your account to continue"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("patient")}
            type="button"
            className="hover:bg-medical-primary/10 hover:text-medical-primary transition-colors"
          >
            Demo Patient
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("driver")}
            type="button"
            className="hover:bg-medical-primary/10 hover:text-medical-primary transition-colors"
          >
            Demo Driver
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("admin")}
            type="button"
            className="hover:bg-medical-primary/10 hover:text-medical-primary transition-colors"
          >
            Demo Admin
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="hover:bg-medical-primary/10 hover:text-medical-primary transition-colors">
            <Phone className="mr-2 h-4 w-4" />
            Phone
          </Button>
          <Button variant="outline" className="hover:bg-medical-primary/10 hover:text-medical-primary transition-colors">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:ring-2 focus:ring-medical-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:ring-2 focus:ring-medical-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as "patient" | "driver" | "admin")}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-medical-primary/20">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="driver">Ambulance Driver</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-medical-primary hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-medical-primary hover:bg-medical-primary/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/signup" className="text-medical-primary hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </motion.div>
    </AuthLayout>
  );
}
