import { connectionstr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { RestaurantModel } from "@/app/lib/Models/Restomodels";

export async function GET(request) {

    await mongoose.connect(connectionstr);
    
    let data = await RestaurantModel.find();
    
    data = data.map((item) => {
        if (item.city && typeof item.city === 'string') {
            item.city = item.city.charAt(0).toUpperCase() + item.city.slice(1);
        }
        return item;
    });

    // Create a Set of unique city names
    const uniqueCities = new Set(data.map((item) => item.city));
    
    // Convert the Set to an array to return in the JSON response
    const uniqueCitiesArray = Array.from(uniqueCities);

    return NextResponse.json({ result: true, data: uniqueCitiesArray });
}
