import { connectionstr } from "@/app/lib/db";
import mongoose from "mongoose";
import { UserModel } from "@/app/lib/Models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  const requiredFields = ["email", "password"];

  for (const field of requiredFields) {
    if (!payload[field]) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }

  try {
    mongoose.connect(connectionstr);

    const data = await UserModel.findOne({
      email: payload.email,
      password: payload.password,
    }).lean();;

    delete data.password

    if (!data) {
      return NextResponse.json(
        { error: "Invalid credentials", result:false },
        { status: 401 }
      );
    }

    return NextResponse.json({ result: true,data:data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}