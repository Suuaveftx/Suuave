'use client';

import React from 'react';
import Header from './components/Header';
import HeroImage from './components/HeroImage';
import ProductInfo from './components/ProductInfo';
import LicenseCard from './components/LicenseCard';
import ActionButtons from './components/ActionButtons';
import Description from './components/Description';
import ArtistCard from './components/ArtistCard';
import RecommendationCard from './components/RecommendationCard';

export default function DesignDetailsPage() {
    return (
        <div className="w-full max-w-[430px] min-w-[320px] mx-auto bg-[#F9FAFB] min-h-screen pb-10 flex flex-col items-center">
            <div className="w-full max-w-[390px] mx-auto bg-white min-h-screen">
                <Header />
                <HeroImage />
                <div className="px-4">
                    <ProductInfo />
                    <div className="mt-4">
                        <LicenseCard />
                    </div>
                    <div className="mt-5">
                        <ActionButtons />
                    </div>
                </div>

                <div className="w-full h-2 bg-[#F9FAFB] mt-6"></div>

                <div className="px-4 mt-6">
                    <Description />
                </div>

                <div className="w-full h-2 bg-[#F9FAFB] mt-6"></div>

                <div className="px-4 mt-6">
                    <ArtistCard />
                </div>

                <div className="w-full h-2 bg-[#F9FAFB] mt-6"></div>

                <div className="pl-4 mt-6">
                    <h2 className="font-bold text-[15px] text-[#222222] mb-4">You May Also Like These</h2>
                    <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar pr-4">
                        <RecommendationCard
                            imageUrl="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=390&h=520"
                            title="Modern Style Dress"
                            price="$340"
                        />
                        <RecommendationCard
                            imageUrl="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=390&h=520"
                            title="Modern Style Dress"
                            price="$340"
                        />
                        <RecommendationCard
                            imageUrl="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=390&h=520"
                            title="Modern Style Dress"
                            price="$340"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
