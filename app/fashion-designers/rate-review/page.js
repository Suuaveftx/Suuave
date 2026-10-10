'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

const RATING_LABELS = ['Very poor', 'Poor', 'Average', 'Good', 'Excellent'];
const STAR_COLORS = ['#EF4444', '#EF4444', '#F5A623', '#84CC16', '#22C55E']; // Red, Red, Orange, Yellow-Green, Green

function RateReviewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const artist = searchParams.get('artist') || 'the Artist';
    const contractId = searchParams.get('contractId') || '24164754';
    const returnUrl = searchParams.get('returnUrl') || '/fashion-designers/contracts?tab=completed';

    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedStar, setSelectedStar] = useState(1);
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const activeStar = hoveredStar || selectedStar;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Review submitted:', { rating: selectedStar, title, review, artist, contractId });
        setSubmitted(true);
        setTimeout(() => {
            router.push(decodeURIComponent(returnUrl));
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F5] w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-[18px] font-bold text-[#111111]">Review Submitted!</p>
                    <p className="text-[14px] text-[#767676]">Redirecting you back…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F5] w-full flex flex-col pt-10 pb-24">
            <PageContainer>
                {/* Page Title */}
                <h1 className="text-[26px] font-bold text-[#111111] mb-8">Rate &amp; Review</h1>

                {/* Card */}
                <div className="bg-white rounded-[16px] border border-[#EAEAEA] px-6 sm:px-10 py-8">

                    {/* Contract Info */}
                    <div className="mb-8 pb-8 border-b border-[#EAEAEA]">
                        <p className="text-[12px] text-[#999999] font-medium uppercase tracking-wide mb-1">Contract</p>
                        <p className="text-[17px] font-bold text-[#111111] mb-1">
                            Modern Fashion Attire Illustration ({contractId})
                        </p>
                        <p className="text-[13px] text-[#767676]">
                            Client - Jude &nbsp;|&nbsp; Completed - 13th August
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Star Rating */}
                        <div className="mb-8">
                            <p className="text-[15px] font-semibold text-[#111111] mb-4">Select Stars To Rate</p>

                            <div className="flex flex-col gap-3 w-max">
                                <div className="flex flex-row items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setSelectedStar(star)}
                                            onMouseEnter={() => setHoveredStar(star)}
                                            onMouseLeave={() => setHoveredStar(0)}
                                            className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                        >
                                            <Star
                                                size={28}
                                                className="transition-colors duration-150"
                                                fill={star <= activeStar ? STAR_COLORS[star - 1] : 'none'}
                                                stroke={star <= activeStar ? STAR_COLORS[star - 1] : '#CCCCCC'}
                                                strokeWidth={1.5}
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Active label + one continuous underline */}
                                <div className="w-full h-[4px] bg-[#EEEEEE] rounded-full mt-1 relative overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                                        style={{
                                            width: `${(activeStar / 5) * 100}%`,
                                            backgroundColor: activeStar > 0 ? STAR_COLORS[activeStar - 1] : 'transparent'
                                        }}
                                    />
                                </div>
                                <p className="text-[13px] text-[#666666]">{activeStar > 0 ? RATING_LABELS[activeStar - 1] : '\u00A0'}</p>
                            </div>
                        </div>

                        {/* Leave a Review */}
                        <div className="mb-6 pb-6 border-t border-[#EAEAEA] pt-6">
                            <p className="text-[15px] font-semibold text-[#111111] mb-5">Leave a Review</p>

                            {/* Review Title */}
                            <div className="mb-5">
                                <label className="text-[13px] font-medium text-[#333333] mb-2 block">
                                    Review Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="E.g Satisfied"
                                    className="w-full h-[48px] border border-[#E0E0E0] rounded-[10px] px-4 text-[14px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:ring-1 focus:ring-[#3A98BB] focus:border-[#3A98BB] bg-white transition"
                                />
                            </div>

                            {/* Detailed Review */}
                            <div className="mb-8">
                                <label className="text-[13px] font-medium text-[#333333] mb-2 block">
                                    Detailed Review
                                </label>
                                <textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Tell us more about your rating"
                                    className="w-full h-[140px] border border-[#E0E0E0] rounded-[10px] px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:ring-1 focus:ring-[#3A98BB] focus:border-[#3A98BB] bg-white resize-none transition"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full h-[52px] bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] hover:opacity-90 text-[#035A7A] font-bold text-[15px] rounded-full transition-opacity"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </PageContainer>
        </div>
    );
}

export default function RateReviewPage() {
    return (
        <Suspense fallback={null}>
            <RateReviewContent />
        </Suspense>
    );
}
