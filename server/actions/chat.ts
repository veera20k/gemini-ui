'use server'

import connect from "@/lib/mongo/client";
import { Chat, Conversation } from "@/types/chat";
import ChatModel from '../../lib/mongo/models/Chat';
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const saveChat = async (conversations: Conversation[], _id?: string, name?: string) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return;
    }
    const userId = session?.user?._id;
    try {
        await connect();
        if (_id) {
            await ChatModel.updateOne({ _id }, { conversations, name });
            return;
        }
        const res = await ChatModel.create({ conversations, name: 'New Chat', user: userId });
        return { _id: res._id?.toString(), name: res.name };
    } catch (error) {
        console.log(error);
    }
}


export const getChatListMeta = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return [];
    }
    try {
        await connect();
        const chats = await ChatModel.find({}, '_id name');
        return JSON.parse(JSON.stringify(chats));
    } catch (error) {
        console.log(error);
    }
}

export const renameChat = async (_id: string, name: string) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return;
    }
    try {
        await connect();
        await ChatModel.updateOne({ _id }, { name });
    } catch (error) {
        console.log(error);
    }
}

export const deleteChat = async (_id: string) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return;
    }
    try {
        await connect();
        await ChatModel.deleteOne({ _id });
    } catch (error) {
        console.log(error);
    }
}

export const getChat = async (_id: string): Promise<Chat | null> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return null;
    }
    try {
        await connect();
        return ChatModel.findOne({ _id });
    } catch (error) {
        return null;
    }
}


