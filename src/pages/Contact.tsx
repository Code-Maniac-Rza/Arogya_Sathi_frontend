import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Boxes } from "@/components/ui/background-boxes";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log("Form submitted:", formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <Spotlight
                    gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(200, 100%, 85%, .08) 0, hsla(200, 100%, 55%, .02) 50%, hsla(200, 100%, 45%, 0) 80%)"
                    gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .06) 0, hsla(200, 100%, 55%, .02) 80%, transparent 100%)"
                    gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .04) 0, hsla(200, 100%, 45%, .02) 80%, transparent 100%)"
                    translateY={-250}
                    duration={8}
                />
                <div className="container relative z-10 mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-medical-primary to-medical-secondary">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Have questions or need assistance? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-card rounded-2xl p-8 shadow-lg border"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-12 bg-background/50 backdrop-blur-sm"
                                    />
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-12 bg-background/50 backdrop-blur-sm"
                                    />
                                    <Input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-12 bg-background/50 backdrop-blur-sm"
                                    />
                                    <Textarea
                                        name="message"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full min-h-[150px] bg-background/50 backdrop-blur-sm resize-none"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-medical-primary to-medical-secondary hover:opacity-90 transition-all duration-300"
                                >
                                    <Send className="mr-2 h-5 w-5" />
                                    Send Message
                                </Button>
                            </form>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="space-y-6"
                        >
                            <div className="bg-card rounded-2xl p-8 shadow-lg border relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/10 to-medical-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                        <MessageSquare className="h-6 w-6 text-medical-primary mr-2" />
                                        Contact Information
                                    </h2>
                                    <div className="space-y-6">
                                        <motion.div
                                            className="flex items-start space-x-4 group/item"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="p-2 rounded-lg bg-medical-primary/10 group-hover/item:bg-medical-primary/20 transition-colors">
                                                <Mail className="h-6 w-6 text-medical-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Email</h3>
                                                <p className="text-muted-foreground">arogyasathi.life@gmail.com</p>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="flex items-start space-x-4 group/item"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="p-2 rounded-lg bg-medical-primary/10 group-hover/item:bg-medical-primary/20 transition-colors">
                                                <Phone className="h-6 w-6 text-medical-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Phone</h3>
                                                <p className="text-muted-foreground">+91 836-7601201</p>
                                            </div>
                                        </motion.div>

                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-2xl p-8 shadow-lg border relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/10 to-medical-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                        <Clock className="h-6 w-6 text-medical-primary mr-2" />
                                        Business Hours
                                    </h2>
                                    <div className="space-y-4">
                                        <motion.div
                                            className="flex justify-between items-center p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium">Monday - Friday</span>
                                            <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                                        </motion.div>
                                        <motion.div
                                            className="flex justify-between items-center p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium">Saturday</span>
                                            <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                                        </motion.div>
                                        <motion.div
                                            className="flex justify-between items-center p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="font-medium">Sunday</span>
                                            <span className="text-muted-foreground">Closed</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
} 