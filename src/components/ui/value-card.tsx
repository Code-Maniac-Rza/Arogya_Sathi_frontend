import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValueCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
}

export function ValueCard({ title, description, icon, className }: ValueCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={cn(
                "p-6 rounded-lg bg-muted/50 border border-medical-primary/10",
                className
            )}
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-medical-primary/10">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <p className="text-muted-foreground">{description}</p>
        </motion.div>
    );
} 