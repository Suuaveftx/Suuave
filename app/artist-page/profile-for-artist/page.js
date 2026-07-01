import React, { Suspense } from "react";
import ProfileArtist from "./_components/Profile";
import FashionCards from "./_components/FashionCard";
import PageContainer from '../../../components/layout/PageContainer';

const Page = () => {
  return (
    <div className="bg-[#F1F1F1] min-h-screen w-full">
      <PageContainer className="flex flex-col lg:flex-row items-start gap-4 pt-4 pb-4">
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileArtist />
          <FashionCards />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default Page;
