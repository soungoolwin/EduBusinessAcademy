import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadMultipleImagesToBlob } from "@/lib/upload-helper";

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const longDescription = formData.get("longDescription") as string;
    const imageFiles = formData.getAll("images") as File[];

    console.log("=== POST Activity Debug ===");
    console.log("Title:", title);
    console.log("Number of images:", imageFiles.length);

    if (!title || !shortDescription || !longDescription) {
      return new NextResponse("Missing required text fields", { status: 400 });
    }

    let imageUrls: string[] = [];
    let primaryImageUrl = "/placeholder.svg";

    // Upload images (works both locally and on Vercel)
    if (imageFiles && imageFiles.length > 0) {
      const validFiles = imageFiles.filter(file => file && file.size > 0);
      if (validFiles.length > 0) {
        imageUrls = await uploadMultipleImagesToBlob(validFiles);
        primaryImageUrl = imageUrls[0];
        console.log(`✅ Uploaded ${imageUrls.length} images`);
      }
    } else {
      console.log("⚠️ No images provided, using placeholder");
    }

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    // Create activity with multiple images
    const newActivity = await prisma.activity.create({
      data: {
        slug,
        title,
        shortDescription,
        longDescription,
        imageUrl: primaryImageUrl,
        images: {
          create: imageUrls.map((url, index) => ({
            url,
            order: index,
          })),
        },
      },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    console.log(`✅ Activity created with ${imageUrls.length} images`);
    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 }
    );
  }
}
