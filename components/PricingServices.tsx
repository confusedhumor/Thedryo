"use client";

import Link from "next/link";
import { Shirt, Sparkles, Clock, Layers, Waves, Droplets, Crown, Scissors } from "lucide-react";

import { getContent } from "@/lib/content";
import { useState, useEffect } from "react";

const PricingServices = () => {
  // Placeholder number - User needs to replace this
  const PHONE_NUMBER = "919811099730"; 
  const [title, setTitle] = useState("Gurgaon's Most Trusted Dry Cleaners for a Fresh, Crisp Look!");

  useEffect(() => {
    const fetchContent = async () => {
        const content = await getContent();
        if (content.pricing_title) {
            setTitle(content.pricing_title);
        }
    };
    fetchContent();
  }, []);

  const pricingServices = [

    {
      icon: Shirt,
      title: "Wash & Fold",
      description: "Affordable laundry service Delivery Time 72 Hours",
      link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I want to book Wash & Fold service")}`
    },
    {
      icon: Layers, 
      title: "Wash & Iron",
      description: "Preferred for regular and formals Delivery Time 72 Hours",
      link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I want to book Wash & Iron service")}`
    },
    {
      icon: Crown,
      title: "Premium Laundry",
      description: "Tailored specifically for formals & premium wear",
      link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I want to book Premium Laundry service")}`
    },
    {
      icon: Sparkles,
      title: "Dry Clean",
      description: "Wedding Dresses, Lehengas, Sarees, Jackets, Blazers, Blankets, Curtains & more",
      link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I want to book Dry Clean service")}`
    },
    {
      icon: Waves,
      title: "Steam Press",
      description: "Removes wrinkles completely",
      link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I want to book Steam Press service")}`
    },
    {
      icon: Droplets,
      title: "Starching",
      description: "Starching your clothes adds crispness and structure",
      link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I want to book Starching service")}`
    },
    {
      icon: Layers,
      title: "Prem. Steam Press",
      description: "Premium packing and crease free garments on Hanger", 
      link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I want to book Premium Steam Press service")}`
    },
    {
      icon: Scissors,
      title: "Premium Dry clean",
      description: "Exclusive care for premium garments",
      link: `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I want to book Premium Dry Clean service")}`
    },
  ];

  return (
    <section className="pt-8 pb-20 bg-frosty">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
                <h2 className="text-center text-2xl md:text-3xl font-bold text-black mb-4">
                    {title}
                </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {pricingServices.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="mb-4 p-3 bg-[#7F00FF]/10 rounded-full inline-block">
                             <s.icon strokeWidth={1.5} size={32} className="text-[#7F00FF]" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-800 mb-3">{s.title}</h3>
                        
                        <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow">
                            {s.description}
                        </p>
                        
                        <a 
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#7F00FF] text-white text-xs font-bold py-2 px-6 rounded uppercase tracking-wider hover:bg-[#6a00d6] transition-colors"
                        >
                            Book Now
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default PricingServices;
