import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Compass, Users, GraduationCap, Target, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Programs</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Specialized programs designed to guide entrepreneurs and strengthen community networks through practical
            learning and strategic development.
          </p>
        </div>

        {/* Programs Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Business Compass Program */}
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Business Compass Program</h2>
                  <p className="text-emerald-100">Your Guide to Strategic Business Growth</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Strategic Planning
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Market Research
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Field Research
                </Badge>
              </div>
            </div>
            <CardContent className="p-8">
              <CardDescription className="text-base text-gray-700 mb-6">
                A specialized course designed by EduBusiness Academy that serves as your strategic roadmap for business
                development. Through comprehensive Marketing Research and practical Mini Field Research, this program
                helps businesses navigate their direction with precision, just like a compass guides travelers.
              </CardDescription>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">Program Highlights:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span className="text-gray-700">Strategic business direction planning</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span className="text-gray-700">Hands-on market research training</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span className="text-gray-700">Mini field research projects</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span className="text-gray-700">Practical business navigation tools</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-emerald-800 mb-2">Why "Business Compass"?</h4>
                <p className="text-emerald-700">
                  Just as a compass provides direction to travelers, our Business Compass Program provides strategic
                  direction to entrepreneurs. Through marketing research and field studies, you'll gain the insights
                  needed to navigate your business toward success.
                </p>
              </div>

              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link href="/contact">Enroll in Business Compass</Link>
              </Button>
            </CardContent>
          </Card>

          {/* 60+ Program */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">60+ Program</h2>
                  <p className="text-teal-100 text-sm">Community Network Strengthening</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <CardDescription className="text-gray-700 mb-4">
                A specialized program focused on strengthening balanced community networks, initially including
                Teenagers, Youth, and Women.
              </CardDescription>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700">Network building</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700">Community engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700">Balanced representation</span>
                </div>
              </div>

              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                <Link href="/contact">Join 60+ Program</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Vocational Training */}
        <section className="mb-16">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-purple-500 to-pink-600 text-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Vocational Training</h2>
                  <p className="text-purple-100">On-the-Job Learning for Employment</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <CardDescription className="text-base text-gray-700 mb-6">
                  Our On-the-Job Training (OJT) program provides practical, hands-on learning experiences directly at
                  MSME businesses, creating immediate employment opportunities while building essential skills.
                </CardDescription>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Training Features:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        Real workplace experience
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        Direct employment pathways
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        Skill-based learning
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Benefits:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        Immediate income potential
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        Industry connections
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        Career advancement
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-purple-800 font-medium">
                    💼 Training Format: Direct placement at MSME businesses for hands-on learning
                  </p>
                </div>

                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/contact">Apply for Vocational Training</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Program Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Path</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-6 font-semibold text-gray-900">Program</th>
                  <th className="text-left p-6 font-semibold text-gray-900">Focus</th>
                  <th className="text-left p-6 font-semibold text-gray-900">Duration</th>
                  <th className="text-left p-6 font-semibold text-gray-900">Target Audience</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Compass className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Business Compass</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-700">Strategic Planning & Market Research</td>
                  <td className="p-6 text-gray-700">8-12 weeks</td>
                  <td className="p-6 text-gray-700">MSMEs & Start-ups</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-teal-600" />
                      <span className="font-medium">60+ Program</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-700">Community Network Building</td>
                  <td className="p-6 text-gray-700">Ongoing</td>
                  <td className="p-6 text-gray-700">Teenagers, Youth, Women</td>
                </tr>
                <tr className="border-t">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Vocational Training</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-700">On-the-Job Skills Development</td>
                  <td className="p-6 text-gray-700">3-6 months</td>
                  <td className="p-6 text-gray-700">Job Seekers & Career Changers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Choose the program that best fits your goals and join our community of successful entrepreneurs and skilled
            professionals. Our expert team is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Link href="/contact">Get Program Information</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-emerald-600"
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
