import { connectionstr } from "@/app/lib/db";
import { DeliveryModel } from "@/app/lib/Models/DeliveryModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionstr);

  const data = await DeliveryModel.find();
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
    data = new DeliveryModel(payload);
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
