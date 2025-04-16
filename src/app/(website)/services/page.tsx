import SecurityServices from "@/components/services/security-services";
import ServicesBanner from "@/components/services/services-banner";
import PricingSection from "@/components/shared/pricing-section";
import Process from "@/components/shared/process";
import React from "react";

const page = () => {
  return (
    <div>
      <ServicesBanner />
      <SecurityServices />
      <Process />
      <PricingSection />
    </div>
  );
};

export default page;
