import { MapPin, Mail, Phone, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-frosty">
       <div className="bg-frosty py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
            <span className="text-[#7F00FF] font-bold tracking-wide uppercase text-sm">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-text mt-2 mb-6">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to schedule a pickup? Have a question about our services? We are here to help.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-dark-text mb-8">Contact Information</h2>
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="bg-[#7F00FF] p-6 rounded-2xl shadow-sm border border-transparent flex flex-col items-center justify-center text-center w-full md:w-[350px] h-[220px]">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-4">
                            <Phone size={24} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Call Us</h3>
                        <p className="text-white/90 text-sm">+91 98110 99730</p>
                    </div>
                    <a href="mailto:support@thedryo.in" className="bg-[#7F00FF] p-6 rounded-2xl shadow-sm border border-transparent flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer w-full md:w-[350px] h-[220px]">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Email Us</h3>
                        <p className="text-white/90 text-sm">support@thedryo.in</p>
                    </a>
                     <a href="https://wa.me/919811099730" target="_blank" rel="noopener noreferrer" className="bg-[#7F00FF] p-6 rounded-2xl shadow-sm border border-transparent flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer w-full md:w-[350px] h-[220px]">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-4">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="font-bold text-white mb-1">WhatsApp</h3>
                        <p className="text-white/90 text-sm">Chat with us directly</p>
                    </a>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
}
