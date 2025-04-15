import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ScheduleVisitSection() {
  return (
    <section className="container pb-16">
      <div className="bg-blue-900/30 rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Calendar and planning"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Schedule Visit</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span className="text-gray-300 text-sm">A scheduling system for security visits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span className="text-gray-300 text-sm">Book from your smartphone in a single tap</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span className="text-gray-300 text-sm">Reschedule or cancel visits using our scheduling tools</span>
              </li>
            </ul>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Try Interactive Demo</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
