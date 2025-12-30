import { Smile, Zap, Leaf } from "lucide-react";
import Image from "next/image";

const OurPromise = () => {
  const promises = [
    {
      icon: Smile,
      title: "Free pick & drop",
      desc: "We provide Free pick & drop facility at your doorstep.",
    },
    {
      icon: Zap, // Using Zap for "Affordable/Speed" or maybe Gauge. The image has a speedometer icon. Let's use Zap or Timer. Actually image says "Affordable" but icon looks like speed. Text says "pricing...". Let's use Wallet or similar? No, let's match the icon visual -> Gauge/Speedometer.
      // Wait, "Affordable" text but icon is speedometer? Maybe "Efficiency"?
      // I'll use BadgePercent for affordable. Or just stick to the text meaning.
      // User image has a speedometer icon for "Affordable". I will use Gauge.
      title: "Affordable",
      desc: "Our pricing policy is fair & transparent. What you see is what you pay!",
    },
    {
      icon: Leaf,
      title: "Quality assurance",
      desc: "We strive to give best laundry & dry cleaning experience.",
    },

  ];

  return (
    <section className="py-20 bg-frosty">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-[#7F00FF] border-b-2 border-[#7F00FF] inline-block pb-1 uppercase">
            Our Promise
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* List */}
          <div className="flex-1 space-y-12">
            {promises.map((p, i) => (
              <div key={i} className="flex gap-6">
                 {/* Icon Circle */}
                 <div className="shrink-0 w-16 h-16 rounded-full border-2 border-[#7F00FF] flex items-center justify-center">
                    {/* Gauge is close to the speedometer icon */}
                    {p.title === "Affordable" ? (
                        <GaugeIcon className="text-[#7F00FF]" size={36} />
                    ) : (
                        <p.icon className="text-[#7F00FF]" strokeWidth={2} size={36} />
                    )}
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-[#7F00FF] mb-1">{p.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{p.desc}</p>
                 </div>
              </div>
            ))}
          </div>

          {/* Illustration */}
          <div className="flex-1 flex justify-center">
             <Image 
                src="/promise.png"
                alt="Our Promise Illustration"
                width={500}
                height={500}
                className="w-full max-w-md object-contain"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom Gauge Icon since Lucide's Gauge might differ. Or use lucide-react Gauge.
// Lucide React has Gauge.
import { Gauge } from "lucide-react";

// Wrapper for Gauge to match prop types if needed, but direct use is fine.
const GaugeIcon = ({ className, size }: { className?: string, size?: number }) => (
    <Gauge className={className} size={size} />
);


export default OurPromise;
