"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"
import { IconSquareRoundedArrowUpFilled } from '@tabler/icons-react'

export default function SuggestionsSubmit() {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button type="submit" className="absolute end-2 text-cyan-500 focus:outline-none text-xs rounded-lg -translate-y-1/2 top-1/2"><IconSquareRoundedArrowUpFilled /></button>
                </TooltipTrigger>
                <TooltipContent side='top' className='font-bold'>
                    Click to send
                    <TooltipArrow />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>)
}
