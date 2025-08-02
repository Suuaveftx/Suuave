import React from "react";
import { useState } from "react";
import CustomButton from "../../../../components/CustomButton";
import SearchBar from "../../../../components/Searchbar";
import SortByDropdown from "../../../../components/SortByDropdown";
import { MoreHorizontal, MoreVertical } from "lucide-react";

const OngoingContracts = () => {

const [dropdownOpen, setDropdownOpen] = useState(null);

  const pendingProjects = [
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754-A",
      StartDate: "18. June 2024",
      EndDate: "-2 days",
    },
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754-B",
      StartDate: "18. June 2024",
      EndDate: "-2 day",
    },
  ];

  return (
    <>
      {/* Search and Sort Section */}
      <div className="lg:flex lg:flex-row lg:justify-between lg:items-center hidden    sm:flex-row items-center">
        <SearchBar
          placeholder="Search by job title"
          className="lg:w-full lg:max-w-[50%]"
        />
        <div className="lg:mt-4">
        <SortByDropdown />
        </div>
      </div>

      {/* Contracts List */}
      <div>
        {pendingProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#fafafa] px-4 py-4 rounded-lg shadow-md lg:mt-[36px] mt-[26px] mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4"
          >
            {/* Project Info + Mobile Dots */}
            <div className="lg:flex lg:flex-col  justify-center lg:mx-0 mx-4">
              <h3 className="lg:text-2xl text-base tracking-[0.33px] lg:text-[#3A98BB] text-[#3A98BB] font-semibold flex items-center lg:mb-6 mb-2 underline lg:gap-0 gap-8">
                {project.title}
                 <span className="text-2xl text-[#3A98BB] font-bolod ml-1 lg:flex hidden">({project.id})</span>
                {/* Mobile-only three dots beside title */}
                <div className="ml-0 flex lg:hidden relative">
                  <button
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === project.id ? null : project.id
                      )
                    }
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer" />
                  </button>
                  {dropdownOpen === project.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      
                      <button
                        onClick={() => setDropdownOpen(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Report
                      </button>
                    </div>
                  )}
                </div>
              </h3>
              <div className="lg:flex flex-col w-full justify-start gap-4">
              <p className="text-base text-gray-500">
                Start Date: {project.StartDate}
              </p>
              <p className="text-sm text-gray-500">
                End Date: {project.EndDate}
              </p>
              </div>
            </div>

            {/* Accept Button (Desktop Only) */}
            <div className="flex items-center gap-[10px]">
            <div className="hidden lg:flex mt-[-60px] gap-6">
              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => setDropdownOpen(project.id)}
                className="items-center gap-2"
                text="Submit Project"
                style={{
                  color: "#035A7A",}}

              />
               <CustomButton
                variant="outline"
                size="sm"
                onClick={() => setDropdownOpen(project.id)}
                className="items-center gap-2"
                text="Chat client"
                style={{
                  color: "#222222",
                   background: "transparent",
                  border: "1px solid #D1D1D1",}}

              />
            </div>
              <div className="ml-2 lg:flex hidden  relative lg:mt-[-60px]">
                  <button
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === project.id ? null : project.id
                      )
                    }
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                  </button>
                  {dropdownOpen === project.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    
                      <button
                        onClick={() => setDropdownOpen(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Report
                      </button>
                    </div>
                  )}
                </div>
                </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OngoingContracts;