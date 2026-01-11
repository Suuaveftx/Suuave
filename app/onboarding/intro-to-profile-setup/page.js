import React from "react";
import Image from "next/image";
import WelcomePage from "./_components/Welcome-Page";

const Page = () => {
  return (
    <div>
      {/* Logo for mobile only */}
      <div className="block sm:hidden bg-[#F9F9F9] pt-6 pl-6">
        <div className="bg-[#EAF9FF] w-14 h-14 flex items-center justify-center rounded-lg">
          <Image
            src="/dev-images/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* AppLayout for larger screens */}
      <div className="hidden sm:block">
        <WelcomePage />
      </div>

      {/* Show FashionArtist independently for mobile */}
      <div className="block sm:hidden">
        <WelcomePage />
      </div>
    </div>
  );
};

export default Page;
