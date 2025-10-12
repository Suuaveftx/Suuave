import Image from "next/image";
import React from "react";

const WhySuuaveCard = ({ title, text, svgIcon, className }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-[24px] space-y-4 border-1 border-[#D0D0D0] p-6 text-left pb-14 ${className}`}
    >
      <div className="bg-[#E3F7FF] w-fit p-3 rounded-full border-[#86DEFF] border-1">
        <Image
          src={svgIcon}
          alt={title}
          width={30}
          height={30}
          className="object-contain"
          draggable={false}
        />
      </div>
      <h3 className="text-xl font-medium mb-2 text-[#035A7A]">{title}</h3>
      <p className="text-customDark ">{text}</p>
    </div>
  );
};

export default WhySuuaveCard;
