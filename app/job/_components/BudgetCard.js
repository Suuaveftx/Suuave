"use client";
import { WalletIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function BudgetCard() {
    return (
        <div className="bg-white rounded-[18px] border border-[#ECECEC] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4">
            {/* Budget Row */}
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <div className="shrink-0 text-[#757575]">
                        <WalletIcon className="w-[22px] h-[22px]" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-1">
                        <span className="text-[15px] text-[#757575]">Budget -</span>
                        <span className="text-[16px] font-semibold text-[#6EC1E4]">₦200,000</span>
                    </div>
                </div>

                {/* Duration Row */}
                <div className="flex items-center gap-3">
                    <div className="shrink-0 text-[#757575]">
                        <ClockIcon className="w-[22px] h-[22px]" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-1">
                        <span className="text-[15px] text-[#757575]">Duration -</span>
                        <span className="text-[16px] font-semibold text-[#2E2E2E]">2 days</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
