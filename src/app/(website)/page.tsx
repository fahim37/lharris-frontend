import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import ScheduleVisitSection from "@/components/landing/schedule-visit-section";
import TestimonialsSection from "@/components/landing/testimonials-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ScheduleVisitSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
    </div>
  );
}
