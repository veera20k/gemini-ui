import { NextRequest, NextResponse } from "next/server";
import connect from "../../../lib/mongo/client";
import ChatModel from "@/lib/mongo/models/Chat";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Conversation } from "@/types/chat";

export async function GET() {
    try {
        await connect();
        const chats = await ChatModel.find({}, '_id name');
        return NextResponse.json(chats);
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;
    if (!session || !userId) {
        return NextResponse.json({ message: 'User Info Not Found' }, { status: 500 });
    }
    const { prompt, conversations }: { prompt: string, conversations: Conversation[] } = await req.json();
    try {
        await connect();
        const res = await ChatModel.create({ conversations, name: prompt?.substring(0, 20) || 'New Chat', user: userId });
        return NextResponse.json({ _id: res._id?.toString(), name: res.name });
    } catch (error) {
        NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
