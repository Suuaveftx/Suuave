'use client';
import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import CustomButton from '../../../../components/CustomButton';
import { IoLocationSharp } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import {
  EditAboutMe,
  EditProfile,
  EditTitle,
} from "../../../fashion-designers/_components/profile/edit";

const ProfileArtist = ({ isVisitor = false }) => {
  const fullText = `Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.`;

  const [isExpanded, setIsExpanded] = useState(false);
  const [aboutValue, setAboutValue] = useState(fullText);
  const [titleValue, setTitleValue] = useState("Fashion Artist | 3D Illustrator");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [previewProfileUrl, setPreviewProfileUrl] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Access localStorage in useEffect to avoid hydration issues
    const role = isVisitor ? 'Fashion Brand' : localStorage.getItem('activeCategory');
    setUserRole(role);
  }, [isVisitor]);

  // File handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous URL to prevent memory leaks
      setPreviewProfileUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return URL.createObjectURL(file);
      });
      setSelectedProfile(file);
    }
  };

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
            <div className='w-[100px] h-[100px] flex items-center justify-center rounded-full ml-4 lg:mb-7 overflow-hidden relative'>
              {previewProfileUrl ? (
                <Image
                  src={previewProfileUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src='/dev-images/Clients.png'
                  alt='Profile Picture'
                  fill
                  className='object-cover'
                />
              )}
            </div>

            {/* Edit Icon */}
            {userRole === 'Fashion Artist' && (
              <EditProfile
                handleFileChange={handleFileChange}
                className="bottom-2 right-0 translate-x-1/4 translate-y-1/4 shadow-md bg-white p-1.5"
              />
            )}
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
          <div className="flex items-center gap-2 w-full justify-center lg:justify-start">
            <p className="text-[#222222] text-sm">
              {titleValue}
            </p>

            {/* Edit Button */}
            {userRole === 'Fashion Artist' && (
              <div className="flex items-center">
                <EditTitle setTitleValue={setTitleValue} titleValue={titleValue} />
              </div>
            )}

          </div>


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

        {/* Retain Artist Button - Mobile */}
        {userRole !== 'Fashion Artist' && (
          <div className='flex lg:hidden justify-center w-full mt-6 mb-6'>
            <button className='w-1/2 py-3 bg-gradient-to-r from-[#D0EBF7] to-[#D0EBF7] text-[#035A7A] font-bold rounded-full shadow-sm text-base'>
              Retain Artist
            </button>
          </div>
        )}

        {/* Retain Artist Button - Desktop */}
        {userRole !== 'Fashion Artist' && (
          <div className=' hidden pb-8 lg:flex justify-center lg:justify-start mt-[39px] border-b'>
            <CustomButton
              text='Retain Artist'
              className='w-52 text-sm font-medium'
              style={{
                color: '#035A7A',
              }}
            />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className='w-full lg:px-6 px-4 mt-4 lg:mt-0 border-b lg:border-none pb-4 lg:pb-0'>
        <div className='flex flex-row lg:flex-col justify-center gap-6 lg:gap-0 lg:space-y-2'>
          <div className='flex items-center gap-2 lg:justify-between text-sm text-[#222222] lg:w-full'>
            <span className='font-bold lg:font-normal lg:order-last'>14</span>
            <h4 className='text-[#767676] text-[16px]'>Design Collections</h4>
          </div>

          <div className='flex items-center gap-2 lg:justify-between text-sm text-[#222222] lg:w-full'>
            <span className='font-bold lg:font-normal lg:order-last'>14</span>
            <h4 className='text-[#767676] text-[16px]'>Completed Projects</h4>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className='lg:bg-[#ffffff] bg-[#fafafa] w-full flex flex-col items-start lg:px-6 px-4 lg:py-0 py-2 text-left lg:mt-0 mt-[10px]'>
        {/* Heading with Edit Icon */}
        <div className='flex items-center w-full mt-[22px] justify-between'>
          <h4 className='lg:text-[#444444] text-base text-[#222222] lg:font-normal font-bold'>
            About Me
          </h4>
          {userRole === 'Fashion Artist' && (
            <EditAboutMe setAboutValue={setAboutValue} aboutValue={aboutValue} />
          )}
        </div>

        {/* Text */}
        <p
          className={`text-[#222222] text-sm font-normal 
      ${isExpanded ? '' : 'line-clamp-3'} 
      lg:line-clamp-none`}
        >
          {aboutValue}
        </p>


      </div>
    </div>
  );
};

export default ProfileArtist;
