import {  Video, Users, BellRing } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="container pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF1A] p-6 rounded-[20px]">
          <div className="mb-4 ">
            {/* <Zap className="h-8 w-8 text-white" /> */}
            <BellRing className="h-8 w-8 text-white"/>
          </div>
          <h3 className="text-white font-medium mb-2">Real-Time Alerts</h3>
          <p className="text-gray-300 text-sm">
            Instant customized notifications for all security events
          </p>
        </div>
        <div className="bg-[#FFFFFF1A] p-6 rounded-[20px]">
          <div className="mb-4">
            <Video className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-white font-medium mb-2">Video Archive</h3>
          <p className="text-gray-300 text-sm">
            Access stored footage with AI-powered anomaly detection
          </p>
        </div>
        <div className="bg-[#FFFFFF1A] p-6 rounded-[20px]">
          <div className="mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-white font-medium mb-2">Certified Staff</h3>
          <p className="text-gray-300 text-sm">
            Background-checked professionals with real-time tracking
          </p>
        </div>
      </div>
    </section>
  );
}
