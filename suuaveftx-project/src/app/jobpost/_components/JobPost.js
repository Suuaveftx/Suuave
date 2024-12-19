'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const JobPost = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const tabClasses = (tab) =>
    `px-4 py-2 cursor-pointer ${
      activeTab === tab
        ? 'text-[#3A98BB] font-bold border-b-4 border-[#3A98BB]'
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
    <div className="p-6 mx-auto">
      {/* Tab Bar */}
      <div className="flex space-x-4 border-b mb-4">
        <div
          className={tabClasses('recent')}
          onClick={() => setActiveTab('recent')}
        >
          Recently Posted (423)
        </div>
        <div
          className={tabClasses('saved')}
          onClick={() => setActiveTab('saved')}
        >
          Saved Jobs (90)
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative p-8 bg-white border-2 border-[#E0E0E0] rounded-lg shadow-sm"
          >
            {/* Top-right Images */}
            <div className="absolute mt-0 right-2 flex space-x-2">
              <Image
                src="/dev-images/Share.png" // Replace with your actual image path
                alt="Icon 1"
                className="w-6 h-6"
                width={20}
                height={20}
              />
              <Image
                src="/dev-images/Bookmark.png" // Replace with your actual image path
                alt="Icon 2"
                className="w-6 h-6"
                width={20}
                height={20}
              />
            </div>

            {/* Job Information */}
            <p className="text-gray-600">
              Job Status: <span className="text-green-600">{jobData[0].status}</span>
            </p>
            <h2 className="text-lg font-bold mt-2">{jobData[0].title}</h2>
            <p className="text-sm text-gray-500 mt-1">{jobData[0].details}</p>
            <p className="text-sm text-[#727272] mt-2">
              {jobData[0].description}
              <a href="#" className="text-[#3A98BB] underline">
                Read More
              </a>
            </p>
            <div className="flex space-x-2 mt-4">
              {['Native', 'African', 'Native'].map((btn, idx) => (
                <button
                  key={idx}
                  disabled
                  className="px-4 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-full cursor-not-allowed"
                >
                  {btn}
                </button>
              ))}
            </div>
            <p className="text-gray-800 font-semibold mt-4">Budget - {jobData[0].budget}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPost;
