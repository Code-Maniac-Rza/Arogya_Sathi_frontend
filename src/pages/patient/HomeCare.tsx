import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Stethoscope,
    Syringe,
    Heart,
    Brain,
    Baby,
    Bone,
    Eye,
    Smile,
    Clock,
    Star,
    Search,
    Pill,
    Microscope,
    Activity,
    Bed,
    Thermometer,
    Droplet,
    Bandage,
    Syringe as Injection,
    FileText,
    Home,
    Phone,
    Mail,
    MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface ServiceCardProps {
    title: string;
    description: string;
    rating: number;
    reviews: number;
    price: string;
    duration: string;
    gradient: string;
    image: string;
    index: number;
    id: string;
}

function ServiceCard({ title, description, rating, reviews, price, duration, gradient, image, index, id }: ServiceCardProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full bg-[#e0f7fa]">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{description}</p>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {duration}
                        </div>
                        <span className="text-lg font-semibold">{price}</span>
                    </div>
                    <div className="mt-auto">
                        <Button
                            className="w-full group-hover:bg-primary/90 transition-colors"
                            onClick={() => navigate(`/patient/home-care/${id}`)}
                        >
                            Book Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function HomeCare() {
    const [searchQuery, setSearchQuery] = useState("");

    const services = [
        {
            id: "icu-setup-at-home",
            title: "ICU Setup at Home",
            description: "Professional ICU setup with advanced monitoring equipment and trained medical staff",
            rating: 4.9,
            reviews: 234,
            price: "₹15,000",
            duration: "24/7",
            gradient: "bg-gradient-to-br from-red-500/80 to-red-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/icu-setup-at-home.ced42b6e.svg"
        },
        {
            id: "specialized-nurse-at-home",
            title: "Specialized Nurse at Home",
            description: "Expert nursing care with specialized training for various medical conditions",
            rating: 4.8,
            reviews: 567,
            price: "₹2,500",
            duration: "8 hours",
            gradient: "bg-gradient-to-br from-blue-500/80 to-blue-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/Nurse%20at%20Home.87bf177c.svg"
        },
        {
            id: "trained-attendant-at-home",
            title: "Trained Attendant at Home",
            description: "Professional care attendants for daily assistance and basic medical support",
            rating: 4.7,
            reviews: 789,
            price: "₹1,800",
            duration: "12 hours",
            gradient: "bg-gradient-to-br from-green-500/80 to-green-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/trained-attedant.26458603.svg"
        },
        {
            id: "mother-child-care",
            title: "Mother & Child Care",
            description: "Specialized care for mothers and newborns with expert pediatric support",
            rating: 4.9,
            reviews: 456,
            price: "₹3,500",
            duration: "6 hours",
            gradient: "bg-gradient-to-br from-pink-500/80 to-pink-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/mother-child-care.d60c4665.svg"
        },
        {
            id: "senior-care-subscription",
            title: "Senior Care Subscription",
            description: "Comprehensive care package for elderly with regular health monitoring",
            rating: 4.8,
            reviews: 345,
            price: "₹12,000",
            duration: "Monthly",
            gradient: "bg-gradient-to-br from-purple-500/80 to-purple-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/senior-care-subscription.823faeb9.svg"
        },
        {
            id: "travel-nurses",
            title: "Travel Nurses",
            description: "Professional nursing care during travel with medical equipment support",
            rating: 4.7,
            reviews: 234,
            price: "₹4,500",
            duration: "Per Day",
            gradient: "bg-gradient-to-br from-yellow-500/80 to-yellow-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/travel-nurse.36f4cd40.svg"
        },
        {
            id: "specialty-rehab-packages",
            title: "Specialty Rehab Packages",
            description: "Comprehensive rehabilitation programs for various medical conditions",
            rating: 4.8,
            reviews: 345,
            price: "₹8,000",
            duration: "Weekly",
            gradient: "bg-gradient-to-br from-indigo-500/80 to-indigo-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/specialty-rehab-packages.4de2440c.svg"
        },
        {
            id: "doctor-home-consult",
            title: "Doctor Home Consult",
            description: "Expert medical consultation at your doorstep with comprehensive care",
            rating: 4.9,
            reviews: 678,
            price: "₹2,000",
            duration: "60 mins",
            gradient: "bg-gradient-to-br from-blue-500/80 to-blue-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/doctor-home-consult.472dabba.svg"
        },
        {
            id: "physiotherapy-at-home",
            title: "Physiotherapy at Home",
            description: "Professional physiotherapy services for rehabilitation and recovery",
            rating: 4.8,
            reviews: 456,
            price: "₹1,500",
            duration: "45 mins",
            gradient: "bg-gradient-to-br from-green-500/80 to-green-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/Physiotherapist-at-Home.8be1439b.svg"
        },
        {
            id: "adult-vaccination",
            title: "Adult Vaccination",
            description: "Comprehensive vaccination services for adults with expert guidance",
            rating: 4.9,
            reviews: 567,
            price: "₹800",
            duration: "30 mins",
            gradient: "bg-gradient-to-br from-yellow-500/80 to-yellow-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/adult-vacination.b7cf574c.svg"
        },
        {
            id: "prescribed-medicine-delivery",
            title: "Prescribed Medicine Delivery",
            description: "Timely delivery of prescribed medications to your doorstep",
            rating: 4.8,
            reviews: 890,
            price: "₹100",
            duration: "Same Day",
            gradient: "bg-gradient-to-br from-green-500/80 to-green-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/medicine-delivery.28ca93b2.svg"
        },
        {
            id: "home-diagnostics",
            title: "Home Diagnostics",
            description: "Comprehensive diagnostic tests performed at your home",
            rating: 4.7,
            reviews: 456,
            price: "₹1,500",
            duration: "2 hours",
            gradient: "bg-gradient-to-br from-blue-500/80 to-blue-600/80",
            image: "https://www.apollohomecare.com/_next/static/media/home-diagnostic.8aa1b4af.svg"
        }
    ];

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex">
            <DashboardSidebar isCollapsed={false} toggleCollapsed={() => { }} />
            <div className="flex-1 flex flex-col">
                <DashboardHeader toggleSidebar={() => { }} />
                <div className="p-8 flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold mb-2">Home Care Services</h1>
                        <p className="text-muted-foreground mb-6">
                            Professional medical care services delivered to your doorstep
                        </p>
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </motion.div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredServices.map((service, index) => (
                            <ServiceCard key={service.title} {...service} index={index} />
                        ))}
                    </div>
                    {filteredServices.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-lg text-muted-foreground">No services found matching your search.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
} 