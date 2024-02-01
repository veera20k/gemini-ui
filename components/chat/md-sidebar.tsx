import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IconBaselineDensityMedium } from '@tabler/icons-react'
import SidebarContent from './sidebar-content'

export default function MdSideBar() {
    return (
        <Sheet>
            <SheetTrigger>
                <IconBaselineDensityMedium className='my-auto lg:hidden' />
            </SheetTrigger>
            <SheetContent side={'left'} className='p-0' closeBtn={false}>
                <SidebarContent/>
            </SheetContent>
        </Sheet>
    )
}
