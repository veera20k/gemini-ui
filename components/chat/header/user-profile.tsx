import React from 'react'
import Login from './login/login';
import Image from 'next/image';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { User } from '@/types/user';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { IconArrowRightToArc, IconCameraPlus, IconEdit, IconSettings, IconUserEdit } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from '@/components/ui/skeleton';
export default function UserProfile() {
    const { data: session, status } = useSession();
    if (status === 'loading') {
        return skeleton();
    } else if (status === 'authenticated') {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <button type="button" className="font-medium rounded-lg text-sm hover:bg-slate-100 cursor-pointer" >{session?.user?.image && <Image src={session?.user?.image} alt={'Profile'} width={35} height={35} className="rounded-full inline" />}</button>
                </PopoverTrigger>
                <PopoverContent className='p-2 mr-3 w-56' side='bottom'>
                    <div className="flex flex-col items-center">
                        <EditProfile user={session?.user}>
                            <div className='w-full rounded-lg text-sm p-2.5 hover:bg-slate-100 cursor-pointer'>
                                <IconUserEdit width="20" height="20" className='inline mr-2' /> Profile
                            </div>
                        </EditProfile>

                        <div className='w-full rounded-lg text-sm p-2.5 my-2 hover:bg-slate-100 cursor-pointer'>
                            <IconSettings width="20" height="20" className='inline mr-2' /> Settings
                        </div>
                        <div className='w-full rounded-lg text-sm p-2.5 bg-red-500 hover:bg-red-500/90 text-white cursor-pointer' onClick={() => signOut()}>
                            <IconArrowRightToArc width="20" height="20" className='inline mr-2' /> Logout
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }
    return <Login />
}

const EditProfile = ({ children, user }: { children: React.ReactNode, user: User }) => {
    if (!user) {
        return <>User Info Not Found</>
    }
    return <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="w-96">
            <div className="flex justify-center">
                <div className='rounded-full overflow-hidden relative'>
                    <Image
                        src={user.image}
                        alt="card-image" width={80} height={80} />
                    <IconCameraPlus className='absolute bottom-0 bg-gray-800/50 text-white w-20 p-1 cursor-pointer hover:bg-gray-800/70' height={25} />
                </div>
            </div>
            <div className="my-3 font-medium">
                <div className="flex items-center w-full mt-3">
                    <span className="w-1/3 text-center">
                        User Name
                    </span>
                    <Input type='text' className='w-2/3 text-center' defaultValue={user.userName} />
                </div>
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button className='mx-auto'> <IconEdit className='mr-3 ' height={20} width={20} /> Update</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

const skeleton = () => {
    return <Skeleton className="w-20 h-10 rounded-lg bg-slate-200" />
}
