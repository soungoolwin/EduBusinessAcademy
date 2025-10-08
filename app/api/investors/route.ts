import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Configure for larger body size and longer timeout
export const runtime = "nodejs";
export const maxDuration = 60;

// GET - Fetch all investor applications (for admin)
export async function GET() {
  try {
    const applications = await prisma.investorApplication.findMany({
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
    console.error("Error fetching investor applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch investor applications" },
      { status: 500 }
    );
  }
}

// POST - Create new investor application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phoneNumber,
      organization,
      address,
      socialWebsite,
      financialInvestor,
      advisorMentor,
      businessPartner,
      otherType,
      sector,
      experienceSkills,
      investmentModel,
    } = body;

    // Validation
    if (!fullName || !email || !phoneNumber || !address || !sector || !experienceSkills || !investmentModel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if at least one investor type is selected
    if (!financialInvestor && !advisorMentor && !businessPartner && !otherType) {
      return NextResponse.json(
        { error: "Please select at least one investor/partner type" },
        { status: 400 }
      );
    }

    // Create investor application
    const application = await prisma.investorApplication.create({
      data: {
        fullName,
        email,
        phoneNumber,
        organization: organization || null,
        address,
        socialWebsite: socialWebsite || null,
        financialInvestor: financialInvestor || false,
        advisorMentor: advisorMentor || false,
        businessPartner: businessPartner || false,
        otherType: otherType || null,
        sector,
        experienceSkills,
        investmentModel,
        status: "pending",
      },
    });

    console.log("✅ Created investor application:", application.id);

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        id: application.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating investor application:", error);
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

