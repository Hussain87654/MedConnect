import { NextResponse } from "next/server";
import {saveData} from "../../../../../services/authService.js"

export async function POST(request) {
  try {
    // 1. Body ko parse karein (await lazmi hai)
    const body = await request.json();
    const { username, email, password } = body;

    // 2. Validation (Check if fields are empty)
    if (!username || !email || !password) {
      return NextResponse.json(
        { errorMessage: "Fields Are Empty" },
        { status: 400 } // 405 ki jagah 400 (Bad Request) behtar hai validation ke liye
      );
    }

    // 3. Data save karein
    // Note: Agar saveData async hai to yahan 'await' lagayein
    await saveData(username, email, password);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

  } catch (e) {
    // 4. Error Handling
    return NextResponse.json(
      { errorMessage: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}