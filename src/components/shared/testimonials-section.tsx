"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  title: string;
  content: string;
  author: string;
  role: string;
  location: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      title: "Enhanced Neighborhood Safety",
      content:
        "Since we started using Royal House Check's patrol services, our neighborhood feels significantly safer. The regular patrols have deterred unwanted activities, and the officers are always professional and approachable.",
      author: "Sarah L.",
      role: "Homeowner",
      location: "Greensboro, NC",
    },
    {
      id: 2,
      title: "Reliable and Responsive",
      content:
        "We had an incident where somebody was posted up looking suspect near our house late at night. Royal Check came through and handled the situation. Salute. Their presence gives us peace of mind.",
      author: "Myesha J",
      role: "Resident",
      location: "Greensboro, NC",
    },
    {
      id: 3,
      title: "Professional Service",
      content:
        "The security officers are always on time and conduct thorough patrols. They even provide us with detailed reports, which help us stay informed about any unusual activities in the area.",
      author: "Linda M.",
      role: "Property Manager",
      location: "Winston-Salem, NC",
    },
    {
      id: 4,
      title: "Customized Security Solutions",
      content:
        "Royal House worked with us to develop a security plan tailored to our community's needs. Their flexibility and commitment to our safety are truly commendable.",
      author: "Marty T.",
      role: "HOA President",
      location: "Greensboro, NC",
    },
    {
      id: 5,
      title: "Exceptional Customer Support",
      content:
        "Whenever we have questions or need to adjust our patrol schedule, the customer service team is always helpful and accommodating. It's great to work with a company that values its clients.",
      author: "Emily K.",
      role: "Business Owner",
      location: "Winston-Salem, NC",
    },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api, isMounted]);

  return (
    <section className="pt-5 pb-16">
      <div className="container mx-auto ">
        <h2 className="text-[40px] font-bold text-[#F7E39F] text-center mb-12">
          What Our Clients Say
        </h2>

        <Carousel
          setApi={setApi}
          className="w-full mx-auto"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4">
                <div className="bg-[#FFFFFF1A] rounded-xl p-8 md:p-12 relative select-none">
                  <div className="absolute top-8 left-8 text-[#F7E39F] opacity-30">
                    <Quote size={60} />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#F7E39F] mb-4">
                      {testimonial.title}
                    </h3>
                    <p className="text-white text-lg md:text-xl mb-8 italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex flex-col">
                      <span className="text-[#F7E39F] font-bold text-lg">
                        {testimonial.author}
                      </span>
                      <span className="text-white">
                        {testimonial.role}, {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center gap-2 mt-6">
            <CarouselPrevious className="static transform-none bg-transparent border-none hover:bg-transparent text-[#F7E39F] hover:text-[#F7E39F]/80" />
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
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
