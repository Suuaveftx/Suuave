"use client";

import React, { Suspense } from 'react';
import PrivacyPolicyComponent from '@/components/PrivacyPolicyComponent';
import Footer from "@/components/landing-page-components/Footer";
import ArtistFooter from "@/app/about-page/components/Footer";
import Navbar from "@/components/Navbar";
import ArtistNavbar from "@/components/ArtistNavbar";
import BrandNavbar from "@/components/Brand-Navbar";
import { useSearchParams } from "next/navigation";

const PolicyContent = () => {
    const searchParams = useSearchParams();
    const source = searchParams.get('source');

    return (
        <>
            {source === 'artist' ? (
                <ArtistNavbar />
            ) : source === 'brand' ? (
                <BrandNavbar />
            ) : (
                <Navbar bgColor="bg-[#223B44]" />
            )}
            <main className="flex-grow">
                <PrivacyPolicyComponent />
            </main>
            {source === 'artist' || source === 'brand' ? (
                <ArtistFooter />
            ) : (
                <Footer />
            )}
        </>
    );
};

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Suspense fallback={<div className="h-20 bg-[#CCE7F2] w-full" />}>
                <PolicyContent />
            </Suspense>
        </div>
    );
}
