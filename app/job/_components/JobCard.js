"use client";
import { ShareIcon, BookmarkIcon } from "@heroicons/react/24/outline";

export default function JobCard() {
    return (
        <div className="bg-white rounded-[18px] border border-[#ECECEC] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4">
            {/* Top Row */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-[13px] font-medium">
                    <span className="text-[#757575]">Job Status :</span>
                    <span className="text-[#24B26B]">Active</span>
                </div>
                <button className="p-1 hover:bg-gray-50 rounded-full transition-colors">
                    <ShareIcon className="w-5 h-5 text-[#2E2E2E]" />
                </button>
            </div>

            {/* Title */}
            <h1 className="text-[22px] font-bold text-[#2E2E2E] leading-tight mb-2">
                Modern Fashion Attire Illustration
            </h1>

            {/* Posted Time */}
            <p className="text-[14px] text-[#757575] mb-5">
                Posted 2 days ago
            </p>

            {/* Description */}
            <div className="text-[15px] text-[#2E2E2E] leading-[1.9] mb-6">
                <p className="mb-4">
                    I am looking for a talented and experienced fashion illustrator to create modern fashion attire illustrations for our upcoming casual line. The designs should capture a trendy, youthful vibe with a focus on street style and everyday comfort.
                </p>
                <p>
                    You will work closely with our creative director to ensure the sketches align with our brand identity. Strong attention to detail and texture representation is a must.
                </p>
            </div>

            {/* Responsibilities */}
            <div className="mb-2">
                <h2 className="text-[16px] font-bold text-[#2E2E2E] mb-3">
                    Responsibilities
                </h2>
                <ul className="text-[15px] text-[#2E2E2E] leading-[1.9] space-y-2">
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E2E2E] shrink-0 mt-[9px]" />
                        <span>Create 5-7 full-body modern attire illustrations in high resolution.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E2E2E] shrink-0 mt-[9px]" />
                        <span>Incorporate vibrant color palettes and detailed fabric textures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E2E2E] shrink-0 mt-[9px]" />
                        <span>Deliver initial concept sketches for review before final rendering.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E2E2E] shrink-0 mt-[9px]" />
                        <span>Provide final source files in layered PSD or AI format.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
