'use client';

import React, { useRef } from 'react';
import { Button } from '@heroui/react';
import { EllipsisVerticalIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import AcceptModal from '../AcceptModal';
import DeclineModal from '../DeclineModal';

export default function ContractCard({ contract }) {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const acceptTriggerRef = useRef(null);
    const declineTriggerRef = useRef(null);

    return (
        <div className="group cursor-pointer flex items-center justify-between bg-white border border-[#F3F4F6] rounded-xl px-5 py-[22px] w-full shadow-[0_1px_2px_rgba(0,0,0,0.02)] mb-3 hover:border-[#3A98BB]/40 hover:shadow-md transition-all">

            {/* Left side: Title and Metadata */}
            <div className="flex items-center gap-8 min-w-0">
                <h3 className="text-[#111827] text-[15px] font-bold lg:min-w-[340px] group-hover:text-[#3A98BB] transition-colors truncate">
                    {contract.title}
                </h3>
                <p className="text-[#6B7280] text-[13px] font-medium tracking-[0.2px] hidden lg:block">
                    Pending Since - <span className="text-[#374151] font-semibold">{contract.pendingSince}</span>
                    <span className="mx-2 text-[#D1D5DB]">/</span>
                    Expires in - <span className="text-[#374151] font-semibold">{contract.expiresIn}</span>
                </p>
            </div>

            {/* Desktop Actions: inline Accept Offer + Decline buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
                <AcceptModal
                    trigger={
                        <Button className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold rounded-full h-[38px] px-7 shadow-sm text-[13px]">
                            Accept Offer
                        </Button>
                    }
                />
                <DeclineModal
                    trigger={
                        <Button variant="bordered" className="bg-white border-[#E5E7EB] text-[#374151] font-bold rounded-full h-[38px] px-7 text-[13px]">
                            Decline
                        </Button>
                    }
                />
                <button className="p-1 hover:bg-gray-100 rounded-md transition-colors ml-1 text-[#6B7280]">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile Actions: three-dot dropdown + hidden triggers */}
            <div className="flex lg:hidden items-center shrink-0 relative">
                {/* Hidden Accept trigger */}
                <AcceptModal
                    trigger={
                        <button ref={acceptTriggerRef} className="hidden" aria-hidden="true">
                            Accept
                        </button>
                    }
                />
                {/* Hidden Decline trigger */}
                <DeclineModal
                    trigger={
                        <button ref={declineTriggerRef} className="hidden" aria-hidden="true">
                            Decline
                        </button>
                    }
                />

                {/* Three-dot button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#6B7280]"
                >
                    <EllipsisHorizontalIcon className="w-6 h-6" strokeWidth={2} />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuOpen(false)}
                        />
                        <div className="absolute right-0 top-10 z-20 bg-white rounded-xl shadow-lg border border-[#E5E7EB] overflow-hidden w-[160px]">
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    acceptTriggerRef.current?.click();
                                }}
                                className="w-full px-4 py-3 text-left text-[13px] text-[#1F2937] hover:bg-[#F9FAFB] transition-colors"
                            >
                                Accept Offer
                            </button>
                            <div className="h-px bg-[#F3F4F6] mx-3" />
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    declineTriggerRef.current?.click();
                                }}
                                className="w-full px-4 py-3 text-left text-[13px] text-[#EF4444] hover:bg-[#FFF5F5] transition-colors"
                            >
                                Decline Offer
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
