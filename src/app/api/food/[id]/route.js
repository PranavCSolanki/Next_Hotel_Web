import { connectionstr } from "@/app/lib/db";
import { FoodsModel } from "@/app/lib/Models/FoodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
    let restoid = content.params.id
    await mongoose.connect(connectionstr);
  
    const data = await FoodsModel.find({restaurantId:restoid});
  
    return NextResponse.json({ result: data });
  }

export async function DELETE(req, content) {
    let id = content.params.id
    await mongoose.connect(connectionstr);
  
    const data = await FoodsModel.deleteOne({_id:id});
  
    return NextResponse.json({ result: data });
}