"use client";

import React from "react";
import LogoImg from "../signup/_components/LogoImg";
import FashionForm from "../fsignup/_components/Fsignup";
const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center h-auto w-full px-4">
      {/* Left Side: Logo Image */}
      <div className="mt-[-189px]">
        <LogoImg />
      </div>

    
      <div className=" mt-16 mb-32 bg-[#F]">
        <div className="w-full">
          <div className="shadow-lg rounded-md">
           <FashionForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
