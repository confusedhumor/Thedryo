"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const defaultImages = [
  "/hero_shoe_special.png"
  
];

interface HeroCarouselProps {
  images?: string[];
  imageFit?: "contain" | "cover" | "fill";
  padding?: string;
  heightClass?: string;
}

const HeroCarousel = ({ images = defaultImages, imageFit, padding, heightClass = "h-[250px] sm:h-[400px] md:h-[85vh] md:min-h-[600px]" }: HeroCarouselProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className={`relative w-full overflow-hidden bg-frosty ${heightClass}`}>
      {/* Background Carousel */}
      {images.map((img, i) => (
        <motion.div
           key={img}
           initial={{ opacity: 0 }}
           animate={{ 
             opacity: i === index ? 1 : 0,
             zIndex: i === index ? 1 : 0
           }}
           transition={{ duration: 1.5, ease: "easeInOut" }}
           className="absolute inset-0"
        >
          <Image
            src={img}
            alt="Laundry Service"
            fill
            className={`${imageFit ? `object-${imageFit}` : "object-contain md:object-cover"} ${padding || ""}`}
            priority={i === 0} // Set priority only for the first image
          />
        </motion.div>
      ))}

      {/* Overlay Content removed as per request */}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, i) => (
            <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                    i === index ? "bg-white w-8" : "bg-white/50 hover:bg-white"
                }`}
            />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
