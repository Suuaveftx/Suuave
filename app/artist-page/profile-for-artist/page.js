import React, { Suspense } from "react";
import ProfileArtist from "./_components/Profile";
import FashionCards from "./_components/FashionCard";

const Page = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 min-h-screen bg-[#F1F1F1] overflow-y-auto scrollbar-hide">
      <Suspense fallback={<p>Loading...</p>}>
        <ProfileArtist />
        <FashionCards />
      </Suspense>
    </div>
  );
};

export default Page;
