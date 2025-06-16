import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Ambulance,
    Calendar,
    MessageSquare,
    Utensils,
    FileText,
    Stethoscope,
    Pill,
    Phone,
    Heart,
    Shield,
    Clock,
    Users,
    ArrowRight,
    Search,
    Menu,
    X,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { Boxes } from "@/components/ui/background-boxes";

const services = [
    {
        id: "emergency-ambulance",
        title: "Emergency Ambulance",
        description: "24/7 emergency ambulance service with real-time tracking and immediate response.",
        icon: <Ambulance className="h-8 w-8 text-medical-primary" />,
        features: ["Real-time tracking", "24/7 availability", "Trained paramedics", "Advanced life support"],
        color: "from-red-500 to-red-600",
    },
    {
        id: "telemedicine",
        title: "Telemedicine",
        description: "Virtual consultations with experienced doctors from the comfort of your home.",
        icon: <Calendar className="h-8 w-8 text-medical-primary" />,
        features: ["Video consultations", "Prescription delivery", "Follow-up care", "Specialist access"],
        color: "from-blue-500 to-blue-600",
    },
    {
        id: "pharmacy",
        title: "Online Pharmacy",
        description: "Order medicines online and get them delivered to your doorstep.",
        icon: <Pill className="h-8 w-8 text-medical-primary" />,
        features: ["Medicine delivery", "Prescription management", "Price comparison", "Auto-refill"],
        color: "from-green-500 to-green-600",
    },
    {
        id: "health-records",
        title: "Health Records",
        description: "Digital storage and management of all your medical records in one place.",
        icon: <FileText className="h-8 w-8 text-medical-primary" />,
        features: ["Digital records", "Easy sharing", "Secure storage", "History tracking"],
        color: "from-purple-500 to-purple-600",
    },
    {
        id: "diet-plans",
        title: "Diet Plans",
        description: "Personalized diet recommendations based on your health profile.",
        icon: <Utensils className="h-8 w-8 text-medical-primary" />,
        features: ["Customized plans", "Nutrition tracking", "Meal suggestions", "Progress monitoring"],
        color: "from-yellow-500 to-yellow-600",
    },
    {
        id: "home-care",
        title: "Home Care Services",
        description: "Professional healthcare services delivered at your home.",
        icon: <Stethoscope className="h-8 w-8 text-medical-primary" />,
        features: ["Nursing care", "Physiotherapy", "Elderly care", "Post-surgery care"],
        color: "from-pink-500 to-pink-600",
    },
];

export default function Services() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleServiceClick = (serviceId: string) => {
        if (currentUser) {
            navigate(`/patient/${serviceId}`);
        } else {
            navigate("/login", { state: { redirectTo: `/patient/${serviceId}` } });
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className={`sticky top-0 z-10 transition-all duration-300 ease-in-out ${isScrolled
                ? 'h-24 px-8 py-4 mt-6'
                : 'h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
                }`}>
                <div className={`mx-auto h-full flex items-center justify-between transition-all duration-500 ease-in-out ${isScrolled
                    ? 'max-w-3xl hover:max-w-6xl bg-background rounded-3xl border shadow-lg px-10 py-5 group'
                    : 'container px-4'
                    }`}>
                    <div className={`transition-all duration-300 ${isScrolled ? 'scale-110' : ''}`}>
                        <Link to="/">
                            <Logo className={`transition-all duration-300 ${isScrolled
                                ? 'w-36 h-auto my-2'
                                : 'w-28 h-auto my-1'
                                }`} />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={`hidden md:flex items-center gap-8 transition-all duration-300 ease-in-out`}>
                        <div className={`flex items-center gap-6 transition-all duration-500 ${isScrolled
                            ? 'w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:mr-6'
                            : 'opacity-100'
                            }`}>
                            <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                                Home
                            </Link>
                            <Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                                About
                            </Link>
                            <Link to="/services" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                                Services
                            </Link>
                            <Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                                Get in Touch
                            </Link>
                        </div>
                        <div className={`flex items-center gap-6 transition-all duration-300`}>
                            <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'h-11 w-11' : 'h-9 w-9'
                                }`}>
                                <ThemeToggle />
                            </div>
                            {isScrolled ? (
                                <div className="flex items-center gap-4 transition-all duration-500">
                                    <Button
                                        asChild
                                        className="bg-medical-primary hover:bg-medical-primary/90 whitespace-nowrap px-6 py-2 text-lg h-12 rounded-2xl my-2"
                                    >
                                        <Link to="/signup">Get Started</Link>
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-[#0077B6] via-[#0096C7] to-[#48CAE4] hover:opacity-90 text-white whitespace-nowrap px-4 h-9 my-1 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <Link to="/signup">Get Started</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'h-11 w-11' : 'h-9 w-9'
                            }`}>
                            <ThemeToggle />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`transition-all duration-300 ${isScrolled ? 'h-11 w-11' : 'h-9 w-9'
                                }`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ?
                                <X className={`transition-all duration-300 ${isScrolled ? 'h-7 w-7' : 'h-5 w-5'}`} /> :
                                <Menu className={`transition-all duration-300 ${isScrolled ? 'h-7 w-7' : 'h-5 w-5'}`} />
                            }
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t p-4 bg-background">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                className="text-foreground/70 hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="text-foreground/70 hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/services"
                                className="text-foreground/70 hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Services
                            </Link>
                            <Link
                                to="/contact"
                                className="text-foreground/70 hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get in Touch
                            </Link>
                            <Button
                                asChild
                                className="w-full justify-start bg-gradient-to-r from-[#0077B6] via-[#0096C7] to-[#48CAE4] hover:opacity-90 text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Link to="/signup">Get Started</Link>
                            </Button>
                        </nav>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0077B6] via-[#0096C7] to-[#48CAE4]">
                <div className="absolute inset-0 z-0">
                    <Boxes className="opacity-90" />
                </div>
                <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]" />
                <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
                <motion.div
                    style={{ opacity, scale }}
                    className="container px-4 md:px-6 relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-block"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                                <Sparkles className="h-4 w-4" />
                                Healthcare Services
                            </span>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            Our Services
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            Discover our comprehensive range of healthcare services designed to provide you with the best care possible
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Search Section */}
            <section className="relative -mt-20 z-20">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/50">
                            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 text-lg rounded-xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-medical-primary/50 transition-all duration-300 hover:shadow-xl"
                                onClick={() => handleServiceClick(service.id)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 to-medical-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative p-8">
                                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-medical-primary/10 to-medical-secondary/10 w-fit">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground mb-6">{service.description}</p>
                                    <ul className="space-y-3 mb-8">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-muted-foreground">
                                                <Heart className="h-4 w-4 mr-2 text-medical-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-center text-medical-primary font-medium">
                                        <span className="mr-2">Learn More</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Boxes className="opacity-60" />
                </div>
                <div className="absolute inset-0 z-[1] bg-gradient-to-br from-medical-primary/20 via-medical-primary/10 to-transparent" />
                <div className="container px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center space-y-8 max-w-3xl mx-auto"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-primary/10 text-medical-primary text-sm font-medium"
                        >
                            <Sparkles className="h-4 w-4" />
                            Get Started
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                            Ready to Transform Your Healthcare Experience?
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Join Arogya Sathi today and access all healthcare services from one platform
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={() => navigate("/signup")}
                                className="bg-medical-primary hover:bg-medical-primary/90 px-8 py-6 text-lg rounded-full"
                            >
                                Sign Up Now
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/contact")}
                                className="px-8 py-6 text-lg rounded-full"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
} 