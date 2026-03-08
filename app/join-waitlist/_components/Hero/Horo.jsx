'use client';
import React from 'react';

import { Card, Image } from '@heroui/react';

import { ScrollParallax } from 'react-just-parallax';
import { BackgroundBeams } from '../../../../components/BackgroundBeam';
import HeroSlimCard from '../../../../components/HeroSlimCard';
import WaitlistForm from '../form/wait-list-form';
import {
  SvgCollabIcon,
  SvgCopyRightIcon,
  SvgCUserIcon,
  SvgProtectIcon,
} from '../../../../utils/SvgIcons';

const HeroSection = () => {
  return (
    <div className='relative '>
      <BackgroundBeams />
      <div className='lg:grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 min-h-[94vh] bg-customNavBg pb-8 flex flex-col'>
        <div className='col-span-2 h-6'></div>
        <div className='space-y-6 place-self-center  w-full'>
          <Card className='bg-transparent'>
            <WaitlistForm />
          </Card>
        </div>
        <div className='lg:pr-14 py-14 relative pr-5 px-5 lg:px-0 lg:mt-0 mt-7'>
          <p className='font-medium mb-10 lg:mb-0 text-[33px] text-white lg:pl-14 pl-0 md:p-2 lg:leading-[60px] leading-[40px] z-30 lg:w-[84%] lg:text-start text-center w-full '>
            Join Waitlist. The Global Marketplace for Premium{' '}
            <span className='italic font-[40]'>African</span> Fashion Artistry.
          </p>
          <ScrollParallax isAbsolutelyPositioned strength={0.1} zIndex={30}>
            <HeroSlimCard
              text='End-to-End Creative Management'
              svg={<SvgCollabIcon className='size-5' />}
              className='absolute top-12 lg:left-0 right-6'
            />
          </ScrollParallax>
          <ScrollParallax isAbsolutelyPositioned strength={0.3} zIndex={30}>
            <HeroSlimCard
              text='Community Development'
              svg={<SvgCUserIcon className='size-5' />}
              className='absolute right-8 hidden lg:flex'
            />
          </ScrollParallax>
          <Image
            alt='hero_right'
            src='/dev-images/heroRight.png'
            className='hidden lg:block w-[84%] place-self-center'
            disableSkeleton
          />
          <Image
            alt='hero_right'
            src='/dev-images/mobileHeroImg.png'
            className='lg:hidden w-full'
            disableSkeleton
          />
          <ScrollParallax isAbsolutelyPositioned strength={0.05} zIndex={30}>
            <HeroSlimCard
              text='Digital Rights Management'
              svg={<SvgCopyRightIcon className='size-5' />}
              className='absolute bottom-4 hidden lg:flex'
            />
          </ScrollParallax>
          <ScrollParallax isAbsolutelyPositioned strength={0.09} zIndex={30}>
            <HeroSlimCard
              text='Secure Payment'
              svg={<SvgProtectIcon className='size-5' />}
              className='absolute lg:right-20 lg:bottom-20 bottom-7 right-60'
            />
          </ScrollParallax>

          <p className='text-customGray lg:pl-14 lg:w-[90%] lg:text-[17px] z-30 w-full lg:text-start text-center text-[16.6px]  pl-3 p-2 px-3 '>
            The premier B2B marketplace connecting global fashion houses with
            verified African talented artists - from digital patterns to 3D
            couture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
