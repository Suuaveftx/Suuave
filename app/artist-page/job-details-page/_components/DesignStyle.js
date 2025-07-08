'use client'
import React from 'react'
import CustomButton from '../../../../components/CustomButton'

const DesignStyle = () => {
  return (
    <>
    <div className='lg:w-scren lg:max-w-[100%] bg-[#F9F9F9] font-bold px-8 py-4 mt-[7.84px] lg:mx-16 mx-4 lg:text-[22px] rounded-2xl'>
     <div className='lg:mb-4 text-[#222222]'>
        <h4 className='tracking-[0.33px]'>Design Style</h4>
     </div>
     <div className='flex gap-[11px]'>
        <CustomButton
        text="Casual"
        class  />
        <CustomButton
        text="Ethnic" />
        <CustomButton
        text="Street Wear"
        className="!bg-[#F0F0F0] text-base text-[#222222]" />
     </div>
    </div>
    </>
  )
}

export default DesignStyle