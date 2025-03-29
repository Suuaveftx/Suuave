"use client";
import React from "react";
import { BackgroundBeams } from "../../../components/BackgroundBeam";
import { Image } from "@heroui/react";
import CustomButton from "../../../components/CustomButton";
import HeroSlimCard from "../../../components/HeroSlimCard";
import {
  SvgCollabIcon,
  SvgCopyRightIcon,
  SvgCUserIcon,
  SvgProtectIcon,
} from "../../utils/SvgIcons";
import { ScrollParallax } from "react-just-parallax";

const HeroSection = () => {
  return (
    <div className="relative ">
      <BackgroundBeams />
      <div className="lg:grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 min-h-[94vh] bg-customNavBg pb-8 flex flex-col">
        <div className="col-span-2 h-6"></div>
        <div className="space-y-6 place-self-center  w-full">
          <div className="grid lg:grid-cols-2 grid-rows-2 grid-cols-[0.7fr_1fr] text-white lg:w-fit lg:ml-4 ml-0  w-full ">
            <Image
              src="/dev-images/userImages.png" // Replace with your mobile image path
              alt="African Fashion Artist"
              className="row-span-2 place-self-end mr-2 lg:w-[120px] w-[100px]"
              // height={80}
              disableSkeleton
              draggable={false}
            />
            <Image
              src="/dev-images/rating.png" // Replace with your mobile image path
              alt="African Fashion Artist"
              className="w-[120px] "
              width={120}
              // height={120}
              disableSkeleton
              draggable={false}
            />
            <p className="text-white z-20">Over 5000 Fashion Artists</p>
          </div>
          <p className="font-medium lg:text-[48px] text-[37px] text-white lg:pl-14 pl-0 md:p-2 leading-[60px] z-30 lg:w-[84%] lg:text-start text-center w-full">
            Find and Collaborate with the Ideal{" "}
            <span className="italic font-[40]">African</span> Fashion Artists.
          </p>
          <p className="text-customGray lg:pl-14 lg:w-[90%] lg:text-[17px] z-30 w-full lg:text-start text-center text-[16.6px]  pl-3 p-2 px-3 ">
            Unlock the potential of fashion collaboration and merge creativity,
            culture and expertise to create groundbreaking culturally-rich
            designs.
          </p>
          <CustomButton className="ml-14 w-40 text-lg h-[52px]" href={"/onboarding"} />
        </div>
        <div className="lg:pr-14 py-14 relative pr-5 px-5 lg:px-0 lg:mt-0 mt-7">
          <ScrollParallax isAbsolutelyPositioned strength={0.1} zIndex={30}>
            <HeroSlimCard
              text="Streamlined Collaboration"
              svg={<SvgCollabIcon className="size-5" />}
              className="absolute top-12 lg:left-0 right-6"
            />
          </ScrollParallax>
          <ScrollParallax isAbsolutelyPositioned strength={0.3} zIndex={30}>
            <HeroSlimCard
              text="Community Development"
              svg={<SvgCUserIcon className="size-5" />}
              className="absolute right-8 hidden lg:flex"
            />
          </ScrollParallax>
          <Image
            alt="hero_right"
            src="/dev-images/heroRight.png"
            className="hidden lg:block w-[84%] place-self-center"
            disableSkeleton
          />
          <Image
            alt="hero_right"
            src="/dev-images/mobileHeroImg.png"
            className="lg:hidden w-full"
            disableSkeleton
          />
          <ScrollParallax isAbsolutelyPositioned strength={0.05} zIndex={30}>
            <HeroSlimCard
              text="Copyright Protection"
              svg={<SvgCopyRightIcon className="size-5" />}
              className="absolute bottom-4 hidden lg:flex"
            />
          </ScrollParallax>
          <ScrollParallax isAbsolutelyPositioned strength={0.09} zIndex={30}>
            <HeroSlimCard
              text="Secure Payment"
              svg={<SvgProtectIcon className="size-5" />}
              className="absolute lg:right-20 lg:bottom-20 bottom-7 right-60"
            />
          </ScrollParallax>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
