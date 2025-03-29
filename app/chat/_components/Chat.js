'use client'
import React from "react";
import { Card, CardHeader } from "@heroui/react";
import CustomButton from "../../../components/CustomButton";
import SearchBar from "../../../components/Searchbar";
import SortByDropdown from "../../../components/SortByDropdown";
import Modal3 from "../../../components/Modal3";

const Chat = () => {
  return (
    <>
    <div className="flex items-center gap-x-2">
    <SearchBar placeholder="Search by job title" className="w-full max-w-[980px]" />
     <SortByDropdown />
</div>


    <div className="flex flex-col ml-8 w-full space-y-6 mt-8">
      {[1, 2, 3,].map((_, index) => (
        <div key={index} className="w-[1100px]">
          <Card className="w-full h-[170px] p-6 flex flex-row justify-between items-start">
            {/* Grouped Header and Text */}
            <div className="flex flex-col items-start gap-1 w-3/5">
              {/* Header with a thinner underline */}
              <CardHeader
                className="text-xl font-semibold text-[#3A98BB] border-b border-[#3A98BB] w-fit pb-[2px] whitespace-nowrap"
              >
                Modern Fashion Attire Illustration (24t64754)
              </CardHeader>

              {/* Dates */}
              <div className="text-gray-600 text-base flex flex-col">
                <span className="whitespace-nowrap">Start Date: 18, June, 2024</span>
                <span className="whitespace-nowrap">End Date: 28, July, 2024</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 items-center">
              <Modal3 />
              <CustomButton text="Chat Client" className="bg-transparent border-1 border-[#767676] text-[#767676]" />
              <span className="text-blue-500 cursor-pointer text-lg">More......</span>
            </div>
          </Card>
        </div>
      ))}
    </div>
    </>
  );
};

export default Chat;
