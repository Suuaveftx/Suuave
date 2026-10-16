'use client'
import React, { useState } from 'react';
const Tabs = () => {
  const [activePage, setActivePage] = useState(0);

  return (
    <div className="flex w-full space-x-2 p-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`flex-1 h-2 rounded-full ${
            activePage === index ? 'bg-[#CCE7F2]' : 'bg-gray-200'
          } cursor-pointer`}
          onClick={() => setActivePage(index)}
        ></div>
      ))}
    </div>
  );
};

export default Tabs;
