import React from 'react'
import { IconArrowRightToArc, IconSettings, IconUserEdit } from '@tabler/icons-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { signOut, useSession } from 'next-auth/react';
import { Skeleton } from "@/components/ui/skeleton"
import Login from './login';
import Image from 'next/image';

export default function UserProfile() {
    const { data: session, status } = useSession();
    if (status === 'loading') {
        return skeleton();
    } else if (status === 'authenticated') {
        return (
            <>
                <Popover>
                    <PopoverTrigger asChild>
                        <button type="button" className="font-medium rounded-lg text-sm hover:bg-slate-100 cursor-pointer" >{session?.user?.image && <Image src={session?.user?.image} alt={'Profile'} width={35} height={35} className="rounded-full inline" />}</button>
                    </PopoverTrigger>
                    <PopoverContent className='p-2 mr-3 w-56' side='bottom'>
                        <div className="flex flex-col items-center">
                            <div className='w-full rounded-lg text-sm p-2.5 hover:bg-slate-100 cursor-pointer'>
                                <IconUserEdit width="20" height="20" className='inline mr-2' /> Profile
                            </div>
                            <div className='w-full rounded-lg text-sm p-2.5 my-2 hover:bg-slate-100 cursor-pointer'>
                                <IconSettings width="20" height="20" className='inline mr-2' /> Settings
                            </div>
                            <div className='w-full rounded-lg text-sm p-2.5 bg-red-500 hover:bg-red-500/90 text-white cursor-pointer' onClick={() => signOut()}>
                                <IconArrowRightToArc width="20" height="20" className='inline mr-2' /> Logout
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </>
        )
    } else {
        return <Login />
    }
}

const skeleton = () => {
    return <Skeleton className="w-20 h-10 rounded-lg bg-slate-200" />
}
