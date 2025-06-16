import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2, Clock, MapPin, Video, Share2, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Calendar } from "@/components/ui/calendar";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy doctor data (expand or fetch as needed)
const doctors = [
    {
        id: "1",
        name: "Dr. Navya Chowdary",
        specialization: "Dermatologist",
        experience: "15 years",
        rating: 4.8,
        reviewCount: 22,
        image: "https://imagesx.practo.com/providers/dr-navya-chowdary-dermatologist-hyderabad-23d100f0-a2cd-446d-9cd0-e3d3bd57c883.jpg?i_type=t_70x70-2x-webp",
        location: "Madhapur, Hyderabad",
        clinic: "Sasha Luxe Dermatology and Cosmetic Surgery Centre",
        fee: 1000,
        verified: true,
        patientStories: 22,
        availability: ["10:00 AM", "2:00 PM", "4:00 PM"],
        registration: "TSMC 45678",
        qualifications: ["MBBS", "MD (Dermatology)", "Fellowship in Cosmetic Dermatology"],
        services: [
            "Skin Disease Treatment",
            "Hair Loss Treatment",
            "Acne Treatment",
            "Skin Rejuvenation",
            "Laser Hair Removal",
            "Anti-aging Treatments",
            "Cosmetic Procedures"
        ],
        education: [
            { degree: "MBBS", institution: "Osmania Medical College", year: "2008" },
            { degree: "MD (Dermatology)", institution: "Gandhi Medical College", year: "2012" },
            { degree: "Fellowship in Cosmetic Dermatology", institution: "American Academy of Dermatology", year: "2014" }
        ],
        patientReviews: [
            {
                id: "r1",
                name: "Rahul Sharma",
                verified: true,
                date: "May 2024",
                rating: 5,
                comment: "Excellent treatment for my acne. Dr. Navya is very knowledgeable and patient."
            },
            {
                id: "r2",
                name: "Priya Patel",
                verified: true,
                date: "April 2024",
                rating: 4,
                comment: "Great experience with hair loss treatment. Clinic is well-maintained."
            }
        ]
    },
    {
        id: "2",
        name: "Dr. Mithil B Ghushe",
        specialization: "General Physician",
        experience: "22 years",
        rating: 4.9,
        reviewCount: 44,
        image: "https://imagesx.practo.com/providers/dr-mithil-b-ghushe-general-physician-hyderabad-52eba9fe-4c7f-45c0-b054-41ccf282238f.jpg?i_type=t_70x70-2x-webp",
        location: "Hitech City, Hyderabad",
        clinic: "Medicover Hospitals - Hitech City",
        fee: 600,
        verified: true,
        patientStories: 44,
        availability: ["9:00 AM", "1:00 PM", "3:00 PM"],
        registration: "TSMC 34567",
        qualifications: ["MBBS", "MD (General Medicine)", "Diploma in Diabetology"],
        services: [
            "General Consultation",
            "Diabetes Management",
            "Hypertension Treatment",
            "Fever Treatment",
            "Preventive Health Checkup",
            "Chronic Disease Management",
            "Geriatric Care"
        ],
        education: [
            { degree: "MBBS", institution: "Gandhi Medical College", year: "2002" },
            { degree: "MD (General Medicine)", institution: "Osmania Medical College", year: "2006" },
            { degree: "Diploma in Diabetology", institution: "Royal College of Physicians", year: "2008" }
        ],
        patientReviews: [
            {
                id: "r1",
                name: "Suresh Kumar",
                verified: true,
                date: "May 2024",
                rating: 5,
                comment: "Very thorough in diagnosis and treatment. Highly recommended for diabetes management."
            },
            {
                id: "r2",
                name: "Meena Reddy",
                verified: true,
                date: "April 2024",
                rating: 5,
                comment: "Excellent doctor with great bedside manner. Takes time to explain everything."
            }
        ]
    },
    {
        id: "3",
        name: "Dr. Naveen Kumar Pothireddy",
        specialization: "General Physician",
        experience: "16 years",
        rating: 5.0,
        reviewCount: 102,
        image: "https://imagesx.practo.com/providers/dr-naveen-kumar-pothireddy-consultant-physician-hyderabad-096e839f-0bb4-4262-a030-a8ed742c2947.jpg?i_type=t_70x70-2x-webp",
        location: "Hitech City, Hyderabad",
        clinic: "Medicover Hospitals - Hitech City",
        fee: 600,
        verified: true,
        patientStories: 102,
        availability: ["11:00 AM", "3:00 PM", "5:00 PM"],
        registration: "TSMC 56789",
        qualifications: ["MBBS", "MD (General Medicine)", "Fellowship in Critical Care"],
        services: [
            "General Consultation",
            "Critical Care",
            "Emergency Medicine",
            "Fever Treatment",
            "Preventive Health Checkup",
            "Travel Medicine",
            "Vaccination"
        ],
        education: [
            { degree: "MBBS", institution: "Kakatiya Medical College", year: "2008" },
            { degree: "MD (General Medicine)", institution: "Osmania Medical College", year: "2012" },
            { degree: "Fellowship in Critical Care", institution: "Apollo Hospitals", year: "2014" }
        ],
        patientReviews: [
            {
                id: "r1",
                name: "Vikram Singh",
                verified: true,
                date: "May 2024",
                rating: 5,
                comment: "Best doctor I've ever consulted. Very professional and caring."
            },
            {
                id: "r2",
                name: "Anita Desai",
                verified: true,
                date: "April 2024",
                rating: 5,
                comment: "Excellent diagnosis and treatment. Very knowledgeable doctor."
            }
        ]
    },
    {
        id: "4",
        name: "Dr. Anilkumar Namburi",
        specialization: "General Physician",
        experience: "25 years",
        rating: 5.0,
        reviewCount: 1,
        image: "https://imagesx.practo.com/providers/dr-anilkumar-namburi-general-physician-hyderabad-baad5801-51a9-4450-8c59-b2ff60fa71aa.jpg?i_type=t_70x70-2x-webp",
        location: "Banjara Hills, Hyderabad",
        clinic: "Virinchi Hospitals",
        fee: 600,
        verified: true,
        patientStories: 1,
        availability: ["10:30 AM", "2:30 PM", "4:30 PM"],
        registration: "TSMC 23456",
        qualifications: ["MBBS", "MD (General Medicine)", "DM (Cardiology)"],
        services: [
            "General Consultation",
            "Cardiac Care",
            "Hypertension Management",
            "Diabetes Management",
            "Preventive Health Checkup",
            "Geriatric Care",
            "Chronic Disease Management"
        ],
        education: [
            { degree: "MBBS", institution: "Gandhi Medical College", year: "1999" },
            { degree: "MD (General Medicine)", institution: "Osmania Medical College", year: "2003" },
            { degree: "DM (Cardiology)", institution: "NIMS Hyderabad", year: "2006" }
        ],
        patientReviews: [
            {
                id: "r1",
                name: "Rajesh Kumar",
                verified: true,
                date: "May 2024",
                rating: 5,
                comment: "Very experienced doctor with excellent diagnostic skills."
            }
        ]
    },
    {
        id: "5",
        name: "Dr. Shiva Ramakrishna Konda",
        specialization: "General Practitioner",
        experience: "17 years",
        rating: 5.0,
        reviewCount: 1,
        image: "https://imagesx.practo.com/providers/dr-shiva-ramakrishna-konda-general-practitioner-hyderabad-85690561-ab55-477c-a0a3-066f2779a1fc.jpg?i_type=t_70x70-2x-webp",
        location: "Banjara Hills, Hyderabad",
        clinic: "Virinchi Hospitals",
        fee: 900,
        verified: true,
        patientStories: 1,
        availability: ["9:30 AM", "1:30 PM", "3:30 PM"],
        registration: "TSMC 67890",
        qualifications: ["MBBS", "MD (General Medicine)"],
        services: [
            "General Consultation",
            "Primary Care",
            "Health Checkup",
            "Disease Prevention",
            "Vaccination",
            "Travel Medicine",
            "Geriatric Care"
        ],
        education: [
            { degree: "MBBS", institution: "Osmania Medical College", year: "2007" },
            { degree: "MD (General Medicine)", institution: "Gandhi Medical College", year: "2011" }
        ],
        patientReviews: [
            {
                id: "r1",
                name: "Suresh Kumar",
                verified: true,
                date: "May 2024",
                rating: 5,
                comment: "Very knowledgeable and caring doctor."
            }
        ]
    },
    {
        id: "6",
        name: "Dr. Rajesh Vukkala",
        specialization: "General Physician",
        experience: "28 years",
        rating: 4.9,
        reviewCount: 99,
        image: "https://imagesx.practo.com/providers/dr-rajesh-vukkala-general-physician-hyderabad-fcb414ab-0a2e-4320-94b9-1e438680220e.jpg?i_type=t_70x70-2x-webp",
        location: "Kukatpally, Hyderabad",
        clinic: "Nextgen Hospitals",
        fee: 600,
        verified: true,
        patientStories: 99,
        availability: ["11:30 AM", "2:00 PM", "5:30 PM"],
        registration: "TSMC 78901",
        qualifications: ["MBBS", "MD (General Medicine)", "Fellowship in Internal Medicine"],
        services: [
            "General Consultation",
            "Internal Medicine",
            "Chronic Disease Management",
            "Preventive Health",
            "Geriatric Care",
            "Travel Medicine",
            "Vaccination"
        ],
        education: [
            { degree: "MBBS", institution: "Gandhi Medical College", year: "1996" },
            { degree: "MD (General Medicine)", institution: "Osmania Medical College", year: "2000" },
            { degree: "Fellowship in Internal Medicine", institution: "Apollo Hospitals", year: "2002" }
        ],
        patientReviews: [
            {
                id: "r1",
                name: "Vikram Singh",
                verified: true,
                date: "May 2024",
                rating: 5,
                comment: "Excellent doctor with vast experience."
            },
            {
                id: "r2",
                name: "Priya Patel",
                verified: true,
                date: "April 2024",
                rating: 4,
                comment: "Very thorough in diagnosis and treatment."
            }
        ]
    },
    {
        id: "7",
        name: "Dr. K Vamsi Mohan",
        specialization: "General Physician",
        experience: "15 years",
        rating: 4.8,
        reviewCount: 8,
        image: "https://imagesx.practo.com/providers/dr-k-vamsi-mohan-general-physician-hyderabad-252e614f-8dd3-435b-a0e3-8ebc21c32bbf.jpg?i_type=t_70x70-2x-webp",
        location: "Vanasthalipuram, Hyderabad",
        clinic: "Pragma Hospitals",
        fee: 600,
        verified: true,
        patientStories: 8,
        availability: ["10:00 AM", "3:00 PM", "4:00 PM"],
        registration: "TSMC 89012",
        qualifications: ["MBBS", "MD (General Medicine)"],
        services: [
            "General Consultation",
            "Primary Care",
            "Health Checkup",
            "Disease Prevention",
            "Vaccination",
            "Travel Medicine",
            "Geriatric Care"
        ],
        education: [
            { degree: "MBBS", institution: "Kakatiya Medical College", year: "2009" },
            { degree: "MD (General Medicine)", institution: "Osmania Medical College", year: "2013" }
        ],
        patientReviews: [
            {
                id: "r1",
                name: "Rahul Sharma",
                verified: true,
                date: "May 2024",
                rating: 5,
                comment: "Very professional and caring doctor."
            }
        ]
    },
    {
        id: "8",
        name: "Dr. Markandeya Akurathi",
        specialization: "General Physician",
        experience: "15 years",
        rating: 4.9,
        reviewCount: 20,
        image: "https://imagesx.practo.com/providers/dr-markandeya-akurathi-general-physician-hyderabad-e332d667-0136-4059-a426-19e88019aa69.jpg?i_type=t_70x70-2x-webp",
        location: "Kondapur, Hyderabad",
        clinic: "Sri Sri Holistic Hospitals",
        fee: 600,
        verified: true,
        patientStories: 20,
        availability: ["9:00 AM", "2:00 PM", "5:00 PM"],
        registration: "TSMC 90123",
        qualifications: ["MBBS", "MD (General Medicine)", "Diploma in Holistic Medicine"],
        services: [
            "General Consultation",
            "Holistic Medicine",
            "Preventive Health",
            "Lifestyle Medicine",
            "Wellness Consultation",
            "Chronic Disease Management",
            "Geriatric Care"
        ],
        education: [
            { degree: "MBBS", institution: "Gandhi Medical College", year: "2009" },
            { degree: "MD (General Medicine)", institution: "Osmania Medical College", year: "2013" },
            { degree: "Diploma in Holistic Medicine", institution: "Sri Sri Institute of Medical Sciences", year: "2015" }
        ],
        patientReviews: [
            {
                id: "r1",
                name: "Anita Desai",
                verified: true,
                date: "May 2024",
                rating: 5,
                comment: "Excellent holistic approach to treatment."
            },
            {
                id: "r2",
                name: "Suresh Kumar",
                verified: true,
                date: "April 2024",
                rating: 4,
                comment: "Very knowledgeable in both conventional and holistic medicine."
            }
        ]
    }
];

interface TimeSlot {
    date: string;
    slots: string[];
}

const doctorAvailability: TimeSlot[] = [
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
    },
    {
        date: "2025-06-25",
        slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM", "04:30 PM"]
    },
    {
        date: "2025-06-26",
        slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    },
    {
        date: "2025-06-27",
        slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM", "04:30 PM"]
    },
    {
        date: "2025-06-28",
        slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    },
    {
        date: "2025-06-29",
        slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM", "04:30 PM"]
    },
    {
        date: "2025-06-30",
        slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    },
    {
        date: "2025-06-31",
        slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM", "04:30 PM"]
    }
];

const MotionButton = motion(Button) as React.ComponentType<HTMLMotionProps<"button"> & React.ComponentProps<typeof Button>>;

export default function DoctorProfile() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const doctor = doctors.find((doc) => doc.id === id);

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("info");
    const [bookingSuccess, setBookingSuccess] = useState(false);

    if (!doctor) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-screen"
            >
                <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </motion.div>
        );
    }

    const getAvailableSlots = (date: Date | undefined) => {
        if (!date) return [];
        const dateStr = format(date, "yyyy-MM-dd");
        const dayAvailability = doctorAvailability.find(d => d.date === dateStr);
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
                                        src={doctor.image}
                                        alt={doctor.name}
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
                                                <h1 className="text-2xl font-bold">{doctor.name}</h1>
                                                {doctor.verified && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                            </div>
                                            <div className="text-md text-muted-foreground">{doctor.specialization}</div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                                                    <Star className="h-4 w-4 fill-yellow-400" />
                                                    {doctor.rating}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    ({doctor.reviewCount} reviews)
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4" />
                                                {doctor.experience} experience
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                {doctor.location}
                                            </div>
                                        </div>
                                        <motion.div
                                            className="flex gap-2 mt-4 md:mt-0"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.4 }}
                                        >
                                            <MotionButton variant="outline" size="icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Share2 className="h-5 w-5" />
                                            </MotionButton>
                                            <MotionButton variant="outline" size="icon" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <MessageSquare className="h-5 w-5" />
                                            </MotionButton>
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
                                    <div className="text-lg font-semibold">Clinic: <span className="font-normal">{doctor.clinic}</span></div>
                                    <div className="text-md mt-1">Consultation Fee: <span className="font-semibold text-primary">₹{doctor.fee}</span></div>
                                    <div className="text-sm text-muted-foreground mt-1">Patient Stories: {doctor.patientStories}</div>
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
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={setSelectedDate}
                                                    disabled={(date) => {
                                                        const today = new Date();
                                                        today.setHours(0, 0, 0, 0);
                                                        const dateStr = format(date, "yyyy-MM-dd");
                                                        return date < today || !doctorAvailability.some(d => d.date === dateStr);
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
                                                    {getAvailableSlots(selectedDate).map((slot, index) => (
                                                        <motion.div
                                                            key={slot}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                                        >
                                                            <MotionButton
                                                                variant={selectedSlot === slot ? "default" : "outline"}
                                                                size="sm"
                                                                className="text-xs"
                                                                onClick={() => setSelectedSlot(slot)}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                {slot}
                                                            </MotionButton>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                {getAvailableSlots(selectedDate).length === 0 && (
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="text-sm text-muted-foreground"
                                                    >
                                                        No slots available for this date
                                                    </motion.p>
                                                )}
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
                                    <MotionButton
                                        className="w-full"
                                        disabled={!selectedDate || !selectedSlot}
                                        onClick={handleBook}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Video className="mr-2 h-4 w-4" />
                                        {bookingSuccess ? "Booked!" : "Book Video Consultation"}
                                    </MotionButton>
                                    <AnimatePresence>
                                        {bookingSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="mt-2 text-green-600 text-center font-medium"
                                            >
                                                Your consultation is booked for {format(selectedDate!, "PPP")} at {selectedSlot}!
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Tabs for Info, Reviews, Services, Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="info">Info</TabsTrigger>
                                <TabsTrigger value="reviews">Patient Stories</TabsTrigger>
                                <TabsTrigger value="services">Services</TabsTrigger>
                                <TabsTrigger value="education">Education</TabsTrigger>
                            </TabsList>
                            <AnimatePresence mode="wait">
                                <TabsContent value={activeTab}>
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>
                                                    {activeTab === "info" && `About ${doctor.name}`}
                                                    {activeTab === "reviews" && "Patient Stories"}
                                                    {activeTab === "services" && "Services"}
                                                    {activeTab === "education" && "Education"}
                                                </CardTitle>
                                                {activeTab === "info" && (
                                                    <CardDescription>
                                                        <div className="mt-2">
                                                            <Badge variant="secondary" className="mr-2">{doctor.specialization}</Badge>
                                                            {doctor.qualifications && doctor.qualifications.map((q, i) => (
                                                                <Badge key={i} variant="outline" className="mr-2">{q}</Badge>
                                                            ))}
                                                        </div>
                                                    </CardDescription>
                                                )}
                                            </CardHeader>
                                            <CardContent>
                                                {activeTab === "info" && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.2 }}
                                                    >
                                                        <div className="mb-2">
                                                            <span className="font-medium">Registration: </span>
                                                            {doctor.registration}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Experience: </span>
                                                            {doctor.experience}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Location: </span>
                                                            {doctor.location}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Clinic: </span>
                                                            {doctor.clinic}
                                                        </div>
                                                    </motion.div>
                                                )}
                                                {activeTab === "reviews" && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.2 }}
                                                    >
                                                        {doctor.patientReviews && doctor.patientReviews.length > 0 ? (
                                                            doctor.patientReviews.map((review, index) => (
                                                                <motion.div
                                                                    key={review.id}
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                                    className="mb-6 border-b pb-4"
                                                                >
                                                                    <div className="flex items-center gap-3 mb-1">
                                                                        <Avatar>
                                                                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                                                                        </Avatar>
                                                                        <div>
                                                                            <div className="font-medium">{review.name} {review.verified && <CheckCircle2 className="inline h-4 w-4 text-green-500" />}</div>
                                                                            <div className="text-xs text-muted-foreground">{review.date}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-1 mb-1">
                                                                        {[...Array(review.rating)].map((_, i) => (
                                                                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                                        ))}
                                                                    </div>
                                                                    <div className="text-sm">{review.comment}</div>
                                                                    <div className="flex gap-2 mt-2">
                                                                        <MotionButton variant="ghost" size="sm" className="flex items-center gap-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                                            <ThumbsUp className="h-4 w-4" /> Helpful
                                                                        </MotionButton>
                                                                        <MotionButton variant="ghost" size="sm" className="flex items-center gap-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                                            <ThumbsDown className="h-4 w-4" /> Not Helpful
                                                                        </MotionButton>
                                                                    </div>
                                                                </motion.div>
                                                            ))
                                                        ) : (
                                                            <div className="text-muted-foreground">No patient stories yet.</div>
                                                        )}
                                                    </motion.div>
                                                )}
                                                {activeTab === "services" && (
                                                    <motion.ul
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.2 }}
                                                        className="list-disc pl-6"
                                                    >
                                                        {doctor.services && doctor.services.map((service, i) => (
                                                            <motion.li
                                                                key={i}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                                            >
                                                                {service}
                                                            </motion.li>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                                {activeTab === "education" && (
                                                    <motion.ul
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.2 }}
                                                        className="list-disc pl-6"
                                                    >
                                                        {doctor.education && doctor.education.map((edu, i) => (
                                                            <motion.li
                                                                key={i}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                                            >
                                                                <span className="font-medium">{edu.degree}</span> - {edu.institution} ({edu.year})
                                                            </motion.li>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>
                            </AnimatePresence>
                        </Tabs>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
