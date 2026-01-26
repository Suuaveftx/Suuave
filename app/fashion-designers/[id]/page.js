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
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { SvgCautionIcon } from "../../../utils/SvgIcons";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import LicenseModal from "../_components/licenseModal";
import ProductGallery from "../_components/designer-details/ProductGallery";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

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

  const [isLicensed, setIsLicensed] = useState(false);

  const router = useRouter();
  // unwrap params
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const handleGetLicense = () => {
    router.push(`/checkout-page?id=${id}`);
  };

  useEffect(() => {
    const storedLicenses = localStorage.getItem("licenses");
    if (storedLicenses) {
      const licenses = JSON.parse(storedLicenses);
      if (licenses[id]) {
        setIsLicensed(true);
      }
    }
  }, [id]);

  //handle download
  const handleDownload = () => {
    alert("Download started");
    // later you can add actual download logic here
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.54fr] gap-4 p-6 max-w-[1500px] mx-auto ">
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
                className="rounded-full w-[70%]  text-[#FFF9EE] bg-[#C3A130] text-lg h-12 px-9 py-1 shadow-md  font-semibold mx-auto mt-10"
                onPress={handleDownload}
              >
                Download Files
              </Button>
            </CardBody>
          ) : (
            <CardBody className="flex flex-col items-center gap-4 py-8">
              <p className="text-3xl font-semibold text-[#3A98BB]">
                {product.price}
              </p>
              <Popover showArrow={true}>
                <PopoverTrigger>
                  <div className="flex gap-2 p-2 border w-fit items-center cursor-pointer">
                    <p>Licensing Right</p>
                    <SvgCautionIcon className="size-5" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 text-sm">
                  <div className="flex flex-col gap-2">
                    <p>
                      You are purchasing a commercial usage license; the artist retains full copyright and original ownership of the work.
                    </p>
                    <p>
                      This means you have the right to use this design for your collection, according to the agreed license terms. You cannot resell the digital file to another company, claim you created the artwork, or register the design as your trademark.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                className="rounded-full w-[70%]  text-customWhiteBgText text-md h-12 px-9 py-1 shadow-md  font-semibold flex items-center justify-center gap-2 mt-6"
                style={{
                  background:
                    "radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)",
                }}
                onPress={() => handleGetLicense()}
              >
                Get License
              </Button>

              <Button
                variant="bordered"
                className="rounded-full w-[70%] text-[#035A7A] text-md h-12 px-9 py-1  shadow-md font-semibold flex items-center justify-center gap-2"
              >
                Save
              </Button>
            </CardBody>
          )}
        </Card>
        {/* Artist Info */}
        <div className="p-4 border rounded-2xl bg-white shadow-sm px-5 pb-8">
          <p className="text-center font-semibold text-lg border-b pb-3 ">
            About the Artist
          </p>
          <div className="flex flex-col items-center mt-5">
            <Link href="/artist-page/profile-for-artist">
              <Avatar
                className="w-24 h-24 text-large cursor-pointer"
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              />
            </Link>
            <Link href="/artist-page/profile-for-artist" className="hover:underline">
              <p className="mt-3 font-bold text-customDarkBlue">{product.artist.handle}</p>
            </Link>
            <p className="text-sm ">{product.artist.role}</p>
            <div className="flex gap-2 mt-3">
              <TiLocation className="size-5 fill-[#878787]" />
              <p className="text-sm ">{product.artist.location}</p>
            </div>

            <div className="flex gap-2 items-center mt-2">
              <span className="text-sm text-gray-500">Ratings</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < product.artist.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-[#3A98BB]">
                ({product.artist.reviews} <Link
                  href="/artist-page/profile-for-artist?tab=reviews"
                  className="cursor-pointer"
                >
                  Reviews
                </Link>)
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
    </div>
  );
};

export default ProductDetails;
