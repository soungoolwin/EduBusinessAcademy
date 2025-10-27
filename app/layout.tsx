import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduBusiness Academy - Empowering Myanmar Entrepreneurs",
  description:
    "Social Enterprise providing vocational development and comprehensive business support services to MSMEs, Start-ups, and Young Entrepreneurs in Myanmar.",
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  openGraph: {
    title: "EduBusiness Academy",
    description: "Empowering MSMEs, Start-ups, and Young Entrepreneurs in Myanmar",
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "EduBusiness Academy",
    description: "Empowering MSMEs, Start-ups, and Young Entrepreneurs in Myanmar",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
