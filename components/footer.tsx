import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 relative">
                <Image
                  src="/logo.png"
                  alt="EduBusiness Academy Logo"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-2xl">EduBusiness Academy</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed text-sm">
              Empowering MSMEs, Start-ups, and Young Entrepreneurs in Myanmar
              through comprehensive business support services and vocational
              development programs.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 font-medium">
                Follow us:
              </span>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/people/EduBusiness-Academy/61563441478165/"
                  className="w-9 h-9 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-emerald-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-sm"
                >
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-sm"
                >
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-sm"
                >
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/activities"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-sm"
                >
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-sm"
                >
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Videos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-sm"
                >
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-emerald-400">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:info@edubusiness.academy"
                className="flex items-start gap-3 group hover:bg-gray-800 p-2 -ml-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600/30 transition-colors">
                  <Mail className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-gray-300 text-sm">
                  <p className="text-gray-400 text-xs mb-0.5">Email</p>
                  <p className="group-hover:text-emerald-400 transition-colors">
                    info@edubusiness.academy
                  </p>
                </div>
              </a>
              <a
                href="tel:+959785341840"
                className="flex items-start gap-3 group hover:bg-gray-800 p-2 -ml-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600/30 transition-colors">
                  <Phone className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-gray-300 text-sm">
                  <p className="text-gray-400 text-xs mb-0.5">Phone</p>
                  <p className="group-hover:text-emerald-400 transition-colors">
                    +95 9 785 341 840
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 EduBusiness Academy. All rights reserved.
            </p>
            <p className="text-emerald-400 text-sm font-medium">
              Empowering Myanmar's Entrepreneurs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
