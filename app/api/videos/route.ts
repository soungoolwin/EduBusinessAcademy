import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 60;

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

// GET - Fetch all videos
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        order: "asc",
      },
    });

    const serializedVideos = videos.map((video) => ({
      ...video,
      createdAt: video.createdAt.toISOString(),
      updatedAt: video.updatedAt.toISOString(),
    }));

    return NextResponse.json(serializedVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

// POST - Create new video
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, youtubeUrl, order } = body;

    // Validation
    if (!title || !youtubeUrl) {
      return NextResponse.json(
        { error: "Title and YouTube URL are required" },
        { status: 400 }
      );
    }

    // Extract YouTube ID and validate
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // Auto-generate thumbnail URL from YouTube
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

    // Create video
    const video = await prisma.video.create({
      data: {
        title,
        description: description || null,
        youtubeUrl,
        thumbnail,
        order: order || 0,
      },
    });

    console.log("✅ Created video:", video.id);

    return NextResponse.json(
      {
        message: "Video added successfully",
        id: video.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating video:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return NextResponse.json(
      {
        error: "Failed to add video",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

