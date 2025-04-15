import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import StatsSection from "./stats-section";

export default function HeroSection() {
  return (
    <section className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-[28px] md:text-[40px] font-bold text-primary h-[] w-[]">
            24/7 Professional Security Monitoring
          </h1>
          <p className="text-primary">
            Schedule Your First Security Visit in 2 Minutes
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="text-secondary font-medium px-8">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-blue-900/30 font-medium"
            >
              <Play className="mr-2 h-4 w-4" /> Watch Demo
            </Button>
          </div>
          <StatsSection />
        </div>
        <div className="relative">
          <Image
            src="/assets/hero.png"
            alt="Security lock and chain"
            width={500}
            height={400}
            className="rounded-lg h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
