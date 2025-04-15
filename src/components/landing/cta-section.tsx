import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="container pb-16">
      <div className="bg-[#FFFFFF1A] rounded-[20px] p-8 text-center">
        <h2 className="text-[28px] md:text-[48px] font-bold text-white mb-2">
          Need Immediate Assistance?
        </h2>
        <p className="text-primary mb-6 text-[20px]">Call Our 24/7 Hotline</p>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-blue-900/30 mb-4"
        >
          Request Emergency Visit
        </Button>
      </div>
    </section>
  );
}
