"use client";

import React, { Suspense } from "react";
import ProfileArtist from "../profile-for-artist/_components/Profile";
import FashionCards from "../profile-for-artist/_components/FashionCard";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import PageContainer from '../../../components/layout/PageContainer';

const Page = () => {
    const router = useRouter();

    return (
        <div className="bg-[#FAFAFA] min-h-screen w-full">
            <div className="md:hidden px-5 py-4 flex items-center bg-[#FAFAFA] border-b border-[#DEDEDE]">

            </div>

            <PageContainer className="flex flex-col lg:flex-row gap-4 pt-4 pb-4">
                <Suspense fallback={<p>Loading...</p>}>
                    <ProfileArtist isVisitor={true} />
                    <FashionCards isVisitor={true} />
                </Suspense>
            </PageContainer>
        </div>
    );
};

export default Page;
