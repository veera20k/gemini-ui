import ChatContent from '@/components/chat/chat-content'
import React from 'react'

export default function Page({ params }: { params: { id: string } }) {
    return (
        <ChatContent id={params.id} />
    )
}
