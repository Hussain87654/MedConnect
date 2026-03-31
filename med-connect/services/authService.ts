import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function saveData(name: string, email: string, password: string) {
  const found = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (found) throw new Error("User Already Exist");

  const hashedPassword = await hash(password, 12);

  // 'tx' ko 'Prisma.TransactionClient' ki type do
  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const newUser = await tx.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "PATIENT", 
      },
    });

    await tx.patient.create({
      data: {
        userId: newUser.id,
      }
    });

    return newUser;
  });
}