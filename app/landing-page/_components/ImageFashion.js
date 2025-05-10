import React from "react";
import FashionArtistGroup from "../../../components/FashionArtistGroup";
import { fashionSection } from "../../utils/utils";
import { IoArrowForwardOutline } from "react-icons/io5";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Skeleton,
} from "@heroui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { ScrollParallax } from "react-just-parallax";

const ImageFashion = () => {
  return (
    <div className="lg:px-14  px-4 bg-customBgBlack min-h-60 py-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] lg:gap-4 gap-0 -z-30">
      <div className="col-span-2 lg:w-[56%] w-full">
        <p className="text-customWhiteBgText font-medium lg:text-2xl text-lg">
          FOR FASHION ARTISTS
        </p>
        <p className="text-customWhite font-normal lg:font-medium lg:text-[50px] text-[28px] mt-0 lg:mt-3 lg:leading-[57px]">
          Get global exposure and monetize your creativity.
        </p>
      </div>
      <div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 gap-x-20 mb-16 lg:w-[87%] mt-8 w-full">
          {fashionSection.map((group, index) => (
            <FashionArtistGroup
              key={index}
              text={group.text}
              title={group.title}
              img={group.image}
            />
          ))}
        </div>
        <p className=" text-customWhiteBgText font-medium lg:text-3xl text-xl">
          Begin your journey to success
        </p>
        <div className="flex items-center gap-2 mt-4 cursor-pointer text-customWhiteBgText font-medium hover:underline">
          <p>Get Started</p>
          <IoArrowForwardOutline />
        </div>
      </div>

      {/* Right section */}

      <div className="relative  flex-col hidden lg:flex">
        <ScrollParallax isAbsolutelyPositioned strength={0.1} zIndex={10}>
          <Card className="w-fit absolute  -left-28 -top-6">
            <CardHeader className="flex flex-col gap-2 items-start">
              <p className="text-[11px] font-thin text-[#888888]">
                Job Status: <span className="text-green-500 ">Active</span>
              </p>
              <p className="capitalize   text-[14px] ">
                Illustrator needed African traditional attire
              </p>
            </CardHeader>
            <CardBody className="py-0 space-y-2">
              <Skeleton className="w-full h-2.5" />
              <Skeleton className="w-full h-2.5" />
              <Skeleton className="w-[60%] h-2.5" />
              <div className="flex  w-[50%] gap-2.5 pt-2">
                <Skeleton className="w-full h-2.5" />
                <Skeleton className="w-full h-2.5" />
                <Skeleton className="w-full h-2.5" />
              </div>
              <p className="text-[11px] font-thin text-[#888888] pt-1">
                Budget $1200
              </p>
            </CardBody>
            <CardFooter className="flex pt-0 items-end justify-end">
              <Button
                size="sm"
                radius="full"
                className="bg-[#CCE7F2] text-customWhiteBgText font-semibold"
              >
                Send Proposal
              </Button>
            </CardFooter>
          </Card>
        </ScrollParallax>
        <Image
          src="/dev-images/womanDesigning.png"
          className=" -z-0"
          alt="woman Designing"
        />
        {/* second floting card */}
        <ScrollParallax isAbsolutelyPositioned strength={0.07} zIndex={10}>
          <Card className="w-fit absolute z-10  -left-12 bottom-8 ">
            <CardBody className="  space-y-2 items-center">
              <FaCircleCheck className="size-6 fill-green-900" />
              <p className="text-[11px] font-semibold text-[#4d4c4c] pt-1">
                Successful Pay-Out!
              </p>
              <Skeleton className="w-44 h-2.5" />
              <Skeleton className="w-44 h-2.5" />
            </CardBody>
            <CardFooter className="flex pt-0 items-center justify-center">
              <Button
                size="sm"
                radius="full"
                className="bg-[#CCE7F2] text-[#4d4c4c] font-semibold"
              >
                Ok
              </Button>
            </CardFooter>
          </Card>
        </ScrollParallax>
      </div>
    </div>
  );
};

export default ImageFashion;
