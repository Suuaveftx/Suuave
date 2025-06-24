"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@heroui/react";
import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { formatNumberShort, formatToNaira } from "../../../../utils/utils";

/**
 * UserInfoCard Component
 *
 * @param {Object} props
 * @param {number} props.idx - Index used to randomize avatar image.
 * @param {Object} props.userData - Object containing user info.
 * @param {string} props.userData.userName - Display name of the user.
 * @param {string} props.userData.handle - User handle (e.g., @username).
 * @param {string} props.userData.description - Short bio/description.
 * @param {number} props.userData.followers - Follower count.
 * @param {number} props.userData.following - Following count.
 */
const UserInfoCard = ({ idx, userData }) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-[300px] border-none  bg-transparent" shadow="none">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={`https://i.pravatar.cc/150?img=${idx}`}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userData?.userName || "N/A"}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">
              {userData?.handle || "N/A"}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : null
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">
          {userData?.description || "N/A"}
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">
            {formatNumberShort(userData?.following || 0)}
          </p>
          <p className=" text-default-500 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">
            {formatNumberShort(userData?.followers || 0)}
          </p>
          <p className="text-default-500 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};

/**
 * FashionDesignersCard Component
 *
 * @param {Object} props
 * @param {string} props.userName - Name of the designer.
 * @param {string[]} props.images - Array of image URLs.
 * @param {string} props.title - Title or name of the fashion item.
 * @param {number|string} props.price - Price of the fashion item.
 * @param {string} props.productID - Unique identifier for linking to details.
 * @param {Object} props.userData - Full user data for the popover.
 * @param {number} props.idx - Index for avatar randomization. not important
 */

const FashionDesignersCard = ({
  userName = "N/A",
  images = [],
  title = "N/A",
  price = "N/A",
  productID = "N/A",
  userData,
  idx,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    customPaging: () => (
      <div className="w-2 h-2 bg-white/50 rounded-full hover:bg-white transition-colors duration-200"></div>
    ),
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <Card className="px-0 hover:shadow-xl overflow-hidden" shadow="none">
      <CardBody className="overflow-hidden p-0">
        <Button
          isIconOnly
          className="absolute right-4 top-4 z-20 border-1 bg-[#444444] border-[#444444] backdrop-blur-sm hover:bg-[#444444]/70"
          size="sm"
          onPress={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark
            size={20}
            className={`${
              isBookmarked ? "fill-cyan-400 text-cyan-400" : "text-white"
            } transition-colors duration-200`}
          />
        </Button>
        <div className="overflow-hidden">
          <div className="slider-container">
            <Slider {...sliderSettings}>
              {images?.map((image, index) => (
                <div
                  key={index}
                  className="relative h-80 flex items-center justify-center"
                >
                  <img
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    className="w-full h-full object-cover object-top
                    "
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </CardBody>
      <CardFooter className="grid grid-cols-[1fr_0.5fr] gap-2 items-start w-full">
        <div className="space-y-3">
          <Link href={`/fashion-designers/${productID}`}>
            <p className="line-clamp-2 font-semibold text-sm hover:underline">
              {title}
            </p>
          </Link>
          <Popover showArrow placement="bottom">
            <PopoverTrigger>
              <User
                avatarProps={{
                  src: `https://i.pravatar.cc/150?img=${idx}`,
                  size: "sm",
                }}
                name={userName}
              />
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <UserInfoCard idx={idx} userData={userData} />
            </PopoverContent>
          </Popover>
        </div>
        <p className=" text-right font-semibold text-customDarkBlue">
          {formatToNaira(price)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default FashionDesignersCard;
