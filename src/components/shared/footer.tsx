import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-blue-900/30 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-medium mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
                  Company Story
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
                  Video Monitoring
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
                  Visit Scheduling
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
                  Payment Plans
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-primary"
                >
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
                className="bg-[#1F2937] text-white px-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
              <Button className=" rounded-l-none">
                <Send className="h-4 w-4 text-[#091057]" />
              </Button>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-gray-300 hover:text-primary">
              <Facebook  className="h-5 w-5 text-[#F7E39F]" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-primary">
                <Twitter className="h-5 w-5 text-[#F7E39F]" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-primary">
                <Instagram className="h-5 w-5 text-[#F7E39F]" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-primary">
                <Linkedin className="h-5 w-5 text-[#F7E39F]" />
              </Link>
            </div>
          </div>
        </div>
        <div className=" pt-6 text-center">
          <p className="text-gray-400 text-xs">
            © 2023 - SecureHome Solutions. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            24/7 Emergency Support • 1-800-555-0123
          </p>
        </div>
      </div>
    </footer>
  );
}
