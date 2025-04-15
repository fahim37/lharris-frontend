import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="container pb-16">
      <div className="bg-blue-900/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Need Immediate Assistance?</h2>
        <p className="text-gray-300 mb-6">Call Our 24/7 Hotline</p>
        <Button variant="outline" className="border-white text-white hover:bg-blue-900/30 mb-4">
          Request Emergency Visit
        </Button>
      </div>
    </section>
  )
}
