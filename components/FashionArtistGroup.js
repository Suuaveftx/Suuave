import { Image } from "@heroui/react";
import React from "react";

const FashionArtistGroup = ({ title = "title", text, img }) => {
  return (
    <div className="space-y-4 lg:bg-transparent bg-[#202020] p-3 lg:p-0 ">
      <div className="flex items-center lg:items-start lg:flex-col gap-3">
        <Image className="w-7 h-7" src={img} disableSkeleton alt={title} />
        <p className="lg:text-2xl text-lg  font-normal lg:font-medium text-customTextWhite">
          {title}
        </p>
      </div>
      <p className="text-[#888888]">{text}</p>
    </div>
  );
};

export default FashionArtistGroup;
