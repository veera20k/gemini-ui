import { Button } from '@/components/ui/button'
import { IconBrandInertia } from '@tabler/icons-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <Button className={`mx-auto mt-3 w-full ${pending ? 'cursor-not-allowed opacity-75' : ''}`} disabled={pending} type='submit'> {pending ? 'Signing in...' : 'Continue'} <IconBrandInertia className='ml-3' height={20} width={20} /></Button>
    )
}
