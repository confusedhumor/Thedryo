import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppToggle from "@/components/WhatsAppToggle";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thedryo.in"),
  title: "TheDryo | Premium Laundry Service",
  description: "Stress-Free Laundry, Delivered to Your Door. Affordable, hygienic and on-time laundry services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <WhatsAppToggle />
        <Footer />
      </body>
    </html>
  );
}
