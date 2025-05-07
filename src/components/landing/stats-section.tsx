import {Lock, Shield, TrendingUp } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="pb-5 ">
      <div className="grid grid-cols-1 md:grid-cols-3 h-[50px]   ">
        <div
          className={`bg-[#FFFFFF1A] p-2 flex items-center gap-3 rounded-tl-[8px] rounded-bl-[8px] `}
        >
          <div className="p-2  rounded-full">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-[12px]"> GDPR Compliant</span>
        </div>
        <div className="bg-[#FFFFFF1A] p-2 flex items-center gap-3">
          <div className="p-2  rounded-full">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-[12px]"> AES-256 Encryption</span>
        </div>
        <div
          className={`bg-[#FFFFFF1A] p-2 flex items-center gap-3 rounded-tr-[8px] rounded-br-[8px]`}
        >
          <div className="p-2  rounded-full">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-[12px]">98% Client Retention</span>
        </div>
      </div>
    </section>
  );
}
