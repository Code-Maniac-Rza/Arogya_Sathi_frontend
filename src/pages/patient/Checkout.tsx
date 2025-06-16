import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type Medicine } from "@/constants/medicines";

interface CartItem extends Medicine {
    quantity: number;
}

export default function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });

    // Get cart items from location state
    const cartItems = (location.state?.cartItems as CartItem[]) || [];
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 50; // Fixed shipping cost
    const total = subtotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement payment processing logic
        toast({
            title: "Order Placed Successfully",
            description: "Your order has been placed and will be delivered soon.",
        });
        navigate("/patient/dashboard");
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="min-h-screen flex">
            <DashboardSidebar isCollapsed={isCollapsed} toggleCollapsed={toggleSidebar} />
            <div className="flex-1 flex flex-col">
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <div className="container mx-auto py-8 flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Payment Form */}
                        <div>
                            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Method</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup
                                            value={paymentMethod}
                                            onValueChange={setPaymentMethod}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="card" id="card" />
                                                <Label htmlFor="card">Credit/Debit Card</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="upi" id="upi" />
                                                <Label htmlFor="upi">UPI</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="cod" id="cod" />
                                                <Label htmlFor="cod">Cash on Delivery</Label>
                                            </div>
                                        </RadioGroup>

                                        {paymentMethod === "card" && (
                                            <div className="space-y-4 mt-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardNumber">Card Number</Label>
                                                    <Input
                                                        id="cardNumber"
                                                        name="cardNumber"
                                                        placeholder="1234 5678 9012 3456"
                                                        value={formData.cardNumber}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardName">Name on Card</Label>
                                                    <Input
                                                        id="cardName"
                                                        name="cardName"
                                                        placeholder="John Doe"
                                                        value={formData.cardName}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="expiryDate">Expiry Date</Label>
                                                        <Input
                                                            id="expiryDate"
                                                            name="expiryDate"
                                                            placeholder="MM/YY"
                                                            value={formData.expiryDate}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cvv">CVV</Label>
                                                        <Input
                                                            id="cvv"
                                                            name="cvv"
                                                            placeholder="123"
                                                            value={formData.cvv}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {paymentMethod === "upi" && (
                                            <div className="space-y-4 mt-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="upiId">UPI ID</Label>
                                                    <Input
                                                        id="upiId"
                                                        name="upiId"
                                                        placeholder="example@upi"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Delivery Address</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Street Address</Label>
                                                <Input
                                                    id="address"
                                                    name="address"
                                                    placeholder="123 Main St"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input
                                                        id="city"
                                                        name="city"
                                                        placeholder="Mumbai"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="state">State</Label>
                                                    <Input
                                                        id="state"
                                                        name="state"
                                                        placeholder="Maharashtra"
                                                        value={formData.state}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="zipCode">ZIP Code</Label>
                                                <Input
                                                    id="zipCode"
                                                    name="zipCode"
                                                    placeholder="400001"
                                                    value={formData.zipCode}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Button type="submit" className="w-full">
                                    Place Order
                                </Button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex justify-between">
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-medium">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                        <div className="border-t pt-4 space-y-2">
                                            <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <span>₹{subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Shipping</span>
                                                <span>₹{shipping.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total</span>
                                                <span>₹{total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 