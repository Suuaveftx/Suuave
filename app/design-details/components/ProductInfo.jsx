'use client';
import React from 'react';

export default function ProductInfo() {
    return (
        <div className="mt-[18px]">
            <h2 className="text-[#222222] text-[18px] font-bold leading-[23px] tracking-[-0.2px]">
                Modern Fashion Attire Illustration<br />
                With Silky Material
            </h2>
            <div className="flex items-center gap-2 mt-[14px]">
                <span className="text-[#767676] text-[13px]">Price :</span>
                <span className="text-[#035A7A] text-[15px] font-semibold tracking-tight">$35000.00</span>
            </div>
        </div>
    );
}
