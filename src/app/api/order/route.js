import { connectionstr } from "@/app/lib/db";
import { OrderModel } from "@/app/lib/Models/OrderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const payload = await req.json();

    const requiredFields = [
      "user_id",
      "foodItems",
      "restaurantId",
      "deleveryboy_id",
      "status",
      "amount",
    ];

    for (const field of requiredFields) {
      if (!payload[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    await mongoose.connect(connectionstr);

    let data = new OrderModel(payload);

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

export async function GET(req, content) {
  const userid = req.nextUrl.searchParams.get("id");
  let id = userid;

  await mongoose.connect(connectionstr);

  const data = await OrderModel.find({ user_id: id });

  return NextResponse.json({ data: data, success: true });
}
