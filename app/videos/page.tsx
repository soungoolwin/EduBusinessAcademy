import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";

interface Video {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  thumbnail: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Helper function to extract YouTube video ID
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

async function getVideos(): Promise<Video[]> {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return videos.map((video) => ({
      ...video,
      createdAt: video.createdAt.toISOString(),
      updatedAt: video.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Video Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch our latest videos, tutorials, and educational content to help
            grow your business
          </p>
        </div>

        {/* Videos Grid */}
        {videos.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No videos available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => {
              const videoId = extractYouTubeId(video.youtubeUrl);
              return (
                <Card
                  key={video.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-0">
                    {/* YouTube Video Embed */}
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      {videoId ? (
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">Invalid video URL</p>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-gray-600 line-clamp-3">
                          {video.description}
                        </p>
                      )}
                      <div className="mt-4 text-sm text-gray-500">
                        {new Date(video.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        {videos.length > 0 && (
          <div className="mt-16 text-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want More Content?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Subscribe to our YouTube channel for the latest videos, tutorials,
              and business tips delivered regularly.
            </p>
            <a
              href="https://www.youtube.com/@EduBusinessAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
