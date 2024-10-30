import { connectionstr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { RestaurantModel } from "@/app/lib/Models/Restomodels";
import { FoodsModel } from "@/app/lib/Models/FoodsModel";

export async function GET(request, content) {
    const id = content.params.id;

    await mongoose.connect(connectionstr);

    const data = await RestaurantModel.findOne({ _id: id });
    const food = await FoodsModel.find({ restaurantId: id });

    return NextResponse.json({ result: true, data: data, food: food });
}
