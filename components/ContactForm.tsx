"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
        <div className="w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mb-6 text-sage-green">
            <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold text-dark-text mb-2">Message Sent!</h3>
        <p className="text-gray-600">We'll get back to you shortly to confirm your pickup.</p>
        <button 
            onClick={() => setSubmitted(false)}
            className="mt-6 text-soft-blue font-medium hover:underline"
        >
            Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      <h3 className="text-2xl font-bold text-dark-text mb-6">Book a Pickup</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
            <input 
                type="text" 
                id="name" 
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50 transition-all"
                placeholder="John Doe"
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <input 
                type="tel" 
                id="phone" 
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50 transition-all"
                placeholder="+91 98110 99730"
            />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
        <input 
            type="email" 
            id="email" 
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50 transition-all"
            placeholder="support@thedryo.in"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="text-sm font-medium text-gray-700">Service Type</label>
        <select 
            id="service"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50 transition-all text-gray-600"
        >
            <option>Wash & Fold</option>
            <option>Dry Cleaning</option>
            <option>Ironing Only</option>
            <option>Household Items</option>
            <option>Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message / Special Instructions</label>
        <textarea 
            id="message" 
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50 transition-all resize-none"
            placeholder="E.g., Pickup after 5 PM, specific stain on white shirt..."
        ></textarea>
      </div>

      <button 
        type="submit"
        className="w-full bg-dark-text text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        Send Request <Send size={18} />
      </button>
    </form>
  );
}
