import React, { Suspense } from "react";
import ProfileArtist from "../profile-for-artist/_components/Profile";
import FashionCards from "../profile-for-artist/_components/FashionCard";

const Page = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-[1700px] mx-auto">
            <Suspense fallback={<p>Loading...</p>}>
                <ProfileArtist isVisitor={true} />
                <FashionCards isVisitor={true} />
            </Suspense>
        </div>
    );
};

export default Page;
