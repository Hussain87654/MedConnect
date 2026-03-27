import { NextResponse } from "next/server";
import { saveData } from "../../../../../services/authService";

export async function POST(req) {

  try {

  const body = await req.json().catch(() => null);

  if(!body) {
    return NextResponse.json(
      {message : "Body Is Empty Or Invalid Json"},
      {status : 400}
    );
  }

  const {email , password} = body ;

  if(!email , !password) {
    NextResponse.json(
      {message : "Email Or Password Are Required !"}, 
      {status : 400}
    )
  }

  saveData(email , password);

  return NextResponse.json(
    { message: "New User Added"}, 
    { status: 200 }
  );
  } catch (e) {
    return NextResponse.json(
    { error: e.message || "Something went wrong" },
    {status : 500}
  )
  }
} 

