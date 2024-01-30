"use client"

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select"
import { IconPhoto, IconTextRecognition} from '@tabler/icons-react';

export default function VersionSwitchSelect() {
    const [selectedOption, setSelectedOption] = React.useState('GeminiPRO');
    return <Select defaultValue={selectedOption} onValueChange={setSelectedOption}>
        <SelectTrigger className="w-[180px] text-start !bg-transparent">
            <SelectValue placeholder="Select Version" />
        </SelectTrigger>
        <SelectContent className="max-w-80">
            <SelectItem value="GeminiPRO" className="py-4 pl-2 pr-8" iconNode={<IconTextRecognition className="mr-2" />}>
                <span className="font-bold">
                    Gemini PRO
                </span>
                <br />
                <small className="text-overline text-slate-800">The best model for scaling across a wide rang of tasks </small>
            </SelectItem>
            <SelectItem value="GeminiVisionPro" className="py-4 pl-2 pr-8" iconNode={<IconPhoto className="mr-2" />}> <span className="font-bold">Gemini Vision PRO</span>
                <br />
                <small className="text-overline text-slate-800">
                    The best image understanding model to handle a broad range of applications.
                </small>
            </SelectItem>
        </SelectContent>
    </Select>
}