"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
    items?: Array<{
        text: string;
        image: string;
    }>;
    interval?: number;
    className?: string;
    textClassName?: string;
    animationDuration?: number;
    onServiceChange?: (service: string) => void;
}

export function ContainerTextFlip({
    items = [
        { text: "better", image: "img_better" },
        { text: "modern", image: "img_modern" },
        { text: "beautiful", image: "img_beautiful" },
        { text: "awesome", image: "img_awesome" }
    ],
    interval = 3000,
    className,
    textClassName,
    animationDuration = 700,
    onServiceChange,
}: ContainerTextFlipProps) {
    const id = useId();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [width, setWidth] = useState(100);
    const textRef = React.useRef(null);

    const updateWidthForWord = () => {
        if (textRef.current) {
            const textWidth = textRef.current.scrollWidth + 30;
            setWidth(textWidth);
        }
    };

    useEffect(() => {
        updateWidthForWord();
    }, [currentIndex]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, interval);

        return () => clearInterval(intervalId);
    }, [items, interval]);

    useEffect(() => {
        if (onServiceChange) {
            onServiceChange(items[currentIndex].text);
        }
    }, [currentIndex, items, onServiceChange]);

    return (
        <motion.p
            layout
            layoutId={`words-here-${id}`}
            animate={{ width }}
            transition={{ duration: animationDuration / 2000 }}
            className={cn(
                "relative inline-block text-center text-4xl font-bold md:text-7xl",
                className,
            )}
            key={items[currentIndex].text}
        >
            <motion.div
                transition={{
                    duration: animationDuration / 1000,
                    ease: "easeInOut",
                }}
                className={cn("inline-block", textClassName)}
                ref={textRef}
                layoutId={`word-div-${items[currentIndex].text}-${id}`}
            >
                <motion.div
                    className="inline-block"
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{
                        duration: animationDuration / 1000,
                        ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "50% 50%" }}
                >
                    {items[currentIndex].text}
                </motion.div>
            </motion.div>
        </motion.p>
    );
} 