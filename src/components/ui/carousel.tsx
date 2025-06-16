"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FeatureData {
  title: string;
  description: string;
  button: string;
  src: string;
  path: string;
}

interface FeatureProps {
  feature: FeatureData;
  isActive: boolean;
  onClick: () => void;
  onButtonClick: (path: string) => void;
}

const Feature = ({ feature, isActive, onClick, onButtonClick }: FeatureProps) => {
  return (
    <motion.div
      className={`relative cursor-pointer rounded-2xl overflow-hidden ${isActive ? "w-full" : "w-[200px]"
        } transition-all duration-500 ease-in-out`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-[400px]">
        <motion.img
          src={feature.src}
          alt={feature.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-6 text-white"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mb-2"
              >
                {feature.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm mb-4"
              >
                {feature.description}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onButtonClick(feature.path);
                }}
              >
                {feature.button}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface FeatureShowcaseProps {
  features: FeatureData[];
  onButtonClick: (path: string) => void;
}

export function FeatureShowcase({ features, onButtonClick }: FeatureShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {features.map((feature, index) => (
          <Feature
            key={index}
            feature={feature}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            onButtonClick={onButtonClick}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {features.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? "bg-white" : "bg-white/50"
              }`}
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
