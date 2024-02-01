import React from 'react'
import { IconArrowLeftToArc, IconBrandGithubFilled, IconBrandGoogleFilled } from '@tabler/icons-react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { signIn } from "next-auth/react"

export default function Login() {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='text-white bottom-2 bg-cyan-500 hover:bg-cyan-600 focus:outline-none font-medium rounded-lg text-sm p-1.5'>
                    Login <IconArrowLeftToArc className='inline' />
                </div>
            </DialogTrigger>
            <DialogContent className='p-4'>
                <div>
                    <div className='text-center text-xl font-bold mb-4'>Continue With</div>
                    <hr className='py-3' />
                    <div className='flex justify-center'>
                        <button type="button" className="text-white bg-[#4285F4] rounded-full p-3 mx-3 hover:bg-[#4285F4]/90" onClick={() => signIn("google")}>
                            <IconBrandGoogleFilled />
                        </button>
                        <div className='my-auto'>or</div>
                        <button type="button" className="text-white bg-black rounded-full p-3 mx-3 hover:bg-[#24292F]/90" onClick={() => signIn("github")}>
                            <IconBrandGithubFilled />
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
