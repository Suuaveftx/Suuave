'use client';
import React from 'react';
import { Avatar } from '@heroui/react';
import { MdLocationOn } from 'react-icons/md';
import { HiStar } from 'react-icons/hi';

export default function ArtistCard() {
    return (
        <div>
            <h3 className="font-bold text-[15px] text-[#222222] mb-4">About the artist</h3>

            <div className="flex items-center gap-[14px]">
                <Avatar
                    src="/dev-images/Avatar.png"
                    alt="Ocean Cliff"
                    className="w-10 h-10 text-large"
                    fallback={
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" className="object-cover w-full h-full" alt="avatar fallback" />
                    }
                />
                <div className="flex flex-col">
                    <span className="font-bold text-[14px] text-[#222222] underline underline-offset-2">Ocean Cliff</span>
                    <span className="text-[11px] text-[#767676] mt-0.5">Fashion Artist</span>
                </div>
            </div>

            <div className="flex items-center gap-1 mt-3 ml-0.5">
                <MdLocationOn className="text-[#767676]" size={15} />
                <span className="text-[#767676] text-[11px] ml-0.5">Lagos, Nigeria</span>
            </div>

            <div className="flex items-center gap-1.5 mt-[6px] ml-1">
                <span className="text-[11px] text-[#767676]">Ratings :</span>
                <HiStar className="text-[#FBBC05]" size={13} />
                <div className="text-[11px] text-[#767676]">
                    5.0 | <span className="text-[#3A98BB] underline underline-offset-2">5 Verified reviews |</span>
                </div>
            </div>
        </div>
    );
}
