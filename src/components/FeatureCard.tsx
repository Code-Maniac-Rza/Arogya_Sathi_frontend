import { LucideIcon } from "lucide-react";
import { PinContainer } from "@/components/ui/3d-pin";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <PinContainer
      title={title}
      className="w-full h-full"
    >
      <div className="flex flex-col items-center text-center p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
        <div className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-medical-primary/10 transition-colors group-hover/pin:bg-medical-primary/20">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-[90%] sm:max-w-[85%] md:max-w-[80%]">{description}</p>
      </div>
    </PinContainer>
  );
}
