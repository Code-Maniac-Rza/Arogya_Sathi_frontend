
import { Ambulance } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-medical-primary rounded-full blur-sm opacity-50 animate-pulse-soft"></div>
        <Ambulance className={`${sizeClasses[size]} text-medical-primary relative z-10`} />
      </div>
      {showText && (
        <span className={`font-bold ${textSizes[size]} gradient-text`}>
          Arogya Sathi
        </span>
      )}
    </Link>
  );
}
