// app/layout.tsx
import type { ReactNode } from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/shared/layout-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Security Monitoring Service",
  description: "24/7 Professional Security Monitoring for Homes & Businesses",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#091057]`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
