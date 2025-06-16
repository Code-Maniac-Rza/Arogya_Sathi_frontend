// src/pages/patient/Pharmacy.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MedicineCard } from "@/components/MedicineCard";
import { medicines, categories, type Medicine } from "@/constants/medicines";
import { Search } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Pharmacy = () => {
    const { toast } = useToast();
    const { addToCart } = useCart();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        prescription: "",
        additionalNotes: "",
    });

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const filteredMedicines = medicines.filter((medicine) => {
        const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || medicine.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddToCart = (medicine: Medicine) => {
        if (medicine.prescription) {
            setShowPrescriptionForm(true);
            toast({
                title: "Prescription Required",
                description: "Please upload your prescription to order this medicine.",
                variant: "destructive",
            });
            return;
        }

        addToCart(medicine);
        toast({
            title: "Added to Cart",
            description: `${medicine.name} has been added to your cart.`,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement medicine order submission logic
        toast({
            title: "Order Submitted",
            description: "Your medicine order has been submitted successfully. We'll contact you shortly.",
        });
        setShowPrescriptionForm(false);
        setFormData({
            name: "",
            phone: "",
            address: "",
            prescription: "",
            additionalNotes: "",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
                        <h1 className="text-3xl font-bold mb-4">Order Medicines</h1>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search medicines..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredMedicines.map((medicine, index) => (
                            <motion.div
                                key={medicine.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.03,
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <MedicineCard
                                    {...medicine}
                                    onAddToCart={() => handleAddToCart(medicine)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredMedicines.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-lg text-muted-foreground">No medicines found matching your search.</p>
                        </motion.div>
                    )}
                </div>

                {/* Prescription Form Modal */}
                <AnimatePresence>
                    {showPrescriptionForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 pt-20"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="w-full max-w-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
                                    <CardHeader>
                                        <CardTitle>Upload Prescription</CardTitle>
                                        <CardDescription>
                                            Please provide your prescription details to order prescription medicines.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-2"
                                            >
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                className="space-y-2"
                                            >
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Enter your phone number"
                                                    required
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                className="space-y-2"
                                            >
                                                <Label htmlFor="address">Delivery Address</Label>
                                                <Input
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="Enter your complete delivery address"
                                                    required
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.3 }}
                                                className="space-y-2"
                                            >
                                                <Label htmlFor="prescription">Prescription Details</Label>
                                                <Input
                                                    id="prescription"
                                                    name="prescription"
                                                    value={formData.prescription}
                                                    onChange={handleChange}
                                                    placeholder="Enter your prescription details or upload a photo"
                                                    required
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.4 }}
                                                className="space-y-2"
                                            >
                                                <Label htmlFor="additionalNotes">Additional Notes</Label>
                                                <Input
                                                    id="additionalNotes"
                                                    name="additionalNotes"
                                                    value={formData.additionalNotes}
                                                    onChange={handleChange}
                                                    placeholder="Any additional information or special instructions"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.5 }}
                                                className="flex gap-4"
                                            >
                                                <Button type="submit" className="flex-1">
                                                    Submit Order
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setShowPrescriptionForm(false)}
                                                    className="flex-1"
                                                >
                                                    Cancel
                                                </Button>
                                            </motion.div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Pharmacy;