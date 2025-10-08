"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import LogoModal from "./logo-modal";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/activities", label: "Activities" },
    { href: "/videos", label: "Videos" },
    { href: "/entrepreneurs/apply", label: "Join Incubator" },
    { href: "/investors/apply", label: "Become Partner" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="shadow-md border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Logo */}
          <div className="flex items-center gap-4">
            {/* Logo Image - Opens Modal */}
            <button
              onClick={() => setLogoModalOpen(true)}
              className="w-24 h-24 relative hover:scale-105 transition-transform cursor-pointer group"
              aria-label="View logo story"
            >
              <Image
                src="/logo.png"
                alt="EduBusiness Academy Logo"
                width={96}
                height={96}
                className="object-contain"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors" />
            </button>

            {/* Text - Links to Home */}
            <Link href="/" className="flex flex-col group">
              <span className="font-bold text-xl text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
                EduBusiness Academy
              </span>
              <span className="text-xs text-emerald-600 font-medium">
                Empower the Future
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(item.href)
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-emerald-50"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] px-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setLogoModalOpen(true);
                    }}
                    className="w-20 h-20 relative hover:scale-105 transition-transform group"
                    aria-label="View logo story"
                  >
                    <Image
                      src="/logo.png"
                      alt="EduBusiness Academy Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors" />
                  </button>
                  <span className="font-bold text-lg text-gray-900">Menu</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg py-3 px-4 text-base font-medium transition-all ${
                      isActive(item.href)
                        ? "text-emerald-600 bg-emerald-50 shadow-sm"
                        : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Logo Story Modal */}
      <LogoModal
        isOpen={logoModalOpen}
        onClose={() => setLogoModalOpen(false)}
      />
    </nav>
  );
}
