'use client'
import React from 'react'

const PostSkillRequirement = () => {
  return (
    <>
    <div className='lg:w-scren lg:max-w-[100%] bg-[#F9F9F9] font-bold px-8 py-4 lg:mt-[6px] mt-8 lg:mx-16 mx-4 lg:text-[22px] rounded-2xl'>
     <div className='lg:mb-4 text-[#222222]'>
        <h4 className='tracking-[0.33px]'>Skill Requirement</h4>
     </div>
         <div className='flex gap-[11px] mt-4 lg:w-screen lg:max-w-[60%] w-full '>
  <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] w-screen lg:max-w-[40%]  flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
    3D Artist
  </div>
  <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] w-screen max-w-[40%] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
    Concept Artist
  </div>
  <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] w-screen  flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
    Storyboard 
  </div>
</div>
    </div>
    </>
  )
}

export default PostSkillRequirement;