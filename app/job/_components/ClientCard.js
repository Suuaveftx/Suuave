"use client";
import { MapPinIcon, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

export default function ClientCard() {
    return (
        <div className="bg-white rounded-[18px] border border-[#ECECEC] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4">
            <h2 className="text-[17px] font-bold text-[#2E2E2E] mb-3">
                About the Client
            </h2>
            <div className="h-[1px] w-full bg-[#F2F2F2] mb-4" />

            {/* Business Type */}
            <h3 className="text-[18px] font-bold text-[#2E2E2E] mb-2 leading-tight">
                Fashion Brand
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 mb-3">
                <MapPinIcon className="w-5 h-5 text-[#2E2E2E]" />
                <span className="text-[15px] font-medium text-[#2E2E2E]">Lagos, Nigeria</span>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                    <StarIconSolid className="w-5 h-5 text-[#FACC15]" />
                    <StarIconSolid className="w-5 h-5 text-[#FACC15]" />
                    <StarIconSolid className="w-5 h-5 text-[#FACC15]" />
                    <StarIconSolid className="w-5 h-5 text-[#FACC15]" />
                    <StarIconSolid className="w-5 h-5 text-[#D1D5DB]" /> {/* Gray Star */}
                </div>
                <span className="text-[14px] text-[#6EC1E4] font-medium">(5 Reviews)</span>
            </div>

            {/* Member Since */}
            <div className="text-[15px] text-[#757575] mb-5">
                Member since 12, June, 2024
            </div>

            {/* Statistics */}
            <div className="flex flex-col gap-2">
                <div className="text-[15px] font-medium text-[#2E2E2E]">14 Jobs Posted</div>
                <div className="text-[15px] font-medium text-[#2E2E2E]">14 Artists Hired</div>
            </div>
        </div>
    );
}
