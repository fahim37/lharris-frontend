import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
