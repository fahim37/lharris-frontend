"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Pause, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Testimonial = {
  id: number
  name: string
  role: string
  image: string
  isPlaying: boolean
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Albert Flores",
      role: "Founder of GearUp",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201597882701-zll5PxXbX5FD5vG3ba1XYPjIuDunco.png",
      isPlaying: false,
    },
    {
      id: 2,
      name: "Leslie Alexander",
      role: "Co-Founder of Womenia",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201597882701-zll5PxXbX5FD5vG3ba1XYPjIuDunco.png",
      isPlaying: true,
    },
    {
      id: 3,
      name: "Courtney Henry",
      role: "Founder of CH Beauty",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201597882701-zll5PxXbX5FD5vG3ba1XYPjIuDunco.png",
      isPlaying: false,
    },
  ])

  const [activeIndex, setActiveIndex] = useState(1)

  const togglePlayPause = (id: number) => {
    setTestimonials(
      testimonials.map((testimonial) => ({
        ...testimonial,
        isPlaying: testimonial.id === id ? !testimonial.isPlaying : testimonial.isPlaying,
      })),
    )
  }

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section className="container pb-16">
      <h2 className="text-2xl font-bold text-white text-center mb-8">Trusted By 1,200+ Homes & Businesses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={cn(
              "bg-blue-900/20 rounded-lg overflow-hidden border-2",
              index === activeIndex ? "border-yellow-400" : "border-transparent",
            )}
          >
            <div className="relative h-[400px]">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-medium">{testimonial.name}</h3>
                <p className="text-gray-300 text-sm">{testimonial.role}</p>
              </div>
              <button
                onClick={() => togglePlayPause(testimonial.id)}
                className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                {testimonial.isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={prevTestimonial}
          className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <div className="flex gap-1">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn("w-2 h-2 rounded-full", index === activeIndex ? "bg-yellow-400" : "bg-blue-800")}
            />
          ))}
        </div>
        <button
          onClick={nextTestimonial}
          className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-blue-900/30">
          See all reviews by our customers
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </section>
  )
}
