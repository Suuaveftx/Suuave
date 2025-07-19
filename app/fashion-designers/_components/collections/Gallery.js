"use client";

import React, { useState } from "react";
import Image from "next/image";

const Gallery = ({ details }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { images, title } = details;

  return (
    <div className="flex items-start gap-3 justify-between w-[50%] ">
      {/* Main Display Area */}
      <div className="  w-[70%] h-[320px] ">
        {/* Main Image */}
        <Image
          src={images[selectedIndex]}
          alt={`- Image ${selectedIndex + 1}`}
          className=" w-full h-full bg-[#FAFAFA] rounded-lg  drop-shadow-md object-cover object-center transition-opacity duration-500"
          width={0}
          height={0}
        />
        <p className="text-[#222222] font-satoshi mt-3 font-bold text-base w-[400px]">
          {title}
        </p>
      </div>
      {/* Thumbnail Navigation */}
      <div className="flex flex-col gap-3 ">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={` w-20 h-20 `}
          >
            <Image
              src={image}
              alt={`thumbnail ${index + 1}`}
              className={`${
                selectedIndex === index
                  ? "ring-2 ring-[#3A98BB] scale-105"
                  : "opacity-60 hover:opacity-80"
              } rounded-[8px] w-full h-full object-cover object-center  transition-all duration-300 `}
              width={0}
              height={0}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
