import { Ambulance, Calendar, FirstAid, Pill, Users } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardMetricCard } from "@/components/DashboardMetricCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of system status and key metrics.</p>
        </div>

        {/* User Management */}
        <section>
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardMetricCard
              icon={<Users className="h-4 w-4" />}
              title="Total Users"
              value="250"
              description="Registered users in the system"
            />
            <DashboardMetricCard
              icon={<Users className="h-4 w-4" />}
              title="Active Users"
              value="180"
              description="Users active in the last 30 days"
            />
            <DashboardMetricCard
              icon={<Users className="h-4 w-4" />}
              title="New Users (This Month)"
              value="25"
              description="New user registrations this month"
            />
            <DashboardMetricCard
              icon={<Users className="h-4 w-4" />}
              title="Inactive Users"
              value="70"
              description="Users who haven't logged in for 90 days"
            />
          </div>
        </section>

        {/* Ambulance Management */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ambulance Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardMetricCard
              icon={<Ambulance className="h-4 w-4" />}
              title="Total Ambulances"
              value="15"
              description="Ambulances available in the fleet"
            />
            <DashboardMetricCard
              icon={<Ambulance className="h-4 w-4" />}
              title="Available Ambulances"
              value="10"
              description="Ambulances currently available"
            />
            <DashboardMetricCard
              icon={<Ambulance className="h-4 w-4" />}
              title="Ambulances in Transit"
              value="5"
              description="Ambulances currently in transit"
            />
            <DashboardMetricCard
              icon={<Ambulance className="h-4 w-4" />}
              title="Average Response Time"
              value="7 mins"
              description="Average time to reach patients"
            />
          </div>
        </section>

        {/* Booking Management */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardMetricCard
              icon={<Calendar className="h-4 w-4" />}
              title="Total Bookings"
              value="320"
              description="Total bookings this month"
            />
            <DashboardMetricCard
              icon={<Calendar className="h-4 w-4" />}
              title="Completed Bookings"
              value="280"
              description="Bookings completed this month"
            />
            <DashboardMetricCard
              icon={<Calendar className="h-4 w-4" />}
              title="Pending Bookings"
              value="40"
              description="Bookings pending completion"
            />
            <DashboardMetricCard
              icon={<Calendar className="h-4 w-4" />}
              title="Average Booking Time"
              value="30 mins"
              description="Average time per booking"
            />
          </div>
        </section>

        {/* Pharmacy and Home Care Overview */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Pharmacy & Home Care</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardMetricCard
              icon={<Pill className="h-4 w-4" />}
              title="Total Pharmacy Orders"
              value="150"
              description="Total pharmacy orders this month"
            />
            <DashboardMetricCard
              icon={<FirstAid className="h-4 w-4" />}
              title="Total Home Care Bookings"
              value="80"
              description="Total home care bookings this month"
            />
            <DashboardMetricCard
              icon={<Pill className="h-4 w-4" />}
              title="Average Order Value"
              value="$55"
              description="Average value per pharmacy order"
            />
             <DashboardMetricCard
              icon={<FirstAid className="h-4 w-4" />}
              title="Home Care Revenue"
              value="$12,000"
              description="Total revenue from home care services"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
