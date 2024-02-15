'use client'

import useChatStore from '@/state/chatStore';
import Image from 'next/image';
import React, { useEffect } from 'react'
import logo from '../../public/images/logo.png'
import { useSession } from 'next-auth/react';
import { Conversation } from '@/types/chat';

export default function ChatContent({ id }: { id?: string }) {
  const { getAllCurrentConvo, setCurrentChat, setCurrentChatId } = useChatStore();
  const { data: session } = useSession();
  const avatar = session?.user?.image || '';

  useEffect(() => {
    if (id) {
      setCurrentChatId(id);
      fetch(`/api/chat/${id}`).then((res) => res.json()).then((res: { conversations: Conversation[] }) => {
        if (!res) return;
        const conversations = new Map<string, Conversation>();
        res?.conversations?.forEach((c: Conversation) => {
          conversations.set(c.tempId, c);
        });
        setCurrentChat(conversations);
      }).catch((err) => console.log(err));
    }
  }, [])
  return (
    <>{(!getAllCurrentConvo().length && !id) ? <div className='absolute left-1/2 top-[30%] -translate-x-1/2' >
      <Image src={logo} alt="logo" className='h-16 w-16 m-auto animate-pulse' priority />
      <h1 className='text-xl font-bold truncate'>How can i assist you today?</h1>
    </div > : <div className='pt-[70px] h-[89vh] overflow-auto'>
      {getAllCurrentConvo().map((chat) => (
        <div key={chat.tempId} className='flex my-4 fadeInUp max-w-3xl mx-auto'>
          {avatar && <div className='w-9'> {isUser(chat.role) ? <Image src={avatar} alt='avatar' className='rounded-full' width={25} height={25} /> : <Image src={logo} alt='avatar' className={`h-7 w-7 ${chat.isGenerating ? 'animate-spin' : ''}`} />}  </div>}
          <div className='flex-1'>
            <h2 className='font-bold'>{chat.role === 'user' ? 'YOU' : <span className={`${chat.isGenerating ? 'animate-pulse' : ''}`}>Gemini</span>}</h2>
            <span className='whitespace-pre-line'>{chat.parts}</span>
          </div>
        </div>
      ))}
    </div>}
    </>
  )
}

const isUser = (role: string) => role === 'user';