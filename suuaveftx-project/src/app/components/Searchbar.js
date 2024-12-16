import Image from 'next/image';
import React from 'react';

const SearchBar = ({ placeholder = 'Search Jobs...' }) => {
  return (
    <div className="w-[930pxl max-w-md mx-auto flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2">
      {/* Custom Search Icon */}
      <Image src={"/dev-images/Search.png"} alt="Search Icon" className="w-5 h-5 mr-2" width={25} height={25} />
      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        className="w-[930px]  bg-transparent focus:outline-none text-gray-700"
      />
    </div>
  );
};

export default SearchBar;
