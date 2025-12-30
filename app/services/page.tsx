import PricingServices from "@/components/PricingServices";
import OurPromise from "@/components/OurPromise";

export default function ServicesPage() {
  return (
    <div className="pt-36 min-h-screen bg-frosty">
       <div className="pb-10">
          <PricingServices />
          <OurPromise />
       </div>
    </div>
  );
}
