'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaUser, FaUpload, FaShoppingBag } from 'react-icons/fa';
import CustomButton from '../../../../components/CustomButton';

import { User, Upload, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { Roles } from '../../../../utils/enum';

const WelcomePage = ({ user }) => {
  const [category] = useState(user?.role);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const displayName = user?.name ? user.name.split(' ')[0] : 'there';

  const handleCompleteProfile = () => {
    setLoading(true);
    if (user.role === 'brand') {
      router.push('/fashion-designers/personal-details');
    } else {
      router.push('/artist-page/personal-details');
    }
  };

  return (
    <div className='flex items-start justify-center min-h-screen bg-[#F9F9F9] sm:bg-white sm:justify-between'>
      {/* Left section with text and icons */}
      <div className='w-full px-4 pt-10 sm:p-0 sm:w-auto self-start'>
        <div className='flex flex-col w-full max-w-md bg-white border border-[#EAEAEA] shadow-sm rounded-xl sm:shadow-none sm:border-none px-6 pt-8 pb-10'>
          <h1 className='text-2xl font-bold leading-tight text-[#222222] mb-10'>
            Hi {displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase()},{' '}
            <br /> To begin, let&apos;s take a moment to complete your profile set-up.
          </h1>

          <div className='space-y-0 text-[#555555]'>
            {/* Complete Profile Setup */}
            <div className='flex items-center gap-4 py-6 border-b border-[#F1F1F1]'>
              <div className='text-[#3A98BB]'>
                <User size={24} strokeWidth={1.5} />
              </div>
              <span className='text-[16px] font-medium'>Complete profile setup.</span>
            </div>

            {/* Upload Sample Works */}
            <div className='flex items-center gap-4 py-6 border-b border-[#F1F1F1]'>
              <div className='text-[#3A98BB]'>
                <Upload size={24} strokeWidth={1.5} />
              </div>
              {category === Roles.artist ? (
                <span className='text-[16px] font-medium leading-tight'>
                  Upload sample works / necessary documents.
                </span>
              ) : (
                <span className='text-[16px] font-medium'>
                  Upload necessary documents.
                </span>
              )}
            </div>

            {/* Apply for Jobs */}
            <div className='flex items-center gap-4 py-6 border-b border-[#F1F1F1]'>
              <div className='text-[#3A98BB]'>
                <Briefcase size={24} strokeWidth={1.5} />
              </div>
              {category === Roles.artist ? (
                <span className='text-[16px] font-medium leading-tight'>
                  Apply for jobs and license your designs.
                </span>
              ) : (
                <span className='text-[16px] font-medium leading-tight'>
                  Post jobs and get license to use readily-available designs.
                </span>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <div className='mt-14 flex justify-center w-full'>
            <Button
              isLoading={loading}
              onPress={handleCompleteProfile}
              className='w-full text-[#035A7A] font-semibold text-lg py-4 rounded-full text-center transition-all bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)] active:scale-95'
            >
              Contine
            </Button>
            {/* <Link
              href={
                category === 'Fashion Brand'
                  ? '/fashion-designers/personal-details'
                  : '/artist-page/personal-details'
              }
              className='w-full text-[#035A7A] font-semibold text-lg py-4 rounded-full text-center transition-all bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)] active:scale-95'
            >
              Continue
            </Link> */}
          </div>
        </div>
      </div>

      {/* Right section with background image */}
      <div
        className='hidden md:block bg-cover bg-center rounded-2xl'
        style={{
          width: '520px',
          height: '520px',
          backgroundImage: "url('/dev-images/Fashion.png')",
        }}
      />
    </div>
  );
};

export default WelcomePage;
