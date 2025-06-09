
import React from "react";

import Image from "next/image";
import Footer3 from "../../../components/Footer3";
import SearchBar from "../../../components/Searchbar";
import ProjectPage from "./_components/Project-Page";



const Page = () => {
  return (
    <>
      <div className="hidden lg:flex bg-[#EFF8FB] text-[#3A98BB] p-4 rounded-md mt-4  ml-4 mr-4 mb-8">
        <Image
          src={"/dev-images/ExclamationOutline.png"} // Replace with your actual image path
          alt="Exclamation"
          width={24}
          height={24}
        />
        <h3 className="ml-2">
          Complete your profile set-up
        </h3>
      </div>

      <div className="w-full">
        <SearchBar />
      </div>
      <div>
        <ProjectPage />
      </div>
      <div className="m-4 w-full bg-[#12333E]">
        <Footer3 />
      </div>
      </>
  );
};

export default Page;
