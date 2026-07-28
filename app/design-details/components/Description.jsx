'use client';
import React from 'react';
import { Chip } from '@heroui/react';

export default function Description() {
    return (
        <div>
            <h3 className="font-bold text-[15px] text-[#222222] mb-[10px]">Description</h3>
            <p className="text-[13px] text-[#767676] leading-[22px] tracking-[0.1px] mb-[18px]">
                Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
            </p>

            <div className="flex gap-[10px]">
                {/* We use basic divs to exactly match the look and spacing if Chip differs */}
                <div className="bg-[#F2F2F2] px-4 py-[6px] rounded-md text-[12px] text-[#555555]">Tags</div>
                <div className="bg-[#F2F2F2] px-4 py-[6px] rounded-md text-[12px] text-[#555555]">Tags</div>
                <div className="bg-[#F2F2F2] px-4 py-[6px] rounded-md text-[12px] text-[#555555]">Tags</div>
            </div>
        </div>
    );
}
