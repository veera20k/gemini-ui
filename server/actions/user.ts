'use server'

import connect from '@/lib/mongo/client';
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"
import User from "@/lib/mongo/models/User";
import { MongoError } from 'mongodb';

export async function signUp(formData: FormData) {
    try {
        const userName = formData.get('userName') as string;
        const image = formData.get('image') as string;
        await connect();
        const { _id } = await User.create({ userName, image });
        const token = jwt.sign({ _id, userName, image }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
        cookies().set('session', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 });
        return { userName };
    } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
            throw new Error("User name already exists. Please choose another.");
        }
        throw new Error('Error signing up. Try again later.');
    }
}

export async function logout() {
    cookies().set('session', '', { maxAge: 0 });
}

export const checkUserNameAvailability = async (userName: string) => {
    try {
        await connect();
        const user = await User.findOne({ userName });
        return !user;
    } catch (error) {
        return false;
    }
}
