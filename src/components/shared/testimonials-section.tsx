"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TestimonialVideo {
  id: string;
  name: string;
  title: string;
  videoSrc: string;
  posterSrc: string;
}

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>(
    {}
  );
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const testimonials: TestimonialVideo[] = [
    {
      id: "1",
      name: "Albert Flores",
      title: "Founder of GearUp",
      videoSrc: "/videos/testimonial1.mp4",
      posterSrc: "/assets/cl.png",
    },
    {
      id: "2",
      name: "Leslie Alexander",
      title: "Co-Founder of Womenia",
      videoSrc: "/videos/testimonial2.mp4",
      posterSrc: "/assets/cc.png",
    },
    {
      id: "3",
      name: "Courtney Henry",
      title: "Founder of CH Beauty",
      videoSrc: "/videos/testimonial3.mp4",
      posterSrc: "/assets/cr.png",
    },
  ];

  const togglePlayPause = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      // Pause all other videos first
      Object.entries(videoRefs.current).forEach(([videoId, videoEl]) => {
        if (videoId !== id && videoEl && !videoEl.paused) {
          videoEl.pause();
          setPlayingStates((prev) => ({ ...prev, [videoId]: false }));
        }
      });

      // Play the selected video
      video.play();
      setPlayingStates((prev) => ({ ...prev, [id]: true }));
    } else {
      video.pause();
      setPlayingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());

      // Pause all videos when changing slides
      Object.entries(videoRefs.current).forEach(([id, video]) => {
        if (video && !video.paused) {
          video.pause();
          setPlayingStates((prev) => ({ ...prev, [id]: false }));
        }
      });
    };

    api.on("select", handleSelect);

    // Set initial index
    setCurrentIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="w-full container mx-auto">
      <div className="text-center text-[28px] md:text-[40px] font-[700] text-white mb-10">
        Trusted By 1,200+ Homes & Businesses
      </div>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="md:basis-1/3 lg:basis-1/3"
            >
              <Card className="rounded-lg overflow-hidden border border-gray-200 relative">
                <div className="relative aspect-[3/4]">
                  <video
                    ref={(el) => {
                      videoRefs.current[testimonial.id] = el;
                      return;
                    }}
                    poster={testimonial.posterSrc}
                    className="w-full h-full object-cover"
                    src={testimonial.videoSrc}
                    playsInline
                    onEnded={() =>
                      setPlayingStates((prev) => ({
                        ...prev,
                        [testimonial.id]: false,
                      }))
                    }
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <h3 className="text-xl font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-200">{testimonial.title}</p>
                  </div>
                  <Button
                    onClick={() => togglePlayPause(testimonial.id)}
                    variant="outline"
                    size="icon"
                    className="absolute bottom-4 right-4 rounded-full bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30"
                  >
                    {playingStates[testimonial.id] ? (
                      <Pause className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white" />
                    )}
                  </Button>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-2 mt-6">
          <CarouselPrevious className="static transform-none bg-transparent border-none hover:bg-transparent text-amber-400 hover:text-amber-500" />
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? "bg-amber-400 w-6" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
          <CarouselNext className="static transform-none bg-transparent border-none hover:bg-transparent text-amber-400 hover:text-amber-500" />
        </div>
      </Carousel>
      <div className="flex justify-center mt-8">
        <Button
     
          className="px-[16px] h-[60px] text-primary rounded-[8px] bg-transparent border border-[#F7E39F] text-[16px] font-bold"
        >
          See all reviews by our customers
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
