'use client'
import React from 'react'
import CustomButton from '../../../../components/CustomButton'

const SkillRequirement = () => {
  return (
    <>
    <div className='lg:w-scren lg:max-w-[100%] bg-[#F9F9F9] font-bold px-8 py-4 lg:mt-[6px] mt-8 lg:mx-16 mx-4 lg:text-[22px] rounded-2xl'>
     <div className='lg:mb-4 text-[#222222]'>
        <h4 className='tracking-[0.33px]'>Skill Requirement</h4>
     </div>
     <div className='flex gap-[11px]'>
        <CustomButton
        text="3D Artist"  />
        <CustomButton
        text="Concept Artist" />
        <CustomButton
        text="StoryBoard"
        className="!bg-[#F0F0F0] text-base text-[#222222]" />
     </div>
    </div>
    </>
  )
}

export default SkillRequirement;