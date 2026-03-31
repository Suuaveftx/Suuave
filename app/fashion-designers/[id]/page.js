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
  Alert,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import React, { useState } from "react";
import { FaStar, FaShareAlt, FaWhatsapp, FaTwitter, FaFacebook, FaLinkedin, FaCopy } from "react-icons/fa";
import { SvgCautionIcon } from "../../../utils/SvgIcons";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { Info, ArrowLeft } from "lucide-react";
import LicenseModal from "../_components/licenseModal";
import ProductGallery from "../_components/designer-details/ProductGallery";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useBookmarks } from "../_components/BookmarkContext";

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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toggleBookmark, isBookmarked, refreshBookmarks } = useBookmarks();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dragControls = useDragControls();

  const router = useRouter();
  // unwrap params
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const isSaved = isBookmarked(id);

  useEffect(() => {
    refreshBookmarks();
  }, [refreshBookmarks]);

  const handleGetLicense = () => {
    router.push(`/checkout-page?id=${id}`);
  };

  const handleSave = () => {
    toggleBookmark(id);
  };

  const handleSocialShare = (platform) => {
    const url = window.location.href;
    const text = "Check out this fashion design!";

    let shareUrl = "";
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
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
    console.log("Download started");
    // later you can add actual download logic here
  };

  return (
    <div className="relative pb-24 lg:pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.54fr] gap-4 p-4 lg:p-6 max-w-[1500px] mx-auto ">
        {/* Left Section: Images */}
        <div className="w-full">
          <ProductGallery
            images={product.images}
            title={product.title}
            isBookmarked={isBookmarked(String(id || "").trim())}
            onToggleSave={handleSave}
            onOpenDetails={(index) => {
              setCurrentImageIndex(index);
              setIsSheetOpen(true);
            }}
          />

          {/* Details Section - Hidden on mobile, visible on lg */}
          <div className="hidden lg:block bg-white border p-4 rounded-2xl mt-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold truncate">{product.title}</h1>
              <div className="flex items-center gap-4">
                {/* Share Dropdown - Desktop */}
                <div className="relative">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="md" variant="light" isIconOnly radius="full">
                        <FaShareAlt className="size-5 text-[#878787] hover:text-gray-700" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Share options"
                      onAction={(key) => handleSocialShare(key)}
                    >
                      <DropdownItem key="whatsapp" startContent={<FaWhatsapp className="text-green-500" />}>
                        WhatsApp
                      </DropdownItem>
                      <DropdownItem key="twitter" startContent={<FaTwitter className="text-blue-400" />}>
                        X (Twitter)
                      </DropdownItem>
                      <DropdownItem key="facebook" startContent={<FaFacebook className="text-blue-700" />}>
                        Facebook
                      </DropdownItem>
                      <DropdownItem key="linkedin" startContent={<FaLinkedin className="text-blue-800" />}>
                        LinkedIn
                      </DropdownItem>
                      <DropdownItem key="copy" startContent={<FaCopy className="text-gray-500" />}>
                        Copy Link
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  {copied && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-30">
                      Copied!
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <MdOutlineRemoveRedEye className="size-5  fill-[#878787]" />
                  <p>12</p>
                </div>
                <Button
                  size="md"
                  variant="light"
                  isIconOnly
                  radius="full"
                  onPress={handleSave}
                >
                  {isBookmarked(String(id || "").trim()) ? (
                    <IoBookmark className="size-5 fill-[#3A98BB] text-[#3A98BB]" />
                  ) : (
                    <IoBookmarkOutline className="size-5 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mt-4 border-b-1 pb-5">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-5">
              {product.tags.map((tag, i) => (
                <Chip key={i} radius="sm">{tag}</Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Product Details - Hidden on mobile, visible on lg */}
        <div className="hidden lg:flex flex-col space-y-6">
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
                      "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
                  }}
                  onPress={() => handleGetLicense()}
                >
                  Get License
                </Button>

                <Button
                  variant="bordered"
                  className={`rounded-full w-[70%] text-md h-12 px-9 py-1 shadow-md font-semibold flex items-center justify-center gap-2 ${isBookmarked(String(id || "").trim()) ? "bg-[#3A98BB] text-white border-[#3A98BB]" : "text-[#035A7A]"}`}
                  onPress={handleSave}
                >
                  {isBookmarked(String(id || "").trim()) ? "Saved" : "Save"}
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
              <Link href="/artist-page/profile-vistor-view">
                <Avatar
                  className="w-24 h-24 text-large cursor-pointer shadow-md"
                  src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                />
              </Link>
              <Link href="/artist-page/profile-vistor-view" className="hover:underline">
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
                    href="/artist-page/profile-vistor-view?tab=reviews"
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

      {/* Mobile Footer Bar - Changed to sticky to avoid covering main footer */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 bg-white border-t p-4 px-6 flex items-center justify-between z-40 mt-auto">
        {isLicensed ? (
          <Button
            className="rounded-full w-full text-[#FFF9EE] bg-[#C3A130] text-lg h-12 px-6 py-2 shadow-md font-semibold"
            onPress={handleDownload}
          >
            Download Files
          </Button>
        ) : (
          <>
            <div>
              <p className="text-xl font-bold">{product.price}</p>
              <Popover showArrow={true} placement="top">
                <PopoverTrigger>
                  <div className="flex items-center gap-1.5 text-black cursor-pointer">
                    <span className="text-[13px] font-bold">Licensing Right</span>
                    <SvgCautionIcon className="size-4" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-4 text-xs">
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
            </div>
            <Button
              className="rounded-full text-customWhiteBgText text-sm px-6 py-2 shadow-md font-semibold"
              style={{
                background:
                  "radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)",
              }}
              onPress={() => handleGetLicense()}
            >
              Get License
            </Button>
          </>
        )}
      </div>

      {/* Mobile Bottom Sheet Overlay */}
      <AnimatePresence>
        {isSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 z-[50]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y"
              dragControls={dragControls}
              dragListener={true}
              dragConstraints={{ top: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => {
                if (info.offset.y > 150 || info.velocity.y > 500) {
                  setIsSheetOpen(false);
                }
              }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-[60] h-[92vh] flex flex-col shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] border-t border-neutral-100"
            >
              {/* Drag Handle Area - Tactile and larger */}
              <div
                className="w-full pt-6 pb-4 cursor-grab active:cursor-grabbing flex-shrink-0"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-20 h-1.5 bg-neutral-300 rounded-full mx-auto" />
              </div>

              {/* Scrollable Content Wrapper */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-6 pb-48 scroll-smooth custom-scrollbar">
                {/* Preview Image in Sheet - Adjusted for iPhone screen heights */}
                <div className="relative w-[70vw] aspect-[3/4] mx-auto mb-10 rounded-[40px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-[8px] border-white z-[70] bg-white flex items-center justify-center transition-transform hover:scale-[1.02]">
                  <Image
                    src={product.images[currentImageIndex]}
                    alt="Preview"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <h1 className="text-xl font-bold leading-tight mt-2 text-center">
                  {product.title}
                </h1>

                <p className="text-sm text-gray-500 mt-4 leading-relaxed border-b pb-4">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag, i) => (
                    <Chip key={i} size="sm" variant="flat" radius="sm" className="bg-neutral-100">
                      {tag}
                    </Chip>
                  ))}
                </div>

                <div className="mt-8 border rounded-3xl p-6 bg-neutral-50/50">
                  <p className="text-center font-bold text-base border-b pb-4">About the Artist</p>
                  <div className="flex flex-col items-center mt-6">
                    <Link href="/artist-page/profile-vistor-view">
                      <Avatar className="w-20 h-20 shadow-lg border-2 border-white cursor-pointer active:scale-95 transition-transform" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                    </Link>
                    <Link href="/artist-page/profile-vistor-view">
                      <p className="mt-3 font-bold text-customDarkBlue text-lg hover:underline">{product.artist.handle}</p>
                    </Link>
                    <p className="text-sm text-gray-500">{product.artist.role}</p>

                    <div className="flex gap-2 items-center mt-3 bg-white px-4 py-1.5 rounded-full shadow-sm">
                      <TiLocation className="size-4 fill-[#3A98BB]" />
                      <p className="text-xs font-medium text-gray-600">{product.artist.location}</p>
                    </div>

                    <div className="w-full flex justify-around mt-8 pt-6 border-t border-dashed border-gray-200">
                      <div className="text-center">
                        <p className="font-bold text-lg">{product.artist.workCompleted}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Work Completed</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg">{product.artist.designSold}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Design Sold</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer inside sheet */}
              <div className="bg-white border-t p-4 px-6 flex items-center justify-between sticky bottom-0">
                {isLicensed ? (
                  <Button
                    className="rounded-full w-full text-[#FFF9EE] bg-[#C3A130] text-lg h-12 px-6 py-2 shadow-md font-semibold"
                    onPress={handleDownload}
                  >
                    Download Files
                  </Button>
                ) : (
                  <>
                    <div>
                      <p className="text-xl font-bold">{product.price}</p>
                      <Popover showArrow={true} placement="top">
                        <PopoverTrigger>
                          <div className="flex items-center gap-1.5 text-black cursor-pointer">
                            <span className="text-[13px] font-bold">Licensing Right</span>
                            <SvgCautionIcon className="size-4" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-4 text-xs">
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
                    </div>
                    <Button
                      className="rounded-full text-customWhiteBgText text-sm px-6 py-2 shadow-md font-semibold"
                      style={{
                        background:
                          "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
                      }}
                      onPress={() => handleGetLicense()}
                    >
                      Get License
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
