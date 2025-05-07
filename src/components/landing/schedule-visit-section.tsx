import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ScheduleVisitSection() {
  return (
    <section className="container pb-16">
      <div className="bg-[#FFFFFF1A] rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
          {" "}
          {/* Adjusted padding for responsiveness */}
          <div className="relative">
            <Image
              src="/assets/visit.png"
              alt="Calendar and planning"
              width={500}
              height={400}
              className="rounded-lg w-full h-auto object-cover" // Made image responsive
            />
          </div>
          <div className="space-y-4 md:space-y-[16px] flex flex-col justify-center ">
            {" "}
            {/* Adjusted spacing */}
            <h2 className="text-[24px] font-[600] leading-[120%] text-white">
              Schedule Visit
            </h2>
            <ul className="space-y-2 md:space-y-1">
              {" "}
              {/* Adjusted spacing */}
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
            <Link href="/dashboard/schedule">
              <Button className="px-6 py-3 md:px-[32px] md:py-[16px] h-[48px] md:h-[52px] w-full md:w-[220px] bg-[#F7E39F] text-base text-[#091057] hover:bg-[#F7E39F]/80 font-medium">

                {/* Made button responsive */}
                Add a Visit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
