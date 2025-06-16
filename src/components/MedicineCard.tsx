import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface MedicineCardProps {
    name: string;
    manufacturer: string;
    price: number;
    discount?: number;
    prescription?: boolean;
    image?: string;
    onAddToCart: () => void;
}

export function MedicineCard({
    name,
    manufacturer,
    price,
    discount = 0,
    prescription = false,
    image = "/placeholder-medicine.png",
    onAddToCart,
}: MedicineCardProps) {
    const discountedPrice = price - (price * discount) / 100;

    return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-4">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                    <img
                        src={image}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                    {prescription && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500">
                            Prescription Required
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                <div className="flex-1">
                    <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
                        {name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{manufacturer}</p>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">₹{discountedPrice.toFixed(2)}</span>
                            {discount > 0 && (
                                <span className="text-sm text-muted-foreground line-through">
                                    ₹{price.toFixed(2)}
                                </span>
                            )}
                        </div>
                        {discount > 0 && (
                            <Badge variant="secondary" className="text-xs shrink-0">
                                {discount}% OFF
                            </Badge>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={onAddToCart}
                    className="w-full bg-medical-primary hover:bg-medical-primary/90"
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
} 