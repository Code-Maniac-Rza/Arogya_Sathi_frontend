import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Phone, Timer, User, MapPin, Search, Hospital, Clock, DollarSign, MessageSquare, Sparkles, ArrowLeft, XCircle, Stethoscope, Heart, Ambulance, Baby, Users, Truck } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Define ambulance booking status
type BookingStatus = "idle" | "searching" | "assigned" | "on_way" | "arrived" | "in_progress" | "completed" | "cancelled";

// Define booking flow steps
type BookingStep = "location" | "hospital" | "ambulance" | "confirmation";

// Mock hospital data
const mockHospitals = [
  { id: 1, name: "City General Hospital", distance: "2.5 km", eta: "8 min", rating: 4.5, ambulanceNumber: "MH 12 AB 1234" },
  { id: 2, name: "Medicare Speciality Hospital", distance: "3.1 km", eta: "10 min", rating: 4.8, ambulanceNumber: "MH 12 AB 1235" },
  { id: 3, name: "Life Care Hospital", distance: "4.2 km", eta: "12 min", rating: 4.2, ambulanceNumber: "MH 12 AB 1236" },
];

// Mock driver data
const mockDrivers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    experience: "8 years",
    rating: 4.8,
    totalRides: 1250,
    vehicleType: "Advanced Life Support",
    licenseNumber: "DL-12345678",
    phoneNumber: "+91 98765 43210",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Priya Sharma",
    experience: "5 years",
    rating: 4.9,
    totalRides: 850,
    vehicleType: "Cardiac Ambulance",
    licenseNumber: "DL-87654321",
    phoneNumber: "+91 98765 43211",
    photo: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Amit Patel",
    experience: "3 years",
    rating: 4.7,
    totalRides: 450,
    vehicleType: "Basic Ambulance",
    licenseNumber: "DL-23456789",
    phoneNumber: "+91 98765 43212",
    photo: "https://i.pravatar.cc/150?img=3",
  },
];

// Mock ambulance types with pricing
const ambulanceTypes = [
  {
    id: "basic",
    name: "Basic Ambulance",
    description: "Standard medical transport with basic life support equipment",
    basePrice: 500,
    pricePerKm: 20,
    features: ["Basic Life Support", "Oxygen Supply", "First Aid Kit"],
    icon: Ambulance,
  },
  {
    id: "advanced",
    name: "Advanced Life Support",
    description: "Equipped with advanced medical equipment and trained paramedics",
    basePrice: 1000,
    pricePerKm: 40,
    features: ["Advanced Life Support", "ECG Monitoring", "Ventilator", "Trained Paramedics"],
    icon: Stethoscope,
  },
  {
    id: "cardiac",
    name: "Cardiac Ambulance",
    description: "Specialized for cardiac emergencies with ECG monitoring",
    basePrice: 1500,
    pricePerKm: 50,
    features: ["Cardiac Monitoring", "Defibrillator", "Cardiac Specialist", "Advanced Life Support"],
    icon: Heart,
  },
  {
    id: "neonatal",
    name: "Neonatal Ambulance",
    description: "Specialized transport for newborns and infants requiring intensive care",
    basePrice: 2000,
    pricePerKm: 60,
    features: ["Incubator", "Oxygen Supply", "Neonatal Resuscitation", "Pediatric Team"],
    icon: Baby,
  },
  {
    id: "ptv",
    name: "Patient Transport Vehicle",
    description: "Non-emergency medical transport for patient transfers and checkups",
    basePrice: 400,
    pricePerKm: 15,
    features: ["Stretcher", "Wheelchair Access", "Comfortable Seating", "Basic Medical Support"],
    icon: Users,
  },
  {
    id: "mortuary",
    name: "Mortuary Ambulance",
    description: "Specialized vehicle for transporting deceased individuals",
    basePrice: 800,
    pricePerKm: 25,
    features: ["Body Freezer Box", "Stretcher", "Dignified Transport", "Professional Staff"],
    icon: Truck,
  },
];

export default function EmergencyAmbulance() {
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");
  const [currentStep, setCurrentStep] = useState<BookingStep>("location");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [selectedAmbulanceType, setSelectedAmbulanceType] = useState<string>("");
  const [showHospitalSuggestions, setShowHospitalSuggestions] = useState(false);
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([]);

  // Handle back navigation
  const handleBack = () => {
    switch (currentStep) {
      case "hospital":
        setCurrentStep("location");
        setShowHospitalSuggestions(false);
        break;
      case "ambulance":
        if (showHospitalSuggestions) {
          setCurrentStep("hospital");
        } else {
          setCurrentStep("location");
        }
        break;
      case "confirmation":
        setCurrentStep("ambulance");
        break;
      default:
        break;
    }
  };

  // Calculate estimated price based on distance and ambulance type
  const calculatePrice = (distance: number, ambulanceType: string) => {
    const type = ambulanceTypes.find(t => t.id === ambulanceType);
    if (!type) return 0;
    return type.basePrice + (distance * type.pricePerKm);
  };

  // Handle location submission
  const handleLocationSubmit = () => {
    if (!pickupLocation || !dropLocation) {
      toast({
        title: "Error",
        description: "Please enter both pickup and drop locations",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep("ambulance");
  };

  // Handle hospital selection
  const handleHospitalSelect = (hospitalId: number) => {
    setSelectedHospital(hospitalId);
    setDropLocation(mockHospitals.find(h => h.id === hospitalId)?.name || dropLocation);
    setCurrentStep("ambulance");
  };

  // Handle ambulance type selection
  const handleAmbulanceSelect = (type: string) => {
    setSelectedAmbulanceType(type);
    setCurrentStep("confirmation");
  };

  // Handle final booking
  const handleBookAmbulance = () => {
    if (!selectedAmbulanceType) {
      toast({
        title: "Error",
        description: "Please select an ambulance type",
        variant: "destructive",
      });
      return;
    }

    setBookingStatus("searching");
    setTimer(0); // Reset timer when booking starts
    const timeouts: NodeJS.Timeout[] = [];

    // Mock the assignment process
    const assignmentTimeout = setTimeout(() => {
      setBookingStatus("assigned");
      toast({
        title: "Ambulance Assigned",
        description: "An ambulance has been assigned to your request",
      });

      // Simulate driver on the way after some time
      const onWayTimeout = setTimeout(() => {
        setBookingStatus("on_way");
        toast({
          title: "Driver is on the way",
          description: `ETA: ${mockHospitals.find(h => h.id === selectedHospital)?.eta}`,
        });

        // Simulate driver arrival
        const arrivalTimeout = setTimeout(() => {
          setBookingStatus("arrived");
          toast({
            title: "Ambulance has arrived",
            description: "Your ambulance has reached your location",
          });

          // Simulate trip start
          const tripStartTimeout = setTimeout(() => {
            setBookingStatus("in_progress");
            toast({
              title: "Trip started",
              description: "You are on the way to the hospital",
            });

            // Simulate trip completion
            const tripCompleteTimeout = setTimeout(() => {
              setBookingStatus("completed");
              toast({
                title: "Trip completed",
                description: "You have reached your destination",
              });
            }, 15000); // 15 seconds for trip completion
            timeouts.push(tripCompleteTimeout);
          }, 8000); // 8 seconds for trip start
          timeouts.push(tripStartTimeout);
        }, 12000); // 12 seconds for driver arrival
        timeouts.push(arrivalTimeout);
      }, 10000); // 10 seconds for driver on the way
      timeouts.push(onWayTimeout);
    }, 5000); // 5 seconds for driver assignment
    timeouts.push(assignmentTimeout);

    setTimeoutIds(timeouts);
  };

  // Handle booking cancellation
  const handleCancelBooking = () => {
    // Clear all timeouts
    timeoutIds.forEach(timeout => clearTimeout(timeout));
    setTimeoutIds([]);

    setBookingStatus("cancelled");
    toast({
      title: "Booking Cancelled",
      description: "Your ambulance booking has been cancelled successfully.",
      variant: "default",
    });

    // Reset all states and return to location selection
    setTimeout(() => {
      setBookingStatus("idle");
      setCurrentStep("location");
      setPickupLocation("");
      setDropLocation("");
      setSelectedHospital(null);
      setSelectedAmbulanceType("");
      setShowHospitalSuggestions(false);
      setTimer(0);
    }, 2000); // Show cancellation message for 2 seconds before resetting
  };

  // Timer for tracking request duration
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (["searching", "assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus)) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0); // Reset timer when booking is not active
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bookingStatus]);

  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => {
      timeoutIds.forEach(timeout => clearTimeout(timeout));
    };
  }, [timeoutIds]);

  // Format timer display
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <DashboardLayout requiredRole="patient">
      <div className="w-full px-6 py-6">
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Book an Ambulance</h1>
            <p className="text-muted-foreground text-sm">Get immediate medical assistance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left column - Booking form */}
            <div className={`${bookingStatus === "idle" ? "lg:col-span-12" : "lg:col-span-7"}`}>
              {bookingStatus === "idle" ? (
                <div className="space-y-6">
                  {/* Location Selection */}
                  {currentStep === "location" && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="pickup" className="text-sm font-medium">Pickup Location</Label>
                            <div className="relative w-full">
                              <Input
                                id="pickup"
                                placeholder="Enter your current location"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                className="h-14 pl-4 pr-10 w-full text-base"
                              />
                              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="drop" className="text-sm font-medium">Drop Location</Label>
                            <div className="relative w-full">
                              <Input
                                id="drop"
                                placeholder="Enter hospital or destination"
                                value={dropLocation}
                                onChange={(e) => setDropLocation(e.target.value)}
                                className="h-14 pl-4 pr-10 w-full text-base"
                              />
                              <Hospital className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>

                          <div className="flex flex-col gap-3">
                            <Button
                              className="w-full h-14 text-base"
                              onClick={handleLocationSubmit}
                            >
                              Continue to Ambulance Selection
                            </Button>

                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                              </div>
                              <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                  Or
                                </span>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              className="w-full h-14 text-base flex items-center justify-center gap-2"
                              onClick={() => {
                                setShowHospitalSuggestions(true);
                                setCurrentStep("hospital");
                              }}
                            >
                              <Sparkles className="h-5 w-5" />
                              View Nearby Hospitals
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Hospital Suggestions */}
                  {currentStep === "hospital" && showHospitalSuggestions && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Nearby Hospitals</h3>
                          <Button variant="ghost" size="sm" onClick={handleBack}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {mockHospitals.map((hospital) => (
                            <div
                              key={hospital.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedHospital === hospital.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                                }`}
                              onClick={() => handleHospitalSelect(hospital.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{hospital.name}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{hospital.eta}</span>
                                    <span className="text-sm text-muted-foreground">•</span>
                                    <span className="text-sm text-muted-foreground">{hospital.distance}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium">{hospital.rating}</span>
                                  <span className="text-yellow-500">★</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Ambulance Selection */}
                  {currentStep === "ambulance" && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Select Ambulance Type</h3>
                          <Button variant="ghost" size="sm" onClick={handleBack}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {ambulanceTypes.map((type) => (
                            <div
                              key={type.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedAmbulanceType === type.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                                }`}
                              onClick={() => handleAmbulanceSelect(type.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <type.icon className="h-6 w-6 text-primary" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{type.name}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {type.features.map((feature, index) => (
                                        <span
                                          key={index}
                                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                        >
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    ₹{calculatePrice(2.5, type.id)}
                                  </div>
                                  <div className="text-xs text-muted-foreground">estimated</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Booking Confirmation */}
                  {currentStep === "confirmation" && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Confirm Booking</h3>
                          <Button variant="ghost" size="sm" onClick={handleBack}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">From</span>
                            <span className="font-medium">{pickupLocation}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">To</span>
                            <span className="font-medium">
                              {selectedHospital
                                ? mockHospitals.find(h => h.id === selectedHospital)?.name
                                : dropLocation}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Ambulance Type</span>
                            <span className="font-medium">
                              {ambulanceTypes.find(t => t.id === selectedAmbulanceType)?.name}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t">
                            <span className="font-medium">Estimated Fare</span>
                            <span className="text-lg font-semibold">
                              ₹{calculatePrice(2.5, selectedAmbulanceType)}
                            </span>
                          </div>
                          <Button
                            className="w-full h-12"
                            onClick={handleBookAmbulance}
                          >
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
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
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${["assigned", "on_way", "arrived", "in_progress", "completed"].includes(bookingStatus)
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
                              <p className="text-sm text-muted-foreground">Driver {mockHospitals.find(h => h.id === selectedHospital)?.name} has been assigned</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${["on_way", "arrived", "in_progress", "completed"].includes(bookingStatus)
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
                              <p className="text-sm text-muted-foreground">ETA: {mockHospitals.find(h => h.id === selectedHospital)?.eta}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${["arrived", "in_progress", "completed"].includes(bookingStatus)
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
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${["in_progress", "completed"].includes(bookingStatus)
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
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStatus === "completed"
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

                      {bookingStatus === "completed" && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setBookingStatus("idle");
                            setCurrentStep("location");
                            setPickupLocation("");
                            setDropLocation("");
                            setSelectedHospital(null);
                            setSelectedAmbulanceType("");
                            setShowHospitalSuggestions(false);
                          }}
                          className="w-full"
                        >
                          Book Another Ambulance
                        </Button>
                      )}

                      {["assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus) && (
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Call Driver
                          </Button>
                          <Button variant="outline" className="flex-1 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" className="flex-1 flex items-center gap-2">
                                <XCircle className="h-4 w-4" />
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Ambulance Booking?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel this ambulance booking? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCancelBooking}>
                                  Yes, Cancel Booking
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Driver Info Card */}
              {["assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus) && (
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Driver Information</h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          <img
                            src={mockDrivers[selectedHospital ? selectedHospital - 1 : 0].photo}
                            alt="Driver"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-lg">{mockDrivers[selectedHospital ? selectedHospital - 1 : 0].name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < Math.floor(mockDrivers[selectedHospital ? selectedHospital - 1 : 0].rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">({mockDrivers[selectedHospital ? selectedHospital - 1 : 0].rating})</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{mockDrivers[selectedHospital ? selectedHospital - 1 : 0].experience} experience</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-md p-3">
                          <p className="text-xs text-muted-foreground">Ambulance Number</p>
                          <p className="font-medium">{mockHospitals.find(h => h.id === selectedHospital)?.ambulanceNumber}</p>
                        </div>
                        <div className="border rounded-md p-3">
                          <p className="text-xs text-muted-foreground">License Number</p>
                          <p className="font-medium">{mockDrivers[selectedHospital ? selectedHospital - 1 : 0].licenseNumber}</p>
                        </div>
                        <div className="border rounded-md p-3">
                          <p className="text-xs text-muted-foreground">Vehicle Type</p>
                          <p className="font-medium">{mockDrivers[selectedHospital ? selectedHospital - 1 : 0].vehicleType}</p>
                        </div>
                        <div className="border rounded-md p-3">
                          <p className="text-xs text-muted-foreground">Total Rides</p>
                          <p className="font-medium">{mockDrivers[selectedHospital ? selectedHospital - 1 : 0].totalRides}</p>
                        </div>
                      </div>

                      {["assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus) && (
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Call Driver
                          </Button>
                          <Button variant="outline" className="flex-1 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right column - Map */}
            {bookingStatus !== "idle" && (
              <div className="lg:col-span-5">
                <Card className="overflow-hidden border-0 shadow-sm h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="p-4 border-b bg-white/50 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {["searching", "assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus) ? (
                            <>
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              <h3 className="font-medium text-sm text-gray-900">Live Location Tracking</h3>
                            </>
                          ) : (
                            <h3 className="font-medium text-sm text-gray-900">Map View</h3>
                          )}
                        </div>
                        {["assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus) && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Timer className="h-4 w-4" />
                            <span>Last updated: {formatTime(timer)} ago</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <MockMap
                        className="h-full w-full"
                        showDriverLocation={["assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus)}
                        isMoving={bookingStatus === "on_way"}
                      />
                      {["assigned", "on_way", "arrived", "in_progress"].includes(bookingStatus) && (
                        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4 rounded-xl shadow-lg border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-sm text-gray-900">{mockHospitals.find(h => h.id === selectedHospital)?.name}</p>
                                <p className="text-xs text-gray-500">{mockHospitals.find(h => h.id === selectedHospital)?.ambulanceNumber}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="px-3 py-1.5 bg-blue-50 rounded-full">
                                <p className="text-xs font-medium text-blue-600">ETA: {mockHospitals.find(h => h.id === selectedHospital)?.eta}</p>
                              </div>
                              <Button size="icon" variant="outline" className="rounded-full border-gray-200">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}