"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoModal({ isOpen, onClose }: LogoModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="px-8 py-6 border-b bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Logo Story
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                The meaning and vision behind EduBusiness Academy
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 px-8 py-6">
          <div className="space-y-8">
            {/* Logo Display */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="EduBusiness Academy Logo"
                  width={192}
                  height={192}
                  className="object-contain"
                />
              </div>
            </div>

            {/* The Open Book */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-3">
                    📖 The Open Book
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The foundation of our logo is an <strong>open book</strong>,
                    symbolizing <strong>education, knowledge, and wisdom</strong>.
                    This represents the "Edu" in EduBusiness, showing our
                    commitment to providing accessible learning and expertise.
                  </p>
                  <p className="text-emerald-800 font-medium">
                    💡 For SMEs: Knowledge is the foundation of business growth
                    and success.
                  </p>
                </div>
              </div>
            </div>

            {/* The Three Figures */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-3">
                    👥 The Three Figures
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-emerald-800 mb-2">
                        🎓 Central Figure (Red with Graduation Cap)
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Represents <strong>leadership, expertise, and success</strong>.
                        This is the enlightened individual who has gained
                        knowledge and now leads others.
                      </p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-emerald-800 mb-2">
                        🤝 Side Figures (Blue)
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Represent the <strong>community of learners and SMEs</strong>{" "}
                        we support. Their uplifted arms express enthusiasm,
                        achievement, and readiness for growth.
                      </p>
                    </div>
                  </div>
                  <p className="text-emerald-800 font-medium mt-3">
                    💡 Together: Collaboration, empowerment, and shared success.
                  </p>
                </div>
              </div>
            </div>

            {/* Colors Meaning */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">💙 Blue Color</h3>
                <ul className="space-y-2 text-emerald-50">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Trust & Reliability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Professionalism
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Stability & Intelligence
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">❤️ Red Color</h3>
                <ul className="space-y-2 text-emerald-50">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Energy & Passion
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Action & Ambition
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Entrepreneurial Spirit
                  </li>
                </ul>
              </div>
            </div>

            {/* Overall Message */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ✨ Our Vision
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  EduBusiness Academy is a <strong>source of knowledge and expertise</strong>{" "}
                  that empowers individuals and small businesses to{" "}
                  <strong>learn, grow, and achieve success</strong>. We foster a
                  vibrant and supported business community where knowledge becomes
                  the foundation for sustainable growth.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold">
                  <span>Knowledge</span>
                  <span>→</span>
                  <span>Empowerment</span>
                  <span>→</span>
                  <span>Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            Designed with purpose. Built for your success. 🚀
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

