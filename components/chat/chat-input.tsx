import React, { useRef, useState } from 'react';
import { IconBrandTelegram } from '@tabler/icons-react';
import Suggestions from './suggestion/suggestions';
import useChatStore from '@/state/chatStore';

export default function ChatInput() {
    const { getAllCurrentConvo, textInputSubmit } = useChatStore();
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const [isDisabled, setDisabled] = useState(true);

    const onChange = () => {
        setDisabled(!chatInputRef.current?.value);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const prompt = chatInputRef.current?.value;
        if (!prompt) return;
        textInputSubmit(prompt);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className={`absolute bottom-5 w-8/12 max-sm:w-11/12 left-1/2 -translate-x-1/2 group`}>
                {!getAllCurrentConvo().length && <Suggestions />}
                <textarea
                    className={`block w-full px-3 py-4 text-md text-gray-900 outline-gray-300 border hover:outline-cyan-600 rounded-xl transition duration-300 ease-in-out resize-none overflow-y-auto max-h-[300px] `}
                    placeholder="Message Gemini..."
                    required
                    rows={1}
                    ref={chatInputRef}
                    onChange={onChange}
                />
                <button
                    type="submit"
                    disabled={isDisabled}
                    className={`text-white opacity-100 absolute end-2 bottom-2.5 bg-cyan-500 hover:bg-cyan-600 focus:outline-none font-medium rounded-lg text-sm p-1.5 ${isDisabled && 'cursor-not-allowed disabled:opacity-5'}`}>
                    <IconBrandTelegram />
                </button>
            </div>
        </form>
    );
}
