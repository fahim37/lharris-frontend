import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import StatsSection from "./stats-section";

export default function HeroSection() {
  return (
    <section className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Text and Buttons */}
        <div className="flex flex-col justify-between h-full min-w-[320px] md:min-w-[540px]">
          <div className="space-y-6">
            <h1 className="text-[28px] md:text-[40px] font-bold text-primary">
              24/7 Professional Security Monitoring
            </h1>
            <p className="text-primary">
              Schedule Your First Security Visit in 2 Minutes
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              {" "}
              {/* Added justify-start */}
              <Button className="text-secondary font-medium px-6">
                {" "}
                {/* Adjusted padding */}
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-blue-900/30 font-medium px-6"
              >
                <Play className="mr-2 h-4 w-4" /> Watch Demo
              </Button>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <StatsSection />
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center items-center max-w-full md:max-w-[570px] mt-36 md:mt-0">
          {" "}
          {/* Added mt-8 for mobile spacing */}
          <Image
            src="/assets/hero.png"
            alt="Security lock and chain"
            width={500}
            height={400}
            className="rounded-lg h-auto w-full object-contain" // Changed h-full to h-auto and w-full, object-cover to object-contain
          />
        </div>
      </div>
    </section>
  );
}
