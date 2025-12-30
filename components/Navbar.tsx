"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getContent } from "@/lib/content";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [marqueeText, setMarqueeText] = useState("✨ 5 LAKH+ CUSTOMER");

  useEffect(() => {
    const fetchMarquee = async () => {
      const content = await getContent();
      if (content.marquee_text) {
        setMarqueeText(content.marquee_text);
      }
    };
    fetchMarquee();

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="fixed top-0 w-full z-50">
      {/* Announcement Bar */}
      {/* Announcement Bar - Professional Seamless Ticker */}
      <div className="bg-brand-purple text-white overflow-hidden py-2 flex relative z-50">
        <div className="flex md:w-[200%] w-[400%] animate-marquee whitespace-nowrap hover:pause">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8 text-xs md:text-sm font-bold tracking-wider inline-block">
                 {marqueeText}
              </span>
            ))}
            {[...Array(10)].map((_, i) => (
              <span key={`dup-${i}`} className="mx-8 text-xs md:text-sm font-bold tracking-wider inline-block">
                 {marqueeText}              </span>
            ))}
        </div>
      </div>
      <nav
        className={`w-full transition-all duration-300 bg-frosty shadow-sm ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/thedryo-logo-transparent.png" 
            alt="TheDryo Logo" 
          width={240} 
            height={72} 
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Centered Desktop Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-brand-purple hover:text-blue-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Book Now & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/919811099730?text=Hi%2C%20I%20want%20to%20book%20a%20wash"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-[#7F00FF] text-white px-5 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl items-center gap-2"
          >
            Book Now
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark-text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center p-8 gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-brand-purple text-xl font-bold p-2 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://wa.me/919811099730?text=Hi%2C%20I%20want%20to%20book%20a%20wash"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="bg-[#7F00FF] text-white text-center py-3 px-12 rounded-full font-bold mt-4 shadow-md hover:shadow-lg transition-all"
              >
                Book a Wash
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
