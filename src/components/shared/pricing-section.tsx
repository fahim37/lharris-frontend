"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/navigation";

interface Plan {
  _id: string;
  name: string;
  description: string;
  price: number;
  pack: "monthly" | "weekly" | "daily";
}

export default function PricingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  // const userId = session?.user?.id;
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plans/get-all-plans`
      );
      return res.json();
    },
    select: (planData) => planData.data,
  });

  const [count, setCount] = useState(plans?.length || 0);
  console.log(count);
  useEffect(() => {
    if (!isMounted || !api || !plans?.length) return;

    setCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api, plans, isMounted]);

  // Function to extract list items from HTML description
  const extractFeatures = (description: string) => {
    if (!isMounted) return [];

    const cleanHtml = DOMPurify.sanitize(description);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;

    const listItems = tempDiv.querySelectorAll("li");
    return Array.from(listItems).map((item) => item.textContent);
  };

  const handleSelectPlan = (planId: string) => {
    // if (status === "unauthenticated") {
    //   // Redirect to sign in if not authenticated
    //   router.push(`/auth/signin?callbackUrl=/plan-addons/${planId}`);
    //   return;
    // }

    setIsLoading(planId);
    router.push(`/plan-addons/${planId}`);
  };

  if (plansLoading || !isMounted) {
    return (
      <section className="container py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-gray-300">Loading plans...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-[28px] md:text-[40px] font-bold mb-2">
          <div className="text-white">Powerful features for</div>
          <div className="text-primary">powerful creators</div>
        </h2>
        <p className="text-gray-300">Choose a plan that&apos;s right for you</p>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {plans?.map((plan: Plan) => (
              <CarouselItem
                key={plan._id}
                className="md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <Card className="h-full group bg-[#FFFFFF1A] hover:bg-[linear-gradient(170.72deg,_#F7E39F_-8.75%,_#091057_110.07%)] hover:text-[#091057] text-[#F7E39F] border-0 overflow-hidden py-10">
                  <CardContent className="p-6">
                    <div className="mb-5">
                      <h3 className="text-xl font-semibold capitalize">
                        {plan.name}
                      </h3>
                    </div>
                    <div className="mb-10 space-x-3">
                      <span className="text-4xl font-bold">$ {plan.price}</span>
                      <span className="text-sm text-[#F7E39F] group-hover:text-[#091057]">
                        / {plan.pack}
                      </span>
                    </div>
                    <ul className="space-y-3 pb-10 h-[200px] ">
                      {extractFeatures(plan.description).map(
                        (feature, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <span className="rounded-full bg-[#F7E39F] group-hover:bg-[#091057] p-1 mt-0.5">
                              <Check className="h-3.5 w-3.5 group-hover:text-[#F7E39F] text-[#091057]" />
                            </span>
                            <span className="text-sm group-hover:text-white text-[#F7E39F]">
                              {feature}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      onClick={() => handleSelectPlan(plan._id)}
                      disabled={isLoading === plan._id}
                      className="w-full bg-[#f8d87c] text-[#050a3a] hover:bg-[#f8d87c]/90"
                    >
                      {isLoading === plan._id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Choose Plan"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-2 mt-6">
            <CarouselPrevious className="static transform-none bg-transparent border-none hover:bg-transparent text-[#F7E39F] hover:text-[#F7E39F]/80" />
            <div className="flex gap-2">
              {plans?.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-[#F7E39F] w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <CarouselNext className="static transform-none bg-transparent border-none hover:bg-transparent text-[#F7E39F] hover:text-[#F7E39F]/80" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
