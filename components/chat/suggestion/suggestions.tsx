import React from 'react'
import useChatStore from '@/state/chatStore'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"
import { IconSquareRoundedArrowUpFilled } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

interface Suggestion {
    id: number
    title: string
    description: string
}

const sampleSuggestions: Suggestion[] = [{
    id: 1,
    title: 'Help me pick',
    description: 'a gift for my dad who love fishing',
},
{
    id: 2,
    title: 'Recommend a dish',
    description: 'to impress a date who\' a picky eater',
},
{
    id: 3,
    title: 'Show me a code snippet',
    description: 'of a website header',
}, {
    id: 4,
    title: 'Make a content strategy',
    description: 'for a newsletter featuring my favorite recipes',
}]

export default function Suggestions() {
    const { textInputSubmit } = useChatStore();
    const router = useRouter();
    const onSubmit = async (prompt: string) => {
        if (!prompt) return;
        textInputSubmit(prompt).then((val) => {
            if (val.type === 'new') {
                router.push(`/chat/${val.id}`);
            }
        });;
    };

    return (
        <div className='grid grid-cols-2 max-md:grid-cols-1 gap-2 m-2 max-lg:[&>*:nth-child(3)]:hidden max-lg:[&>*:nth-child(4)]:hidden' >
            {sampleSuggestions.map(({ id, title, description }) => (
                <div className='border rounded-xl p-2.5 hover:bg-slate-50 relative' key={id}>
                    <h3>{title}</h3>
                    <small className='text-slate-400 truncate max-w-[90%] block'>{description}</small>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="submit" className="absolute end-2 text-cyan-500 focus:outline-none text-xs rounded-lg -translate-y-1/2 top-1/2" onClick={() => onSubmit(title + ' ' + description)}><IconSquareRoundedArrowUpFilled /></button>
                            </TooltipTrigger>
                            <TooltipContent side='top' className='font-bold'>
                                Click to send
                                <TooltipArrow />
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>))}
        </div>
    )
}
