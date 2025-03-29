
import React from "react";
import JobPost from "./_components/JobPost";
import AppLayout from "../../components/Applayout";
import SearchBar from "../../components/Searchbar";
import Footer3 from "../../components/Footer3";
import Image from "next/image";
import Footer from "../landingpage/_components/Footer";

const page = () => {
  return (
    <AppLayout>
      <div className="hidden lg:flex bg-[#FF8024] text-white p-4 rounded-md mb-8">
        <Image
          src={"/dev-images/Exclamation.png"}
          alt="Exclamation"
          width={24}
          height={24}
        />
        <h3 className="ml-2">
          Verify your phone number to be easily accessible by clients.
        </h3>
      </div>

      <div className="w-full">
        <SearchBar />
      </div>
      <div>
        <JobPost />
      </div>
      <div className="m-4 w-full bg-[#12333E]">
        <Footer />
      </div>
    </AppLayout>
  );
};

export default page;
