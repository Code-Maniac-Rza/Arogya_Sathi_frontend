
import { useState, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole?: "patient" | "driver" | "admin";
}

export function DashboardLayout({ children, requiredRole }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();

  // Handle sidebar state on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If requiredRole is specified and user doesn't have it, redirect to appropriate dashboard
  if (requiredRole && currentUser?.role !== requiredRole) {
    if (currentUser?.role === "driver") {
      return <Navigate to="/driver-dashboard" />;
    } else if (currentUser?.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  // On mobile, sidebar is collapsed by default
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-background">
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex">
        <DashboardSidebar
          isCollapsed={sidebarCollapsed}
          toggleCollapsed={toggleSidebar}
        />
        <main className={`flex-1 overflow-auto transition-all ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'} p-6`}>
          {children}
        </main>
      </div>
    </div>
  );
}
