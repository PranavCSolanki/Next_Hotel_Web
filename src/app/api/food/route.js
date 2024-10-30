import { connectionstr } from "@/app/lib/db";
import { FoodsModel } from "@/app/lib/Models/FoodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const payload = await req.json();

    const requiredFields = [
      "name",
      "price",
      "category",
      "description",
      "path",
      "restaurantId",
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

    let data = new FoodsModel(payload);

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
