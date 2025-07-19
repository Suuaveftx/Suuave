"use client";

import React from "react";
import Image from "next/image";
import { collectionData } from "./data";
import ProductDetails from "../_components/collections/ProductDetails";

const page = () => {
  return (
    <>
      {/* Header */}
      <div className="w-full px-4 flex items-center gap-2 md:px-6 lg:px-14">
        <Image
          src="\collectionImage\icons\arrow-left.svg"
          alt="icon"
          width={24}
          height={24}
          className="cursor-pointer md:hidden"
        />
        <h1 className="text-[#767676] py-3 font-satoshi font-bold text-xl md:w-full  md:text-2xl md:border-b-2 border-divider ">
          My Collections
        </h1>
      </div>
      <div className="border-b-2 border-divider md:hidden" />
      <div className=" px-4 py-3 md:px-6 md:py-6 lg:px-14">
        <div className="mt-[22px] flex justify-between gap-1 md:hidden">
          <div className="w-full flex items-center p-2 gap-2 border-1 border-divider rounded-[32px] ">
            <Image
              src="\collectionImage\icons\search.svg"
              alt="icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <input
              type="text"
              placeholder="Search collections"
              className="outline-none bg-transparent text-[#767676]  font-satoshi font-normal text-xs m w-full"
            />
          </div>
          <Image
            src="\collectionImage\icons\filter.svg"
            alt="icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
        {/*  Products */}
        <div className="mt-11 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {collectionData.map((items) => (
            <ProductDetails key={items.id} event={items} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
