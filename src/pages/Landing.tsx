
import { useNavigate } from "react-router-dom";
import { 
  Ambulance, 
  Calendar, 
  ChatSquare, 
  Diet, 
  FileText, 
  Medkit, 
  Menu, 
  Pill, 
  X 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { FeatureCard } from "@/components/FeatureCard";

export default function Landing() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#testimonials" className="text-foreground/70 hover:text-foreground transition-colors">
              Testimonials
            </a>
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="bg-medical-primary hover:bg-medical-primary/90"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 bg-background">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#testimonials" 
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="justify-start px-0"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-medical-primary hover:bg-medical-primary/90"
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Your Complete Healthcare Companion
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Arogya Sathi provides emergency services, telemedicine, pharmacy, and home care - all in one platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-medical-primary hover:bg-medical-primary/90"
                onClick={() => navigate("/signup")}
                size="lg"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/login")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Comprehensive Healthcare Features
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Discover all the ways Arogya Sathi can help you manage your healthcare needs from a single platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Ambulance className="h-8 w-8" />}
              title="Emergency Ambulance"
              description="Book an ambulance instantly with real-time driver tracking and status updates."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8" />}
              title="Telemedicine"
              description="Schedule and attend video consultations with doctors from your home."
            />
            <FeatureCard
              icon={<Pill className="h-8 w-8" />}
              title="Online Pharmacy"
              description="Order medicines online and get them delivered to your doorstep."
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Health Records"
              description="Store and access all your medical records securely in one place."
            />
            <FeatureCard
              icon={<Diet className="h-8 w-8" />}
              title="Diet Plans"
              description="Get personalized diet recommendations based on your health profile."
            />
            <FeatureCard
              icon={<Medkit className="h-8 w-8" />}
              title="Home Care Services"
              description="Book professional healthcare services to be delivered at your home."
            />
            <FeatureCard
              icon={<ChatSquare className="h-8 w-8" />}
              title="AI Health Assistant"
              description="Get instant responses to common health queries with our AI assistant."
            />
            <div className="feature-card border-dashed flex flex-col items-center text-center">
              <h3 className="mb-2 font-semibold">And Much More</h3>
              <p className="text-muted-foreground mb-4">Discover all features by signing up</p>
              <Button 
                className="mt-auto bg-medical-primary hover:bg-medical-primary/90"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Simple steps to access healthcare services through Arogya Sathi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-medical-primary/10 p-4 mb-4">
                <span className="text-4xl font-bold text-medical-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
              <p className="text-muted-foreground">
                Sign up and complete your health profile with basic information
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-medical-primary/10 p-4 mb-4">
                <span className="text-4xl font-bold text-medical-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Select a Service</h3>
              <p className="text-muted-foreground">
                Choose from emergency services, telemedicine, pharmacy, or home care
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-medical-primary/10 p-4 mb-4">
                <span className="text-4xl font-bold text-medical-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Care</h3>
              <p className="text-muted-foreground">
                Get immediate assistance, track your service in real-time, and manage your health
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button 
              className="bg-medical-primary hover:bg-medical-primary/90"
              onClick={() => navigate("/signup")}
              size="lg"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Read testimonials from patients who have experienced the Arogya Sathi difference
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-medical-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-medical-primary">RP</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Rajesh Patel</h4>
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The ambulance tracking feature gave me peace of mind when my father needed emergency care. I could see exactly when help would arrive."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-medical-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-medical-primary">SK</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Sunita Kumar</h4>
                  <div className="flex text-yellow-400">
                    {"★".repeat(4)}{"☆".repeat(1)}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I love how I can consult with specialists through video calls without leaving home. Saved me so much time and travel during my pregnancy."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-medical-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-medical-primary">AM</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Arjun Menon</h4>
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Having all my medical records in one place has been incredibly helpful when switching doctors. The diet plans are an unexpected bonus!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-medical-primary to-medical-secondary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-lg">
              Join Arogya Sathi today and access all healthcare services from one platform.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/signup")}
              className="bg-white text-medical-primary hover:bg-white/90"
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" className="mb-4" />
              <p className="text-muted-foreground">
                Your complete healthcare companion for emergency services, telemedicine, and wellness.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Emergency Ambulance</li>
                <li>Telemedicine</li>
                <li>Pharmacy</li>
                <li>Health Records</li>
                <li>Diet Plans</li>
                <li>Home Care</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Refund Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Arogya Sathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
