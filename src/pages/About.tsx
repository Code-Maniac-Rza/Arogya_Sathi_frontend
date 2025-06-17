import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Heart, Shield, Clock, Menu, X, Sparkles } from "lucide-react";
import { ValueCard } from "@/components/ui/value-card";
import { Boxes } from "@/components/ui/background-boxes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const stats = [
    {
        icon: <Users className="h-8 w-8 text-medical-primary" />,
        value: "10K+",
        label: "Healthcare Providers",
    },
    {
        icon: <Heart className="h-8 w-8 text-medical-primary" />,
        value: "98%",
        label: "Satisfaction Rate",
    },
    {
        icon: <Shield className="h-8 w-8 text-medical-primary" />,
        value: "24/7",
        label: "Emergency Support",
    },
    {
        icon: <Clock className="h-8 w-8 text-medical-primary" />,
        value: "15min",
        label: "Average Response Time",
    },
];

const team = [
    {
        name: "Rahul Rudraraf",
        role: "Founder & CEO",
        image: "/public/founder.jpeg",
        description: "Visionary leader transforming healthcare access in India",
        quote: "Our mission is to make quality healthcare accessible to every Indian, leveraging technology to bridge the gap between patients and healthcare providers. We believe that everyone deserves access to timely, affordable, and high-quality healthcare services."
    }
];

const services = [
    {
        title: "Patient-Centric Features",
        features: [
            "Doctor Search & Appointments",
            "Diagnostic Test Booking",
            "AI-Powered Symptom Checker",
            "Emergency Button",
            "Health Record Storage"
        ]
    },
    {
        title: "Healthcare Provider Tools",
        features: [
            "Doctor & Hospital Dashboard",
            "Telemedicine Integration",
            "Real-time Resource Tracking",
            "Patient Analytics",
            "Secure Data Management"
        ]
    },
    {
        title: "Emergency Services",
        features: [
            "One-tap Emergency Contact",
            "Live Resource Tracking",
            "GPS Integration",
            "Real-Time Communication",
            "Secure Access Control"
        ]
    }
];

const pricing = [
    {
        title: "Free (Basic)",
        features: [
            "Search healthcare providers",
            "Basic appointment booking",
            "Health tips and blogs",
            "Emergency contact services",
            "Medication price comparisons"
        ]
    },
    {
        title: "Premium (₹199/month)",
        features: [
            "24/7 video consultations",
            "Real-time bed/ICU availability",
            "Priority bookings",
            "Cost transparency tools",
            "Personal health record storage"
        ]
    }
];

export default function About() {
    const containerRef = useRef(null);
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
                        </nav>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0077B6] via-[#0096C7] to-[#48CAE4]">
                <div className="absolute inset-0 z-0">
                    <Boxes className="opacity-90" />
                </div>
                <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]" />
                <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
                <div className="container px-4 md:px-6 relative z-10">
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
                                Transforming Healthcare
                            </span>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            About <span className="text-white relative">
                                Arogya Sathi
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="absolute -bottom-2 left-0 h-1 bg-white/50"
                                />
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            Revolutionizing healthcare through technology and compassion
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="flex justify-center gap-4 pt-4"
                        >
                            <Button asChild className="bg-white text-medical-primary hover:bg-white/90 px-8 py-6 text-lg rounded-full">
                                <Link to="/signup">Get Started</Link>
                            </Button>
                            <Button asChild className="bg-medical-primary/10 backdrop-blur-sm text-white border-2 border-white/50 hover:bg-medical-primary/20 px-8 py-6 text-lg rounded-full">
                                <Link to="/contact">Contact Us</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-primary/10 text-medical-primary text-sm font-medium"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    Our Mission
                                </motion.span>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                    India's Largest Private Healthcare Network
                                </h2>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                At Arogya Sathi, we're committed to digitizing and democratizing healthcare access for all Indians.
                                Our integrated digital health platform connects patients with hospitals, clinics, diagnostic centers,
                                and pharmacies, enabling seamless healthcare access across India. We make healthcare more transparent,
                                affordable, and efficient through our robust mobile application with extensive real-time features.
                            </p>
                            <div className="flex gap-4">
                                <Button asChild className="bg-medical-primary hover:bg-medical-primary/90 px-8 py-6 text-lg rounded-full">
                                    <Link to="/contact">Get in Touch</Link>
                                </Button>
                                <Button variant="outline" asChild className="px-8 py-6 text-lg rounded-full">
                                    <Link to="/services">Our Services</Link>
                                </Button>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/20 to-medical-secondary/20 rounded-3xl transform rotate-3" />
                            <div className="relative h-[500px] bg-muted/50 rounded-3xl overflow-hidden">
                                <img
                                    src="https://t3.ftcdn.net/jpg/06/45/29/48/360_F_645294829_GpNNhIlToXTmucCcYIrKWQKzBEQW3nMj.jpg"
                                    alt="Medical Team"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-32 bg-gradient-to-b from-muted/50 to-background">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center space-y-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-medical-primary/50 transition-colors"
                            >
                                <div className="flex justify-center p-4 rounded-full bg-medical-primary/10 w-16 h-16 mx-auto">
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-bold text-medical-primary">{stat.value}</h3>
                                <p className="text-muted-foreground text-lg">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32">
                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-primary/10 text-medical-primary text-sm font-medium mb-4"
                        >
                            <Sparkles className="h-4 w-4" />
                            Meet Our Founder
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                            Visionary Leadership
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Leading the transformation of healthcare in India
                        </p>
                    </motion.div>
                    <div className="max-w-4xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-2xl bg-muted/50 p-8 hover:bg-muted/80 transition-colors"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="aspect-square overflow-hidden rounded-xl">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-semibold">{member.name}</h3>
                                        <p className="text-medical-primary text-xl">{member.role}</p>
                                        <p className="text-muted-foreground italic text-lg leading-relaxed">"{member.quote}"</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 bg-gradient-to-b from-background to-muted/50">
                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-primary/10 text-medical-primary text-sm font-medium mb-4"
                        >
                            <Sparkles className="h-4 w-4" />
                            Our Values
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                            Core Principles
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            These core principles guide everything we do at Arogya Sathi
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            title="Innovation"
                            description="Continuously improving our technology to provide better healthcare solutions"
                            icon={<ArrowRight className="h-8 w-8 text-medical-primary" />}
                        />
                        <ValueCard
                            title="Compassion"
                            description="Treating every patient with care, understanding, and respect"
                            icon={<Heart className="h-8 w-8 text-medical-primary" />}
                        />
                        <ValueCard
                            title="Excellence"
                            description="Maintaining the highest standards in healthcare delivery"
                            icon={<Shield className="h-8 w-8 text-medical-primary" />}
                        />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-32 bg-gradient-to-b from-muted/50 to-background">
                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-primary/10 text-medical-primary text-sm font-medium mb-4"
                        >
                            <Sparkles className="h-4 w-4" />
                            Our Services
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                            Comprehensive Healthcare Solutions
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Empowering patients and healthcare providers with innovative digital solutions
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-medical-primary/50 transition-colors"
                            >
                                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                                            <ArrowRight className="h-4 w-4 text-medical-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-32">
                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-primary/10 text-medical-primary text-sm font-medium mb-4"
                        >
                            <Sparkles className="h-4 w-4" />
                            Pricing Plans
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                            Choose Your Plan
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Access healthcare services that fit your needs
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {pricing.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-medical-primary/50 transition-colors"
                            >
                                <h3 className="text-2xl font-semibold mb-6">{plan.title}</h3>
                                <ul className="space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                                            <ArrowRight className="h-4 w-4 text-medical-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full mt-8 bg-medical-primary hover:bg-medical-primary/90">
                                    Get Started
                                </Button>
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
                            Join Us
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                            Join Us in Transforming Healthcare
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Experience the future of healthcare with Arogya Sathi.
                            Get started today and be part of our mission to make healthcare
                            accessible to everyone.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button asChild className="bg-medical-primary hover:bg-medical-primary/90 px-8 py-6 text-lg rounded-full">
                                <Link to="/signup">Get Started</Link>
                            </Button>
                            <Button variant="outline" asChild className="border-2 border-medical-primary text-medical-primary hover:bg-medical-primary/10 px-8 py-6 text-lg rounded-full">
                                <Link to="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
} 