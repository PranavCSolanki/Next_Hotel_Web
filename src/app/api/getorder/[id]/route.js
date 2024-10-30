import { OrderModel } from "@/app/lib/Models/OrderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
    const userid = content.params.id
    // const userid = req.nextUrl.searchParams.get("id");
  
  
  // await mongoose.connect(connectionstr);
  
  console.log(content.params);
  
  
    const data = await OrderModel.find({ deleveryboy_id: userid });
  
    return NextResponse.json({ data: data, success: true });
  }
  