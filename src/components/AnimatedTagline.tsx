import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { useState } from "react";

interface AnimatedTaglineProps {
    onServiceChange?: (service: string) => void;
}

export function AnimatedTagline({ onServiceChange }: AnimatedTaglineProps) {
    const items = [
        { text: "Telemedicine", image: "img_Telemedicine" },
        { text: "Home Care", image: "img_Home_Care" },
        { text: "Pharmacy", image: "img_Pharmacy" },
        { text: "Emergency Services", image: "img_Emergency_Services" },
        { text: "Health Records", image: "img_Health_Records" },
        { text: "Cancer Care", image: "img_Cancer_Care" },
        { text: "Mental Health", image: "img_Mental_Health" },
        { text: "Dental Care", image: "img_Dental_Care" },
        { text: "Eye Care", image: "img_Eye_Care" },
        { text: "Skin Care", image: "img_Skin_Care" },
        { text: "Nutrition", image: "img_Nutrition" },
        { text: "Fitness", image: "img_Fitness" },
        { text: "Wellness", image: "img_Wellness" },
        { text: "Health Checkups", image: "img_Health_Checkups" },
        { text: "Health Consultations", image: "img_Health_Consultations" },
        { text: "Health Assessments", image: "img_Health_Assessments" },

    ];

    return (
        <div className="flex items-center gap-0.5 text-base sm:text-lg md:text-xl text-muted-foreground">
            <span>Access</span>
            <ContainerTextFlip
                items={items}
                interval={3000}
                className="!text-base sm:!text-lg md:!text-xl"
                onServiceChange={onServiceChange}
            />
            <span>Services</span>
        </div>
    );
} 