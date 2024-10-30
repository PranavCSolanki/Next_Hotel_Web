import { connectionstr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { DeliveryModel } from "@/app/lib/Models/DeliveryModel";

export async function GET(req, content) {
    
    let cities = content.params.city

    let success = false 
    await mongoose.connect(connectionstr)

    let filter = {city : {$regex: new RegExp(cities,'i')}}
    const data = await DeliveryModel.find(filter)


    return NextResponse.json({success:true,city:cities,data:data})
    
}