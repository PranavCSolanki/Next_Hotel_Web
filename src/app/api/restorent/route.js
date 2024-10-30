import { connectionstr } from "@/app/lib/db";
import { RestaurantModel } from "@/app/lib/Models/Restomodels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionstr);

  const data = await RestaurantModel.find();
  console.log(data);

  return NextResponse.json({ result: data });
}
export async function POST(req) {
  const payload = await req.json();
  let data;

  try {
    await mongoose.connect(connectionstr);

    const requiredFields = [
      "name",
      "email",
      "password",
      "city",
      "contact",
      "address",
    ];
    for (const field of requiredFields) {
      if (!payload[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    data = new RestaurantModel(payload);
    data = await data.save();

    return NextResponse.json({ result: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
