import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="container pb-16">
      <div className="bg-[#FFFFFF1A] rounded-[20px] p-8 text-center">
        <h2 className="text-[28px] md:text-[48px] font-bold text-white mb-2">
          Need Immediate Assistance?
        </h2>
        <p className="text-primary mb-6 text-[20px]">Call Our 24/7 Hotline</p>
        <Link href="/dashboard">   
        <Button
          variant="outline"
          className="border-primary text-primary bg-transparent mb-4"
        >
          Request Emergency Visit
        </Button>
        </Link>
      </div>
    </section>
  );
}
