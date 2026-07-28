'use client';
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
} from '@heroui/react';
import React, { useState } from 'react';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { FaCrown } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';
import { formatNumberShort, formatToUSD } from '../../../../utils/utils';

/*
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
    <Card className='max-w-[300px] border-none  bg-transparent' shadow='none'>
      <CardHeader className='justify-between'>
        <div className='flex gap-3'>
          <Avatar
            isBordered
            radius='full'
            size='md'
            src={`https://i.pravatar.cc/150?img=${idx}`}
          />
          <div className='flex flex-col items-start justify-center'>
            <h4 className='text-small font-semibold leading-none text-default-600'>
              {userData?.userName || 'N/A'}
            </h4>
            <h5 className='text-small tracking-tight text-default-500'>
              {userData?.handle || 'N/A'}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed ? 'bg-transparent text-foreground border-default-200' : null
          }
          color='primary'
          radius='full'
          size='sm'
          variant={isFollowed ? 'bordered' : 'solid'}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </CardHeader>
      <CardBody className='px-3 py-0'>
        <p className='text-small pl-px text-default-500'>
          {userData?.description || 'N/A'}
        </p>
      </CardBody>
      <CardFooter className='gap-3'>
        <div className='flex gap-1'>
          <p className='font-semibold text-default-600 text-small'>
            {formatNumberShort(userData?.following || 0)}
          </p>
          <p className=' text-default-500 text-small'>Following</p>
        </div>
        <div className='flex gap-1'>
          <p className='font-semibold text-default-600 text-small'>
            {formatNumberShort(userData?.followers || 0)}
          </p>
          <p className='text-default-500 text-small'>Followers</p>
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
  userName = 'N/A',
  images = [],
  title = 'N/A',
  price = 'N/A',
  productID = 'N/A',
  userData,
  idx,
  isBookmarked,
  onToggleSave,
  hasCrown = false,
}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    customPaging: () => (
      <div className='w-2 h-2 bg-white/50 rounded-full hover:bg-white transition-colors duration-200'></div>
    ),
    dotsClass: 'slick-dots custom-dots',
  };

  return (
    <Card className='px-0 hover:shadow-xl overflow-hidden bg-white shadow-md border border-gray-100 rounded-[8px] w-full flex flex-col h-[251px] md:h-[432px]' shadow='none'>
      <CardBody className='overflow-hidden p-0 relative flex-1'>
        <div className='block relative w-full h-full overflow-hidden rounded-b-none'>

          {hasCrown && (
            <div className='absolute left-3 top-3 z-20 flex bg-black/60 backdrop-blur-md rounded-md p-1.5 items-center justify-center'>
              <FaCrown size={15} className='text-[#F4C753]' />
            </div>
          )}

          <div
            className='absolute right-2.5 top-2.5 z-20 flex bg-[#1A1A1A]/90 hover:bg-black transition-colors rounded-lg p-1.5 cursor-pointer items-center justify-center border border-white/10'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave();
            }}
          >
            {isBookmarked ? (
              <IoBookmark size={16} className='text-[#3A98BB]' />
            ) : (
              <IoBookmarkOutline size={16} className='text-[#3A98BB]' />
            )}
          </div>
          <Link href={`/fashion-designers/${productID}${hasCrown ? '?crown=true' : ''}`} className='block w-full h-full'>
            <div className='overflow-hidden w-full h-full'>
              <div className='slider-container w-full h-full'>
                <Slider {...sliderSettings} className='w-full h-full min-h-0 [&_.slick-list]:h-full [&_.slick-track]:h-full'>
                  {images?.map((image, index) => (
                    <div key={index} className='outline-none block w-full h-full'>
                      <div className='relative w-full h-full overflow-hidden bg-gray-50 block'>
                        <Image
                          src={image}
                          alt={`${title} - Image ${index + 1}`}
                          className='object-contain md:object-cover object-top'
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Link>
        </div>
      </CardBody>

      {/* --- DESKTOP FOOTER --- */}
      <CardFooter className='hidden md:flex flex-col items-start w-full px-4 py-4 flex-none gap-2.5 bg-white'>
        <div className='flex justify-between items-start w-full gap-2'>
          <p className='line-clamp-2 font-bold text-[16px] text-gray-800 leading-[1.3] flex-1 text-left'>
            {title}
          </p>
          <p className='font-semibold text-[16px] text-[#3A98BB] flex-shrink-0'>
            {formatToUSD(price)}
          </p>
        </div>
        <Link href='/artist-page/profile-vistor-view' className='flex items-center gap-2 w-full hover:opacity-80 transition-opacity group cursor-pointer'>
          <Avatar
            src={userData?.photo && userData.photo !== 'userImg' ? userData.photo : `https://i.pravatar.cc/150?img=${idx + 10}`}
            size='sm'
            className='w-6 h-6 min-w-[24px] min-h-[24px]'
          />
          <p className='text-[14px] text-gray-600 font-medium line-clamp-1 group-hover:text-[#3A98BB] transition-colors'>
            {userData?.handle || userName}
          </p>
        </Link>
      </CardFooter>

      {/* --- MOBILE FOOTER --- */}
      <CardFooter className='md:hidden flex flex-col items-start w-full px-3 py-3 flex-none gap-0 bg-white'>
        <Link href={`/fashion-designers/${productID}${hasCrown ? '?crown=true' : ''}`} className="w-full flex">
          <p className='line-clamp-2 font-bold text-[15px] text-[#222222] leading-snug text-left'>
            {title}
          </p>
        </Link>
        <p className='font-bold text-[15px] text-[#3A98BB] mb-1 mt-0.5'>
          {formatToUSD(price)}
        </p>
        <Link href='/artist-page/profile-vistor-view' className='flex items-center w-full hover:opacity-80 transition-opacity group cursor-pointer'>
          <p className='text-[13px] text-[#7A7A7A] font-normal group-hover:text-[#3A98BB] transition-colors'>
            {userData?.userName || userName}
          </p>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FashionDesignersCard;
