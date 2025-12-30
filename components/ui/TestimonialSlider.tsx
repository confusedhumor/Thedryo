"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Busy Mom",
    text: "The Dryo has been a lifesaver! The pickup and delivery is always on time, and my clothes come back smelling amazing and perfectly folded.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    text: "Superb dry cleaning service. They removed stains I thought were permanent. Highly recommended for anyone who values quality.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Interior Designer",
    text: "Love their eco-friendly approach. The linens for my clients always look crisp and fresh. A truly premium service.",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 min-h-[300px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 text-center"
        >
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-xl md:text-2xl font-light text-dark-text mb-6 italic">
            "{testimonials[currentIndex].text}"
          </p>
          <div>
            <h4 className="font-bold text-lg text-dark-text">{testimonials[currentIndex].name}</h4>
            <p className="text-gray-500 text-sm">{testimonials[currentIndex].role}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-soft-blue" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
