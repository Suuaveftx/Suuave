'use client';
import React from 'react';

const DesignStyle = ({ project }) => {
  const styles = Array.isArray(project?.designStyle) ? project.designStyle.filter(Boolean) : [];

  return (
    <>
      {/* Mobile View */}
      <div className='lg:hidden bg-white p-5 rounded-[18px] border border-[#ECECEC] shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4'>
        <h4 className='font-bold text-[15px] text-[#2E2E2E] mb-3'>Design Style</h4>
        {styles.length === 0 ? (
          <p className='text-[13px] text-[#757575]'>No design style was listed.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {styles.map((style) => (
              <div
                key={style}
                className='bg-[#F6F6F6] px-4 py-2 rounded-full text-[#757575] text-[13px] font-medium'
              >
                {style}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className='hidden lg:block w-full bg-[#FAFAFA] border border-[#EAEAEA] font-bold px-8 py-6 mt-4 lg:text-[22px] rounded-2xl'>
        <div className='lg:mb-4 text-[#222222]'>
          <h4 className='tracking-[0.33px]'>Design Style</h4>
        </div>
        {styles.length === 0 ? (
          <p className='mt-4 text-sm font-normal text-[#767676]'>No design style was listed.</p>
        ) : (
          <div className='flex flex-wrap gap-[11px] mt-4 w-full'>
            {styles.map((style) => (
              <div
                key={style}
                className='bg-[#F0F0F0] px-4 py-2 rounded-[32px] w-fit max-w-full text-center text-[#222222] text-sm font-normal break-words'
              >
                {style}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DesignStyle;
