import { useState } from "react";
import Image from "next/image";
import { HiOutlineAdjustments } from "react-icons/hi";

const SortByDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by Date");

  const options = ["Relevance", "Salary", "Location"];

  return (
    <div className="relative z-10 w">
     <button
  onClick={() => setIsOpen(!isOpen)}
  className="bg-transparent border border-gray-300 gap-4 px-4 py-2 rounded-full flex items-center justify-between w-[178px] whitespace-nowrap"
>
  <HiOutlineAdjustments className="w-6 h-6 text-gray-500 flex-shrink-0" />
  <span className="text-sm">{selectedOption}</span>
  <span className="ml-auto text-sm">▼</span>
</button>


      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
          {options.map((option) => (
            <button
              key={option}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortByDropdown;
