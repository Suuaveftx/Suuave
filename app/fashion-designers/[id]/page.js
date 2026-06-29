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
  FaCrown,
  FaChevronLeft,
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
import PageContainer from '@/components/layout/PageContainer';


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
    licenses,
    removeLicense,
  } = useAppStore();

  const dragControls = useDragControls();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasCrown = searchParams.get('crown') === 'true' || searchParams.has('crown');

  // unwrap params
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const isLicensed = !!licenses[id];
  const isBookmarked = savedCardIds.includes(id);

  const handleSave = () => {
    toggleBookmark(id);
  };

  const handleGetLicense = () => {
    router.push(`/checkout-page?id=${id}${hasCrown ? '&crown=true' : ''}`);
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

  const handleResetLicense = () => {
    removeLicense(id);
  };

  return (
    <div className='relative pb-24 lg:pb-12 bg-transparent min-h-screen'>
      <PageContainer>
        {hasCrown && (
          <button
            onClick={() => router.push('/fashion-designers')}
            className='flex items-center gap-2 text-gray-600 hover:text-[#3A98BB] transition-colors mb-2 mt-4 lg:mt-6'
          >
            <FaChevronLeft size={14} />
          </button>
        )}
        <div className={`grid grid-cols-12 gap-8 ${hasCrown ? 'mt-4' : 'mt-4 lg:mt-6'}`}>
          {/* Left Section: Images */}
          <div className='col-span-12 lg:col-span-7 w-full flex-col flex gap-5'>
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
                  <div
                    className="bg-[#EAF9FF] p-2 rounded-full cursor-pointer hover:opacity-80 flex items-center justify-center transition-opacity"
                    onClick={handleSave}
                  >
                    {isBookmarked ? (
                      <IoBookmark className="size-4 fill-[#3A98BB] text-[#3A98BB]" />
                    ) : (
                      <IoBookmarkOutline className="size-4 text-[#3A98BB]" />
                    )}
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
          <div className='col-span-12 lg:col-span-5 hidden lg:flex flex-col space-y-5'>
            {/* Info Card */}
            <Card shadow="none" className="p-6 rounded-2xl border-none shadow-sm bg-white">
              <CardBody className="p-0 flex flex-col">
                <h1 className="text-[22px] font-bold leading-[1.3] mb-4">
                  {product.title}
                </h1>
                <p className="text-[#3A98BB] font-semibold text-[15px] mb-5">
                  <span className="text-gray-500 font-normal mr-2 text-sm">Price :</span>{product.price}
                </p>

                {isLicensed ? (
                  /* Licensed state */
                  <div className="mb-6 bg-gray-100 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                    <h3 className="text-[18px] font-bold text-[#222222]">Congratulations!</h3>
                    {hasCrown ? (
                      <div className="flex flex-col w-full gap-2 mt-1 items-center">
                        <p className="text-[13px] text-gray-500">
                          You have successfully purchased the exclusive rights to this design.
                          It has been removed from the marketplace.
                        </p>
                        <Button
                          variant="light"
                          radius="full"
                          className="text-gray-400 hover:text-gray-600 underline text-xs"
                          onPress={handleResetLicense}
                        >
                          Reset Licensing (For Testing)
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className="text-[13px] text-gray-500">
                          You can now download the complete file, containing all specifications and related documents.
                        </p>
                        <div className="flex flex-col w-full gap-2 mt-1">
                          <Button
                            radius="full"
                            className="w-full font-bold text-white text-[15px] py-6"
                            style={{ background: '#B8952A' }}
                            onPress={handleDownload}
                          >
                            Download Files
                          </Button>
                          <Button
                            variant="light"
                            radius="full"
                            className="text-gray-400 hover:text-gray-600 underline text-xs"
                            onPress={handleResetLicense}
                          >
                            Reset Licensing (For Testing)
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="border border-gray-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-1.5 mb-2">
                        {hasCrown && <FaCrown size={14} className="text-[#F4C753]" />}
                        <p className="font-bold text-[13px]">{hasCrown ? 'Exclusive' : 'Non-Exclusive'}</p>
                      </div>
                      {hasCrown ? (
                        <>
                          <p className="text-[11px] text-gray-600 mb-1 leading-snug">
                            Own this design completely and make it uniquely yours.<br />
                            Once purchased, the design is removed from the marketplace and will not be resold.<br />
                            You gain full rights for personal and commercial use. <Link href="/fashion-designers/licensing-guide" className="text-[#3A98BB] cursor-pointer hover:underline">Learn more...</Link>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[11px] text-gray-600 mb-1 leading-snug">
                            You are buying a right to use this design for both personal and commercial use.
                          </p>
                          <p className="text-[11px] text-gray-600 leading-snug">
                            The Artist retains ownership, and other buyers can purchase and use it too. <Link href="/fashion-designers/licensing-guide" className="text-[#3A98BB] cursor-pointer hover:underline">Learn more...</Link>
                          </p>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6 w-full">
                      <Button
                        variant="bordered"
                        radius="full"
                        className="font-bold text-[#035A7A] border-[#3A98BB] h-12"
                        onPress={handleSave}
                      >
                        {isBookmarked ? 'Saved' : 'Save Design'}
                      </Button>
                      <Button
                        radius="full"
                        className="font-bold text-[#035A7A] h-12"
                        style={{ background: 'radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        onPress={handleGetLicense}
                      >
                        {hasCrown ? 'Buy Exclusive Right' : 'Get License'}
                      </Button>
                    </div>
                  </>
                )}

                <div>
                  <p className="text-[11px] text-gray-500 mb-2">Share</p>

                  <Dropdown shouldBlockScroll={false}>
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
              <CardBody className="p-0 flex flex-col items-center">
                <h2 className="text-[17px] font-bold pb-4 mb-4 font-satoshi">About the Artist</h2>

                <Link href="/artist-page/profile-vistor-view" className="block w-fit mx-auto mb-3">
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-24 h-24 mx-auto" />
                </Link>

                <Link href='/artist-page/profile-vistor-view'>
                  <h3 className="font-bold text-[15px] mb-1 text-[#3A98BB] hover:underline">{product.artist.handle}</h3>
                </Link>

                <p className="text-[13px] text-gray-800 mb-4">{product.artist.role}</p>

                <div className="flex items-center justify-center gap-1.5 mb-2 text-gray-600">
                  <TiLocation className="size-5 fill-[#878787]" />
                  <span className="text-[13px]">{product.artist.location}</span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-[13px] text-gray-800">Ratings</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < product.artist.rating ? 'text-yellow-500' : 'text-gray-300'} size={14} />
                    ))}
                  </div>
                  <Link href="/artist-page/profile-vistor-view?tab=reviews" className="text-[12px] text-[#3A98BB] hover:underline ml-1">
                    ({product.artist.reviews} Reviews)
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </PageContainer>

      <PageContainer className="mt-6 mb-16 hidden lg:block">
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
              hasCrown={['card-1', 'card-4', 'card-8'].includes(card.id)}
            />
          ))}
        </div>
      </PageContainer>

      {/* ===== MOBILE LAYOUT (hidden on lg+) ===== */}
      <PageContainer className="lg:hidden pb-32 space-y-4 mt-2">
        {/* Title & Price */}
        <div>
          <h1 className="text-[18px] font-bold leading-snug text-[#222222]">{product.title}</h1>
          <p className="text-[#3A98BB] font-semibold text-[15px] mt-1">
            <span className="text-gray-500 font-normal mr-1 text-sm">Price</span> {product.price}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mt-2">
          {/* Licensing Right Accordion */}
          {!(isLicensed && !hasCrown) && <MobileLicenseAccordion hasCrown={hasCrown} />}

          {/* Action Buttons */}
          {isLicensed ? (
            /* Licensed state - Mobile */
            <div className="bg-gray-100 rounded-2xl p-5 flex flex-col items-center text-center gap-3">
              <h3 className="text-[17px] font-bold text-[#222222]">Congratulations!</h3>
              {hasCrown ? (
                <>
                  <p className="text-[12px] text-gray-500">
                    You have successfully purchased the exclusive rights to this design.
                    It has been removed from the marketplace.
                  </p>
                  <Button
                    variant="light"
                    radius="full"
                    className="mt-1 text-gray-400 hover:text-gray-600 underline text-xs"
                    onPress={handleResetLicense}
                  >
                    Reset Licensing (For Testing)
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-[12px] text-gray-500">
                    You can now download the complete file, containing all specifications and related documents.
                  </p>
                  <Button
                    radius="full"
                    className="w-full font-bold text-white text-[15px] py-6 mt-1"
                    style={{ background: '#B8952A' }}
                    onPress={handleDownload}
                  >
                    Download Files
                  </Button>
                  <Button
                    variant="light"
                    radius="full"
                    className="mt-1 text-gray-400 hover:text-gray-600 underline text-xs"
                    onPress={handleResetLicense}
                  >
                    Reset Licensing (For Testing)
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                variant="bordered"
                radius="full"
                className="font-bold text-[#035A7A] border-[#3A98BB] h-12"
                onPress={handleSave}
              >
                {isBookmarked ? 'Saved' : 'Save Design'}
              </Button>
              <Button
                radius="full"
                className="font-bold text-[#035A7A] h-12"
                style={{ background: 'radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                onPress={handleGetLicense}
              >
                {hasCrown ? 'Buy Exclusive Right' : 'Get License'}
              </Button>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-[15px] font-bold mb-3 border-b border-gray-50 pb-3">Description</h2>
          <p className="text-[13px] text-gray-600 leading-relaxed">{product.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.map((tag, i) => (
              <Chip key={i} radius="full" size="sm" variant="flat" className="bg-gray-100 text-gray-700 text-[11px] px-1 h-6">
                {tag}
              </Chip>
            ))}
          </div>
        </div>

        {/* About the Artist */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-2 flex flex-col items-center text-center">
          <h2 className="text-[17px] font-bold pb-4 mb-4 font-satoshi">About the Artist</h2>

          <Link href="/artist-page/profile-vistor-view" className="block w-fit mx-auto mb-3">
            <Avatar
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className="w-24 h-24 mx-auto"
            />
          </Link>

          <Link href="/artist-page/profile-vistor-view">
            <p className="font-bold text-[15px] text-[#3A98BB] hover:underline mb-1">{product.artist.handle}</p>
          </Link>

          <p className="text-[13px] text-gray-800 mb-4">{product.artist.role}</p>

          <div className="flex items-center justify-center gap-1.5 mb-2 text-gray-600">
            <TiLocation className="size-5 fill-[#878787]" />
            <span className="text-[13px]">{product.artist.location}</span>
          </div>

          <div className="flex items-center justify-center gap-2 mt-3 text-gray-800">
            <span className="text-[13px]">Ratings</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < product.artist.rating ? 'text-yellow-500' : 'text-gray-300'} size={14} />
              ))}
            </div>
            <Link href="/artist-page/profile-vistor-view?tab=reviews" className="text-[12px] text-[#3A98BB] hover:underline ml-1">
              ({product.artist.reviews} Reviews)
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
                hasCrown={['card-1', 'card-4', 'card-8'].includes(card.id)}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

/**
 * Mobile collapsible licensing accordion
 */
function MobileLicenseAccordion({ hasCrown }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="overflow-hidden cursor-pointer mb-3"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between pb-2 border-b border-gray-50">
        <div className="flex items-center gap-2">
          {hasCrown && <FaCrown size={13} className="text-[#F4C753]" />}
          <span className="font-semibold text-[15px]">
            {hasCrown ? 'Exclusive Right' : 'Non-Exclusive Right'}
          </span>
        </div>
        <button className="focus:outline-none">
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="pt-3 space-y-1">
        {!open ? (
          hasCrown ? (
            <p className="text-[11px] text-gray-600">
              Own this design completely and make it uniquely yours.{' '}
              <span className="text-[#3A98BB] hover:underline">Read more...</span>
            </p>
          ) : (
            <p className="text-[11px] text-gray-600">
              You are buying a right to use this design for both personal and commercial use.{' '}
              <span className="text-[#3A98BB] hover:underline">Read more...</span>
            </p>
          )
        ) : (
          hasCrown ? (
            <>
              <p className="text-[11px] text-gray-600">
                Own this design completely and make it uniquely yours.<br />
                Once purchased, the design is removed from the marketplace and will not be resold.<br />
                You gain full rights for personal and commercial use.{' '}
                <Link href="/fashion-designers/licensing-guide" className="text-[#3A98BB] hover:underline">Learn more...</Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-[11px] text-gray-600">
                You are buying a right to use this design for both personal and commercial use.
              </p>
              <p className="text-[11px] text-gray-600">
                The Artist retains ownership, and other buyers can purchase and use it too.{' '}
                <Link href="/fashion-designers/licensing-guide" className="text-[#3A98BB] hover:underline">Learn more...</Link>
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default ProductDetails;


