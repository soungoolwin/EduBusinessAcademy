import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Target,
  Eye,
  Heart,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Smartphone,
  Network,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About EduBusiness Academy
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A Social Enterprise dedicated to empowering Myanmar's
            entrepreneurial ecosystem through comprehensive business support and
            vocational development.
          </p>
        </div>

        {/* Who We Are */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Who We Are</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              EduBusiness Academy is a Social Enterprise providing vocational
              development and affordable, comprehensive business support
              services to MSMEs, Start-ups, and Young Entrepreneurs in Myanmar.
              We believe in the power of local entrepreneurship to drive
              sustainable economic growth and community development.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our approach is rooted in practical, hands-on support that
              addresses the real challenges faced by emerging businesses in
              Myanmar's dynamic market environment.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To encourage local entrepreneurship and support business
                  development in Myanmar through comprehensive, affordable
                  services that create sustainable growth opportunities for
                  MSMEs, Start-ups, and Young Entrepreneurs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-teal-50 border-teal-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To be Myanmar's leading catalyst for entrepreneurial success,
                  creating a thriving ecosystem where businesses of all sizes
                  can flourish and contribute to the nation's economic
                  prosperity and social development.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our focus ensures that community success comes before profit
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Inclusive Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Supporting entrepreneurs from all backgrounds, with special
                  focus on women and youth
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Sustainable Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Creating lasting change through education, mentorship, and
                  strategic support
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Services Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Comprehensive Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-emerald-600" />
                  <CardTitle className="text-lg">Business Coaching</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Close monitoring and strategic consulting for sustainable
                  business growth
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-teal-600" />
                  <CardTitle className="text-lg">Job Creation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Creating employment opportunities through business development
                  initiatives
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-lg">Financial Linkage</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connecting businesses with financial resources and advisory
                  services
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-rose-600" />
                  <CardTitle className="text-lg">Marketing Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sales promotion strategies and market penetration support
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-lg">Technology Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Technology solutions and digital transformation assistance
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Network className="h-6 w-6 text-orange-600" />
                  <CardTitle className="text-lg">Networking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Building connections and fostering collaborative business
                  relationships
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Target Customers */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Target Customers
          </h2>
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We serve MSMEs, Start-ups, Women, and Young Entrepreneurs in
                Myanmar who need quality skilled labor, comprehensive business
                support, and strategic advice to grow their ventures
                successfully.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Primary Focus Areas:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Small and Medium Enterprises (MSMEs)</li>
                    <li>• Early-stage Start-ups</li>
                    <li>• Women Entrepreneurs</li>
                    <li>• Young Business Leaders</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Support Areas:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Business strategy development</li>
                    <li>• Market access facilitation</li>
                    <li>• Skill development programs</li>
                    <li>• Financial planning and linkage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
