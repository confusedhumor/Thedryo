import { Truck, Smartphone, Home, PlayCircle } from "lucide-react";

const HowItWorks = () => {
  const howItWorks = [
    {
      icon: Smartphone,
      title: "1.Book Order",
    },
    {
      icon: Home,
      title: "2.Pickup at Doorstep",
    },
    {
      icon: PlayCircle,
      title: "3.Process",
    },
    {
      icon: Truck,
      title: "4.Delivery at Doorstep",
    },
  ];

  return (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-black border-b-2 border-black inline-block pb-1 uppercase">
                    How It Works?
                </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {howItWorks.map((step, i) => (
                    <div key={i} className="bg-white p-4 md:p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col items-center text-center border border-gray-100 h-40 md:h-48 justify-center hover:shadow-lg transition-shadow">
                        <step.icon strokeWidth={1.5} size={40} className="text-[#FF6600] mb-4 md:mb-6 md:w-14 md:h-14" />
                        <h3 className="text-sm md:text-lg font-bold text-gray-800">{step.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default HowItWorks;
