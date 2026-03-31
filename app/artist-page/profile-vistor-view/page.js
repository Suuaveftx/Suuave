"use client";

import React, { Suspense } from "react";
import ProfileArtist from "../profile-for-artist/_components/Profile";
import FashionCards from "../profile-for-artist/_components/FashionCard";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

const Page = () => {
    const router = useRouter();

    return (
        <>
            <div className="md:hidden px-5 py-4 flex items-center bg-[#FAFAFA] border-b border-[#DEDEDE]">
                <Button
                    isIconOnly
                    variant="light"
                    className="-ml-3 text-black"
                    onPress={() => router.back()}
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-[1700px] mx-auto">
                <Suspense fallback={<p>Loading...</p>}>
                    <ProfileArtist isVisitor={true} />
                    <FashionCards isVisitor={true} />
                </Suspense>
            </div>
        </>
    );
};

export default Page;
