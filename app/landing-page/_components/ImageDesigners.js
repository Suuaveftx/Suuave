import React from "react";
import { fashionDsignRightSection } from "../../utils/utils";
import FashionDesignSectionCard from "../../../components/FashionDesignSectionCard";

const ImageDesigners = () => {
  return (
    <div className="grid lg:grid-cols-2 min-h-96">
      <div
        className="bg-cover  h-[510px] lg:h-full"
        style={{
          backgroundImage: `url('/dev-images/ImageDesigners.png')`,
        }}
      />
      {/* Right section */}
      <div className="bg-[#124456] lg:px-14 px-4  lg:pt-8 pt-12 pb-14">
        <p className="text-[#049AD1] lg:font-medium font-normal lg:text-2xl text-[18px]">
          FOR FASHION DESIGNERS / BRANDS
        </p>
        <p className="lg:font-medium lg:text-[50px] text-[28px] text-white mt-3 lg:leading-[54px]">
          Access Africa’s top fashion{" "}
          <span className="italic font-thin">artists</span> in few steps.
        </p>

        <div className="flex flex-col gap-5 lg:mt-6 mt-14">
          {fashionDsignRightSection.map((item, idx) => (
            <FashionDesignSectionCard
              key={idx}
              title={item.title}
              btnText={item.btnText}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageDesigners;
