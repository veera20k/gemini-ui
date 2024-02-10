import { NextRequest, NextResponse } from "next/server";
import connect from "../../../lib/mongo/client";
import User from "@/lib/mongo/models/User";

export async function POST(req: NextRequest) {
    const { name, email, image, provider } = await req.json();
    await connect();
    let existingUser = await User.findOne({ email });
    if (existingUser) {
        existingUser.name = name;
        existingUser.image = image;
        existingUser.provider = provider;
        await existingUser.save();
        return NextResponse.json({ message: 'User updated', user: existingUser }, { status: 200 });
    } else {
        let newUser = await User.create({ name, email, image, provider });
        return NextResponse.json({ user: newUser }, { status: 200 });
    }
}

export async function GET(req: NextRequest) {
    const userName = req.nextUrl.searchParams.get("userName");
    if (!userName) {
        return NextResponse.json({ message: 'userName not provided' }, { status: 400 });
    }
    await connect();
    let user = await User.findOne({ userName });
    return NextResponse.json({ user }, { status: 200 });
}