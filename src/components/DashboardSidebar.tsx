import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Ambulance,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Stethoscope,
  MapPin,
  Pill,
  Users,
  User,
  Utensils,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

interface DashboardSidebarProps {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

function NavItem({ to, icon, label, isCollapsed }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent" : "transparent",
        isCollapsed ? "justify-center" : "justify-start"
      )}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}

export function DashboardSidebar({ isCollapsed, toggleCollapsed }: DashboardSidebarProps) {
  const { currentUser } = useAuth();
  const userRole = currentUser?.role;
  const [isHovered, setIsHovered] = useState(false);

  // Define navigation items based on user role
  const patientNavItems = [
    { to: "/patient/dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { to: "/patient/emergency-ambulance", icon: <Ambulance className="h-5 w-5" />, label: "Emergency" },
    { to: "/patient/telemedicine", icon: <Calendar className="h-5 w-5" />, label: "Telemedicine" },
    { to: "/patient/health-records", icon: <FileText className="h-5 w-5" />, label: "EHR" },
    { to: "/patient/pharmacy", icon: <Pill className="h-5 w-5" />, label: "Pharmacy" },
    { to: "/patient/home-care", icon: <Stethoscope className="h-5 w-5" />, label: "Home Care" },
    { to: "/ai-integration", icon: <MessageSquare className="h-5 w-5" />, label: "Ask ArogyaAI" },
  ];

  const driverNavItems = [
    { to: "/driver-dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { to: "/driver-bookings", icon: <Ambulance className="h-5 w-5" />, label: "Bookings" },
    { to: "/driver-map", icon: <MapPin className="h-5 w-5" />, label: "Live Map" },
    { to: "/driver-profile", icon: <User className="h-5 w-5" />, label: "Profile" },
  ];

  const adminNavItems = [
    { to: "/admin-dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { to: "/admin-users", icon: <Users className="h-5 w-5" />, label: "Manage Users" },
    { to: "/admin-ambulances", icon: <Ambulance className="h-5 w-5" />, label: "Ambulances" },
    { to: "/admin-bookings", icon: <Calendar className="h-5 w-5" />, label: "Bookings" },
    { to: "/admin-pharmacy", icon: <Pill className="h-5 w-5" />, label: "Pharmacy" },
    { to: "/admin-home-care", icon: <Stethoscope className="h-5 w-5" />, label: "Home Care" },
  ];

  // Select the correct navigation based on user role
  let navItems;
  switch (userRole) {
    case "driver":
      navItems = driverNavItems;
      break;
    case "admin":
      navItems = adminNavItems;
      break;
    case "patient":
    default:
      navItems = patientNavItems;
  }

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed && !isHovered ? "w-[70px]" : "w-[240px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-16 items-center border-b px-3 justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleCollapsed}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <nav className="grid gap-1 px-1.5 py-4">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed && !isHovered}
            />
          ))}
        </nav>
      </div>

      <Separator />
    </aside>
  );
}
