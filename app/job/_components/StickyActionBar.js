"use client";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function StickyActionBar() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#ECECEC] px-4 py-4 z-50 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            {/* Left button: Save Post */}
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#146C94] text-[#146C94] font-bold text-[15px] py-3.5 rounded-full transition-colors active:bg-gray-50 h-[52px]">
                <BookmarkIcon className="w-5 h-5 text-[#146C94]" strokeWidth={2} />
                Save Post
            </button>

            {/* Right button: Send Proposal */}
            <button className="flex-1 flex items-center justify-center bg-[#6EC1E4] text-[#146C94] font-bold text-[15px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(110,193,228,0.4)] transition-opacity active:opacity-80 h-[52px]">
                Send Proposal
            </button>
        </div>
    );
}
