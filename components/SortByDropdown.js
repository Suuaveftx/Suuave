import { useState } from "react";
import Image from "next/image";

const SortByDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by");

  const options = ["Date", "Relevance", "Salary", "Location"];

  return (
    <div className="relative z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border border-gray-300 px-4 py-2 rounded-full flex items-center justify-between w-[140px]"
      >
        <Image src="/dev-images/sort.png" alt="Sort Icon" width={16} height={16} className="mr-2" />
        {selectedOption}
        <span className="ml-auto">▼</span>
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
