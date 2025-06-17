import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
    Shield,
    FileText,
    Calendar,
    CreditCard,
    Plus,
    Download,
    Upload,
    CheckCircle2,
    AlertCircle,
    Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Insurance() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Mock insurance data
    const insuranceData = {
        provider: "HealthCare Plus",
        policyNumber: "HP-123456789",
        coverageType: "Comprehensive",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        status: "Active",
        coverage: {
            hospitalization: "100%",
            outpatient: "80%",
            prescription: "70%",
            dental: "50%",
            vision: "50%"
        }
    };

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
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-3xl font-bold">Insurance Management</h1>
                                <p className="text-muted-foreground">View and manage your health insurance coverage</p>
                            </div>
                            <Button className="bg-medical-primary hover:bg-medical-primary/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Policy
                            </Button>
                        </div>

                        <Tabs defaultValue="overview" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                <TabsTrigger value="claims">Claims</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Shield className="h-5 w-5 text-medical-primary" />
                                                Current Policy
                                            </CardTitle>
                                            <CardDescription>Your active insurance coverage</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">Provider</span>
                                                    <span className="font-medium">{insuranceData.provider}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">Policy Number</span>
                                                    <span className="font-medium">{insuranceData.policyNumber}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">Coverage Type</span>
                                                    <Badge variant="outline">{insuranceData.coverageType}</Badge>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">Status</span>
                                                    <Badge className="bg-green-500">{insuranceData.status}</Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-medical-primary" />
                                                Coverage Period
                                            </CardTitle>
                                            <CardDescription>Policy validity dates</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">Start Date</span>
                                                    <span className="font-medium">{insuranceData.startDate}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">End Date</span>
                                                    <span className="font-medium">{insuranceData.endDate}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">Days Remaining</span>
                                                    <Badge variant="outline">
                                                        <Clock className="mr-1 h-3 w-3" />
                                                        275 days
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <CreditCard className="h-5 w-5 text-medical-primary" />
                                                Coverage Details
                                            </CardTitle>
                                            <CardDescription>Your coverage benefits</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {Object.entries(insuranceData.coverage).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground capitalize">
                                                            {key}
                                                        </span>
                                                        <span className="font-medium">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="documents" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Insurance Documents</CardTitle>
                                        <CardDescription>View and manage your insurance-related documents</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <FileText className="h-8 w-8 text-medical-primary" />
                                                    <div>
                                                        <h4 className="font-medium">Policy Document</h4>
                                                        <p className="text-sm text-muted-foreground">Added on Jan 1, 2024</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <FileText className="h-8 w-8 text-medical-primary" />
                                                    <div>
                                                        <h4 className="font-medium">Insurance Card</h4>
                                                        <p className="text-sm text-muted-foreground">Added on Jan 1, 2024</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="claims" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Claims</CardTitle>
                                        <CardDescription>Track your insurance claims status</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                                    <div>
                                                        <h4 className="font-medium">Hospitalization Claim</h4>
                                                        <p className="text-sm text-muted-foreground">Claim ID: CL-123456</p>
                                                    </div>
                                                </div>
                                                <Badge className="bg-green-500">Approved</Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                                                    <div>
                                                        <h4 className="font-medium">Prescription Claim</h4>
                                                        <p className="text-sm text-muted-foreground">Claim ID: CL-123457</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="text-yellow-500">Pending</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 