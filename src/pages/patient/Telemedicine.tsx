// src/pages/patient/Telemedicine.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Video, Calendar, Clock, MapPin, Star, Filter, CheckCircle2 } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface Doctor {
    id: string;
    name: string;
    specialization: string;
    experience: string;
    rating: number;
    reviewCount: number;
    image: string;
    location: string;
    clinic: string;
    fee: number;
    verified: boolean;
    patientStories: number;
    availability: string[];
}

const doctors: Doctor[] = [
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
        availability: ["10:00 AM", "2:00 PM", "4:00 PM"]
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
        availability: ["9:00 AM", "1:00 PM", "3:00 PM"]
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
        availability: ["11:00 AM", "3:00 PM", "5:00 PM"]
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
        availability: ["10:30 AM", "2:30 PM", "4:30 PM"]
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
        availability: ["9:30 AM", "1:30 PM", "3:30 PM"]
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
        availability: ["11:30 AM", "2:00 PM", "5:30 PM"]
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
        availability: ["10:00 AM", "3:00 PM", "4:00 PM"]
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
        availability: ["9:00 AM", "2:00 PM", "5:00 PM"]
    }
];

const specializations = [
    "All",
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Pediatrician",
    "General Physician",
    "ENT Specialist",
    "Orthopedist"
];

const Telemedicine = () => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const filteredDoctors = doctors.filter((doctor) => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecialization = selectedSpecialization === "All" ||
            doctor.specialization === selectedSpecialization;
        return matchesSearch && matchesSpecialization;
    });

    return (
        <div className="min-h-screen flex">
            <DashboardSidebar isCollapsed={isCollapsed} toggleCollapsed={toggleSidebar} />
            <div className="flex-1 flex flex-col">
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <div className="container mx-auto py-8 flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold mb-4">Find and Book Doctors</h1>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search doctors, specializations, symptoms..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="gap-2">
                                        <Filter className="h-4 w-4" />
                                        Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Filter Doctors</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-6 space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-2"
                                        >
                                            <h3 className="font-medium">Experience</h3>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> 5+ Years
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> 10+ Years
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> 15+ Years
                                                </label>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                            className="space-y-2"
                                        >
                                            <h3 className="font-medium">Consultation Fee</h3>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> ₹0 - ₹500
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> Above ₹500
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> Above ₹1000
                                                </label>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                            className="space-y-2"
                                        >
                                            <h3 className="font-medium">Availability</h3>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> Available Today
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> Available Tomorrow
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" /> Available in Next 7 Days
                                                </label>
                                            </div>
                                        </motion.div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredDoctors.map((doctor, index) => (
                            <motion.div
                                key={doctor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.03,
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 rounded-lg overflow-hidden">
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                                                    </div>
                                                    {doctor.verified && (
                                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                    )}
                                                </div>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="ml-1 text-sm">{doctor.rating}</span>
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">
                                                        ({doctor.reviewCount} reviews)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center text-sm">
                                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span>{doctor.experience} experience</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span>{doctor.location}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-medium">Clinic: </span>
                                                {doctor.clinic}
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-medium">Consultation Fee: </span>
                                                ₹{doctor.fee}
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-medium">Patient Stories: </span>
                                                {doctor.patientStories}
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm font-medium">Available Slots:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {doctor.availability.map((slot) => (
                                                    <Button
                                                        key={slot}
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-xs"
                                                    >
                                                        {slot}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-auto pt-4">
                                            <Button
                                                className="w-full group-hover:bg-primary/90 transition-colors"
                                                onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
                                            >
                                                <Video className="mr-2 h-4 w-4" />
                                                Book Video Consultation
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredDoctors.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-lg text-muted-foreground">No doctors found matching your search.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Telemedicine;