import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Barcode from 'react-barcode';
import QrScanner from 'react-qr-scanner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    FileText,
    Calendar,
    Clock,
    Stethoscope,
    Pill,
    Activity,
    Heart,
    Thermometer,
    Download,
    Upload,
    Plus,
    Search,
    Scan
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Dummy data for health records
const healthRecords = {
    vitals: [
        { id: 1, date: "2024-03-15", type: "Blood Pressure", value: "120/80 mmHg", status: "normal" },
        { id: 2, date: "2024-03-15", type: "Heart Rate", value: "72 bpm", status: "normal" },
        { id: 3, date: "2024-03-15", type: "Temperature", value: "98.6°F", status: "normal" },
        { id: 4, date: "2024-03-15", type: "Blood Oxygen", value: "98%", status: "normal" },
    ],
    medications: [
        { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2024-01-15", endDate: "2024-04-15" },
        { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2024-02-01", endDate: "Ongoing" },
        { id: 3, name: "Aspirin", dosage: "81mg", frequency: "Once daily", startDate: "2024-01-01", endDate: "Ongoing" },
    ],
    labResults: [
        { id: 1, date: "2024-03-10", test: "Complete Blood Count", status: "Normal", doctor: "Dr. Sarah Johnson" },
        { id: 2, date: "2024-02-15", test: "Lipid Panel", status: "Normal", doctor: "Dr. Sarah Johnson" },
        { id: 3, date: "2024-01-20", test: "Hemoglobin A1C", status: "Normal", doctor: "Dr. Sarah Johnson" },
    ],
    allergies: [
        { id: 1, name: "Penicillin", severity: "Severe", reaction: "Anaphylaxis" },
        { id: 2, name: "Shellfish", severity: "Moderate", reaction: "Hives" },
    ],
};

export default function HealthRecords() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState("vitals");
    const [searchQuery, setSearchQuery] = useState("");
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [showPatientDetails, setShowPatientDetails] = useState(false);
    const [scannedPatientData, setScannedPatientData] = useState<any>(null);
    // Dummy patient ID - in real app this would come from your backend
    const patientId = "PAT123456789";

    // Dummy patient data - in real app this would come from your backend
    const patientData = {
        id: "PAT123456789",
        name: "John Doe",
        age: 45,
        gender: "Male",
        bloodType: "O+",
        lastVisit: "2024-03-15",
        contact: "+1 234-567-8900",
        address: "123 Medical Center Dr, Suite 100",
        primaryDoctor: "Dr. Sarah Johnson",
        insurance: "HealthCare Plus",
        policyNumber: "HC123456789"
    };

    // Use a shorter value for the barcode
    const barcodeValue = "12345";

    const handleScan = (data: any) => {
        if (data) {
            try {
                // Parse the scanned JSON data
                const parsedData = JSON.parse(data.text);
                setScannedPatientData(parsedData);
                setScanResult(data.text);
                setIsScanning(false);
                setShowPatientDetails(true);
            } catch (error) {
                console.error('Error parsing scanned data:', error);
                // If parsing fails, it might be just the ID
                setScannedPatientData({
                    id: data.text,
                    name: "Unknown",
                    age: "N/A",
                    gender: "N/A",
                    bloodType: "N/A",
                    lastVisit: "N/A",
                    contact: "N/A",
                    address: "N/A",
                    primaryDoctor: "N/A",
                    insurance: "N/A",
                    policyNumber: "N/A"
                });
                setIsScanning(false);
                setShowPatientDetails(true);
            }
        }
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "normal":
                return "bg-green-100 text-green-800";
            case "abnormal":
                return "bg-red-100 text-red-800";
            case "warning":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
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
                                <h1 className="text-3xl font-bold">Electronic Health Records</h1>
                                <p className="text-muted-foreground">View and manage your health information</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 w-[160px] flex flex-col items-center justify-center">
                                            <div className="w-full flex justify-center mb-1.5">
                                                <Barcode
                                                    value={barcodeValue}
                                                    width={2.5}
                                                    height={40}
                                                    fontSize={0}
                                                    displayValue={false}
                                                    margin={0}
                                                />
                                            </div>
                                            <p className="text-xs text-center text-muted-foreground">{patientId}</p>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <DialogTitle>Patient Information</DialogTitle>
                                        </DialogHeader>
                                        <div className="py-4">
                                            {isScanning ? (
                                                <div className="w-full aspect-square">
                                                    <QrScanner
                                                        delay={300}
                                                        onError={handleError}
                                                        onScan={handleScan}
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    {showPatientDetails ? (
                                                        <>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Patient ID</p>
                                                                    <p className="font-medium">{scannedPatientData?.id || patientData.id}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                                                                    <p className="font-medium">{scannedPatientData?.name || patientData.name}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Age</p>
                                                                    <p className="font-medium">{scannedPatientData?.age || patientData.age}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Gender</p>
                                                                    <p className="font-medium">{scannedPatientData?.gender || patientData.gender}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                                                                    <p className="font-medium">{scannedPatientData?.bloodType || patientData.bloodType}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Last Visit</p>
                                                                    <p className="font-medium">{scannedPatientData?.lastVisit || patientData.lastVisit}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Contact</p>
                                                                    <p className="font-medium">{scannedPatientData?.contact || patientData.contact}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                                                                    <p className="font-medium">{scannedPatientData?.address || patientData.address}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Primary Doctor</p>
                                                                    <p className="font-medium">{scannedPatientData?.primaryDoctor || patientData.primaryDoctor}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Insurance</p>
                                                                    <p className="font-medium">{scannedPatientData?.insurance || patientData.insurance}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-muted-foreground">Policy Number</p>
                                                                    <p className="font-medium">{scannedPatientData?.policyNumber || patientData.policyNumber}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-end gap-2">
                                                                <Button variant="outline" onClick={() => {
                                                                    setShowPatientDetails(false);
                                                                    setIsScanning(true);
                                                                }}>
                                                                    Scan Again
                                                                </Button>
                                                                <Button onClick={() => {
                                                                    setShowPatientDetails(false);
                                                                    setIsScanning(false);
                                                                }}>
                                                                    Close
                                                                </Button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-center space-y-4">
                                                            <p className="text-muted-foreground">Click the button below to scan the patient barcode</p>
                                                            <Button onClick={() => setIsScanning(true)}>Start Scanning</Button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="gap-2">
                                        <Upload className="h-4 w-4" />
                                        Upload Record
                                    </Button>
                                    <Button variant="outline" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Record
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search records..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </motion.div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="vitals">Vitals</TabsTrigger>
                            <TabsTrigger value="medications">Medications</TabsTrigger>
                            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                            <TabsTrigger value="allergies">Allergies</TabsTrigger>
                        </TabsList>

                        <TabsContent value="vitals">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {healthRecords.vitals.map((vital, index) => (
                                    <motion.div
                                        key={vital.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card className="group hover:shadow-lg transition-all duration-300">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">{vital.type}</CardTitle>
                                                {vital.type === "Blood Pressure" && <Activity className="h-4 w-4 text-muted-foreground" />}
                                                {vital.type === "Heart Rate" && <Heart className="h-4 w-4 text-muted-foreground" />}
                                                {vital.type === "Temperature" && <Thermometer className="h-4 w-4 text-muted-foreground" />}
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">{vital.value}</div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge className={getStatusColor(vital.status)}>{vital.status}</Badge>
                                                    <span className="text-xs text-muted-foreground">{vital.date}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="medications">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Medications</CardTitle>
                                        <CardDescription>Your active medication list</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {healthRecords.medications.map((med, index) => (
                                                <motion.div
                                                    key={med.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                                                >
                                                    <div>
                                                        <div className="font-medium">{med.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {med.dosage} • {med.frequency}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {med.startDate} - {med.endDate}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="lab-results">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Laboratory Results</CardTitle>
                                        <CardDescription>Your recent test results</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {healthRecords.labResults.map((result, index) => (
                                                <motion.div
                                                    key={result.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                                                >
                                                    <div>
                                                        <div className="font-medium">{result.test}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Ordered by {result.doctor}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                                                        <Button variant="ghost" size="icon">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="allergies">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Allergies & Sensitivities</CardTitle>
                                        <CardDescription>Your known allergies and reactions</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {healthRecords.allergies.map((allergy, index) => (
                                                <motion.div
                                                    key={allergy.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                                                >
                                                    <div>
                                                        <div className="font-medium">{allergy.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Reaction: {allergy.reaction}
                                                        </div>
                                                    </div>
                                                    <Badge variant={allergy.severity === "Severe" ? "destructive" : "secondary"}>
                                                        {allergy.severity}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
} 