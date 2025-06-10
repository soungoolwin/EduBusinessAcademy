import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  TrendingUp,
  Globe,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            EduBusiness Academy
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            Empowering MSMEs, Start-ups, and Young Entrepreneurs in Myanmar
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Providing affordable vocational development and comprehensive
            business support services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/about">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            As a Social Enterprise, we foster entrepreneurship and contribute to
            business development in Myanmar at the local level. Our non-profit
            financial focus is dedicated to the success of MSMEs and Start-ups,
            creating sustainable growth and opportunities for our community.
          </p>
        </div>
      </section>

      {/* Key Offerings */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Key Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Business Support & Coaching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Close monitoring and strategic coaching to guide your business
                  growth
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Human Resource Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Networking opportunities and skill development for sustainable
                  growth
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Marketing & Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sales promotion strategies and technology support for market
                  expansion
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Who We Serve
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">MSMEs</h3>
              <p className="text-gray-600 text-sm">
                Small and Medium Enterprises seeking growth
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Start-ups</h3>
              <p className="text-gray-600 text-sm">
                New businesses needing comprehensive support
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Young Entrepreneurs
              </h3>
              <p className="text-gray-600 text-sm">
                Emerging business leaders and innovators
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Women Entrepreneurs
              </h3>
              <p className="text-gray-600 text-sm">
                Supporting women in business leadership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
          <p className="text-lg text-gray-700 mb-8">
            We are committed to creating lasting change in Myanmar's business
            landscape through education, support, and sustainable development
            practices.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                100+
              </div>
              <div className="text-gray-700">Businesses Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                300+
              </div>
              <div className="text-gray-700">Jobs Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                10+
              </div>
              <div className="text-gray-700">Training Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join our community of successful entrepreneurs and start your
            journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/programs">View Our Programs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white hover:bg-white hover:text-gray-900 text-gray-700"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
