// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="border-b border-blue-900/30  text-white sticky">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/lhasis-logo.png"
            alt="Security lock and chain"
            width={32}
            height={32}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm hover:text-yellow-400 transition-colors ${
                isActive(href) ? "text-yellow-400" : "text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-white w-64">
              <div className="flex items-center justify-between mb-4">
                <Image
                  src="/assets/lhasis-logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-white" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`text-sm hover:text-yellow-400 transition-colors ${
                      isActive(href) ? "text-yellow-400" : "text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
