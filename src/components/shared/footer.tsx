import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-blue-900/30 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-medium mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Company Story
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Video Monitoring
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Visit Scheduling
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Payment Plans
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 text-sm hover:text-yellow-400">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Stay Updated</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-blue-900/50 border border-blue-800 text-white px-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-l-none">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-gray-300 hover:text-yellow-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-yellow-400">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-yellow-400">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-900/30 pt-6 text-center">
          <p className="text-gray-400 text-xs">© 2023 - SecureHome Solutions. All rights reserved.</p>
          <p className="text-gray-400 text-xs mt-2">24/7 Emergency Support • 1-800-555-0123</p>
        </div>
      </div>
    </footer>
  )
}
