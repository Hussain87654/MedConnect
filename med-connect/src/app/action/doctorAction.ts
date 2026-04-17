"use server"
import prisma from '@/lib/prisma'

export async function saveDoctorProfile(data: any) {
  try {
    const response = await prisma.doctor.create({
      data: {
        specialization: data.specialization,
        qualifications: data.qualifications,
        experience: parseInt(data.experience),
        fee: parseInt(data.fee),
        bio: data.bio || null,
        isAvailable: data.isAvailable,
        user: {
          create: {
            name: data.name || "Practitioner",
            email: `doc${Math.random()}@clinical.com`,
            role: "DOCTOR"
          }
        },
        availableSlots: {
          create: data.slots.map((s: any) => ({
            day: s.day,
            startTime: s.startTime,
            endTime: s.endTime,
          }))
        }
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: "Database error" }
  }
}