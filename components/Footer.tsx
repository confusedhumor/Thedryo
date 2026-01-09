import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-frosty pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/thedryo-logo-transparent.png" 
                alt="TheDryo Logo" 
                width={280} 
                height={84} 
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium laundry services delivered to your doorstep. We care for your clothes so you can care for yourself.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://www.instagram.com/thedryo.in" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-soft-blue hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-soft-blue hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-text hover:bg-soft-blue hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-dark-text">Services</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/services" className="hover:text-soft-blue transition-colors">Wash & Fold</Link></li>
              <li><Link href="/services" className="hover:text-soft-blue transition-colors">Dry Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-soft-blue transition-colors">Ironing & Pressing</Link></li>
              <li><Link href="/services" className="hover:text-soft-blue transition-colors">Shoe Cleaning</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-dark-text">Company</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/about" className="hover:text-soft-blue transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-soft-blue transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-soft-blue transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-soft-blue transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-dark-text">Get in Touch</h3>
            <ul className="space-y-4 text-gray-600 flex flex-col items-center md:items-start">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="text-soft-blue shrink-0 mt-1" size={18} />
                <span>  </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-soft-blue shrink-0" size={18} />
                <span>+91 9811099730</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-soft-blue shrink-0" size={18} />
                <a href="mailto:support@thedryo.in" className="hover:text-soft-blue transition-colors">
                  support@thedryo.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Thedryo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
