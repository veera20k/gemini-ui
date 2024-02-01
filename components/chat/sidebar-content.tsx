import React from 'react'
import NewChat from './header/new-chat'

export default function SidebarContent() {
    return (
        <div className='p-3'>
            <NewChat isSidebar={true} />
        </div>
    )
}
