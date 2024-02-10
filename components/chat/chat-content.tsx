'use client'

import useChatStore from '@/state/chatStore';
import Image from 'next/image';
import React from 'react'
import logo from '../../public/images/logo.png'
import { useSession } from 'next-auth/react';

export default function ChatContent() {
  const { getAllCurrentConvo } = useChatStore();
  const { data: session } = useSession();
  const avatar = session?.user?.image || '';

  return (
    <div className='pt-[70px] h-[89vh] overflow-auto'>
      {getAllCurrentConvo().map((chat) => (
        <div key={chat.tempId} className='flex my-4 fadeInUp max-w-3xl mx-auto'>
          {avatar && <div className='w-9'> {isUser(chat.role) ? <Image src={avatar} alt='avatar' className='rounded-full' width={25} height={25} /> : <Image src={logo} alt='avatar' className={`h-7 w-7 ${chat.isGenerating ? 'animate-spin' : ''}`} />}  </div>}
          <div className='flex-1'>
            <h2 className='font-bold'>{chat.role === 'user' ? 'YOU' : <span className={`${chat.isGenerating ? 'animate-pulse' : ''}`}>Gemini</span>}</h2>
            <span className='whitespace-pre-line'>{chat.parts}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const isUser = (role: string) => role === 'user';