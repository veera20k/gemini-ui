'use client'

import React, { useRef } from 'react'
import { cn } from '@/lib/utils';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"
import { ImperativePanelHandle } from 'react-resizable-panels';
import VersionSwitchSelect from './version-swtich-select';
import ChatInput from './chat-input';
import logo from '../../public/images/logo.png'
import Image from 'next/image';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function ChatLayout({ defaultLayout = { sizes: [15, 85], IntlIsCollapsed: false } }: { defaultLayout: { sizes: number[], IntlIsCollapsed?: boolean } }) {
    const sidebarRef = useRef<ImperativePanelHandle>(null);
    const [isCollapsed, setIsCollapsed] = React.useState(defaultLayout.IntlIsCollapsed);
    const [chatArray, setChatArray] = React.useState([]);
    const { width } = useWindowDimensions();

    const handleCollapse = () => {
        if (!sidebarRef?.current) return;
        const { current } = sidebarRef;
        if (current.isCollapsed()) {
            current.resize(15)
        } else {
            current.resize(0)
        }
    }

    const onLayout = (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify({ sizes, IntlIsCollapsed: sidebarRef.current?.isCollapsed() })}`;
    };
    if (!width) return <></>
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-screen rounded-lg border"
            onLayout={onLayout}>
            {width > 768 && <><ResizablePanel id='chatLayout' order={1} defaultSize={ width < 768 ? 0 : defaultLayout?.sizes[0]} maxSize={20} collapsible ref={sidebarRef} onExpand={() => setIsCollapsed(false)} onCollapse={() => setIsCollapsed(true)}>
                <div className='p-3'>
                    <NewChat isSidebar={true} />
                </div>
            </ResizablePanel>
                <ResizableHandle withHandle id='chatLayout' /> </>}

            <ResizablePanel order={2} defaultSize={width < 768 ? 100 : defaultLayout?.sizes[1]} className='relative !overflow-visible' id='chatLayoutContent'>
                <div className="flex gap-2 absolute top-0 bg-[rgba(255,255,255,0.5)] backdrop-blur-md rounded-md p-3 w-full border-b">
                    {isCollapsed && <NewChat />}
                    <VersionSwitchSelect />
                </div>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="absolute left-2 top-1/2 z-2 translate-x-0 -translate-y-1/2 group p-3 cursor-pointer opacity-40 hover:opacity-100" onClick={handleCollapse}>
                                <div className={cn("h-3 w-1 rounded-full translate-y-[0.15rem] bg-cyan-400 transition-transform", isCollapsed ? "-rotate-15" : "group-hover:rotate-15")}></div>
                                <div className={cn("h-3 w-1 rounded-full -translate-y-[0.15rem] bg-cyan-400 transition-transform", isCollapsed ? "rotate-15" : "group-hover:-rotate-15")}></div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side='right' className='font-bold'>
                            {isCollapsed ? 'Open' : 'Close'} sidebar
                            <TooltipArrow />
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className=''>
                    {!chatArray.length && <div className='absolute left-1/2 top-[30%] -translate-x-1/2'>
                        <Image src={logo} alt="logo" className='h-16 w-16 m-auto animate-pulse' priority />
                        <h1 className='text-xl font-bold '>How can i assist you today?</h1>
                    </div>}
                    <ChatInput />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}


function NewChat({ isSidebar }: { isSidebar?: boolean }) {
    return (
        <div className={`p-1.5 flex justify-between rounded-lg border hover:bg-slate-100 cursor-pointer max-sm:w-fit`}>
            {isSidebar && <div className='flex justify-center items-center'>
                <Image src={logo} alt="logo" className='h-7 w-7 inline mr-2' priority />
                <span className="font-semibold truncate">New chat</span>
            </div>}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white"><path fillRule="evenodd" clipRule="evenodd" d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z" fill="currentColor"></path></svg>
        </div>
    )
}