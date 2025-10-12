import Image from 'next/image';
import React from 'react';

const DoneMobile = () => {
  return (
    <div className="sm:hidden flex flex-col justify-center items-center  px-4 py-6 space-y-8 w-full min-h-screen overflow-y-auto">
      {/* Image */}
      <div className="w-full flex justify-center">
        <Image
          src="/dev-images/happy.png" // Replace with your image URL
          alt="Success"
         width={335}
         height={228}
        />
      </div>

      {/* Well Done Header and Description */}
      <div className="w-full space-y-2 mb-[24px]">
        <h1 className="text-[22px] font-bold text-[#444444]">Well Done!</h1>
        <p className="text-[16px] text-gray-500 w-[326px] h-[52px]">Your profile is set. You can now apply for jobs and license your designs.</p>
      </div>

      {/* View Jobs Button */}
      <div className="w-full flex justify-center">
        <button className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] text-[#0A4A66] px-6 py-3  w-full rounded-full text-sm">
          View Jobs
        </button>
      </div>
    </div>
  );
};

export default DoneMobile;
