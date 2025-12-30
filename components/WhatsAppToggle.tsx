"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WhatsAppToggle = () => {
  const phoneNumber = "919811099730"; // Updated to real number
  const message = encodeURIComponent("Hi, I’d like to book a laundry pickup.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-lg hover:shadow-xl cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        animate={{ 
          y: [0, -4, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
        className="relative w-full h-full"
      >
        <Image 
          src="/whatsapp.png" 
          alt="WhatsApp" 
          fill 
          className="object-contain"
        />
      </motion.div>
      <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
    </motion.a>
  );
};

export default WhatsAppToggle;
