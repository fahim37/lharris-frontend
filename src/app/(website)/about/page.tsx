import AboutBanner from "@/components/about/banner";
import Leader from "@/components/about/leader";
import Mission from "@/components/about/mission";
import Process from "@/components/shared/process";
import React from "react";

export default function page() {
  return (
    <main>
      <AboutBanner />
      <Mission />
      <Leader />
      <Process />
    </main> 
  );
}
