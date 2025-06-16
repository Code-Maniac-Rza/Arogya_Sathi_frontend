import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Clock, MapPin, Phone, ArrowRight, Pill } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function PatientDashboard() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="min-h-screen flex">
            <DashboardSidebar isCollapsed={isCollapsed} toggleCollapsed={toggleSidebar} />
            <div className="flex-1 flex flex-col">
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <div className="py-8 flex-1">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Upcoming Appointment</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Dr. Sarah Johnson</div>
                                <p className="text-xs text-muted-foreground">Cardiologist</p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center text-sm">
                                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Tomorrow, 10:00 AM</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>123 Medical Center Dr.</span>
                                    </div>
                                </div>
                                <Button
                                    className="mt-4 w-full"
                                    variant="outline"
                                    onClick={() => navigate("/patient/telemedicine")}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Emergency Contact</CardTitle>
                                <Phone className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">John Smith</div>
                                <p className="text-xs text-muted-foreground">Spouse</p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center text-sm">
                                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                </div>
                                <Button
                                    className="mt-4 w-full"
                                    variant="outline"
                                    onClick={() => navigate("/patient/emergency-ambulance")}
                                >
                                    Edit Contact
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">AI Health Assistant</CardTitle>
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Chat with AI</div>
                                <p className="text-xs text-muted-foreground">Get instant health advice</p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center text-sm">
                                        <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>24/7 Available</span>
                                    </div>
                                </div>
                                <Button
                                    className="mt-4 w-full"
                                    variant="outline"
                                    onClick={() => navigate("/ai-integration")}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        Start Chat
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Order Medicines</CardTitle>
                                <Pill className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="h-auto py-4 hover:bg-primary/5 hover:border-primary flex flex-col"
                                    onClick={() => navigate("/patient/pharmacy")}
                                >
                                    <div className="rounded-full bg-primary/10 p-3 mb-2">
                                        <Pill className="h-6 w-6 text-primary" />
                                    </div>
                                    <span className="font-medium">Order Medicines</span>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
} 