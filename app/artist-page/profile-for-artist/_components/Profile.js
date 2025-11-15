'use client';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import CustomButton from '../../../../components/CustomButton';
import { IoLocationSharp } from 'react-icons/io5';
import { useState } from 'react';
import { Pencil } from 'lucide-react';

const ProfileArtist = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const text = `Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.`;

  return (
    <div
      className='w-full h-full lg:max-w-xs lg:mx-auto  lg:bg-white rounded-lg lg:space-y-2 max-h-[820px] overflow-hidden 
      flex flex-col items-center  lg:items-start lg:text-left'
    >
      <div className='bg-[#fafafa] w-full  lg:bg-[#ffffff] lg:px-6 lg:py-6 px-4 py-4'>
        <div className='space-y-3  pb-3 w-full flex flex-col items-center lg:items-start'>
          {/* Profile Initials */}
          <div className='relative w-28 h-28'>
            {/* Circle */}
            <div className='w-[100px] h-[100px] lg:bg-[#EAEAEA] bg-[#035A7A] lg:text-[#035A7A] text-[#ffffff] text-xl font-bold flex items-center justify-center rounded-full ml-4 lg:mb-7'>
              OC
            </div>

            {/* Edit Icon */}
            <button className='absolute -top-1 -right-1 mt-4  rounded-full p-1'>
              <Pencil className='w-[18px] h-[18px] text-[#035A7A]' />
            </button>
          </div>

          {/* Name */}
          <div className='lg:mt-7'>
          <h4 className='lg:text-2xl font-semibold text-lg text-[#222222] lg:leading-6'>OCEAN CLARA</h4>
          </div>

          {/* Availability Status */}
          <div
            className='bg-[#EEEEEE] flex items-center text-sm text-[#056D16] rounded-[32px] gap-2 px-2 py-1 
          w-full max-w-[35%] justify-center lg:justify-start lg:mt-4'
          >
            <span>Available</span>
            <span className='w-2 h-2 bg-green-600 rounded-full'></span>
          </div>

          {/* Occupation */}
          <p className='text-[#222222] text-sm'>Fashion Artist | 3D Illustrator</p>

          {/* Location */}
          <div className='flex items-center justify-center lg:justify-start space-x-2 text-gray-600 text-sm'>
            <IoLocationSharp color='#878787' />
            <span>Lagos, Nigeria</span>
          </div>
        </div>

        {/* Rating */}
        <div className='flex items-center justify-center lg:justify-start space-x-2 text-gray-600 text-sm'>
          <div className='flex text-base'>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < 4 ? 'text-yellow-500' : 'text-gray-300'} />
            ))}
          </div>
          <span>
            4.0 <span className='text-[#3A98BB]'>(5.0 reviews)</span>
          </span>
        </div>

        {/* Edit Profile Button */}
        <div className=' hidden pb-8 lg:flex justify-center lg:justify-start mt-[39px] border-b'>
          <CustomButton
            text='Edit Profile'
            className='w-52 text-sm font-medium'
            style={{
              color: '#035A7A',
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className='hidden lg:flex justify-between w-full text-sm text-[#222222] lg:px-6'>
        <h4>Design Collections</h4>
        <span>14</span>
      </div>

      <div className='hidden lg:flex justify-between w-full border-b border-gray-300 pb-2 text-sm text-[#222222] lg:px-6'>
        <h4>Completed Projects</h4>
        <span>14</span>
      </div>

      {/* About Us Section */}
      <div className='lg:bg-[#ffffff] bg-[#fafafa] w-full flex flex-col items-start lg:px-6 px-4 lg:py-0 py-2 text-left lg:mt-0 mt-[10px]'>
        {/* Heading with Edit Icon */}
        <div className='flex items-center w-full mt-[22px]'>
          <h4 className='lg:text-[#444444] text-base text-[#222222] lg:font-normal font-bold'>
            About Me
          </h4>
          <Pencil className='w-4 h-4 text-[#035A7A] cursor-pointer ml-auto' />
        </div>

        {/* Text */}
        <p
          className={`text-[#222222] text-sm font-normal 
      ${isExpanded ? '' : 'line-clamp-3'} 
      lg:line-clamp-none`}
        >
          {text}
        </p>

        
      </div>
    </div>
  );
};

export default ProfileArtist;
