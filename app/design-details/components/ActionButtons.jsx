'use client';
import React from 'react';
import { Button } from '@heroui/react';

export default function ActionButtons() {
    return (
        <div className="flex gap-[14px]">
            <Button
                variant="bordered"
                radius="full"
                className="flex-1 h-[42px] border-[#3A98BB] text-[#0A4A66] font-semibold text-[13px] tracking-wide bg-white"
                disableRipple
            >
                Save Design
            </Button>
            <Button
                radius="full"
                className="flex-1 h-[42px] bg-[#CCE7F2] text-[#0A4A66] font-semibold text-[13px] tracking-wide"
                disableRipple
            >
                Get License
            </Button>
        </div>
    );
}
