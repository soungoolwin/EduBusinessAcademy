import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  Smartphone,
  Network,
  Globe,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive business support services designed to empower MSMEs,
            Start-ups, and Young Entrepreneurs in Myanmar with the tools they
            need to succeed.
          </p>
        </div>

        {/* Services Overview */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Our Services?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our comprehensive business support services are designed with a
                deep understanding of Myanmar's business landscape. We provide
                practical, affordable solutions that address real challenges
                faced by emerging businesses.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-700">Affordable & Accessible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-700">Locally Focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-700">Results-Driven</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Service Categories
          </h2>

          <div className="space-y-8">
            {/* Business Support & Coaching */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-emerald-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-800">
                      Business Support & Coaching
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardDescription className="text-base text-gray-700 mb-4">
                    Our experienced consultants provide close monitoring and
                    strategic guidance to help your business navigate challenges
                    and capitalize on opportunities.
                  </CardDescription>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>
                      • Support Business Matching, Business Exchange based on
                      each requirements
                    </li>
                    <li>• Strategic business planning and development</li>
                    <li>• Performance monitoring and analysis</li>
                    <li>• Problem-solving and crisis management</li>
                    <li>• Growth strategy implementation</li>
                  </ul>
                  <Button
                    asChild
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Link href="/contact">Get Consulting Support</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Job Creation */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-teal-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-teal-800">
                      Job Creation
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardDescription className="text-base text-gray-700 mb-4">
                    We actively work to create sustainable employment
                    opportunities through business development initiatives and
                    strategic partnerships.
                  </CardDescription>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• Employment opportunity identification</li>
                    <li>• Skills matching and placement</li>
                    <li>• Workforce development programs</li>
                    <li>• Sustainable job creation strategies</li>
                  </ul>
                  <Button asChild className="bg-teal-600 hover:bg-teal-700">
                    <Link href="/contact">Learn About Opportunities</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Financial Linkage & Advisory */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-green-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800">
                      Financial Linkage & Advisory
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardDescription className="text-base text-gray-700 mb-4">
                    Connect with financial resources and receive expert advisory
                    services to secure funding and manage your business finances
                    effectively.
                  </CardDescription>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• Financial planning and budgeting</li>
                    <li>• Funding source identification</li>
                    <li>• Investment readiness preparation</li>
                    <li>• Financial management training</li>
                  </ul>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/contact">Get Financial Guidance</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Marketing & Sales Promotion */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-rose-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-rose-800">
                      Marketing & Sales Promotion
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardDescription className="text-base text-gray-700 mb-4">
                    Develop effective marketing strategies and sales promotion
                    tactics to reach your target market and grow your customer
                    base.
                  </CardDescription>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• Market research and analysis</li>
                    <li>• Brand development and positioning</li>
                    <li>• Digital marketing strategies</li>
                    <li>• Sales process optimization</li>
                  </ul>
                  <Button asChild className="bg-rose-600 hover:bg-rose-700">
                    <Link href="/contact">Boost Your Marketing</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Technology Support */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-purple-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-800">
                      Technology Support
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardDescription className="text-base text-gray-700 mb-4">
                    Leverage technology to streamline operations, improve
                    efficiency, and stay competitive in the digital marketplace.
                  </CardDescription>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• Digital transformation consulting</li>
                    <li>• Technology solution recommendations</li>
                    <li>• Connecting for technology acquisition.</li>
                    <li>• System implementation support</li>
                    <li>• Digital skills training</li>
                    <li>• Business Website Development</li>
                  </ul>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <Link href="/contact">Explore Tech Solutions</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Human Resource Development & Networking */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-orange-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Network className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-800">
                      HR Development & Networking
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardDescription className="text-base text-gray-700 mb-4">
                    Build strong teams and valuable business networks through
                    our comprehensive human resource development and networking
                    programs.
                  </CardDescription>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• Team building and leadership development</li>
                    <li>• Professional networking events</li>
                    <li>• Mentorship program connections</li>
                    <li>• Industry collaboration facilitation</li>
                  </ul>
                  <Button asChild className="bg-orange-600 hover:bg-orange-700">
                    <Link href="/contact">Join Our Network</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Product Enhancement */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-cyan-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-cyan-800">
                      Product Enhancement
                    </h3>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardDescription className="text-base text-gray-700 mb-4">
                    Improve product quality and packaging to access both local
                    and international markets, expanding your business reach and
                    revenue potential.
                  </CardDescription>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• Product quality assessment and improvement</li>
                    <li>• Packaging design and optimization</li>
                    <li>• Market entry strategy development</li>
                    <li>• International trade facilitation</li>
                  </ul>
                  <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                    <Link href="/contact">Enhance Your Products</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-900 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Our comprehensive services are designed to support you at every
            stage of your business journey. Let's work together to achieve your
            entrepreneurial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-gray-700 hover:bg-white hover:text-gray-900"
            >
              <Link href="/programs">View Our Programs</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
