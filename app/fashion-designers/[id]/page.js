'use client';

import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Chip,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import React, { useState } from 'react';
import {
  FaStar,
  FaShareAlt,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaCopy,
} from 'react-icons/fa';
import { SvgCautionIcon } from '../../../utils/SvgIcons';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { TiLocation } from 'react-icons/ti';
import ProductGallery from '../_components/designer-details/ProductGallery';
import FashionDesignersCard from '../_components/studio-page-components/FashionDesignersCard';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useAppStore } from '@/store';

const ProductDetails = ({ params }) => {
  const product = {
    title: 'Modern Fashion Attire Illustration With Silky Material',
    price: '$35000.00',
    license: 'Exclusive Right',
    images: [
      '/dev-images/fashionImg1.png',
      '/dev-images/FashionImg.png',
      '/dev-images/fashiondesigner3.png',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['Fashion', 'Illustration', 'Luxury'],
    artist: {
      handle: '@Ocean',
      role: 'Fashion Artist',
      location: 'Lagos, Nigeria',
      avatar: '/images/artist.jpg',
      rating: 4,
      reviews: 5,
      workCompleted: 14,
      designSold: 10,
    },
  };

  const relatedCards = [
    {
      id: 'card-1',
      title: 'Modern Style Dress girl illus...',
      price: 377578740,
      user: { userName: 'Tega Isama' },
      images: ['/dev-images/fashionImg1.png', '/dev-images/fashionImg2.png'],
    },
    {
      id: 'card-2',
      title: 'Modern Style Dress girl illus...',
      price: 377578740,
      user: { userName: 'Tega Isama' },
      images: ['/dev-images/fashionImg.png', '/dev-images/fashionImg3.png'],
    },
    {
      id: 'card-3',
      title: 'Modern Style Dress girl illus...',
      price: 377578740,
      user: { userName: 'Tega Isama' },
      images: ['/dev-images/fashionImg3.png'],
    },
    {
      id: 'card-4',
      title: 'Modern Style Dress girl illus...',
      price: 377578740,
      user: { userName: 'Tega Isama' },
      images: ['/dev-images/FashionImg.png'],
    },
  ];

  const [copied, setCopied] = useState(false);
  const {
    toggleBookmark,
    savedCardIds,
    isMobileDetailsDrawerOpen,
    setMobileDetailsDrawerOpen,
    activeGalleryImageIndex,
    setActiveGalleryImageIndex,
    licenses
  } = useAppStore();

  const dragControls = useDragControls();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasCrown = searchParams.get('crown') === 'true';

  // unwrap params
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const isLicensed = !!licenses[id];
  const isBookmarked = savedCardIds.includes(id);

  const handleSave = () => {
    toggleBookmark(id);
  };

  const handleGetLicense = () => {
    router.push(`/checkout-page?id=${id}`);
  };

  const handleSocialShare = (platform) => {
    const url = window.location.href;
    const text = 'Check out this fashion design!';

    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
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

  const handleDownload = () => {
    console.log('Download started');
  };

  return (
    <div className='relative pb-24 lg:pb-12 bg-[#F5F5F5] min-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr] xl:grid-cols-[1.5fr_0.64fr] gap-4 p-4 lg:p-6 max-w-[1500px] mx-auto '>
        {/* Left Section: Images */}
        <div className='w-full flex-col flex gap-5'>
          <ProductGallery
            images={product.images}
            title={product.title}
            isBookmarked={isBookmarked}
            onToggleSave={handleSave}
            onOpenDetails={(index) => {
              setActiveGalleryImageIndex(index);
              setMobileDetailsDrawerOpen(true);
            }}
          />

          {/* Details Section - Hidden on mobile, visible on lg */}
          <Card shadow="none" className="hidden lg:flex flex-col p-6 rounded-2xl border-none shadow-sm bg-white">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold">Description</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <MdOutlineRemoveRedEye className="size-5 fill-[#878787]" />
                  <p className="text-sm font-semibold text-gray-700">12</p>
                </div>
                <div className="bg-[#EAF9FF] p-2 rounded-full cursor-pointer hover:opacity-80">
                  <IoBookmark className="size-4 fill-[#3A98BB]" />
                </div>
              </div>
            </div>
            <CardBody className="p-0">
              <p className="text-[13px] text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.tags.map((tag, i) => (
                  <Chip key={i} radius="full" size="sm" variant="flat" className="bg-gray-100 text-gray-800 text-[11px] px-2 h-6">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Section: Product Details - Hidden on mobile, visible on lg */}
        <div className='hidden lg:flex flex-col space-y-5'>
          {/* Info Card */}
          <Card shadow="none" className="p-6 rounded-2xl border-none shadow-sm bg-white">
            <CardBody className="p-0 flex flex-col">
              <h1 className="text-[22px] font-bold leading-[1.3] mb-4">
                {product.title}
              </h1>
              <p className="text-[#3A98BB] font-semibold text-[15px] mb-5">
                <span className="text-gray-500 font-normal mr-2 text-sm">Price :</span>{product.price}
              </p>

              <div className="border border-gray-200 rounded-xl p-4 mb-6">
                <p className="font-bold text-[13px] mb-2">Licensing Right ({hasCrown ? 'Exclusive' : 'Non-Exclusive'})</p>
                {hasCrown ? (
                  <>
                    <p className="text-[11px] text-gray-600 mb-1 leading-snug">
                      You are buying sole ownership of this design for both personal and commercial use.
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Once purchased, it is permanently removed from our platform and will never be sold again. <span className="text-[#3A98BB] cursor-pointer hover:underline">Learn more...</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[11px] text-gray-600 mb-1 leading-snug">
                      You are buying a right to use this design for both personal and commercial use.
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      The Artist retains ownership, and other buyers can purchase and use it too. <span className="text-[#3A98BB] cursor-pointer hover:underline">Learn more...</span>
                    </p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button variant="bordered" radius="full" className="font-semibold text-[#035A7A] border-[#3A98BB]" onPress={handleSave}>
                  {isBookmarked ? 'Saved' : 'Save Design'}
                </Button>
                <Button radius="full" className="font-semibold text-[#035A7A]" style={{ background: 'radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)' }} onPress={handleGetLicense}>
                  Get License
                </Button>
              </div>

              <div>
                <p className="text-[11px] text-gray-500 mb-2">Share</p>

                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly variant="bordered" radius="md" size="sm" className="border-gray-300">
                      <FaShareAlt className="text-gray-500 size-3" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='Share options'
                    onAction={(key) => handleSocialShare(key)}
                  >
                    <DropdownItem
                      key='whatsapp'
                      startContent={<FaWhatsapp className='text-green-500' />}
                    >
                      WhatsApp
                    </DropdownItem>
                    <DropdownItem
                      key='twitter'
                      startContent={<FaTwitter className='text-blue-400' />}
                    >
                      X (Twitter)
                    </DropdownItem>
                    <DropdownItem
                      key='facebook'
                      startContent={<FaFacebook className='text-blue-700' />}
                    >
                      Facebook
                    </DropdownItem>
                    <DropdownItem
                      key='linkedin'
                      startContent={<FaLinkedin className='text-blue-800' />}
                    >
                      LinkedIn
                    </DropdownItem>
                    <DropdownItem
                      key='copy'
                      startContent={<FaCopy className='text-gray-500' />}
                    >
                      Copy Link
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

              </div>
            </CardBody>
          </Card>

          {/* About Artist Card */}
          <Card shadow="none" className="p-6 rounded-2xl border-none shadow-sm bg-white">
            <CardBody className="p-0">
              <h2 className="text-[17px] font-bold border-b border-gray-100 pb-4 mb-5">About the Artist</h2>
              <div className="flex gap-4 items-center">
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-12 h-12" />
                <div className="flex flex-col gap-0.5">
                  <Link href='/artist-page/profile-vistor-view'>
                    <h3 className="font-bold text-[14px] hover:underline">{product.artist.handle}</h3>
                  </Link>
                  <p className="text-[11px] text-gray-500">{product.artist.role}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-gray-500">
                  <TiLocation className="size-4" />
                  <span className="text-xs">{product.artist.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-xs">Ratings :</span>
                  <FaStar className="text-yellow-400 size-3" />
                  <span className="text-xs font-semibold">{product.artist.rating}.0</span>
                  <Link href="/artist-page/profile-vistor-view?tab=reviews" className="text-[11px] text-[#3A98BB] hover:underline">({product.artist.reviews} Verified reviews )</Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 lg:px-6 mt-6 mb-16 hidden lg:block">
        <h2 className="text-[17px] font-bold mb-5">You May Also Like These</h2>
        <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
          {relatedCards.map((card, index) => (
            <FashionDesignersCard
              key={index}
              images={card?.images}
              title={card?.title}
              price={card?.price}
              userName={card?.user?.userName}
              productID={card?.id}
              idx={index}
              userData={card.user}
              isBookmarked={savedCardIds.includes(card.id)}
              onToggleSave={() => toggleBookmark(card.id)}
            />
          ))}
        </div>
      </div>

      {/* ===== MOBILE LAYOUT (hidden on lg+) ===== */}
      <div className="lg:hidden px-4 pb-32 space-y-4 mt-2">
        {/* Title & Price */}
        <div>
          <h1 className="text-[18px] font-bold leading-snug text-[#222222]">{product.title}</h1>
          <p className="text-[#3A98BB] font-semibold text-[15px] mt-1">
            <span className="text-gray-500 font-normal mr-1 text-sm">Price</span> {product.price}
          </p>
        </div>

        {/* Licensing Right Accordion */}
        <MobileLicenseAccordion hasCrown={hasCrown} />

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="bordered"
            radius="full"
            className="font-semibold text-[#035A7A] border-[#3A98BB] h-11"
            onPress={handleSave}
          >
            {isBookmarked ? 'Saved' : 'Save Design'}
          </Button>
          <Button
            radius="full"
            className="font-semibold text-[#035A7A] h-11"
            style={{ background: 'radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)' }}
            onPress={handleGetLicense}
          >
            {hasCrown ? 'Buy Exclusive' : 'Get License'}
          </Button>
        </div>

        {/* Description */}
        <div className="pt-2">
          <h2 className="text-[15px] font-bold mb-2">Description</h2>
          <p className="text-[13px] text-gray-600 leading-relaxed">{product.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {product.tags.map((tag, i) => (
              <Chip key={i} radius="full" size="sm" variant="flat" className="bg-gray-100 text-gray-700 text-[11px]">
                {tag}
              </Chip>
            ))}
          </div>
        </div>

        {/* About the Artist */}
        <div className="pt-2">
          <h2 className="text-[15px] font-bold mb-3">About the artist</h2>
          <div className="flex items-center gap-3">
            <Link href="/artist-page/profile-vistor-view">
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                className="w-10 h-10"
              />
            </Link>
            <div>
              <Link href="/artist-page/profile-vistor-view">
                <p className="font-bold text-[13px] text-[#3A98BB] hover:underline">{product.artist.handle}</p>
              </Link>
              <p className="text-[11px] text-gray-500">{product.artist.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-gray-500">
            <TiLocation className="size-4" />
            <span className="text-xs">{product.artist.location}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">Ratings :</span>
            <FaStar className="text-yellow-400 size-3" />
            <span className="text-xs font-semibold">{product.artist.rating}.0</span>
            <Link href="/artist-page/profile-vistor-view?tab=reviews" className="text-[11px] text-[#3A98BB] hover:underline">
              ({product.artist.reviews} Verified reviews)
            </Link>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="pt-2">
          <h2 className="text-[15px] font-bold mb-3">You May Also Like These</h2>
          <div className="grid grid-cols-2 gap-3">
            {relatedCards.map((card, index) => (
              <FashionDesignersCard
                key={index}
                images={card?.images}
                title={card?.title}
                price={card?.price}
                userName={card?.user?.userName}
                productID={card?.id}
                idx={index}
                userData={card.user}
                isBookmarked={savedCardIds.includes(card.id)}
                onToggleSave={() => toggleBookmark(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Mobile collapsible licensing accordion
 */
function MobileLicenseAccordion({ hasCrown }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {hasCrown && <FaCrown size={13} className="text-[#F4C753]" />}
          <span className="font-semibold text-[13px]">
            {hasCrown ? 'Exclusive Right' : 'Non-Exclusive Right'}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-1">
          {hasCrown ? (
            <>
              <p className="text-[11px] text-gray-600">
                You are buying sole ownership of this design for both personal and commercial use.
              </p>
              <p className="text-[11px] text-gray-600">
                Once purchased, it is permanently removed from our platform and will never be sold again.{' '}
                <span className="text-[#3A98BB] cursor-pointer hover:underline">Read more...</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-[11px] text-gray-600">
                You are buying a right to use this design for both personal and commercial use.
              </p>
              <p className="text-[11px] text-gray-600">
                The Artist retains ownership, and other buyers can purchase and use it too.{' '}
                <span className="text-[#3A98BB] cursor-pointer hover:underline">Read more...</span>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;


