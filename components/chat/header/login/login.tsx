import React from 'react'
import { IconArrowLeftToArc, IconBrandInertia, IconRefresh } from '@tabler/icons-react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { generateRandomUsername } from '@/lib/utils'
import { signUp } from '@/server/actions/user'
import { toast } from "sonner"
import LoginButton from './login-btn'
import { signIn } from 'next-auth/react'

export default function Login() {
    const [avatarUrl, setAvatarUrl] = React.useState('https://robohash.org/stefan-one');
    const [randomUserName, setRandomUserName] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const generateRandomAvatar = async () => {
        const randomNum = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
        const url = `https://robohash.org/stefan-${randomNum}`;
        setAvatarUrl(url);
    };

    const onSubmit = async (formData: FormData) => {
        try {
            const res = await signUp(formData);
            signIn("credentials", {
                username: res.userName,
                callbackUrl: "/",
                redirect: false
            });
            toast.success(`Welcome  ${res.userName}`, {
                position: "top-right",
                duration: 2000,
            });
            setOpen(false);
        } catch (error) {
            toast.error((error as Error).message, {
                position: "top-right",
                duration: 3000,
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className='text-white bottom-2 bg-cyan-500 hover:bg-cyan-600 focus:outline-none font-medium rounded-lg text-sm p-1.5 px-3'>
                    Guest <IconArrowLeftToArc className='inline' />
                </div>
            </DialogTrigger>
            <DialogContent className='p-8 max-w-sm'>
                <form action={onSubmit}>
                    <div className='flex justify-around'>
                        <div className='flex'>
                            <Image src={avatarUrl} alt='avatar' className='rounded-full' width={80} height={80} /> <IconRefresh className='my-auto ml-4 cursor-pointer' onClick={() => generateRandomAvatar()} height={16} width={16} />
                            <input type="hidden" name='image' className='hidden' defaultValue={avatarUrl} />
                        </div>
                    </div>
                    <div className='flex justify-around mt-5 mb-2'>
                        <div className='my-auto'>User Name</div>
                        <div className='flex w-52'><Input placeholder='Enter User Name' defaultValue={randomUserName} name='userName' className='text-md' /><IconRefresh className='my-auto ml-4 cursor-pointer' onClick={() => setRandomUserName(generateRandomUsername())} height={18} width={18} /></div>
                    </div>
                    <LoginButton/>
                </form>
            </DialogContent>
        </Dialog>
    )
}
