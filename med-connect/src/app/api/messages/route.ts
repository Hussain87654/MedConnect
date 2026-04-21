import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma";

export async function GET(request: Request) {
  try {
    const messages = await (prisma as any).message.findMany({
      include: {
        user: {
          select: {
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 100, // Reasonable limit for chat room
    });

    const formattedMessages = (messages as any[]).map((m: any) => ({
      id: m.id,
      content: m.content,
      createdAt: m.createdAt.toISOString(),
      senderName: m.user.name,
      senderRole: m.user.role,
      userId: m.userId,
    }));

    return NextResponse.json({ messages: formattedMessages });
  } catch (e: any) {
    console.error("Error fetching messages:", e);
    return NextResponse.json(
      { errorMessage: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, content } = body;

    if (!userId || !content) {
      return NextResponse.json(
        { errorMessage: "Missing required fields" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { errorMessage: "User not found" },
        { status: 404 }
      );
    }

    const message = await (prisma as any).message.create({
      data: {
        userId,
        content,
      },
      include: {
        user: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    const formattedMessage = {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt.toISOString(),
      senderName: message.user.name,
      senderRole: message.user.role,
      userId: message.userId,
    };

    return NextResponse.json(
      { message: "Message sent successfully", data: formattedMessage },
      { status: 201 }
    );
  } catch (e: any) {
    console.error("Error saving message:", e);
    return NextResponse.json(
      { errorMessage: "Internal Server Error" },
      { status: 500 }
    );
  }
}
