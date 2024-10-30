import { connectionstr } from "@/app/lib/db";
import { FoodsModel } from "@/app/lib/Models/FoodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
    let id = content.params.id
    await mongoose.connect(connectionstr);
  
    const data = await FoodsModel.find({_id:id});
  
    return NextResponse.json({ result: data });
}
  
export async function PUT(req, content) {
    try {
        if (req.method !== 'PUT') {
            return NextResponse.json({ error: 'Invalid request method' }, { status: 405 });
        }

        const { id } = content.params;
        const payload = await req.json();

        if (!id || !payload) {
            return NextResponse.json({ error: 'Invalid ID or payload' }, { status: 400 });
        }
        await mongoose.connect(connectionstr);

        const data = await FoodsModel.findOneAndUpdate(
            { _id: id },
            payload,
            { new: true } 
        );

        if (!data) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }

        return NextResponse.json({ result: data });
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}