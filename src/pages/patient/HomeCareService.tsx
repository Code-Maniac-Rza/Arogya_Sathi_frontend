import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2, Clock, MapPin, Calendar, Share2, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlot {
    date: string;
    slots: string[];
}

const serviceAvailability: TimeSlot[] = [
    {
        date: "2025-06-20",
        slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    },
    {
        date: "2025-06-21",
        slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM", "04:30 PM"]
    },
    {
        date: "2025-06-22",
        slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    },
    {
        date: "2025-06-23",
        slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM", "04:30 PM"]
    },
    {
        date: "2025-06-24",
        slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    }
];

const services = [
    {
        id: "icu-setup-at-home",
        title: "ICU Setup at Home",
        description: "Professional ICU setup with advanced monitoring equipment and trained medical staff",
        icon: "Activity",
        rating: 4.9,
        reviews: 234,
        price: "₹15,000",
        duration: "24/7",
        image: "",
        location: "At Your Home",
        verified: true,
        patientStories: 234,
        services: [
            "Advanced Monitoring",
            "Ventilator Support",
            "Critical Care",
            "24/7 Medical Staff",
            "Emergency Response",
            "Equipment Setup",
            "Regular Health Checks"
        ],
        benefits: [
            "Professional ICU care at home",
            "Advanced medical equipment",
            "Trained medical staff",
            "24/7 monitoring",
            "Emergency support",
            "Family comfort",
            "Cost-effective"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Doctor's prescription",
            "Insurance details",
            "Adequate space",
            "Power backup",
            "Emergency contact"
        ]
    },
    {
        id: "specialized-nurse-at-home",
        title: "Specialized Nurse at Home",
        description: "Expert nursing care with specialized training for various medical conditions",
        icon: "Stethoscope",
        rating: 4.8,
        reviews: 567,
        price: "₹2,500",
        duration: "8 hours",
        image: "",
        location: "At Your Home",
        verified: true,
        patientStories: 567,
        services: [
            "Specialized Nursing Care",
            "Medication Management",
            "Wound Care",
            "Vital Signs Monitoring",
            "Health Assessment",
            "Patient Education",
            "Care Planning"
        ],
        benefits: [
            "Expert nursing care",
            "Personalized attention",
            "Professional monitoring",
            "Medication management",
            "Health education",
            "Comfort of home",
            "Family support"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Current medications",
            "Doctor's prescription",
            "Clean environment",
            "Basic medical supplies",
            "Emergency contact"
        ]
    },
    {
        id: "trained-attendant-at-home",
        title: "Trained Attendant at Home",
        description: "Professional care attendants for daily assistance and basic medical support",
        icon: "Bed",
        rating: 4.7,
        reviews: 789,
        price: "₹1,800",
        duration: "12 hours",
        image: "data:image/jpeg;base64,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",
        location: "At Your Home",
        verified: true,
        patientStories: 789,
        services: [
            "Daily Assistance",
            "Basic Medical Support",
            "Personal Care",
            "Mobility Support",
            "Medication Reminders",
            "Basic Health Monitoring",
            "Companionship"
        ],
        benefits: [
            "Professional care",
            "Daily assistance",
            "Basic medical support",
            "Personal attention",
            "Comfort of home",
            "Regular monitoring",
            "Family support"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Current medications",
            "Clean environment",
            "Basic medical supplies",
            "Comfortable space",
            "Emergency contact"
        ]
    },
    {
        id: "mother-child-care",
        title: "Mother & Child Care",
        description: "Specialized care for mothers and newborns with expert pediatric support",
        icon: "Baby",
        rating: 4.9,
        reviews: 456,
        price: "₹3,500",
        duration: "6 hours",
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=60",
        location: "At Your Home",
        verified: true,
        patientStories: 456,
        services: [
            "Newborn Care",
            "Mother Care",
            "Breastfeeding Support",
            "Postpartum Care",
            "Pediatric Support",
            "Nutrition Guidance",
            "Health Monitoring"
        ],
        benefits: [
            "Expert care for mother and child",
            "Professional support",
            "Comfort of home",
            "Personalized attention",
            "Regular monitoring",
            "Family education",
            "Emergency support"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Current medications",
            "Clean environment",
            "Comfortable space",
            "Basic supplies",
            "Emergency contact"
        ]
    },
    {
        id: "senior-care-subscription",
        title: "Senior Care Subscription",
        description: "Comprehensive care package for elderly with regular health monitoring",
        icon: "Heart",
        rating: 4.8,
        reviews: 345,
        price: "₹12,000",
        duration: "Monthly",
        image: "data:image/jpeg;base64,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",
        location: "At Your Home",
        verified: true,
        patientStories: 345,
        services: [
            "Regular Health Monitoring",
            "Medication Management",
            "Daily Assistance",
            "Mobility Support",
            "Nutrition Planning",
            "Social Engagement",
            "Emergency Response"
        ],
        benefits: [
            "Comprehensive care",
            "Regular monitoring",
            "Professional support",
            "Personal attention",
            "Family comfort",
            "Emergency support",
            "Cost-effective"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Current medications",
            "Clean environment",
            "Comfortable space",
            "Basic supplies",
            "Emergency contact"
        ]
    },
    {
        id: "travel-nurses",
        title: "Travel Nurses",
        description: "Professional nursing care during travel with medical equipment support",
        icon: "MapPin",
        rating: 4.7,
        reviews: 234,
        price: "₹4,500",
        duration: "Per Day",
        image: "data:image/jpeg;base64,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",
        location: "Travel Support",
        verified: true,
        patientStories: 234,
        services: [
            "Travel Medical Support",
            "Equipment Management",
            "Medication Administration",
            "Health Monitoring",
            "Emergency Response",
            "Travel Planning",
            "Documentation"
        ],
        benefits: [
            "Professional travel support",
            "Medical equipment",
            "Emergency care",
            "Travel assistance",
            "Documentation help",
            "Peace of mind",
            "Family support"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Current medications",
            "Travel details",
            "Insurance information",
            "Emergency contact",
            "Equipment list"
        ]
    },
    {
        id: "specialty-rehab-packages",
        title: "Specialty Rehab Packages",
        description: "Comprehensive rehabilitation programs for various medical conditions",
        icon: "Activity",
        rating: 4.8,
        reviews: 345,
        price: "₹8,000",
        duration: "Weekly",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQklkab4PXUXYV-O1KibEKiRizfDc11zYQXjQ&s",
        location: "At Your Home",
        verified: true,
        patientStories: 345,
        services: [
            "Physical Therapy",
            "Occupational Therapy",
            "Speech Therapy",
            "Exercise Programs",
            "Progress Tracking",
            "Equipment Training",
            "Family Education"
        ],
        benefits: [
            "Professional rehabilitation",
            "Personalized programs",
            "Regular monitoring",
            "Family support",
            "Progress tracking",
            "Home-based care",
            "Expert guidance"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Current medications",
            "Doctor's prescription",
            "Adequate space",
            "Basic equipment",
            "Emergency contact"
        ]
    },
    {
        id: "doctor-home-consult",
        title: "Doctor Home Consult",
        description: "Expert medical consultation at your doorstep with comprehensive care",
        icon: "Stethoscope",
        rating: 4.9,
        reviews: 678,
        price: "₹2,000",
        duration: "60 mins",
        image: "data:image/jpeg;base64,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",
        location: "At Your Home",
        verified: true,
        patientStories: 678,
        services: [
            "Medical Consultation",
            "Health Assessment",
            "Treatment Planning",
            "Prescription Writing",
            "Follow-up Care",
            "Health Education",
            "Referral Services"
        ],
        benefits: [
            "Expert consultation",
            "Comprehensive care",
            "Convenient service",
            "Personal attention",
            "Detailed assessment",
            "Treatment planning",
            "Follow-up support"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Previous reports",
            "Current medications",
            "Clean environment",
            "Well-lit room",
            "Emergency contact"
        ]
    },
    {
        id: "physiotherapy-at-home",
        title: "Physiotherapy at Home",
        description: "Professional physiotherapy services for rehabilitation and recovery",
        icon: "Activity",
        rating: 4.8,
        reviews: 456,
        price: "₹1,500",
        duration: "45 mins",
        image: "data:image/jpeg;base64,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",
        location: "At Your Home",
        verified: true,
        patientStories: 456,
        services: [
            "Physical Assessment",
            "Exercise Therapy",
            "Manual Therapy",
            "Pain Management",
            "Mobility Training",
            "Posture Correction",
            "Home Exercise Program"
        ],
        benefits: [
            "Professional therapy",
            "Personalized treatment",
            "Convenient service",
            "Regular monitoring",
            "Progress tracking",
            "Home-based care",
            "Expert guidance"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Doctor's prescription",
            "Adequate space",
            "Comfortable clothing",
            "Basic equipment",
            "Emergency contact"
        ]
    },

    {
        id: "adult-vaccination",
        title: "Adult Vaccination",
        description: "Comprehensive vaccination services for adults with expert guidance",
        icon: "Injection",
        rating: 4.9,
        reviews: 567,
        price: "₹800",
        duration: "30 mins",
        image: "data:image/jpeg;base64,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",
        location: "At Your Home",
        verified: true,
        patientStories: 567,
        services: [
            "Vaccination Administration",
            "Health Assessment",
            "Vaccine Information",
            "Side Effect Monitoring",
            "Documentation",
            "Follow-up Care",
            "Travel Vaccines"
        ],
        benefits: [
            "Expert administration",
            "Safe procedures",
            "Comprehensive care",
            "Regular monitoring",
            "Documentation",
            "Travel support",
            "Family education"
        ],
        requirements: [
            "Valid ID proof",
            "Medical history",
            "Allergy information",
            "Clean environment",
            "Well-lit area",
            "Comfortable seating",
            "Emergency contact"
        ]
    },
    {
        id: "prescribed-medicine-delivery",
        title: "Prescribed Medicine Delivery",
        description: "Timely delivery of prescribed medications to your doorstep",
        icon: "Pill",
        rating: 4.8,
        reviews: 890,
        price: "₹100",
        duration: "Same Day",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Zh31dYn5AwzrrU_8SJ84a4UpRLzkeKE1dw&s",
        location: "At Your Home",
        verified: true,
        patientStories: 890,
        services: [
            "Medicine Delivery",
            "Prescription Verification",
            "Storage Guidance",
            "Usage Instructions",
            "Side Effect Information",
            "Refill Reminders",
            "Emergency Delivery"
        ],
        benefits: [
            "Timely delivery",
            "Verified medications",
            "Expert guidance",
            "Storage support",
            "Usage assistance",
            "Refill reminders",
            "Emergency service"
        ],
        requirements: [
            "Valid ID proof",
            "Valid prescription",
            "Payment details",
            "Delivery address",
            "Contact number",
            "Storage space",
            "Emergency contact"
        ]
    },
    {
        id: "home-diagnostics",
        title: "Home Diagnostics",
        description: "Comprehensive diagnostic tests performed at your home",
        icon: "Microscope",
        rating: 4.7,
        reviews: 456,
        price: "₹1,500",
        duration: "2 hours",
        image: "data:image/jpeg;base64,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",
        location: "At Your Home",
        verified: true,
        patientStories: 456,
        services: [
            "Blood Tests",
            "Urine Tests",
            "ECG",
            "X-ray Services",
            "Sample Collection",
            "Report Delivery",
            "Doctor Consultation"
        ],
        benefits: [
            "Comprehensive testing",
            "Home convenience",
            "Expert collection",
            "Quick results",
            "Online reports",
            "Doctor support",
            "Follow-up care"
        ],
        requirements: [
            "Valid ID proof",
            "Doctor's prescription",
            "Fasting (if required)",
            "Clean environment",
            "Well-lit area",
            "Comfortable space",
            "Emergency contact"
        ]
    }
];

export default function HomeCareService() {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const service = services.find((s) => s.id === serviceId);

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("info");
    const [bookingSuccess, setBookingSuccess] = useState(false);

    if (!service) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-screen"
            >
                <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </motion.div>
        );
    }

    const getAvailableSlots = (date: Date | undefined) => {
        if (!date) return [];
        const dateStr = format(date, "yyyy-MM-dd");
        const dayAvailability = serviceAvailability.find(d => d.date === dateStr);
        return dayAvailability?.slots || [];
    };

    const handleBook = () => {
        if (selectedSlot) {
            setBookingSuccess(true);
            // Add API call for booking here if needed
        }
    };

    return (
        <div className="min-h-screen flex">
            <DashboardSidebar isCollapsed={false} toggleCollapsed={() => { }} />
            <div className="flex-1 flex flex-col">
                <DashboardHeader toggleSidebar={() => { }} />
                <div className="container mx-auto py-8 flex-1">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="mb-6">
                            <CardContent className="flex flex-col md:flex-row gap-6 py-6">
                                <motion.div
                                    className="flex-shrink-0"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-32 h-32 rounded-lg object-cover border"
                                    />
                                </motion.div>
                                <motion.div
                                    className="flex-1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-2xl font-bold">{service.title}</h1>
                                                {service.verified && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                            </div>
                                            <div className="text-md text-muted-foreground">{service.description}</div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                                                    <Star className="h-4 w-4 fill-yellow-400" />
                                                    {service.rating}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    ({service.reviews} reviews)
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4" />
                                                {service.duration}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                {service.location}
                                            </div>
                                        </div>
                                        <motion.div
                                            className="flex gap-2 mt-4 md:mt-0"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.4 }}
                                        >
                                            <Button variant="outline" size="icon">
                                                <Share2 className="h-5 w-5" />
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <MessageSquare className="h-5 w-5" />
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Booking & Pricing Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="mb-6">
                            <CardContent className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 py-6">
                                <motion.div
                                    className="flex-1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <div className="text-lg font-semibold">Service Fee: <span className="font-normal text-primary">{service.price}</span></div>
                                    <div className="text-md mt-1">Duration: <span className="font-semibold">{service.duration}</span></div>
                                    <div className="text-sm text-muted-foreground mt-1">Patient Stories: {service.patientStories}</div>
                                </motion.div>

                                <motion.div
                                    className="flex-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">Select Date</h3>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !selectedDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={setSelectedDate}
                                                    disabled={(date) => {
                                                        const today = new Date();
                                                        today.setHours(0, 0, 0, 0);
                                                        const dateStr = format(date, "yyyy-MM-dd");
                                                        return date < today || !serviceAvailability.some(d => d.date === dateStr);
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <AnimatePresence>
                                        {selectedDate && (
                                            <motion.div
                                                className="mb-4"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <h3 className="font-medium mb-2">Available Slots</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {getAvailableSlots(selectedDate).length > 0 ? (
                                                        getAvailableSlots(selectedDate).map((slot, index) => (
                                                            <motion.div
                                                                key={slot}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                                            >
                                                                <Button
                                                                    variant={selectedSlot === slot ? "default" : "outline"}
                                                                    size="sm"
                                                                    className="text-xs"
                                                                    onClick={() => setSelectedSlot(slot)}
                                                                >
                                                                    {slot}
                                                                </Button>
                                                            </motion.div>
                                                        ))
                                                    ) : (
                                                        <motion.p
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="text-sm text-muted-foreground"
                                                        >
                                                            No slots available for this date
                                                        </motion.p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <motion.div
                                    className="flex-1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <Button
                                        className="w-full"
                                        disabled={!selectedDate || !selectedSlot}
                                        onClick={handleBook}
                                    >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {bookingSuccess ? "Booked!" : "Book Home Care Service"}
                                    </Button>
                                    <AnimatePresence>
                                        {bookingSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="mt-2 text-green-600 text-center font-medium"
                                            >
                                                Your service is booked for {format(selectedDate!, "PPP")} at {selectedSlot}!
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Tabs for Info, Services, Benefits, Requirements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="info">Info</TabsTrigger>
                                <TabsTrigger value="services">Services</TabsTrigger>
                                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                            </TabsList>

                            <TabsContent value="info">
                                <Card>
                                    <CardContent className="pt-6">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                        >
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="font-medium mb-2">Service Description</h3>
                                                    <p className="text-muted-foreground">{service.description}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium mb-2">Location</h3>
                                                    <p className="text-muted-foreground">{service.location}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium mb-2">Duration</h3>
                                                    <p className="text-muted-foreground">{service.duration}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium mb-2">Price</h3>
                                                    <p className="text-muted-foreground">{service.price}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="services">
                                <Card>
                                    <CardContent className="pt-6">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                        >
                                            <div className="space-y-4">
                                                <h3 className="font-medium mb-2">Included Services</h3>
                                                <ul className="space-y-2">
                                                    {service.services.map((item, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                            <span>{item}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="benefits">
                                <Card>
                                    <CardContent className="pt-6">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                        >
                                            <div className="space-y-4">
                                                <h3 className="font-medium mb-2">Service Benefits</h3>
                                                <ul className="space-y-2">
                                                    {service.benefits.map((item, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                            <span>{item}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="requirements">
                                <Card>
                                    <CardContent className="pt-6">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                        >
                                            <div className="space-y-4">
                                                <h3 className="font-medium mb-2">Service Requirements</h3>
                                                <ul className="space-y-2">
                                                    {service.requirements.map((item, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                            <span>{item}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 