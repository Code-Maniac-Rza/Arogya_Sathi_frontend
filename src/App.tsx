
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Import pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Patient pages
import PatientDashboard from "./pages/patient/Dashboard";
import EmergencyAmbulance from "./pages/patient/EmergencyAmbulance";

// Driver pages
import DriverDashboard from "./pages/driver/Dashboard";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Landing and Auth Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Patient Routes */}
              <Route path="/dashboard" element={<PatientDashboard />} />
              <Route path="/ambulance" element={<EmergencyAmbulance />} />
              
              {/* Driver Routes */}
              <Route path="/driver-dashboard" element={<DriverDashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
