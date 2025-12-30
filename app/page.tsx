import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PricingServices from "@/components/PricingServices";

import HeroCarousel from "@/components/HeroCarousel";
import Image from "next/image";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Default images
  let carouselImages = [
    "/hero_shoe_special.png",
    "/hero_hoodie.jpg"
  ];
  
  let offerImages = [
    "/hero_offer.png"
  ];

  try {
    // 1. Fetch Main Carousel Images
    const carouselRes = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'thedryo-carousel',
      max_results: 10,
      context: true,
    });
    
    if (carouselRes.resources && carouselRes.resources.length > 0) {
        const sorted = carouselRes.resources.sort((a: any, b: any) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        carouselImages = sorted.map((res: any) => res.secure_url);
    }

    // 2. Fetch Offer Section Images
    const offerRes = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'thedryo-offer',
        max_results: 5,
        context: true,
    });

    if (offerRes.resources && offerRes.resources.length > 0) {
        const sortedOffer = offerRes.resources.sort((a: any, b: any) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        offerImages = sortedOffer.map((res: any) => res.secure_url);
    }

  } catch (error) {
    console.error("Failed to load carousel images from Cloudinary, using defaults.", error);
  }

  return (
    <div className="overflow-x-hidden pt-32">
      {/* Hero Section */}
      {/* Hero Section with Split Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        <div className="md:col-span-2">
          <HeroCarousel 
            images={carouselImages} 
            imageFit="contain"
            padding="p-0 md:p-12"
            heightClass="aspect-video w-full md:h-[90vh] md:min-h-[300px] md:aspect-auto"
          />
        </div>
        <div className="md:col-span-0">
          <HeroCarousel 
            images={offerImages} 
            imageFit="contain"
            padding="p-4 md:p-20"
            heightClass="aspect-video w-full md:h-[80vh] md:min-h-[100px] md:aspect-auto"
          />
        </div>

        
      </div>

      {/* Pricing & Services Section */}
      <PricingServices />





      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative w-full h-auto">
             <Image
              src="/our_promise.png"
              alt="Our Promise"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
        </div>
      </div>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-[#7F00FF] rounded-3xl p-6 md:p-10 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready for Fresh Clothes?</h2>
                    <p className="text-white/90 mb-6 max-w-xl mx-auto text-sm md:text-base">Book your pickup today and get 20% off your first laundry service. No code needed.</p>
                    <a
                        href="https://wa.me/919811099730?text=Hi%2C%20I%20want%20to%20book%20my%20first%20wash"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-[#7F00FF] px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform text-sm md:text-base"
                    >
                        Book Your First Wash
                    </a>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
