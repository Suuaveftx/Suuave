'use client';
import Link from "next/link";

import { Alert, Chip, Input, Tab, Tabs, Card, CardBody, Image } from '@heroui/react';
import { FaCrown } from "react-icons/fa";

import React, { useState, useRef, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import FashionDesignersCard from './_components/studio-page-components/FashionDesignersCard';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '@/store';
import PageContainer from '@/components/layout/PageContainer';

const Page = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { savedCardIds, toggleBookmark } = useAppStore();

  const BATCH_SIZE = 12;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sentinelNode, setSentinelNode] = useState(null);
  const isLoadingRef = useRef(false);
  const baseCardsRef = useRef(null);

  // Data for fashion designer cards — matches reference design
  const baseCardsData = [
    {
      id: 'card-1',
      user: { id: 'user-1', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg1.png'],
    },
    {
      id: 'card-2',
      user: { id: 'user-2', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg2.png', '/dev-images/fashionImg3.png'],
    },
    {
      id: 'card-3',
      user: { id: 'user-3', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg3.png'],
    },
    {
      id: 'card-4',
      user: { id: 'user-4', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg1.png', '/dev-images/fashionImg2.png'],
    },
    {
      id: 'card-5',
      user: { id: 'user-5', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg2.png'],
    },
    {
      id: 'card-6',
      user: { id: 'user-6', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg3.png', '/dev-images/fashionImg1.png'],
    },
    {
      id: 'card-7',
      user: { id: 'user-7', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg1.png'],
    },
    {
      id: 'card-8',
      user: { id: 'user-8', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg2.png', '/dev-images/fashionImg3.png'],
    },
    {
      id: 'card-9',
      user: { id: 'user-9', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg3.png'],
    },
    {
      id: 'card-10',
      user: { id: 'user-10', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg1.png', '/dev-images/fashionImg2.png'],
    },
    {
      id: 'card-11',
      user: { id: 'user-11', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg2.png'],
    },
    {
      id: 'card-12',
      user: { id: 'user-12', userName: 'Tega Isama', photo: 'userImg', handle: '@tega', description: '', followers: 0, following: 0 },
      title: 'Modern Style Dress',
      price: 340,
      images: ['/dev-images/fashionImg3.png', '/dev-images/fashionImg1.png'],
    },
  ];

  const cardsData = [
    ...baseCardsData,
    ...baseCardsData.map(c => ({ ...c, id: c.id + '-2' })),
    ...baseCardsData.map(c => ({ ...c, id: c.id + '-3' })),
  ];



  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!sentinelNode) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoadingRef.current && visibleCount < cardsData.length) {
          setIsLoading(true);
          isLoadingRef.current = true;
          // Simulate async load
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, cardsData.length));
            setIsLoading(false);
            isLoadingRef.current = false;
          }, 500);
        }
      });
    });
    observer.observe(sentinelNode);
    return () => observer.disconnect();
  }, [sentinelNode, visibleCount, cardsData.length]);



  return (
    <PageContainer className='font-satoshi mb-48 pt-4 md:pt-7'>
      <Alert
        isVisible={isVisible}
        icon={
          <span className="flex items-center justify-center bg-transparent mr-2.5">
            <ExclamationTriangleIcon className="size-[18px] md:size-5 text-[#3A98BB] fill-none stroke-current" strokeWidth={1.5} />
          </span>
        }
        title={
          <p className='font-normal text-gray-700 text-[13px] md:text-[14px] leading-tight m-0 flex items-center'>
            You have{' '}
            <span className='font-semibold text-[#3A98BB] cursor-pointer ml-1'>
              1 Project Submission
            </span>
          </p>
        }
        variant='bordered'
        onClose={() => setIsVisible(false)}
        closeButtonProps={{
          size: "sm",
        }}
        classNames={{
          base: 'h-[38px] min-h-[38px] py-0 px-5 border-[#73D9FF] bg-[#EAF9FF] flex items-center relative',
          mainWrapper: 'flex-row items-center h-full m-0 gap-3 pr-6',
          title: 'flex items-center m-0',
          iconWrapper: 'mt-0 bg-transparent p-0 shadow-none min-w-0 w-auto mr-3',
          closeButton: 'absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-transparent [&_svg]:max-w-[14px] [&_svg]:max-h-[14px] [&_svg]:w-3.5 [&_svg]:h-3.5',
          alertIcon: 'text-[#3A98BB]',
        }}
        className='font-satoshi rounded-md'
      />

      <Card
        className='w-full mt-4 border-none relative overflow-hidden'
        shadow='sm'
        radius='lg'
      >
        <Image
          removeWrapper
          src='/dev-images/fashionHeaderImg.png'
          alt='Fashion Header background'
          className='absolute z-0 inset-0 w-full h-full object-cover object-center'
        />
        <CardBody className='relative z-10 lg:h-[180px] h-[120px] flex flex-col items-center justify-center text-white p-0'>
          <h2 className='lg:text-[40px] text-[16px] font-bold lg:mb-2 mb-1 text-center w-full px-2 tracking-wide z-10 leading-tight whitespace-nowrap'>
            Explore Hundreds of Creative Designs
          </h2>
          <p className='lg:text-[18px] text-[11px] font-light text-center w-full px-2 z-10 leading-snug whitespace-nowrap'>
            Get licensing access for your brand and collections.
          </p>
        </CardBody>
      </Card>
      <Input
        startContent={<IoSearchOutline className='size-5 text-[#7A7A7A]' />}
        placeholder='Search'
        radius='full'
        className='lg:w-[40%] mt-5 w-full'
        classNames={{ inputWrapper: 'shadow-md py-6 border border-[#ECECEC]' }}
        variant='bordered'
      />

      <div className='flex w-full flex-col mt-5'>
        <Tabs
          aria-label='Options'
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full bg-[#3CA8D8]',
            tab: 'max-w-fit px-0 h-12',
            tabContent: 'group-data-[selected=true]:text-[#3CA8D8] font-medium',
          }}
          color='primary'
          variant='underlined'
        >
          <Tab
            key='recent'
            title={<p className='flex items-center space-x-2 text-[14px] font-medium'>Recently posted</p>}
          >
            <div className='grid grid-cols-2 gap-3 mt-6 lg:gap-6 lg:grid-cols-4'>
              {cardsData.slice(0, visibleCount).map((card, index) => (
                <FashionDesignersCard
                  key={card.id}
                  images={card?.images}
                  title={card?.title}
                  price={card?.price}
                  userName={card?.user.userName}
                  productID={card?.id}
                  idx={index}
                  userData={card.user}
                  isBookmarked={savedCardIds.includes(card.id)}
                  onToggleSave={() => toggleBookmark(card.id)}
                  hasCrown={['card-1', 'card-4', 'card-8'].includes(card.id)}
                />
              ))}
              {isLoading && (
                <div className="col-span-2 lg:col-span-4 flex justify-center items-center py-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
            {visibleCount < cardsData.length && (
              <div ref={setSentinelNode} className='h-10 w-full mt-4' />
            )}
          </Tab>

          <Tab
            key='saved'
            title={
              <div className='flex items-center space-x-2'>
                <span className='text-[14px] font-medium'>Saved Designs ({savedCardIds.length})</span>
              </div>
            }
          >
            <div className='grid grid-cols-2 gap-3 mt-6 lg:gap-6 lg:grid-cols-4'>
              {cardsData
                .filter((card) => savedCardIds.includes(card.id))
                .map((card, index) => (
                  <FashionDesignersCard
                    key={index}
                    images={card?.images}
                    title={card?.title}
                    price={card?.price}
                    userName={card?.user.userName}
                    productID={card?.id}
                    idx={index}
                    userData={card.user}
                    isBookmarked={true}
                    onToggleSave={() => toggleBookmark(card.id)}
                    hasCrown={['card-1', 'card-4', 'card-8'].includes(card.id)}
                  />
                ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Page;


