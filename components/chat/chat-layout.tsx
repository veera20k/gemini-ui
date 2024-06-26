'use client'

import React, { useEffect, useRef } from 'react'
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
import ChatInput from './chat-input';
import SidebarContent from './sidebar-content';
import Header from './header/header';
import useChatStore from '@/state/chatStore';

interface ChatLayoutProps {
    defaultLayout?: { sizes: number[], IntlIsCollapsed?: boolean },
    children: React.ReactNode
}

export default function ChatLayout({ defaultLayout = { sizes: [15, 85], IntlIsCollapsed: false }, children }: ChatLayoutProps) {
    const sidebarRef = useRef<ImperativePanelHandle>(null);
    const [isCollapsed, setIsCollapsed] = React.useState(defaultLayout.IntlIsCollapsed);
    const { setChatMetaList } = useChatStore();

    const handleCollapse = () => {
        if (!sidebarRef?.current) return;
        const { current } = sidebarRef;
        current.resize(current.isCollapsed() ? 15 : 0);
    }

    const onLayout = (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify({ sizes, IntlIsCollapsed: sidebarRef.current?.isCollapsed() })}`;
    };

    const fetchChatMetaList = async () => {
        fetch(`/api/chat`, { method: 'GET' }).then((res) => res.json()).then((chats) => {
            setChatMetaList(chats);
        });
    };

    useEffect(() => {
        fetchChatMetaList();
    }, []);

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-dvh rounded-lg border"
            onLayout={onLayout}>
            <ResizablePanel id='chatLayout' className='max-lg:hidden' order={1} defaultSize={defaultLayout?.sizes[0]} maxSize={30} collapsible ref={sidebarRef} onExpand={() => setIsCollapsed(false)} onCollapse={() => setIsCollapsed(true)}>
                <SidebarContent />
            </ResizablePanel>
            <ResizableHandle withHandle id='chatLayout' className='max-lg:hidden' />
            <ResizablePanel order={2} defaultSize={defaultLayout?.sizes[1]} className='relative' id='chatLayoutContent'>
                <Header isCollapsed={isCollapsed} />
                <TooltipProvider delayDuration={100} >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="absolute left-2 max-lg:hidden top-1/2 z-2 translate-x-0 -translate-y-1/2 group p-3 cursor-pointer opacity-40 hover:opacity-100" onClick={handleCollapse}>
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
                {children}
                <ChatInput />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
