
import { CalendarDays, FileText, MapPin, Medkit, Pill, Users } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardMetricCard } from "@/components/DashboardMetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MockMap } from "@/components/MockMap";

// Mock data for active ambulances
const activeAmbulances = [
  { id: "AMB-001", driver: "Rajesh Kumar", status: "On Trip", location: "Koregaon Park" },
  { id: "AMB-002", driver: "Sunil Patil", status: "Available", location: "Kothrud" },
  { id: "AMB-003", driver: "Vikas Sharma", status: "On Trip", location: "Hinjewadi" },
  { id: "AMB-004", driver: "Priya Desai", status: "Available", location: "Baner" },
  { id: "AMB-005", driver: "Amit Joshi", status: "Offline", location: "Aundh" },
];

// Mock data for recent bookings
const recentBookings = [
  { id: "BK-2023-001", patient: "Rahul Mehta", service: "Ambulance", status: "In Progress", time: "10:30 AM" },
  { id: "BK-2023-002", patient: "Sunita Sharma", service: "Telemedicine", status: "Scheduled", time: "11:15 AM" },
  { id: "BK-2023-003", patient: "Arjun Kapoor", service: "Pharmacy", status: "Delivered", time: "09:45 AM" },
  { id: "BK-2023-004", patient: "Divya Patel", service: "Home Care", status: "In Progress", time: "08:30 AM" },
  { id: "BK-2023-005", patient: "Mohan Singh", service: "Ambulance", status: "Completed", time: "Yesterday" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of all services and operations</p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <DashboardMetricCard
            icon={<Users className="h-4 w-4" />}
            title="Total Users"
            value="2,451"
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardMetricCard
            icon={<MapPin className="h-4 w-4" />}
            title="Ambulances"
            value="24"
            description="5 currently active"
          />
          <DashboardMetricCard
            icon={<CalendarDays className="h-4 w-4" />}
            title="Appointments"
            value="37"
            description="Today"
          />
          <DashboardMetricCard
            icon={<Pill className="h-4 w-4" />}
            title="Pharmacy Orders"
            value="19"
            description="Pending"
          />
          <DashboardMetricCard
            icon={<Medkit className="h-4 w-4" />}
            title="Home Care"
            value="12"
            description="Active"
          />
          <DashboardMetricCard
            icon={<FileText className="h-4 w-4" />}
            title="Records"
            value="1,283"
            description="Total"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Map Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Live Ambulances</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ambulances</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="on-trip">On Trip</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>
                  Real-time location of all ambulances
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MockMap className="h-[400px]" />
              </CardContent>
            </Card>
            
            {/* Recent Bookings Table */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Bookings</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="ambulance">Ambulance</SelectItem>
                      <SelectItem value="telemedicine">Telemedicine</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="homecare">Home Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.patient}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'In Progress' 
                              ? 'bg-blue-100 text-blue-800' 
                              : booking.status === 'Scheduled'
                                ? 'bg-yellow-100 text-yellow-800'
                                : booking.status === 'Completed' || booking.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Active Ambulances & Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Ambulances</CardTitle>
                <CardDescription>Status of all ambulances in the fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeAmbulances.map((ambulance) => (
                    <div key={ambulance.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{ambulance.driver}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{ambulance.id}</span>
                          <span>•</span>
                          <span>{ambulance.location}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ambulance.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : ambulance.status === 'On Trip'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ambulance.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Status</span>
                      <span className="text-green-600 font-medium text-sm">Operational</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Load</span>
                      <span className="text-yellow-600 font-medium text-sm">Moderate</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Performance</span>
                      <span className="text-green-600 font-medium text-sm">Excellent</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Reassign Ambulances
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Manage Doctor Schedule
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Reports
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    User Management
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
