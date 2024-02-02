'use client'

import useChatStore from '@/state/chatStore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

export default function ChatContent() {
  const { currentChats } = useChatStore();
  const { data: session } = useSession();
  const avatar = session?.user?.image;
  return (
    <div className='mt-[70px] w-8/12 mx-auto max-sm:w-11/12'>
      {currentChats.map((chat) => (
        <div key={chat.id} className='flex'>
          {avatar && <div className='w-9'><Image src={avatar} alt='avatar' className='rounded-full' width={25} height={25} /></div>}
          <div className='flex-1'>
            <h2 className='font-bold'>YOU</h2>
            <span >{chat.parts}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
