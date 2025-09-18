'use client'
import React, {useState} from 'react'
import { Paperclip } from 'lucide-react';
import {Textarea} from "@heroui/react";
import { FaChevronLeft } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
const ProposalClosed = () => {
   const [isExpanded, setIsExpanded] = useState(false);
   const fullText = "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.";
  const previewText = fullText.substring(0, 120); // Adjust character limit as needed
   const [selected, setSelected] = useState("5 Days");
  const [open, setOpen] = useState(false);

  const options = ["1 Day", "3 Days", "5 Days", "7 Days", "10 Days"];
  return (
    <>
    <div className='flex items-center lg:mt-0 mt-4 px-4 py-[10px] mx-4'>
      <div className='lg:hidden'>
      <FaChevronLeft color='#878787' />
      </div>
    <h4 className='font-bold lg:text-[34px] lg:text-[#222222] text-[34px] text-[#444444] lg:mx-16 mx-4'>Proposal Details</h4>
    </div>
    <div className='bg-[#FAFAFA] lg:flex lg:flex-col hidden text-[#222222] px-8 py-8 lg:ml-16 mx-4 w-[90%] mt-[39.68px] rounded-2xl border-1 border-[#EAEAEA] '>
      <h4 className='font-bold leading-7'>Related Job</h4>
      <div className='flex justify-between mt-6'>
        <div className='text-sm text-[#767676] leading-[18px] tracking-[0.33px]'>
          <span>Posted: 23-06-2024</span>
        </div>
        <div className='flex gap-2 text-sm leading-[18px] tracking-[0.33px]'>
          <span className='text-[#767676]'>Job Status:</span>
          <span className='text-[#FF8024]'>Closed</span>
        </div>
      </div>
      <div className='font-bold text-[#222222] mt-4'>
        Modern Fashion Attire Illustration
      </div>
      <div className="mt-4 text-[#767676]">
      {isExpanded ? fullText : `${previewText}... `}
      {!isExpanded && (
        <span 
          onClick={() => setIsExpanded(true)} 
          className="text-[#3A98BB] cursor-pointer"
        >
          View Post
        </span>
      )}
    </div>
    </div>
    <div className='bg-[#FAFAFA] flex flex-col  gap-2 border-1 border-[#EAEAEA] px-8 py-8 pb-[42px] lg:mx-16  mx-auto mt-4 rounded-2xl lg:w-[90%] w-[80%] lg:mb-[240.32px] '>
      <div className='lg:flex  font-bold hidden text-2xl leading-6 rounded-2xl'>
        Write Proposal
      </div>
    <div className="w-full">
  <label
    htmlFor="cover-letter"
    className="block text-[#222222] font-semibold text-base tracking-[0.33px] mb-2"
  >
    Cover Letter
  </label>
  <textarea
    id="cover-letter"
    placeholder="I am excited to apply for the Fashion Illustrator position at [Company/Brand Name]. With a strong background in fashion design and a keen eye for detail, I specialize in creating illustrations that bring concepts to life—from high fashion editorial looks to commercial-ready garment designs.
My illustration style blends creativity with clarity, ensuring each sketch communicates not just the outfit, but the story behind it. I am skilled in both traditional hand-drawn techniques and digital illustration tools like Adobe Illustrator, Photoshop, and Procreate."
    className="lg:w-full w-[90%] min-h-[150px] px-[10px] py-[10px] border border-[#D1D1D1] rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-[#3A98BB] text-sm text-[#222222]"
  ></textarea>
</div>

     <div className=''>
      <h4 className="text-base font-semibold">
        Attachments
      </h4>
      <span className='text-sm leading-[18px] tracking-[0.33px] mt-1 block'>
        You can upload a sample of your work or projects. This helps to showcase your skill level to the client.
      </span>
<div className="mt-4 flex items-center gap-2 w-full">
         <div className="flex flex-col gap-3">
      {/* Item 1 */}
      <div className="flex items-center gap-2">
        <Paperclip className="text-[#3A98BB] w-5 h-5" />
        <span className="text-[#3A98BB] font-bold">56regdgt67</span>
      </div>

      {/* Item 2 */}
      <div className="flex items-center gap-2">
        <Paperclip className="text-[#3A98BB] w-5 h-5" />
        <span className="text-[#3A98BB] font-bold">56regdgt67</span>
      </div>

      {/* Item 3 */}
      <div className="flex items-center gap-2">
        <Paperclip className="text-[#3A98BB] w-5 h-5" />
        <span className="text-[#3A98BB] font-bold">56regdgt67</span>
      </div>
    </div>
      </div>    
    </div>
    <div className="mt-6 space-y-2">
  <label className="text-base text-[#222222] font-semibold block">
    How much are you charging for this work?
  </label>

  <div className="flex items-center gap-2 text-sm text-[#767676]">
   <IoMdInformationCircleOutline color='#878787' />
    <span>
      10% commission charge applies{" "}
      <a href="#" className="text-[#3A98BB]">
        Learn More
      </a>
    </span>
  </div>

  <input
    type="text"
    value="N200,00"
    style={{ color: '#3A98BB'}}
    readOnly
    className="w-full border border-gray-300 rounded-md px-[10px] py-[10px] text-base text-gray-700 bg-gray-50"
  />
</div>
 <div className="mt-6 relative inline-block w-full">
      <label className="text-base font-semibold block mb-2">
        How long will it take you to complete this work?
      </label>

      <button
        type="button"
        className="w-[50%] border border-gray-300 rounded-md px-4 py-2 bg-white text-sm flex justify-between items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selected}</span>

        {/* Dropdown Arrow Icon */}
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute left-0 w-full bg-white border border-gray-200 shadow-md rounded-md mt-1 z-10">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    </>
  )
}

export default ProposalClosed
