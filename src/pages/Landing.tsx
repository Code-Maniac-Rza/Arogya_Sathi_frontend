import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Ambulance,
  Calendar,
  MessageSquare,
  Utensils,
  FileText,
  Stethoscope,
  Menu,
  Pill,
  X,
  Phone,
  Heart,
  Shield,
  Clock,
  Users,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

import { FeatureCard } from "@/components/FeatureCard";

import { AnimatedTagline } from "@/components/AnimatedTagline";
import { HeroBackground } from "@/components/HeroBackground";
import "../styles/animations.css";
import { Spotlight } from "@/components/ui/spotlight-new";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { MEDICAL_IMAGES } from "@/constants/images";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Boxes } from "@/components/ui/background-boxes";
import { useAuth } from "@/contexts/AuthContext";
import { FeatureShowcase } from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "The ambulance tracking feature gave me peace of mind when my father needed emergency care. I could see exactly when help would arrive.",
    name: "Rajesh Patel",
    designation: "Patient's Son",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
  },
  {
    quote: "I love how I can consult with specialists through video calls without leaving home. Saved me so much time and travel during my pregnancy.",
    name: "Sunita Kumar",
    designation: "Expectant Mother",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
  },
  {
    quote: "Having all my medical records in one place has been incredibly helpful when switching doctors. The diet plans are an unexpected bonus!",
    name: "Arjun Menon",
    designation: "Regular User",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
  }
];

const SERVICE_FEATURES = [
  {
    title: "Emergency Services",
    description: "Get immediate medical assistance with our 24/7 emergency ambulance service. Real-time tracking and quick response.",
    button: "Book Now",
    src: "/images/services/emergency-services.png",
    path: "/emergency-services"
  },
  {
    title: "Telemedicine",
    description: "Connect with top doctors through video consultations. Get medical advice from the comfort of your home.",
    button: "Consult Now",
    src: "/images/services/telemedicine.png",
    path: "/telemedicine"
  },
  {
    title: "Health Records",
    description: "Access your complete medical history in one secure place. Share records with healthcare providers instantly.",
    button: "View Records",
    src: "/images/services/health-records.png",
    path: "/health-records"
  },
  {
    title: "Pharmacy",
    description: "Order medicines online and get them delivered to your doorstep. Wide range of medications available.",
    button: "Order Now",
    src: "/images/services/pharmacy.png",
    path: "/pharmacy"
  },
  {
    title: "Home Care",
    description: "Professional healthcare services delivered at your home. From nursing care to physiotherapy.",
    button: "Book Service",
    src: "/images/services/home-care.png",
    path: "/home-care"
  },
  {
    title: "Mental Health",
    description: "Access professional mental health support. Confidential counseling and therapy sessions.",
    button: "Get Support",
    src: "/images/services/mental-health.png",
    path: "/mental-health"
  }
];

export default function Landing() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentService, setCurrentService] = useState("Telemedicine");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const howItWorksRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current);
    }

    return () => {
      if (howItWorksRef.current) {
        observer.unobserve(howItWorksRef.current);
      }
    };
  }, []);

  const handleLogin = () => {
    if (currentUser) {
      // If user is logged in, redirect to AI Integration page
      navigate("/ai-integration");
    } else {
      // If user is not logged in, redirect to login page
      navigate("/login", { state: { redirectTo: "/ai-integration" } });
    }
  };

  const handleServiceClick = (service: string) => {
    navigate("/login", { state: { redirectTo: `/${service.toLowerCase().replace(" ", "-")}` } });
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`sticky top-0 z-10 transition-all duration-300 ease-in-out ${isScrolled
        ? 'h-16 md:h-24 px-4 md:px-8 py-2 md:py-4 mt-4 md:mt-6'
        : 'h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        }`}>
        <div className={`mx-auto h-full flex items-center justify-between transition-all duration-500 ease-in-out ${isScrolled
          ? 'max-w-full md:max-w-3xl hover:md:max-w-6xl bg-background rounded-2xl md:rounded-3xl border shadow-lg px-4 md:px-10 py-3 md:py-5 group'
          : 'container px-4'
          }`}>
          <div className={`transition-all duration-300 ${isScrolled ? 'scale-100 md:scale-110' : ''}`}>
            <Link to="/" className="flex items-center">
              <Logo
                className={`transition-all duration-300 ${isScrolled
                  ? 'w-24 md:w-32 h-auto my-1 md:my-2'
                  : 'w-20 md:w-28 h-auto my-1'
                  }`}
                size="lg"
                showText={!isScrolled}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center justify-center flex-1 transition-all duration-300 ease-in-out`}>
            <div className={`flex items-center gap-4 md:gap-8 transition-all duration-500 ${isScrolled
              ? 'w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:mr-4 md:group-hover:mr-6'
              : 'opacity-100'
              }`}>
              <Link to="/" className="text-sm md:text-base text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                Home
              </Link>
              <Link to="/about" className="text-sm md:text-base text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                About
              </Link>
              <div className="relative">
                <button
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="flex items-center gap-1 text-sm md:text-base text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap"
                >
                  Services
                  <ChevronDown className={`h-3 w-3 md:h-4 md:w-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-background border"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleServiceClick("Consult Doctor")}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted"
                      >
                        Consult Doctor
                      </button>
                      <button
                        onClick={() => handleServiceClick("Book Ambulance")}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted"
                      >
                        Book Ambulance
                      </button>
                      <button
                        onClick={() => handleServiceClick("Telemedicine")}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted"
                      >
                        Telemedicine
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/login" className="text-sm md:text-base text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                Health Records
              </Link>
              <Link to="/contact" className="text-sm md:text-base text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                Contact Us
              </Link>

            </div>
          </nav>

          <div className={`flex items-center gap-4 md:gap-6 transition-all duration-300`}>
            <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'h-9 w-9 md:h-11 md:w-11' : 'h-8 w-8 md:h-9 md:w-9'
              }`}>
              <ThemeToggle />
            </div>
            {isScrolled ? (
              <div className="hidden md:flex items-center gap-4 transition-all duration-500">
                <Button
                  asChild
                  className="bg-medical-primary hover:bg-medical-primary/90 whitespace-nowrap px-4 md:px-6 py-2 text-base md:text-lg h-10 md:h-12 rounded-xl md:rounded-2xl my-2"
                >
                  <Link to="/signup">Chat with ArogyaAI</Link>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  asChild
                  className="hidden md:flex bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#2563EB] hover:opacity-90 text-white whitespace-nowrap px-4 h-9 my-1 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'h-9 w-9' : 'h-8 w-8'
              }`}>
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`transition-all duration-300 ${isScrolled ? 'h-9 w-9' : 'h-8 w-8'
                }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ?
                <X className={`transition-all duration-300 ${isScrolled ? 'h-6 w-6' : 'h-5 w-5'}`} /> :
                <Menu className={`transition-all duration-300 ${isScrolled ? 'h-6 w-6' : 'h-5 w-5'}`} />
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
                className="text-base text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-base text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="space-y-2">
                <button
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="flex items-center gap-1 text-base text-foreground/70 hover:text-foreground transition-colors"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="pl-4 space-y-2">
                    <button
                      onClick={() => handleServiceClick("Consult Doctor")}
                      className="block w-full text-left text-base text-foreground/70 hover:text-foreground"
                    >
                      Consult Doctor
                    </button>
                    <button
                      onClick={() => handleServiceClick("Book Ambulance")}
                      className="block w-full text-left text-base text-foreground/70 hover:text-foreground"
                    >
                      Book Ambulance
                    </button>
                    <button
                      onClick={() => handleServiceClick("Telemedicine")}
                      className="block w-full text-left text-base text-foreground/70 hover:text-foreground"
                    >
                      Telemedicine
                    </button>
                  </div>
                )}
              </div>
              <Link
                to="/contact"
                className="text-base text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
              <Link
                to="/login"
                className="text-base text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                EHR
              </Link>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#2563EB] hover:opacity-90 text-white mt-4"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] py-8 md:py-24 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <HeroBackground currentService={currentService} />
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(200, 100%, 85%, .08) 0, hsla(200, 100%, 55%, .02) 50%, hsla(200, 100%, 45%, 0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .06) 0, hsla(200, 100%, 55%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .04) 0, hsla(200, 100%, 45%, .02) 80%, transparent 100%)"
          translateY={-250}
          duration={8}
        />
        {/* Overlay for mobile readability */}
        <div className="block md:hidden absolute inset-0 z-10 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
        <div className="container px-4 md:px-6 relative z-20">
          <div className="max-w-3xl mx-auto md:mx-0 flex flex-col items-center md:items-start py-4 md:py-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter mb-4 text-center md:text-left drop-shadow-md">
              AI-Powered Healthcare,
              <br />
              <span className="text-medical-primary">Just a Click Away</span>
            </h1>
            <div className="mb-4 md:mb-6 flex justify-center md:justify-start w-full">
              <AnimatedTagline onServiceChange={setCurrentService} />
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 text-center md:text-left max-w-[500px] mx-auto md:mx-0 drop-shadow-md">
              Experience the future of healthcare with Arogya Sathi - where cutting-edge AI meets personalized care for your complete well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start w-full">
              <Button
                className="bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#2563EB] hover:opacity-90 text-white w-full sm:w-auto text-sm md:text-base"
                onClick={() => navigate("/signup")}
                size="lg"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto text-sm md:text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-6 md:py-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for hospitals, doctors, or services..."
                  className="w-full px-3 md:px-4 py-2 md:py-3 pl-10 md:pl-12 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-medical-primary/50 bg-background text-sm md:text-base"
                />
                <svg
                  className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="w-full md:w-64 px-3 md:px-4 py-2 md:py-3 pl-10 md:pl-12 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-medical-primary/50 bg-background text-sm md:text-base"
                />
                <svg
                  className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <Button
                className="bg-medical-primary hover:bg-medical-primary/90 text-white px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="py-12 md:py-20 bg-background relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <div className="container px-4 md:px-6 mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Experience Healthcare Excellence
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-sm md:text-lg mt-3 md:mt-4">
            Discover our comprehensive range of medical services designed to provide you with the best care possible
          </p>
        </div>
        <FeatureShowcase
          features={SERVICE_FEATURES}
          onButtonClick={(path) => {
            if (currentUser) {
              navigate(path);
            } else {
              navigate("/login", { state: { redirectTo: path } });
            }
          }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 bg-muted/50 shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-3 md:space-y-4 text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl">
              Comprehensive Healthcare Features
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-sm md:text-lg">
              Discover all the ways Arogya Sathi can help you manage your healthcare needs from a single platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 mt-4 md:mt-8">
            <FeatureCard
              icon={<Ambulance className="h-6 w-6 md:h-8 md:w-8 text-medical-primary" />}
              title="Emergency Ambulance"
              description="Book an ambulance instantly with real-time driver tracking and status updates."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6 md:h-8 md:w-8 text-medical-primary" />}
              title="Telemedicine"
              description="Schedule and attend video consultations with doctors from your home."
            />
            <FeatureCard
              icon={<Pill className="h-6 w-6 md:h-8 md:w-8 text-medical-primary" />}
              title="Online Pharmacy"
              description="Order medicines online and get them delivered to your doorstep."
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6 md:h-8 md:w-8 text-medical-primary" />}
              title="Health Records"
              description="Store and access all your medical records securely in one place."
            />
            <FeatureCard
              icon={<Utensils className="h-6 w-6 md:h-8 md:w-8 text-medical-primary" />}
              title="Diet Plans"
              description="Get personalized diet recommendations based on your health profile."
            />
            <FeatureCard
              icon={<Stethoscope className="h-6 w-6 md:h-8 md:w-8 text-medical-primary" />}
              title="Home Care Services"
              description="Book professional healthcare services to be delivered at your home."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-12 md:py-16 shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-3 md:space-y-4 text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-sm md:text-lg">
              Simple steps to access healthcare services through Arogya Sathi
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
              <div className="flex flex-col items-center text-center p-3 md:p-4">
                <div className="rounded-full bg-medical-primary/10 p-4 md:p-6 mb-3 md:mb-4 relative">
                  <span className="text-3xl md:text-4xl font-bold text-medical-primary step-number number-animation">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Sign up and complete your health profile with basic information
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-3 md:p-4">
                <div className="rounded-full bg-medical-primary/10 p-4 md:p-6 mb-3 md:mb-4 relative">
                  <span className="text-3xl md:text-4xl font-bold text-medical-primary step-number number-animation">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Select a Service</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Choose from emergency services, telemedicine, pharmacy, or home care
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-3 md:p-4">
                <div className="rounded-full bg-medical-primary/10 p-4 md:p-6 mb-3 md:mb-4 relative">
                  <span className="text-3xl md:text-4xl font-bold text-medical-primary step-number number-animation">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Receive Care</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Get immediate assistance, track your service in real-time, and manage your health
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 md:mt-12">
            <Button
              className="bg-medical-primary hover:bg-medical-primary/90 text-sm md:text-base"
              onClick={() => navigate("/signup")}
              size="lg"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-16 bg-muted/50 shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-3 md:space-y-4 text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-sm md:text-lg">
              Read testimonials from patients who have experienced the Arogya Sathi difference
            </p>
          </div>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 md:py-16 overflow-hidden bg-[#0077B6] shadow-[0_0_50px_rgba(0,0,0,0.1)]">
        <div className="container relative px-4 md:px-6 min-h-[250px] md:min-h-[300px] flex items-center justify-center">
          <div className="relative z-20 flex flex-col items-center text-center space-y-2 md:space-y-3 max-w-[600px]">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-[500px] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              Join Arogya Sathi today and access all healthcare services from one platform.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-white text-medical-primary hover:bg-white/90 mt-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm md:text-base"
            >
              Sign Up Now
            </Button>
          </div>
          <div className="absolute inset-0 z-10">
            <Boxes className="opacity-60" />
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-medical-primary via-medical-primary to-medical-secondary opacity-90" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0077B6_1px,transparent_1px),linear-gradient(to_bottom,#0077B6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
      </section>

      {/* Footer */}
      <footer className="relative py-8 md:py-16 bg-background border-t">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0077B6_1px,transparent_1px),linear-gradient(to_bottom,#0077B6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-5" />
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-3 md:space-y-4">
              <Logo size="lg" className="mb-3 md:mb-4" />
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                Your complete healthcare companion for emergency services, telemedicine, and wellness. We're here to make healthcare accessible and efficient for everyone.
              </p>
              <div className="flex space-x-4 md:space-x-6">
                <a href="#" className="text-muted-foreground hover:text-medical-primary transition-colors">
                  <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-medical-primary transition-colors">
                  <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-medical-primary transition-colors">
                  <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>

              </div>
            </div>

            <div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Services</h3>
              <ul className="space-y-2 md:space-y-3">
                {['Emergency Ambulance', 'Telemedicine', 'Pharmacy', 'Health Records', 'Diet Plans', 'Home Care'].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-muted-foreground hover:text-medical-primary transition-colors text-xs md:text-sm flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Company</h3>
              <ul className="space-y-2 md:space-y-3">
                {['About Us', 'Our Team', 'Careers', 'Blog', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-medical-primary transition-colors text-xs md:text-sm flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h3 className="font-semibold text-base md:text-lg">Stay Updated</h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Subscribe to our newsletter for the latest updates and healthcare tips.
              </p>
              <form className="space-y-2">
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-3 md:px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-medical-primary/50 bg-background text-xs md:text-sm"
                  />
                  <Button className="bg-medical-primary hover:bg-medical-primary/90 text-white text-xs md:text-sm">
                    Subscribe
                  </Button>
                </div>
              </form>
              <div className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
                <Phone className="h-3 w-3 md:h-4 md:w-4" />
                <span>24/7 Support: +91 836-7601201</span>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <p className="text-xs md:text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Arogya Sathi. All rights reserved.
              </p>
              <div className="flex space-x-4 md:space-x-6">
                <a href="#" className="text-xs md:text-sm text-muted-foreground hover:text-medical-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-xs md:text-sm text-muted-foreground hover:text-medical-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-xs md:text-sm text-muted-foreground hover:text-medical-primary transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

