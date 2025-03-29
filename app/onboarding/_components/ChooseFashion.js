'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CustomButton from '../../../components/CustomButton';

const ChooseFashion = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F9FAFB] px-4 md:px-10 py-6">
      <div className="w-full flex justify-start">
        <Image
          src="/dev-images/logo.png"
          alt="Fashion Logo"
          className="w-[40px] h-[40px] object-contain"
          width={40}
          height={40}
        />
      </div>
      <h1 className="text-center text-2xl md:text-xl font-bold mt-3">
        Sign up as a Fashion Artist or a Fashion Brand/Designer
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
  <Link href="/signup">
    <div className="bg-white  rounded-[16px] shadow-md pl-[24px] pr-[24px] pt-[32px] pb-[32px] flex flex-col justify-between items-center text-center border hover:border-[#CCE7F2] transition-all">
      <Image
        src="/dev-images/Artist.png"
        alt="Fashion Artist"
        className="object-contain mb-2"
        width={120}
        height={120}
      />
      <div>
        <h2 className="text-[22px] font-bold pt-1">Fashion Artist</h2>
        <p className="text-gray-500 text-sm mt-2  whitespace-nowrap">
          Including 3D Designers, Illustrators, Sketchers, etc.
        </p>
      </div>
    </div>
  </Link>
  <Link href="/fsignup">
    <div className="bg-white  rounded-[16px] shadow-md pl-[24px] pr-[24px] pt-[32px] pb-[32px] flex flex-col justify-between items-center text-center border hover:border-[#CCE7F2] transition-all">
      <Image
        src="/dev-images/Designers.png"
        alt="Fashion Designer"
        className="object-contain mb-2"
        width={120}
        height={120}
      />
      <div>
        <h2 className="text-[22px] font-bold pt-1">Fashion Designer</h2>
        <p className="text-gray-500 text-base mt-1 whitespace-nowrap">
          Including Brands, Designers, Clients, etc.
        </p>
      </div>
    </div>
  </Link>
</div>
  <div className="mt-16">
    <CustomButton className="ml-14 w-80 text-lg h-[52px]" text="Continue" href='/signup' />
  </div>

    </div>
  );
};

export default ChooseFashion;
