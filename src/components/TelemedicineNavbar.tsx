import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function TelemedicineNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

    return (
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
                        <a href="/#features" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                            Features
                        </a>
                        <a href="/#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                            How it Works
                        </a>
                        <Link to="/telemedicine" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                            Telemedicine
                        </Link>
                        <Link to="/patient/emergency-ambulance" className="text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                            Emergency Ambulance
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
                                    onClick={handleLogin}
                                    className="bg-medical-primary hover:bg-medical-primary/90 whitespace-nowrap px-6 py-2 text-lg h-12 rounded-2xl my-2"
                                >
                                    {currentUser ? "Chat with AI" : "Chat with AI"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="whitespace-nowrap px-4 py-2 text-lg h-12 rounded-2xl my-2"
                                >
                                    <Link to="/login">Login</Link>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="whitespace-nowrap px-4 h-9 my-1"
                                >
                                    <Link to="/login">Login</Link>
                                </Button>
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
                        <a
                            href="/#features"
                            className="text-foreground/70 hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="/#how-it-works"
                            className="text-foreground/70 hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            How it Works
                        </a>
                        <Link
                            to="/telemedicine"
                            className="text-foreground/70 hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Telemedicine
                        </Link>
                        <Link
                            to="/patient/emergency-ambulance"
                            className="text-foreground/70 hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Emergency Ambulance
                        </Link>
                        <Button
                            variant="ghost"
                            asChild
                            className="w-full justify-start"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Link to="/login">Login</Link>
                        </Button>
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
    );
} 