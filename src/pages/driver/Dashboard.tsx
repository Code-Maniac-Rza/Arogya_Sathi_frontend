
import { useState } from "react";
import { Ambulance, Calendar, Clock, MapPin, User } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardMetricCard } from "@/components/DashboardMetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { MockMap } from "@/components/MockMap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock booking data
const pendingBookings = [
  { 
    id: "AMB-2023-001", 
    patientName: "Amit Sharma",
    pickupLocation: "123 Main Street, Pune",
    destination: "City Hospital, Pune",
    distance: "5.2 km",
    emergencyType: "Medical Emergency",
    timestamp: "Just now"
  },
  { 
    id: "AMB-2023-002", 
    patientName: "Priya Patel",
    pickupLocation: "45 Park Avenue, Pune",
    destination: "Wellness Hospital, Pune",
    distance: "3.8 km",
    emergencyType: "Accident",
    timestamp: "2 min ago"
  }
];

export default function DriverDashboard() {
  const { currentUser } = useAuth();
  const [driverStatus, setDriverStatus] = useState<"online" | "offline">("online");
  const [currentBooking, setCurrentBooking] = useState<typeof pendingBookings[0] | null>(null);
  const [bookingStatus, setBookingStatus] = useState<"accepted" | "on_way" | "arrived" | "in_progress" | "completed" | null>(null);
  const { toast } = useToast();

  // Accept a booking
  const handleAcceptBooking = (booking: typeof pendingBookings[0]) => {
    setCurrentBooking(booking);
    setBookingStatus("accepted");
    toast({
      title: "Booking Accepted",
      description: `You have accepted booking ${booking.id}`,
    });
  };

  // Update booking status
  const handleUpdateStatus = (status: "on_way" | "arrived" | "in_progress" | "completed") => {
    setBookingStatus(status);
    
    // Status-specific notifications
    switch(status) {
      case "on_way":
        toast({
          title: "Status Updated",
          description: "You're on the way to pickup location",
        });
        break;
      case "arrived":
        toast({
          title: "Status Updated",
          description: "You've arrived at the pickup location",
        });
        break;
      case "in_progress":
        toast({
          title: "Trip Started",
          description: "You're on the way to the destination",
        });
        break;
      case "completed":
        toast({
          title: "Trip Completed",
          description: "You've completed the trip successfully",
        });
        // Reset after a delay
        setTimeout(() => {
          setCurrentBooking(null);
          setBookingStatus(null);
        }, 5000);
        break;
    }
  };

  // Toggle driver availability status
  const handleStatusChange = (status: boolean) => {
    setDriverStatus(status ? "online" : "offline");
    toast({
      title: `You are now ${status ? 'Online' : 'Offline'}`,
      description: `${status ? 'You can now receive bookings' : 'You will not receive any new bookings'}`,
    });
  };

  return (
    <DashboardLayout requiredRole="driver">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Driver Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {currentUser?.name}</p>
          </div>
          
          <Card>
            <CardContent className="py-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${driverStatus === "online" ? "bg-green-500" : "bg-gray-300"}`}></div>
                <span>{driverStatus === "online" ? "Online" : "Offline"}</span>
              </div>
              <Switch 
                checked={driverStatus === "online"} 
                onCheckedChange={handleStatusChange}
                id="availability"
              />
            </CardContent>
          </Card>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardMetricCard
            icon={<Calendar className="h-4 w-4" />}
            title="Today's Trips"
            value="5"
            description="2 more than yesterday"
            trend={{ value: 40, isPositive: true }}
          />
          <DashboardMetricCard
            icon={<MapPin className="h-4 w-4" />}
            title="Distance Covered"
            value="43.5 km"
            description="Today"
          />
          <DashboardMetricCard
            icon={<User className="h-4 w-4" />}
            title="Passengers Served"
            value="8"
            description="Today"
          />
          <DashboardMetricCard
            icon={<Clock className="h-4 w-4" />}
            title="Average Response"
            value="4.2 min"
            description="Last 7 days"
            trend={{ value: 12, isPositive: false }}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Column */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Live Location</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <MockMap className="h-[400px]" />
                {currentBooking && (
                  <div className="p-4 border-t bg-muted/30">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Current Trip: {currentBooking.id}</h3>
                      <Select 
                        value={bookingStatus || ""} 
                        onValueChange={(val) => {
                          if (val === "on_way" || val === "arrived" || val === "in_progress" || val === "completed") {
                            handleUpdateStatus(val);
                          }
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="accepted" disabled={bookingStatus !== "accepted"}>Accepted</SelectItem>
                          <SelectItem value="on_way" disabled={bookingStatus !== "accepted"}>On the Way</SelectItem>
                          <SelectItem value="arrived" disabled={bookingStatus !== "on_way"}>Arrived</SelectItem>
                          <SelectItem value="in_progress" disabled={bookingStatus !== "arrived"}>Trip Started</SelectItem>
                          <SelectItem value="completed" disabled={bookingStatus !== "in_progress"}>Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Pickup Location</p>
                        <p className="text-sm text-muted-foreground">{currentBooking.pickupLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Destination</p>
                        <p className="text-sm text-muted-foreground">{currentBooking.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Patient Name</p>
                        <p className="text-sm text-muted-foreground">{currentBooking.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Emergency Type</p>
                        <p className="text-sm text-muted-foreground">{currentBooking.emergencyType}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Status & Request Column */}
          <div className="lg:col-span-1 space-y-6">
            {!currentBooking && driverStatus === "online" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ambulance className="h-5 w-5" />
                    Pending Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {pendingBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{booking.id}</h4>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              {booking.timestamp}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Pickup Location</p>
                              <p className="text-sm">{booking.pickupLocation}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Distance</p>
                              <p className="text-sm">{booking.distance}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Emergency Type</p>
                              <p className="text-sm">{booking.emergencyType}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Request Rejected",
                                  description: `You have rejected booking ${booking.id}`,
                                });
                              }}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-medical-primary hover:bg-medical-primary/90"
                              onClick={() => handleAcceptBooking(booking)}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No pending requests</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {driverStatus === "offline" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">You're Currently Offline</h3>
                    <p className="text-muted-foreground">Go online to receive trip requests</p>
                    <Button 
                      onClick={() => handleStatusChange(true)}
                      className="bg-medical-primary hover:bg-medical-primary/90"
                    >
                      Go Online
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Online Hours</p>
                      <p className="text-xl font-semibold">6.5 hrs</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Earnings</p>
                      <p className="text-xl font-semibold">₹2,450</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Acceptance Rate</p>
                      <p className="text-xl font-semibold">92%</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="text-xl font-semibold">4.8 <span className="text-xs font-normal text-muted-foreground">/ 5</span></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-medical-primary pl-4 py-1">
                    <p className="text-sm font-medium">Trip Completed</p>
                    <p className="text-xs text-muted-foreground">Today, 10:45 AM</p>
                  </div>
                  <div className="border-l-2 border-medical-primary pl-4 py-1">
                    <p className="text-sm font-medium">Trip Started</p>
                    <p className="text-xs text-muted-foreground">Today, 10:20 AM</p>
                  </div>
                  <div className="border-l-2 border-medical-primary pl-4 py-1">
                    <p className="text-sm font-medium">Booking Accepted</p>
                    <p className="text-xs text-muted-foreground">Today, 10:05 AM</p>
                  </div>
                  <div className="border-l-2 border-gray-300 pl-4 py-1">
                    <p className="text-sm font-medium">Went Online</p>
                    <p className="text-xs text-muted-foreground">Today, 09:30 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
