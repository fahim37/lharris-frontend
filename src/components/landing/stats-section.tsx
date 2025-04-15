import { CheckCircle, Clock, TrendingUp } from "lucide-react";

export default function StatsSection() {
  return (
    <section className=" pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 text-[12px] h-[52px]">
        <div className="bg-[#FFFFFF1A] rounded-l-lg p-4 flex items-center gap-3">
          <div className="p-2 bg-[#FFFFFF1A] rounded-full">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm">100% Compliant</span>
        </div>
        <div className="bg-[#FFFFFF1A] p-4 flex items-center gap-3">
          <div className="p-2 bg-[#FFFFFF1A] rounded-full">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm">24/7/365 Surveillance</span>
        </div>
        <div className="bg-[#FFFFFF1A] rounded-r-lg p-4 flex items-center gap-3">
          <div className="p-2 bg-[#FFFFFF1A] rounded-full">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm">99% Client Retention</span>
        </div>
      </div>
    </section>
  );
}
