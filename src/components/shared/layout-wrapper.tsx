// components/shared/layout-wrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import CTASection from "../landing/cta-section";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}
      <main>{children}</main>
      {!isDashboardRoute && (
        <>
          <CTASection />
          <Footer />
        </>
      )}
    </>
  );
}
