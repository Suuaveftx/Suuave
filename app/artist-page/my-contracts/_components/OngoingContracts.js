import React from "react";
import { Card, CardHeader } from "@heroui/react";
import CustomButton from "../../../../components/CustomButton";
import SearchBar from "../../../../components/Searchbar";
import SortByDropdown from "../../../../components/SortByDropdown";
import SubmitModal from "../../../../components/SubmitModal";

const OngoingContracts = () => {
  return (
    <>
      {/* Search and Sort Section */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-x-2">
        <SearchBar
          placeholder="Search by job title"
          className="w-full sm:max-w-[980px]"
        />
        <SortByDropdown />
      </div>

      {/* Contracts List */}
      <div className="flex flex-col sm:ml-8 w-full space-y-6 mt-8">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="w-full sm:w-[1100px] px-4 sm:px-0"
          >
            <Card className="w-full h-auto sm:h-[170px] p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              {/* Grouped Header and Text */}
              <div className="flex flex-col items-start gap-1 w-full sm:w-3/5">
                {/* Header with a thinner underline */}
                <CardHeader
                  className="text-lg sm:text-xl font-semibold text-[#3A98BB] border-b border-[#3A98BB] w-fit pb-[2px] whitespace-nowrap"
                >
                  Modern Fashion Attire Illustration (24t64754)
                </CardHeader>

                {/* Dates */}
                <div className="text-gray-600 text-sm sm:text-base flex flex-col">
                  <span className="whitespace-nowrap">
                    Start Date: 18, June, 2024
                  </span>
                  <span className="whitespace-nowrap">
                    End Date: 28, July, 2024
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center mt-4 sm:mt-0">
                <SubmitModal />
                <CustomButton
                  text="Chat Client"
                  className="bg-transparent border-1 border-[#767676] text-[#767676]"
                  href={"/artist-page/chat-client"}
                />
                <span className="text-blue-500 cursor-pointer text-sm sm:text-lg">
                  More......
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default OngoingContracts;