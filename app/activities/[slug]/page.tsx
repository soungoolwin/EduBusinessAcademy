import { notFound } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import { ImageGallery } from "@/components/image-gallery";
import { prisma } from "@/lib/prisma";

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

async function getActivity(slug: string): Promise<Activity | null> {
  try {
    // Fetch directly from database
    const activity = await prisma.activity.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!activity) return null;

    // Convert to plain object with string dates
    return {
      ...activity,
      createdAt: activity.createdAt.toISOString(),
      updatedAt: activity.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
}

export default async function ActivityDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const activity = await getActivity(params.slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <Link href="/activities">
            <Button
              variant="ghost"
              className="mb-6 -ml-4 text-white hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Activities
            </Button>
          </Link>
          <Badge className="bg-white/20 hover:bg-white/30 text-white mb-4 border-0">
            Activity
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {activity.title}
          </h1>
          <div className="flex items-center gap-2 text-white/90">
            <Calendar className="h-4 w-4" />
            <time dateTime={activity.createdAt}>
              {new Date(activity.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-8 px-4 md:px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <ImageGallery
                images={
                  activity.images && activity.images.length > 0
                    ? activity.images
                    : [{ id: "primary", url: activity.imageUrl, order: 0 }]
                }
                alt={activity.title}
              />
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-emerald-700">
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {activity.shortDescription}
                </p>

                <h2 className="text-xl font-semibold mb-3 text-emerald-700">
                  Details
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {activity.longDescription}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Activity Info
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Published</p>
                    <p className="font-medium text-gray-900">
                      {new Date(activity.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">
                      {new Date(activity.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  {activity.images && activity.images.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Images</p>
                      <p className="font-medium text-gray-900">
                        {activity.images.length} photos
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Link href="/contact">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
