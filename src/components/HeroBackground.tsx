import { motion, AnimatePresence } from "framer-motion";

interface HeroBackgroundProps {
    currentService?: string;
}

export function HeroBackground({ currentService = "Telemedicine" }: HeroBackgroundProps) {
    const getBackgroundImage = (service: string) => {
        // Map service names to their corresponding image paths
        const imageMap: { [key: string]: string } = {
            "Telemedicine": "/images/services/telemedicine.png",
            "Home Care": "/images/services/home-care.png",
            "Pharmacy": "/images/services/pharmacy.png",
            "Emergency Services": "/images/services/emergency-services.png",
            "Health Records": "/images/services/health-records.png",
            "Cancer Care": "/images/services/cancer-care.png",
            "Mental Health": "/images/services/mental-health.png",
            "Dental Care": "/images/services/dental-care.png",
            "Eye Care": "/images/services/eye-care.png",
            "Skin Care": "/images/services/skin-care.png",
            "Nutrition": "/images/services/nutrition.png",
            "Fitness": "/images/services/fitness.png",
            "Wellness": "/images/services/wellness.png",
            "Health Checkups": "/images/services/health-checkups.png",
            "Health Consultations": "/images/services/health-consultations.png",
            "Health Assessments": "/images/services/health-assessments.png",
        };

        return imageMap[service] || "/hero-bg2.png";
    };

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Background image with glow */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentService}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.95 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-end brightness-105 contrast-110 dark:brightness-110 dark:contrast-125 transition-all duration-300"
                >
                    <div
                        className="w-[800px] h-[600px] relative -mr-20"
                        style={{
                            filter: 'drop-shadow(0 0 20px rgba(144, 224, 239, 0.2))'
                        }}
                    >
                        <img
                            src={getBackgroundImage(currentService)}
                            alt={currentService}
                            className="w-full h-full object-contain object-right"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Subtle glow overlay */}
            <div className="absolute inset-0 bg-medical-light/5 dark:bg-medical-light/10 mix-blend-soft-light" />

            {/* Gradient overlays with reduced opacity */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/30 dark:from-background/25 dark:via-background/15 dark:to-background/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/20 to-transparent dark:from-background/25 dark:via-background/15 dark:to-transparent" />

            {/* Noise texture for added depth */}
            <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02] pointer-events-none select-none mix-blend-overlay">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }} />
            </div>
        </div>
    );
} 