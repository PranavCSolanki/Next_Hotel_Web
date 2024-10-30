import { connectionstr } from "@/app/lib/db";
import { RestaurantModel } from "@/app/lib/Models/Restomodels";
import mongoose from "mongoose";
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
     await mongoose.connect(connectionstr);

    const data = await RestaurantModel.findOne({
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
