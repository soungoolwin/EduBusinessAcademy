import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { ImageCarousel } from "@/components/image-carousel";

interface ActivityImage {
  id: string;
  url: string;
  order: number;
}

interface Activity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  images: ActivityImage[];
  createdAt: string;
  updatedAt: string;
}

async function getActivities(): Promise<Activity[]> {
  try {
    // Use VERCEL_URL for production or localhost for development
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
    
    const url = `${baseUrl}/api/activities`;

    console.log("Fetching activities from:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch activities, status:", res.status);
      return [];
    }

    const data = await res.json();
    console.log("Fetched activities:", data.length);
    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-4">
            Our Activities
          </h1>
          <p className="text-emerald-50 text-center text-lg max-w-2xl mx-auto">
            Discover our engaging programs and events designed to enhance
            learning and development
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6">
        {activities.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No activities yet
            </h2>
            <p className="text-gray-500">
              Check back soon for upcoming activities and events!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {activities.map((activity) => (
              <Card
                key={activity.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <ImageCarousel
                    images={
                      activity.images && activity.images.length > 0
                        ? activity.images
                        : [{ id: "primary", url: activity.imageUrl, order: 0 }]
                    }
                    alt={activity.title}
                    className="w-full h-full"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                      Activity
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={activity.createdAt}>
                      {new Date(activity.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </time>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {activity.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {activity.shortDescription}
                  </p>
                  <Link href={`/activities/${activity.slug}`}>
                    <Button
                      size="sm"
                      className="w-full group/btn bg-emerald-600 hover:bg-emerald-700"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
