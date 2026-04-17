import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/api/lib/prisma";

// GET — fetch prescriptions for the logged-in doctor
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user record with role-specific data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        doctor: true,
        patient: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let prescriptions;

    if (user.role === "DOCTOR") {
      if (!user.doctor) {
        return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 });
      }
      prescriptions = await prisma.prescription.findMany({
        where: { doctorId: user.doctor.id },
        include: {
          patient: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (user.role === "PATIENT") {
      if (!user.patient) {
        return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
      }
      prescriptions = await prisma.prescription.findMany({
        where: { patientId: user.patient.id },
        include: {
          doctor: {
            include: {
              user: {
                select: { name: true }
              }
            }
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      return NextResponse.json({ error: "Invalid role for prescriptions" }, { status: 403 });
    }

    return NextResponse.json({ prescriptions });
  } catch (error) {
    console.error("GET /api/prescriptions error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — create a new prescription
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      patientId,
      medication,
      dosage,
      frequency,
      duration,
      refills,
      instructions,
    } = await req.json();

    if (!patientId || !medication) {
      return NextResponse.json({ error: "Patient and Medication are required" }, { status: 400 });
    }

    // Find doctor record
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { doctor: true },
    });

    if (!user || !user.doctor) {
      return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 });
    }

    // Create prescription
    const prescription = await prisma.prescription.create({
      data: {
        doctorId: user.doctor.id,
        patientId,
        medication,
        dosage,
        frequency,
        duration,
        refills: parseInt(refills) || 0,
        instructions,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ success: true, prescription });
  } catch (error) {
    console.error("POST /api/prescriptions error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
