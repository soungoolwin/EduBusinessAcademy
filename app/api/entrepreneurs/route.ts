import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Configure for larger body size and longer timeout
export const runtime = "nodejs";
export const maxDuration = 60;

// GET - Fetch all entrepreneur applications (for admin)
export async function GET() {
  try {
    const applications = await prisma.entrepreneurApplication.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert dates to ISO strings for JSON serialization
    const serializedApplications = applications.map((app) => ({
      ...app,
      createdAt: app.createdAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),
    }));

    return NextResponse.json(serializedApplications);
  } catch (error) {
    console.error("Error fetching entrepreneur applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch entrepreneur applications" },
      { status: 500 }
    );
  }
}

// POST - Create new entrepreneur application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phoneNumber,
      currentOccupation,
      address,
      socialLinks,
      businessName,
      ideaSummary,
      problemSolved,
      targetCustomer,
      businessStage,
      physicalAssets,
      mentalAssets,
      assistanceNeeded,
      expectations,
    } = body;

    // Validation
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !currentOccupation ||
      !address ||
      !ideaSummary ||
      !problemSolved ||
      !businessStage ||
      !physicalAssets ||
      !mentalAssets ||
      !assistanceNeeded ||
      !expectations
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate business stage
    const validStages = ["idea", "research", "testing", "operating"];
    if (!validStages.includes(businessStage)) {
      return NextResponse.json(
        { error: "Invalid business stage" },
        { status: 400 }
      );
    }

    // Create entrepreneur application
    const application = await prisma.entrepreneurApplication.create({
      data: {
        fullName,
        email,
        phoneNumber,
        currentOccupation,
        address,
        socialLinks: socialLinks || null,
        businessName: businessName || null,
        ideaSummary,
        problemSolved,
        targetCustomer: targetCustomer || null,
        businessStage,
        physicalAssets,
        mentalAssets,
        assistanceNeeded,
        expectations,
        status: "pending",
      },
    });

    console.log("✅ Created entrepreneur application:", application.id);

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        id: application.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating entrepreneur application:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      {
        error: "Failed to submit application",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

