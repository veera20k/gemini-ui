'use client'

import React from 'react'
import MdSideBar from '../md-sidebar'
import NewChat from './new-chat'
import VersionSwitchSelect from './version-swtich-select'
import UserProfile from './user-profile'

export default function Header({ isCollapsed }: { isCollapsed: boolean | undefined }) {
    return (
        <div className="flex justify-between absolute top-0 bg-[rgba(255,255,255,0.5)] backdrop-blur-md rounded-md p-3 w-full border-b">
            <div className='flex gap-2'>
                {isCollapsed && <NewChat />}
                <MdSideBar />
                <VersionSwitchSelect />
            </div>
            <div className='flex justify-end items-center min-w-20'>
                <UserProfile />
            </div>
        </div>)
}
