"use client";
import { EnvelopeIcon, BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="w-full bg-[#E5F3F9] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
            {/* Light blue background (#E5F3F9 or similar light blue from Suauve scheme) */}
            <div className="flex items-center">
                {/* Logo Placeholder */}
                <div className="text-[#146C94] font-bold text-xl italic tracking-tighter">
                    suuave<span className="text-[#3A98BB]">.</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-[#2E2E2E]">
                    <EnvelopeIcon className="w-6 h-6" />
                </button>
                <button className="text-[#2E2E2E]">
                    <BellIcon className="w-6 h-6" />
                </button>
                <div className="relative w-8 h-8 rounded-full bg-gray-300 overflow-hidden border border-white shrink-0">
                    {/* Profile Image Dummy */}
                    <div className="w-full h-full bg-gradient-to-tr from-blue-300 to-blue-500 rounded-full" />
                </div>
                <button className="text-[#2E2E2E]">
                    <Bars3Icon className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
}
