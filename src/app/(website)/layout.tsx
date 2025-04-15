import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import CTASection from "@/components/landing/cta-section";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Security Monitoring Service",
  description: "24/7 Professional Security Monitoring for Homes & Businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#091057]`}>
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <main className="pt-16">{children}</main>
        <CTASection />
        <Footer />
      </body>
    </html>
  );
}
