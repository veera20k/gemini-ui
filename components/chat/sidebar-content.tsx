import React, { useRef } from 'react'
import NewChat from './header/new-chat'
import useChatStore from '@/state/chatStore'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IconDotsVertical, IconTrash, IconPencil } from '@tabler/icons-react';
import { Input } from "@/components/ui/input"
import Link from 'next/link';

export default function SidebarContent() {
    const { chatMetaList, currentChatId, currentChat, setChatMetaList } = useChatStore();
    const [renameClickedIdx, setRenameClickedIdx] = React.useState<number | null>(null);

    function onRenameClick(index: number) {
        setRenameClickedIdx(index);
    }

    function handleOnRenameBlur(event: React.FocusEvent<HTMLInputElement>, meta: { _id: string, name: string }) {
        const updatedChatMetaList = chatMetaList?.map((chatMeta, i) => {
            if (i === renameClickedIdx) {
                return { ...chatMeta, name: event?.target?.value || chatMeta?.name };
            }
            return chatMeta;
        }) || [];
        setChatMetaList(updatedChatMetaList);
        setRenameClickedIdx(null);
    }

    const handleDeleteChat = (id: string) => {
        const updatedChatMetaList = chatMetaList?.filter((chatMeta) => chatMeta._id !== id) || [];
        setChatMetaList(updatedChatMetaList);
        fetch(`/api/chat/${id}`, { method: "DELETE" });
    }

    const handleChatItemClick = (id: string) => {
        if (id === currentChatId) {
            return;
        }
        if (currentChat.size) {
            currentChat.clear();
        }
    }

    let content = <></>;
    if (!chatMetaList) {
        content = <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    } else if (!chatMetaList.length) {
        content = <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
            No Data
        </div>;
    } else {
        content = <div className='pt-5'>
            {chatMetaList.map((meta, i) => {
                return (
                    <div className='hover:bg-slate-100 rounded-lg cursor-pointer group flex justify-between relative mt-1' key={meta._id} >
                        <Link href={`/chat/${meta._id}`} onClick={() => { handleChatItemClick(meta._id) }} className='truncate w-[90%] rounded-lg' >
                            {renameClickedIdx === i ?
                                <FocusableInput
                                    defaultValue={meta.name}
                                    onBlur={(event) => handleOnRenameBlur(event, meta)}
                                /> :
                                <span className='p-2 inline-block'>{meta.name}</span>
                            }
                        </Link>
                        <EditPopover idx={i} onRenameClick={onRenameClick} onDelete={() => { handleDeleteChat(meta._id) }}>
                            <IconDotsVertical height={30} width={30} className='group-hover:flex hover:opacity-65 p-1.5 absolute right-2 bottom-1' />
                        </EditPopover>
                    </div>
                );
            })}
        </div>
    }
    return (
        <div className='p-3 relative h-full'>
            <NewChat isSidebar={true} />
            {content}
        </div>
    )
}

const FocusableInput = ({ defaultValue, onBlur }: { defaultValue: string, onBlur: (event: React.FocusEvent<HTMLInputElement>) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    return <Input 
        type='text'
        className='border-none bg-transparent'
        defaultValue={defaultValue}
        onBlur={onBlur}
        ref={inputRef}
    />;
}

function EditPopover({ children, onRenameClick, onDelete, idx }: { children: React.ReactNode, onRenameClick: (index: number) => void, onDelete: (event: React.MouseEvent<HTMLDivElement>) => void, idx: number }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleRenameClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setIsOpen(false);
        onRenameClick(idx);
    }
    return <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent className='p-1 w-48' side='bottom'>
            <div className="flex flex-col items-center">
                <div className='w-full rounded-lg text-sm p-2.5 my-1 hover:bg-slate-100 cursor-pointer' onClick={handleRenameClick}>
                    <IconPencil width="20" height="20" className='inline mr-2' /> Rename
                </div>
                <div className='w-full rounded-lg text-sm p-2.5 my-1 hover:bg-slate-100 cursor-pointer text-red-500' onClick={onDelete} >
                    <IconTrash width="20" height="20" className='inline mr-2' /> Delete
                </div>
            </div>
        </PopoverContent>
    </Popover>
}