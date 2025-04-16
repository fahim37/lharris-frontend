import {Lock, Shield, TrendingUp } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="pb-5">
      <div className="grid grid-cols-1 md:grid-cols-3 text-[12px] h-[52px]">
        <div
          className={`bg-[#FFFFFF1A] p-4 flex items-center gap-3 ${"rounded-tl-lg md:rounded-l-lg md:rounded-tl-none"}`}
        >
          <div className="p-2 bg-[#FFFFFF1A] rounded-full">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm"> GDPR Compliant</span>
        </div>
        <div className="bg-[#FFFFFF1A] p-4 flex items-center gap-3">
          <div className="p-2 bg-[#FFFFFF1A] rounded-full">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm"> AES-256 Encryption</span>
        </div>
        <div
          className={`bg-[#FFFFFF1A] p-4 flex items-center gap-3 ${"rounded-bl-lg md:rounded-r-lg md:rounded-bl-none"}`}
        >
          <div className="p-2 bg-[#FFFFFF1A] rounded-full">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm">98% Client Retention</span>
        </div>
      </div>
    </section>
  );
}
