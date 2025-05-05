
import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Phone, Timer, User } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MockMap } from "@/components/MockMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Define ambulance booking status
type BookingStatus = "idle" | "searching" | "assigned" | "on_way" | "arrived" | "in_progress" | "completed" | "cancelled";

export default function EmergencyAmbulance() {
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");
  const [pickupLocation, setPickupLocation] = useState("");
  const [emergencyType, setEmergencyType] = useState("medical");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();

  // Driver info (mock data)
  const driverInfo = {
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    ambulanceNumber: "MH 12 AB 1234",
    eta: "8 minutes",
  };

  // Handle form submission
  const handleBookAmbulance = () => {
    if (!pickupLocation) {
      toast({
        title: "Error",
        description: "Please enter your pickup location",
        variant: "destructive",
      });
      return;
    }

    setBookingStatus("searching");
    
    // Mock the assignment process
    setTimeout(() => {
      setBookingStatus("assigned");
      toast({
        title: "Ambulance Assigned",
        description: `Driver ${driverInfo.name} has been assigned to your request`,
      });
      
      // Simulate driver on the way after some time
      setTimeout(() => {
        setBookingStatus("on_way");
        toast({
          title: "Driver is on the way",
          description: `ETA: ${driverInfo.eta}`,
        });
        
        // Simulate driver arrival
        setTimeout(() => {
          setBookingStatus("arrived");
          toast({
            title: "Ambulance has arrived",
            description: "Your ambulance has reached your location",
          });
          
          // Simulate trip start
          setTimeout(() => {
            setBookingStatus("in_progress");
            toast({
              title: "Trip started",
              description: "You are on the way to the hospital",
            });
            
            // Simulate trip completion
            setTimeout(() => {
              setBookingStatus("completed");
              toast({
                title: "Trip completed",
                description: "You have reached your destination",
              });
            }, 15000); // 15 seconds for trip completion
          }, 8000); // 8 seconds for trip start
        }, 12000); // 12 seconds for driver arrival
      }, 10000); // 10 seconds for driver on the way
    }, 5000); // 5 seconds for driver assignment
  };

  // Handle cancellation
  const handleCancelBooking = () => {
    // Only allow cancellation before the ambulance arrives
    if (["searching", "assigned", "on_way"].includes(bookingStatus)) {
      setBookingStatus("cancelled");
      toast({
        title: "Booking cancelled",
        description: "Your ambulance booking has been cancelled",
      });
      
      // Reset form after a delay
      setTimeout(() => {
        setBookingStatus("idle");
      }, 3000);
    }
  };

  // Reset booking
  const handleResetBooking = () => {
    setBookingStatus("idle");
    setPickupLocation("");
    setEmergencyType("medical");
    setAdditionalInfo("");
    setTimer(0);
  };

  // Timer for tracking request duration
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (["searching", "assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus)) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bookingStatus]);

  // Format timer display
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <DashboardLayout requiredRole="patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Emergency Ambulance</h1>
          <p className="text-muted-foreground">Book an ambulance for immediate medical transport</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Booking form or status */}
          <div className="lg:col-span-1 space-y-6">
            {bookingStatus === "idle" ? (
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <Input
                        id="pickup"
                        placeholder="Enter your current address"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergency-type">Emergency Type</Label>
                      <Select
                        value={emergencyType}
                        onValueChange={setEmergencyType}
                      >
                        <SelectTrigger id="emergency-type">
                          <SelectValue placeholder="Select emergency type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">Medical Emergency</SelectItem>
                          <SelectItem value="accident">Accident</SelectItem>
                          <SelectItem value="cardiac">Cardiac</SelectItem>
                          <SelectItem value="pregnancy">Pregnancy</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="additional-info">Additional Information</Label>
                      <Input
                        id="additional-info"
                        placeholder="Any specific details about the emergency"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      className="w-full bg-medical-primary hover:bg-medical-primary/90"
                      onClick={handleBookAmbulance}
                    >
                      Book Ambulance Now
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Booking Status</h3>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{formatTime(timer)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          ["assigned", "on_way", "arrived", "in_progress", "completed"].includes(bookingStatus) 
                            ? "bg-green-500/20 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {["assigned", "on_way", "arrived", "in_progress", "completed"].includes(bookingStatus) 
                            ? <CheckCircle className="h-5 w-5" />
                            : "1"}
                        </div>
                        <div>
                          <p className="font-medium">Driver Assigned</p>
                          {["assigned", "on_way", "arrived", "in_progress", "completed"].includes(bookingStatus) && (
                            <p className="text-sm text-muted-foreground">Driver {driverInfo.name} has been assigned</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          ["on_way", "arrived", "in_progress", "completed"].includes(bookingStatus) 
                            ? "bg-green-500/20 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {["on_way", "arrived", "in_progress", "completed"].includes(bookingStatus) 
                            ? <CheckCircle className="h-5 w-5" />
                            : "2"}
                        </div>
                        <div>
                          <p className="font-medium">On the Way</p>
                          {["on_way"].includes(bookingStatus) && (
                            <p className="text-sm text-muted-foreground">ETA: {driverInfo.eta}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          ["arrived", "in_progress", "completed"].includes(bookingStatus) 
                            ? "bg-green-500/20 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {["arrived", "in_progress", "completed"].includes(bookingStatus) 
                            ? <CheckCircle className="h-5 w-5" />
                            : "3"}
                        </div>
                        <p className="font-medium">Arrived at Pickup</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          ["in_progress", "completed"].includes(bookingStatus) 
                            ? "bg-green-500/20 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {["in_progress", "completed"].includes(bookingStatus) 
                            ? <CheckCircle className="h-5 w-5" />
                            : "4"}
                        </div>
                        <p className="font-medium">Trip Started</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          bookingStatus === "completed" 
                            ? "bg-green-500/20 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {bookingStatus === "completed" 
                            ? <CheckCircle className="h-5 w-5" />
                            : "5"}
                        </div>
                        <p className="font-medium">Trip Completed</p>
                      </div>
                    </div>
                    
                    {bookingStatus === "cancelled" && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">Booking Cancelled</p>
                          <p className="text-sm text-red-700">Your ambulance booking has been cancelled.</p>
                        </div>
                      </div>
                    )}
                    
                    {bookingStatus === "completed" ? (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleResetBooking}
                        className="w-full"
                      >
                        Book Another Ambulance
                      </Button>
                    ) : (
                      <Button 
                        type="button" 
                        variant={["searching", "assigned", "on_way"].includes(bookingStatus) ? "destructive" : "outline"}
                        onClick={["searching", "assigned", "on_way"].includes(bookingStatus) ? handleCancelBooking : handleResetBooking}
                        className="w-full"
                        disabled={["searching"].includes(bookingStatus)}
                      >
                        {["searching", "assigned", "on_way"].includes(bookingStatus) ? "Cancel Booking" : "Reset"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Driver Info Card */}
            {["assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus) && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Driver Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{driverInfo.name}</p>
                        <p className="text-sm text-muted-foreground">Ambulance Driver</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3">
                        <p className="text-xs text-muted-foreground">Ambulance Number</p>
                        <p className="font-medium">{driverInfo.ambulanceNumber}</p>
                      </div>
                      <div className="border rounded-md p-3">
                        <p className="text-xs text-muted-foreground">ETA</p>
                        <p className="font-medium">{driverInfo.eta}</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Driver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Right column - Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Live Location Tracking</h3>
                </div>
                <MockMap 
                  className="h-[500px]" 
                  showDriverLocation={["assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus)}
                  isMoving={bookingStatus === "on_way"}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
