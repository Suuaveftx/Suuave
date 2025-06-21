"use client";

import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Chip,
  Avatar,
} from "@heroui/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { SvgCautionIcon } from "../../../utils/SvgIcons";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import LicenseModal from "../_components/licenseModal";
import ProductGallery from "../_components/designer-details/ProductGallery";

const ProductDetails = ({ params }) => {
  // const { id } = params; // Extract 'id' from the params object

  const product = {
    title: "Modern Fashion Attire Illustration",
    price: "$35,000.00",
    license: "Exclusive Right",
    images: [
      "/dev-images/fashionImg1.png",
      "/dev-images/FashionImg.png",
      "/dev-images/fashiondesigner3.png",
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["Fashion", "Illustration", "Luxury"],
    artist: {
      handle: "@Ocean",
      role: "Fashion Artist",
      location: "Lagos, Nigeria",
      avatar: "/images/artist.jpg",
      rating: 4,
      reviews: 5,
      workCompleted: 14,
      designSold: 10,
    },
  };

  const [isLicensed, setIsLicensed] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.54fr] gap-12 p-6 max-w-[1500px] mx-auto ">
      {/* Left Section: Images */}

      <div className="w-full ">
        <ProductGallery images={product.images} title={product.title} />

        <div className="bg-white border p-4 rounded-2xl mt-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold truncate">{product.title}</h1>
            <div className="flex items-center gap-4">
              <Button size="md" variant="light" isIconOnly radius="full">
                <HiDotsHorizontal className="size-5  fill-[#878787]" />{" "}
              </Button>
              <div className="flex items-center gap-1">
                <MdOutlineRemoveRedEye className="size-5  fill-[#878787]" />
                <p>12</p>
              </div>
              <Button size="md" variant="light" isIconOnly radius="full">
                <IoBookmark className="size-5 fill-customDarkBlue" />
              </Button>
            </div>
          </div>
          <p className="text-gray-600 mt-4 border-b-1 pb-5">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <Chip radius="sm">Tags</Chip>
            <Chip radius="sm">Tags</Chip>
            <Chip radius="sm">Tags</Chip>
          </div>
        </div>
      </div>

      {/* NOTE: Right Section: Product Details */}
      <div className="space-y-6">
        <Card shadow="sm" className="min-h-60">
          {isLicensed ? (
            <CardBody>
              <div className="flex flex-col gap-2 items-center mt-7">
                <p className="text-2xl font-bold text-center">
                  Congratulations!
                </p>
                <p className="text-[#767676] text-center">
                  You can now download all files for this design.
                </p>
              </div>

              <Button
                onPress={() => setIsLicensed(!isLicensed)}
                className="rounded-full w-[70%] bg-[#C3A130] mx-auto mt-10 text-white text-lg h-12 px-9 py-1 shadow-md font-semibold flex  "
              >
                Download Files
              </Button>
            </CardBody>
          ) : (
            <CardBody className="flex flex-col items-center gap-4 py-8">
              <p className="text-3xl font-semibold text-[#3A98BB]">
                {product.price}
              </p>
              <div className="flex gap-2 p-2 border w-fit items-center">
                <p>Licensing Right</p>
                <Popover showArrow={true}>
                  <PopoverTrigger>
                    <div className="cursor-pointer">
                      <SvgCautionIcon className="size-5" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 text-sm">
                    Grants permission to others to use, modify, or distribute
                    your work under agreed terms. You retain ownership while
                    allowing specific usage rights.
                    <br />
                    <em>Example:</em> A company pays to use your design in their
                    app.
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                className="rounded-full w-[70%] mt-auto text-customWhiteBgText text-lg h-12 px-9 py-1 shadow-md  font-semibold flex items-center justify-center gap-2"
                style={{
                  background:
                    "radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)",
                }}
                onPress={() => setIsLicensed(!isLicensed)}
              >
                Get License
              </Button>
            </CardBody>
          )}
        </Card>
        {/* Artist Info */}
        <div className="p-4 border rounded-2xl bg-white shadow-sm px-5 pb-8">
          <p className="text-center font-semibold  border-b pb-3 ">
            About the Artist
          </p>
          <div className="flex flex-col items-center mt-5">
            <Avatar
              className="w-24 h-24 text-large"
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            />
            <p className="mt-3 font-bold">{product.artist.handle}</p>
            <p className="text-sm ">{product.artist.role}</p>
            <div className="flex gap-2 mt-3">
              <TiLocation className="size-5 fill-[#878787]" />

              <p className="text-sm ">{product.artist.location}</p>
            </div>

            <div className="mt-2 flex items-center space-x-1 text-yellow-500">
              <span className="text-sm text-gray-600 mr-1">Rating</span>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < product.artist.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm text-[#3A98BB] pl-1">
                ({product.artist.reviews} Reviews)
              </span>
            </div>

            <div className="flex items-center flex-col mt-9 gap-3">
              <p className="font-semibold text-lg">
                {product.artist.workCompleted}
              </p>
              <p className="text-gray-500">Work Completed</p>
              <p className="font-semibold text-lg mt-8">
                {product.artist.designSold}
              </p>
              <p className="text-gray-500">Design Sold</p>
            </div>
          </div>
        </div>
      </div>
      <LicenseModal />
    </div>
  );
};

export default ProductDetails;
