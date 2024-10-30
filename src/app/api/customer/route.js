import { connectionstr } from "@/app/lib/db";
import mongoose from "mongoose";
import { RestaurantModel } from "@/app/lib/Models/Restomodels";
import { NextResponse } from "next/server";

export async function GET(request) {
  let queryParams = request.nextUrl.searchParams;
  console.log(queryParams.get("loaction"));
  let loaction = queryParams.get("loaction");
  let name = queryParams.get("name");
  let filter = {};
  await mongoose.connect(connectionstr);

  if (name && loaction) {
    filter = {
      name: { $regex: new RegExp(name, 'i') },
    city:{$regex : new RegExp(loaction,'i')}}
  } else 
  if (name) {
    filter = {name:{$regex : new RegExp(name,'i')}};
  } else
  if (loaction) {
    filter = {city:{$regex : new RegExp(loaction,'i')}};
  } 

  const data = await RestaurantModel.find(filter);
  return NextResponse.json({ result: true, data: data });
}
