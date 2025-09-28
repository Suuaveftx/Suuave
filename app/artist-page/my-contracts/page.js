import React from "react";
import UnderlinedTabs from "./_components/Tabs";
import SearchBar from "../../../components/Searchbar";
import PaginationTab from "../../../components/Pagination";
import { ChevronLeft } from "lucide-react";

const Page = () => {
  return (
    <>
      <div>
        {/* Title Row */}
        <div className="flex items-center ml-8 mt-8 mb-2">
          {/* Show Chevron only on mobile */}
          <button className="lg:hidden mr-2">
  <ChevronLeft className="w-6 h-6 text-[#878787]" />
</button>


          <h1 className="lg:text-2xl text-[20px] font-bold text-[#222222]">
            My Contracts
          </h1>
        </div>

        <UnderlinedTabs />
      </div>

      {/* Center Pagination */}
      <div className="flex justify-center">
        <PaginationTab />
      </div>
    </>
  );
};

export default Page;
