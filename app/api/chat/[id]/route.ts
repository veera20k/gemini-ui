import connect from "@/lib/mongo/client";
import ChatModel from "@/lib/mongo/models/Chat";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await connect();
        const chat = await ChatModel.findOne({ _id: id }, 'conversations');
        return NextResponse.json(chat)
    } catch (error) {
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const { name, conversations } = await req.json();
        await connect();
        const updateContent: Partial<{ name: string; conversations: unknown[] }> = {};
        if (name) {
            updateContent.name = name;
        };
        if (conversations) {
            updateContent.conversations = conversations;
        }
        const chat = await ChatModel.updateOne({ _id: id }, { ...updateContent });
        return NextResponse.json(chat);
    } catch (error) {
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await connect();
        const chat = await ChatModel.deleteOne({ _id: id });
        return NextResponse.json(chat)
    } catch (error) {
        return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })
    }
}