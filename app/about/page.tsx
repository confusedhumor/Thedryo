import Image from "next/image";
import { Leaf, Award, UserCheck } from "lucide-react";
import AboutImage from "@/components/AboutImage";

export default function AboutPage() {
  return (
    <div className="pt-36 min-h-screen bg-cream">
       <div className="container mx-auto px-4 pb-20 max-w-5xl">
         {/* Intro */}
         <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
            <div className="flex-1">
                <span className="text-[#7F00FF] font-bold tracking-wide uppercase text-sm">About The Dryo</span>
                <h1 className="text-4xl md:text-5xl font-bold text-dark-text mt-4 mb-6">Redefining Laundry Day</h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    We started The Dryo with a simple mission: to give you back your time. In a busy world, laundry shouldn't be another chore on your checklist.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    We combine modern technology with expert care to ensure your clothes look their best. From eco-friendly detergents to state-of-the-art machines, every detail is considered to provide the most premium and hygienic service possible.
                </p>
            </div>
            <div className="flex-1 w-full h-80 bg-beige rounded-3xl relative overflow-hidden flex items-center justify-center">
                <AboutImage />
            </div>
         </div>

         {/* Values */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-center">
                <div className="w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-6 text-sage-green">
                    <Leaf size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-3">Eco-Friendly</h3>
                <p className="text-gray-600">We use biodegradable detergents and energy-efficient machines to minimize our environmental footprint.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-center">
                <div className="w-16 h-16 bg-soft-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 text-soft-blue">
                    <UserCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-3">Expert Care</h3>
                <p className="text-gray-600">Our team is trained to handle all types of fabrics, from silk to wool, ensuring zero damage.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                    <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-3">Quality Guarantee</h3>
                <p className="text-gray-600">Not satisfied? We will re-wash your clothes for free. Your satisfaction is our priority.</p>
            </div>
         </div>
       </div>
    </div>
  );
}
