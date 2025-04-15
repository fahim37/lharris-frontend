import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ScheduleVisitSection() {
  return (
    <section className="container pb-16">
      <div className="bg-[#FFFFFF1A] rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative ">
            <Image
              src="/assets/visit.png"
              alt="Calendar and planning"
              width={500}
              height={400}
              className="rounded-lg min-w-[555px]"
            />
          </div>
          <div className="space-y-[16px] flex flex-col justify-center ">
            <h2 className="text-[24px] font-[600] leading-[120%] text-white">
              Schedule Visit
            </h2>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-[#999999]">•</span>
                <span className="text-[#999999] text-[14px] md:text-[16px]">
                  A scheduling system for security visits
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#999999]">•</span>
                <span className="text-[#999999] text-[14px] md:text-[16px]">
                  Book from your smartphone in a single tap
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#999999]">•</span>
                <span className="text-[#999999] text-[14px] md:text-[16px]">
                  Reschedule or cancel visits using our scheduling tools
                </span>
              </li>
            </ul>
            <Button className="px-[32px] py-[16px] h-[52px] md:w-[220px]">
              Try Interactive Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
