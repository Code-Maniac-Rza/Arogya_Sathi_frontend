import { Calendar, MessageSquare, ChevronRight, FileText, MapPin, FirstAid, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardMetricCard } from "@/components/DashboardMetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <DashboardLayout requiredRole="patient">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser?.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your health today.</p>
        </div>
        
        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 hover:bg-primary/5 hover:border-primary flex flex-col"
              onClick={() => navigate("/ambulance")}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-2">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Book Ambulance</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 hover:bg-primary/5 hover:border-primary flex flex-col"
              onClick={() => navigate("/telemedicine")}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-2">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Book Consultation</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 hover:bg-primary/5 hover:border-primary flex flex-col"
              onClick={() => navigate("/pharmacy")}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-2">
                <Pill className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Order Medicines</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 hover:bg-primary/5 hover:border-primary flex flex-col"
              onClick={() => navigate("/ai-assistant")}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-2">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Ask AI Assistant</span>
            </Button>
          </div>
        </section>

        {/* Health Metrics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Health Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardMetricCard
              icon={<FileText className="h-4 w-4" />}
              title="Health Records"
              value="12"
              description="Last updated 3 days ago"
            />
            <DashboardMetricCard
              icon={<Calendar className="h-4 w-4" />}
              title="Upcoming Appointments"
              value="2"
              description="Next: Tomorrow at 10:00 AM"
            />
            <DashboardMetricCard
              icon={<Pill className="h-4 w-4" />}
              title="Active Medications"
              value="3"
              description="Refill needed for 1"
            />
            <DashboardMetricCard
              icon={<FirstAid className="h-4 w-4" />}
              title="Home Care Sessions"
              value="5"
              description="Completed this month"
              trend={{ value: 20, isPositive: true }}
            />
          </div>
        </section>
        
        {/* Upcoming Activities */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Activities</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Doctor Appointment</CardTitle>
                <CardDescription>Video Consultation with Dr. Sharma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Tomorrow, 10:00 AM</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  Join Video Call
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Lab Test Results</CardTitle>
                <CardDescription>Blood Work Results Expected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">In 2 days</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  Set Reminder
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        {/* Recent Orders */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="h-10 px-4 text-left font-medium">Order ID</th>
                  <th className="h-10 px-4 text-left font-medium">Type</th>
                  <th className="h-10 px-4 text-left font-medium">Date</th>
                  <th className="h-10 px-4 text-left font-medium">Status</th>
                  <th className="h-10 px-4 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 align-middle">#MED-2023-001</td>
                  <td className="p-4 align-middle">Medication</td>
                  <td className="p-4 align-middle">May 2, 2023</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Delivered
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 align-middle">#HMC-2023-014</td>
                  <td className="p-4 align-middle">Home Care</td>
                  <td className="p-4 align-middle">May 1, 2023</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Completed
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 align-middle">#MED-2023-002</td>
                  <td className="p-4 align-middle">Medication</td>
                  <td className="p-4 align-middle">Apr 28, 2023</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      In Transit
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <Button variant="ghost" size="sm">
                      Track
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
