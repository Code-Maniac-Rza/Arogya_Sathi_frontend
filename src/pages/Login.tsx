
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/pages/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      
      // Redirect based on role
      if (role === "driver") {
        navigate("/driver-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
      
      toast({
        title: "Login successful!",
        description: "Welcome to Arogya Sathi",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick login function for demo purposes
  const setDemoUser = (userType: "patient" | "driver" | "admin") => {
    setEmail(`${userType}@example.com`);
    setPassword("password");
    setRole(userType);
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Login to your account to continue"
    >
      <div className="mb-6 flex gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDemoUser("patient")}
          type="button"
        >
          Demo Patient
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDemoUser("driver")}
          type="button"
        >
          Demo Driver
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDemoUser("admin")}
          type="button"
        >
          Demo Admin
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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">I am a</Label>
          <Select 
            value={role} 
            onValueChange={(value) => setRole(value as "patient" | "driver" | "admin")}
          >
            <SelectTrigger>
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
          className="w-full bg-medical-primary hover:bg-medical-primary/90"
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
    </AuthLayout>
  );
}
