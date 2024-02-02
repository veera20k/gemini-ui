'use client'

import React from 'react'
import { IconBrandTelegram } from '@tabler/icons-react';
import Suggestions from './suggestion/suggestions';
import useChatStore from '@/state/chatStore';

export default function ChatInput() {
    const { addChat, currentChats } = useChatStore();
    return <div className={`absolute bottom-10 w-8/12 max-sm:w-11/12 left-1/2 -translate-x-1/2 group`}>
       {!currentChats.length && <Suggestions />}
        <textarea
            className={`block w-full p-4 text-sm text-gray-900 outline-gray-300 border  hover:outline-cyan-600 rounded-xl transition duration-300 ease-in-out resize-none overflow-y-auto max-h-[300px] `}
            placeholder="Message Gemini..."
            required
            rows={1}
        />
        <button type="submit" className="text-white absolute end-4 bottom-2 bg-cyan-500 hover:bg-cyan-600 focus:outline-none font-medium rounded-lg text-sm p-1.5" onClick={() => {
            addChat({ id: new Date().getTime(), role: 'user', parts: 'Hi i am veera' })
        }}><IconBrandTelegram /></button>
    </div>
}
