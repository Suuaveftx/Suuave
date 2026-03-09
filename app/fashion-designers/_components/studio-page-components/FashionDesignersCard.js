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
    <Card className='px-0 hover:shadow-xl overflow-hidden bg-white shadow-md border-none' shadow='none'>
      <CardBody className='overflow-hidden p-0'>
        <div className='block relative'>
          <Button
            isIconOnly
            className='absolute right-4 top-4 z-20 bg-white shadow-md border-none hover:bg-white/90'
            size='sm'
            radius='full'
            onPress={(e) => {
              onToggleSave();
            }}
          >
            {isBookmarked ? (
              <IoBookmark size={20} className='text-[#3A98BB]' />
            ) : (
              <IoBookmarkOutline size={20} className='text-gray-600' />
            )}
          </Button>
          <Link href={`/fashion-designers/${productID}`} className='block'>
            <div className='overflow-hidden'>
              <div className='slider-container'>
                <Slider {...sliderSettings}>
                  {images?.map((image, index) => (
                    <div
                      key={index}
                      className='relative h-80 flex items-center justify-center'
                    >
                      <Image
                        src={image}
                        alt={`${title} - Image ${index + 1}`}
                        className='object-cover object-top'
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Link>
        </div>
      </CardBody>

      <CardFooter className='flex flex-col items-start w-full p-4 pt-4'>
        <div className='flex flex-col gap-1.5 w-full'>
          <p className='line-clamp-1 font-medium text-[15px] text-gray-800 '>
            {title}
          </p>
          <p className='font-semibold text-[16px] text-[#3A98BB]'>
            {formatToUSD(price)}
          </p>
          <p className='text-[13px] text-gray-600 font-normal'>
            {userName}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FashionDesignersCard;
