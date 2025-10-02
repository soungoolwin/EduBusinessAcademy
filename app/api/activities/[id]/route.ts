import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadMultipleImagesToBlob } from "@/lib/upload-helper";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const activity = await prisma.activity.findUnique({
      where: { id: params.id },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (activity) {
      return NextResponse.json(activity);
    }
    return new NextResponse("Activity not found", { status: 404 });
  } catch (error) {
    console.error("Error fetching activity:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingActivity = await prisma.activity.findUnique({
      where: { id: params.id },
      include: {
        images: true,
      },
    });

    if (!existingActivity) {
      return new NextResponse("Activity not found", { status: 404 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const longDescription = formData.get("longDescription") as string;
    const imageFiles = formData.getAll("images") as File[];
    const keepExisting = formData.get("keepExistingImages") === "true";

    console.log("=== PUT Activity Debug ===");
    console.log("Number of new images:", imageFiles.length);
    console.log("Keep existing images:", keepExisting);

    // Upload new images
    let newImageUrls: string[] = [];
    let primaryImageUrl = existingActivity.imageUrl;

    if (imageFiles && imageFiles.length > 0) {
      const validFiles = imageFiles.filter(file => file && file.size > 0);
      if (validFiles.length > 0) {
        newImageUrls = await uploadMultipleImagesToBlob(validFiles);
        if (!keepExisting && newImageUrls.length > 0) {
          primaryImageUrl = newImageUrls[0];
        }
        console.log(`✅ Uploaded ${newImageUrls.length} new images`);
      }
    }

    // Note: Old images in Vercel Blob will remain but database references will be removed
    // For local dev, old files in public/uploads will remain (this is acceptable)

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    // Update activity
    const updatedActivity = await prisma.activity.update({
      where: { id: params.id },
      data: {
        title,
        shortDescription,
        longDescription,
        slug,
        imageUrl: primaryImageUrl,
        ...(keepExisting 
          ? {
              images: {
                create: newImageUrls.map((url, index) => ({
                  url,
                  order: existingActivity.images.length + index,
                })),
              },
            }
          : {
              images: {
                deleteMany: {},
                create: newImageUrls.map((url, index) => ({
                  url,
                  order: index,
                })),
              },
            }
        ),
      },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    console.log(`✅ Activity updated with ${updatedActivity.images.length} total images`);
    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error);
    return NextResponse.json(
      { error: "Failed to update activity" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const activityToDelete = await prisma.activity.findUnique({
      where: { id: params.id },
    });

    if (!activityToDelete) {
      return new NextResponse("Activity not found", { status: 404 });
    }

    // Note: Images in Vercel Blob or local uploads folder will remain
    // Database references will be removed automatically via onDelete: Cascade

    await prisma.activity.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error("Error deleting activity:", error);
    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 }
    );
  }
}
