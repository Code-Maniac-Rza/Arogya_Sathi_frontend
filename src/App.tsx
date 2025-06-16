import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Contact from "@/pages/Contact";
import PatientDashboard from "@/pages/patient/Dashboard";
import EmergencyAmbulance from "@/pages/patient/EmergencyAmbulance";
import DriverDashboard from "@/pages/driver/Dashboard";
import AdminDashboard from "@/pages/admin/Dashboard";
import Telemedicine from "@/pages/patient/Telemedicine";
import AIIntegration from "@/pages/patient/AIIntegration";
import NotFound from "@/pages/NotFound";
import Checkout from "@/pages/patient/Checkout";
import Pharmacy from "@/pages/patient/Pharmacy";
import DoctorProfile from "@/pages/patient/DoctorProfile";
import HealthRecords from "@/pages/patient/HealthRecords";
import HomeCare from "@/pages/patient/HomeCare";
import HomeCareService from "@/pages/patient/HomeCareService";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Public Route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    // Redirect based on role
    switch (currentUser.role) {
      case "patient":
        return <Navigate to="/patient/dashboard" />;
      case "driver":
        return <Navigate to="/driver/dashboard" />;
      case "admin":
        return <Navigate to="/admin/dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { currentUser: user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/patient/telemedicine" element={<ProtectedRoute allowedRoles={["patient"]}><Telemedicine /></ProtectedRoute>} />
      <Route path="/patient/pharmacy" element={<ProtectedRoute allowedRoles={["patient"]}><Pharmacy /></ProtectedRoute>} />
      <Route path="/patient/checkout" element={<ProtectedRoute allowedRoles={["patient"]}><Checkout /></ProtectedRoute>} />
      <Route path="/ai-integration" element={<ProtectedRoute allowedRoles={["patient"]}><AIIntegration /></ProtectedRoute>} />
      <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={["patient"]}><PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/emergency-ambulance" element={<ProtectedRoute allowedRoles={["patient"]}><EmergencyAmbulance /></ProtectedRoute>} />
      <Route path="/patient/health-records" element={<ProtectedRoute allowedRoles={["patient"]}><HealthRecords /></ProtectedRoute>} />
      <Route path="/patient/home-care" element={<ProtectedRoute allowedRoles={["patient"]}><HomeCare /></ProtectedRoute>} />
      <Route path="/patient/home-care/:serviceId" element={<ProtectedRoute allowedRoles={["patient"]}><HomeCareService /></ProtectedRoute>} />

      <Route
        path="/driver/dashboard"
        element={
          <ProtectedRoute allowedRoles={["driver"]}>
            <DriverDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/doctor/:id"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <DoctorProfile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <CartProvider>
                <Router>
                  <AppRoutes />
                  <Toaster />
                </Router>
              </CartProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
