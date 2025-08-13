'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegBookmark } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const tabClasses = (tab) =>
    `px-1 py-2 cursor-pointer ${
      activeTab === tab
        ? 'text-[#3A98BB] font-bold border-b-[3px] border-[#3A98BB]'
        : 'text-gray-500'
    }`;

  const jobData = [
    {
      status: 'Active',
      title: 'Fashion Illustrator For African Attire Design',
      details: 'Fixed Price | Posted 2 days ago',
      description:
        'We are seeking a talented and creative Fashion Illustrator to collaborate with our design team on a new line of African-inspired attire. The ideal candidate will have a strong understanding of African fashion, culture, and textile patterns. You will be responsible for bringing our design concepts to life through detailed illus... ',
      budget: '$200',
    },
  ];

  return (
    <div className="p-6">
      {/* Tab Bar */}
      <div className="flex lg:space-x-4 border-b mb-4">
        <div
          className={tabClasses('recent')}
          onClick={() => setActiveTab('recent')}
        >

          Recently

        </div>
        <div
          className={tabClasses('saved')}
          onClick={() => setActiveTab('saved')}
        >

          Saved (90)

        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {[...Array(6)].map((_, index) => (
    <Link key={index} href={`/artist-page/job-details-page`} className="block">
      <div className="relative px-6 py-6 bg-white border-1 border-[#EAEAEA] rounded-2xl shadow-sm cursor-pointer mt-[29px] lg:mx-0 lg:my-0 mx-4">
        {/* Top-right Images */}
        <div className="absolute mt-0 right-2 flex  gap-6">
          <FaShareAlt color='#878787' />
          <FaRegBookmark color='#9FD2E5' />
        </div>

        {/* Job Information */}
        <p className="text-[#878787] text-xs leading-4 gap-1">
          Job Status: <span className="text-green-600">{jobData[0].status}</span>
        </p>
        <h2 className="text-lg text-[#222222] font-bold mt-2">{jobData[0].title}</h2>
        <p className="text-sm text-gray-500 mt-1">{jobData[0].details}</p>
        <p className="text-sm text-[#727272] mt-2">
          {jobData[0].description}
          <span className="text-[#3A98BB] underline"> Read More</span>
        </p>
        <div className="flex space-x-2 mt-4">
          {['Native', 'African', 'Native'].map((btn, idx) => (
            <button key={idx} disabled className="px-4 py-1 text-[#767676] bg-[#F0F0F0]  rounded-full cursor-not-allowed">
              {btn}
            </button>
          ))}
        </div>
        <p className="text-gray-800 font-semibold mt-4">Budget - {jobData[0].budget}</p>
      </div>
    </Link>
  ))}
</div>
    </div>
  );
};

export default ProjectPage;
