import React from "react";
import CustomButton from "../../../components/CustomButton";
import { Image } from "@heroui/react";

const ExploreComponent = () => {
  return (
    <div className="lg:p-14 pt-12 lg:pt-0 p-4 bg-[#fafafa] lg:pb-36 pb-14">
      <div className="p-3 py-2 bg-customPrimary w-fit text-customWhiteBgText  font-medium">
        FIND TALENTED FASHION ARTISTS
      </div>
      <p className="mt-1 lg:font-semibold lg:text-[40px] text-[26px] font-medium text-[#404040] lg:w-[38%]">
        Explore and get license to our top-rated designs.
      </p>
      <div className=" gap-3 grid-cols-[1fr_1fr_1.3fr] hidden lg:grid">
        <div
          className="bg-cover object-top  col-span-2 min-h-96  bg-top"
          style={{
            backgroundImage: `url('/dev-images/fashiondesigner.png')`,
          }}
        />
        <div
          className="bg-cover bg-no-repeat bg-center object-top row-span-2 w-full h-full min-h-96  pb-24 flex items-end justify-center"
          style={{
            backgroundImage: `url('/dev-images/fashiondesigner3.png')`,
          }}
        >
          <div className="bg-black/30  p-4 text-white w-80 flex items-center flex-col text-center">
            <p>All designs are licensable and available for collaborations.</p>
            <p>
              You are just a step away from owning the right to use these
              designs
            </p>
            <CustomButton text="Explore More" className="mt-8" />
          </div>
        </div>
        <div
          className="bg-cover bg-no-repeat object-top w-full h-full min-h-96  bg-center"
          style={{
            backgroundImage: `url('/dev-images/Gropie2.png')`,
          }}
        />

        <div
          className="bg-cover object-top w-full h-full min-h-96  bg-center"
          style={{
            backgroundImage: `url('/dev-images/fashiondesigner2.png')`,
          }}
        />
      </div>

      <div className="lg:hidden grid grid-cols-2 gap-3 mt-10">
        <Image
          alt="img"
          src="/dev-images/exploreMobileImg1.png"
          radius="none"
        />
        <Image
          alt="img"
          src="/dev-images/exploreMobileImg2.png"
          radius="none"
        />
        <Image
          alt="img"
          src="/dev-images/exploreMobileImg3.png"
          radius="none"
        />
        <Image
          alt="img"
          src="/dev-images/exploreMobileImg4.png"
          radius="none"
        />
        <div className="col-span-2 mt-6 items-center flex flex-col">
          <p className="text-center text-[#727272]">
            All designs are licensable and available for collaborations.
          </p>
          <CustomButton
            text="Explore More"
            className="mt-4 place-self-center items-center size-36"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreComponent;
