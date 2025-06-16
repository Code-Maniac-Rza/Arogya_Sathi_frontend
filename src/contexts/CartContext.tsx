import { createContext, useContext, useState, ReactNode } from "react";
import { Medicine } from "@/constants/medicines";

interface CartItem extends Medicine {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (medicine: Medicine) => void;
    removeFromCart: (medicineId: string) => void;
    updateQuantity: (medicineId: string, change: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (medicine: Medicine) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === medicine.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === medicine.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...medicine, quantity: 1 }];
        });
    };

    const removeFromCart = (medicineId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
    };

    const updateQuantity = (medicineId: string, change: number) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === medicineId) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
} 