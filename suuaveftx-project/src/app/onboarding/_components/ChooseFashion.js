'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const ChooseFashion = () => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-4 md:p-6 relative">
      {/* Logo */}
      <div className="absolute top-4 left-4 z-[10]">
        <Image
          src="/dev-images/logo.png"
          alt="Fashion Designer"
          className="w-[32px] h-[32px] object-cover md:w-[40px] md:h-[40px]"
          width={40}
          height={40}
        />
      </div>

      {/* Heading */}
      <h1 className="text-center text-lg md:text-2xl font-bold mb-8 mt-12 md:mt-0">
        Sign up as a Fashion Artist or a Fashion Designer/Brand
      </h1>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-[48px] mt-6">
        {/* Card 1 */}
        <Link href="/signup">
          <div className="w-full max-w-xs md:w-[427px] md:h-[365px] bg-[#FAFAFA] rounded-[16px] shadow-lg p-6 flex flex-col justify-between items-center text-center hover:border-2 hover:border-[#CCE7F2]">
            
            {/* Image */}
            <Image
              src="/dev-images/Artist.png"
              alt="Fashion Artist"
              className="mb-4 w-[150px] h-[150px] md:w-[231px] md:h-[234px]"
              width={231}
              height={234}
            />
            {/* Card Content */}
            <div>
              <h2 className="text-sm md:text-[16px] font-bold mb-2">
                Fashion Artist
              </h2>
              <p className="text-gray-700 text-xs md:text-[12px]">
                Including 3D Designers, Illustrators, Sketchers, etc.
              </p>
            </div>
          </div>
        </Link>

        {/* Card 2 */}
        <Link href="/fsignup">
          <div className="w-full max-w-xs md:w-[427px] md:h-[365px] bg-[#FAFAFA] rounded-[16px] shadow-lg p-6 flex flex-col justify-between items-center text-center hover:border-2 hover:border-[#CCE7F2]">
            {/* Radio Button */}
           
            {/* Image */}
            <Image
              src="/dev-images/Designers.png"
              alt="Fashion Designer"
              className="w-[150px] h-[150px] md:w-[231px] md:h-[234px]"
              width={231}
              height={234}
            />
            {/* Card Content */}
            <div>
              <h2 className="text-sm md:text-[16px] font-bold mb-2">
                Fashion Designer
              </h2>
              <p className="text-gray-700 text-xs md:text-[12px]">
                Including 3D Designers, Illustrators, Sketchers, etc.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChooseFashion;
