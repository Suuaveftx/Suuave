'use client';
import React, { useRef } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import AcceptModal from '../../AcceptModal';
import DeclineModal from '../../DeclineModal';

export default function MobileContractCard({ contract }) {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const acceptTriggerRef = useRef(null);
    const declineTriggerRef = useRef(null);

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-4 w-full shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-3 relative">

            {/* Hidden modal triggers - rendered invisibly, clicked programmatically */}
            <AcceptModal
                trigger={
                    <button
                        ref={acceptTriggerRef}
                        style={{ display: 'none' }}
                        aria-hidden="true"
                    >
                        Accept
                    </button>
                }
            />
            <DeclineModal
                trigger={
                    <button
                        ref={declineTriggerRef}
                        style={{ display: 'none' }}
                        aria-hidden="true"
                    >
                        Decline
                    </button>
                }
            />

            {/* Row 1: Title and three-dot menu */}
            <div className="flex items-start justify-between gap-3 mb-[2px]">
                <h3 className="text-[#3DA8D8] text-[15px] font-semibold leading-snug truncate">
                    {contract.title}
                </h3>
                <div className="relative shrink-0">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-1 -mr-1 -mt-1 hover:bg-gray-50 rounded-full text-[#9CA3AF]"
                    >
                        <EllipsisHorizontalIcon className="w-6 h-6" strokeWidth={2} />
                    </button>

                    {/* Dropdown */}
                    {menuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                            <div className="absolute right-0 top-8 z-20 bg-white rounded-xl shadow-lg border border-[#E5E7EB] overflow-hidden w-[160px]">
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

            {/* Row 2: Pending Since */}
            <p className="text-[13px] text-[#9CA3AF] leading-snug mb-1">
                Pending Since - <span className="text-[#1F2937] font-normal">{contract.pendingSince}</span>
            </p>

            {/* Row 3: Expiring In */}
            <p className="text-[13px] text-[#9CA3AF] leading-snug">
                Expiring in - <span className="text-[#1F2937] font-normal">{contract.expiresIn}</span>
            </p>
        </div>
    );
}
