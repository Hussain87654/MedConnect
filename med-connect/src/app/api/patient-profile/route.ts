import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/api/lib/prisma";

// GET — fetch patient profile
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { patient: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ patient: user.patient });
  } catch (error) {
    console.error("GET /api/patient-profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — create or update patient profile (upsert)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      fullName,
      dateOfBirth,
      bloodGroup,
      gender,
      allergies,
      medicalHistory,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactPhone,
    } = body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Upsert patient record
    const patient = await prisma.patient.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        fullName: fullName || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        bloodGroup: bloodGroup || null,
        gender: gender || null,
        allergies: allergies || [],
        medicalHistory: medicalHistory || null,
        emergencyContactName: emergencyContactName || null,
        emergencyContactRelationship: emergencyContactRelationship || null,
        emergencyContactPhone: emergencyContactPhone || null,
      },
      update: {
        fullName: fullName || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        bloodGroup: bloodGroup || null,
        gender: gender || null,
        allergies: allergies || [],
        medicalHistory: medicalHistory || null,
        emergencyContactName: emergencyContactName || null,
        emergencyContactRelationship: emergencyContactRelationship || null,
        emergencyContactPhone: emergencyContactPhone || null,
      },
    });

    // Also update user's name if fullName provided
    if (fullName) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name: fullName },
      });
    }

    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("POST /api/patient-profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
