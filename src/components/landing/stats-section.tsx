import { CheckCircle, Clock, TrendingUp } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="container pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="bg-blue-900/30 rounded-l-lg p-4 flex items-center gap-3">
          <div className="p-2 bg-blue-800/50 rounded-full">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm">100% Compliant</span>
        </div>
        <div className="bg-blue-900/30 p-4 flex items-center gap-3">
          <div className="p-2 bg-blue-800/50 rounded-full">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm">24/7/365 Surveillance</span>
        </div>
        <div className="bg-blue-900/30 rounded-r-lg p-4 flex items-center gap-3">
          <div className="p-2 bg-blue-800/50 rounded-full">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm">99% Client Retention</span>
        </div>
      </div>
    </section>
  );
}
