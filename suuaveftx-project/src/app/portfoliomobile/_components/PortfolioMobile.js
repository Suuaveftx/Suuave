import Tabs from '@/app/components/Tabs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PortfolioMobile = () => {
  return (
    <>
    {/* Centered Logo */}
    <div className="sm:hidden flex justify-center mt-4">
        <Image
          src="/dev-images/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      {/* Tab component */}
      <div className=' sm:hidden mb-[22px]'>
      <Tabs/>
      </div>
    <div className="sm:hidden flex flex-col items-center bg-[#FAFAFA] px-4 py-6 space-y-8 w-full min-h-screen overflow-y-auto mb-[24px]">
      {/* Portfolio Header and Description */}
      <div className="w-full space-y-2 mb-[24px] text-left">
        <h1 className="text-[22px] font-bold text-[#444444]">Portfolio</h1>
        <p className="text-sm text-gray-500">Upload some sample works.</p>
      </div>

      {/* Upload Icon Section */}
      <div className="space-y-4 w-full flex flex-col items-center">
        {/* Upload Icon Group */}
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex items-center justify-center border border-gray-300 rounded-md p-4 space-x-4 w-full h-[121px]">
              {/* Upload Icon */}
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.672 7.21159L9.08602 13.7976C8.895 13.9821 8.74264 14.2028 8.63782 14.4468C8.533 14.6908 8.47783 14.9532 8.47552 15.2188C8.47321 15.4843 8.52381 15.7477 8.62438 15.9935C8.72494 16.2393 8.87344 16.4626 9.06123 16.6504C9.24902 16.8382 9.47232 16.9867 9.71811 17.0872C9.9639 17.1878 10.2273 17.2384 10.4928 17.2361C10.7584 17.2338 11.0208 17.1786 11.2648 17.0738C11.5088 16.969 11.7295 16.8166 11.914 16.6256L18.328 10.0396C19.0567 9.28518 19.4598 8.27477 19.4507 7.22598C19.4416 6.1772 19.0209 5.17395 18.2793 4.43232C17.5377 3.69068 16.5344 3.27001 15.4856 3.26089C14.4368 3.25178 13.4264 3.65496 12.672 4.38359L6.25702 10.9686C5.13171 12.0939 4.49951 13.6202 4.49951 15.2116C4.49951 16.803 5.13171 18.3293 6.25702 19.4546C7.38233 20.5799 8.90859 21.2121 10.5 21.2121C12.0915 21.2121 13.6177 20.5799 14.743 19.4546L21 13.2116" stroke="#3A98BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className='text-[#878787] text-[12px]'>Click to upload </span>
            </div>
          ))}
      </div>

      {/* Add another text */}
      <div className="text-sm text-[#444444] text-left mt-4 w-full">
        <p>Add another</p>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between space-x-[39px] w-full mt-6 mb-[24px]">
        <button className="text-[16px] text-[#3A98BB] flex-1">Skip</button>
        <Link href={"/availabilitymobile"}>
        <button className="bg-[#E8E8E8] text-[#444444] pl-[24px] pr-[24px] pt-[16px] pb-[16px] w-[128] rounded-full flex-1 h-[52px] text-[16px]">
          Next
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default PortfolioMobile;
