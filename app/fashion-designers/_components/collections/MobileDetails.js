"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collectionData } from "../../my-collection/data";

const MobileDetails = ({ id }) => {
  const collection = collectionData.find((item) => item.id.toString() === id);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  // If invalid collection id
  if (!collection) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Collection not found
      </div>
    );
  }

  const { details, url, title } = collection;

  return (
    <>
      <div className="w-full px-4 flex items-center gap-2 border-b-1 border-divider">
        <button
          onClick={handleBack}
          className="outline-0 cursor-pointer md:hidden"
        >
          <Image
            src="/collectionImage/icons/arrow-left.svg"
            alt="icon"
            width={24}
            height={24}
            className=" "
          />
        </button>

        <h1 className="text-[#767676] py-3 font-satoshi font-bold text-xl md:text-2xl ">
          My Collections
        </h1>
      </div>
      {/* Product Gallery */}
      <div className=" mt-4">
        <Image
          src={url}
          alt={title}
          className="w-full px-4"
          width={0}
          height={300}
        />
        <p className="mt-4 px-4 text-[#222222] font-bold text-sm font-satoshi border-b-1 border-divider py-4">
          {details.title}
        </p>
        {/* Description */}
        <Header>Description</Header>
        <Text>
          This illustration showcases a regal Nigerian Agbada, blending
          tradition and contemporary style. The design features a flowing,
          triple-layered
        </Text>
        {/* Collection Files */}
        <Header>Collection Files</Header>
        <div className=" border-b-1 border-divider mt-2 pb-4 px-4">
          {details.collectionFiles.map((file, index) => (
            <p
              key={index}
              className="text-[#767676] font-satoshi font-normal text-xs "
            >
              {file}
            </p>
          ))}
        </div>
        {/* Price */}
        <Header>Price</Header>
        <Text>{details.price}</Text>
        {/* Licensed Date */}
        <Header>Licensed Date</Header>
        <Text>{details.purchasedDate}</Text>
        {/* Artist */}
        <Header>Artist</Header>
        <span className="flex items-center gap-2  border-b-1 border-divider mt-2 pb-4 px-4">
          <Image
            src={details?.artist?.image}
            alt="image"
            width={30}
            height={30}
          />
          <p className="text-[#3A98BB] font-satoshi font-normal text-xs ">
            {details?.artist?.name}
          </p>
        </span>
      </div>
    </>
  );
};

export default MobileDetails;

const Header = ({ children }) => (
  <h2 className="text-[#222222] font-satoshi font-medium text-sm mt-2 px-4">
    {children}
  </h2>
);

const Text = ({ children }) => (
  <p className="text-[#767676] px-4 font-satoshi font-normal text-xs  border-b-1 border-divider mt-2 pb-4">
    {children}
  </p>
);
