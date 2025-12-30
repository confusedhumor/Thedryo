import { Shirt, Sparkles, Clock, Layers } from "lucide-react";

// Custom icon for Wash & Iron if needed, but using Layers for now as placeholder or the custom SVG
function LayersIcon({ size, className, strokeWidth }: { size?: number, className?: string, strokeWidth?: number }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    )
}

const PricingServices = () => {
  const pricingServices = [
    {
      icon: Shirt,
      title: "Wash & Fold",
      price: "Starts @ \u20B959/kg",
      time: "48-72 hrs",
    },
    {
      icon: LayersIcon, 
      title: "Wash & Iron",
      price: "Starts @ \u20B989/kg",
      time: "48-72 hrs",
    },
    {
      icon: Clock,
      title: "Express Laundry",
      price: "Starts @ \u20B9149/kg",
      time: "24 hrs",
    },
    {
      icon: Sparkles,
      title: "Dry Cleaning",
      price: "Starts @ \u20B959/piece",
      time: "48-72 hrs",
    },
  ];

  return (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-black border-b-2 border-black inline-block pb-1 uppercase">
                    Pricing & Services
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pricingServices.map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col items-center text-center border border-gray-100 h-full hover:-translate-y-1 transition-transform duration-300">
                        <s.icon strokeWidth={1.5} size={56} className="text-[#FF6600] mb-6" />
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
                        <p className="font-bold text-gray-700 text-lg mb-4">{s.price}</p>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-auto">
                            <Clock size={16} className="text-gray-400" />
                            <span>{s.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default PricingServices;

