'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaRegBookmark, FaShareAlt } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [loading, setLoading] = useState(true);
  const [showLicence, setShowLicence] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
        'We are seeking a talented and creative Fashion Illustrator to collaborate with our design team on a new line of African-inspired attire...',
      budget: '$200',
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden p-6">
      {/* Tab Bar */}
      <div className="flex lg:space-x-4 border-b mb-4 gap-4">
        <div className={tabClasses('recent')} onClick={() => setActiveTab('recent')}>
          Recently
        </div>
        <div className={tabClasses('saved')} onClick={() => setActiveTab('saved')}>
          Saved (90)
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading
          ? [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse px-4 py-6 bg-white border border-[#EAEAEA] rounded-2xl shadow-sm mt-6"
              >
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                <div className="flex px-6 py-4 mt-4">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded mt-4"></div>
              </div>
            ))
          : [...Array(6)].map((_, index) => (
              <div key={index} className={`relative ${index > 1 ? 'hidden md:block' : ''}`}>
                {/* Only show the circle/button on the 2nd card and only on mobile */}
                {index === 1 && (
                  <div className="absolute -top-0 right-8 flex items-center z-10 sm:hidden">
                    {showLicence ? (
                      <div
                        className="flex items-center rounded-full shadow-sm px-4 py-2"
                        style={{
                          background: 'radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)',
                        }}
                      >
                        <Link href="/artist-page/license-your-design" className="flex items-center">
                          <span className="text-base text-[#035A7A] font-bold whitespace-nowrap mr-2">
                            License your design
                          </span>
                          <FiPlus
                            className="text-[#3A98BB] cursor-pointer ml-2"
                            onClick={() => setShowLicence(false)}
                          />
                        </Link>
                      </div>
                    ) : (
                      <div className='mt-[-80px] mr-[40px]'>
                      <div
                        className="absolute w-[52px] h-[52px] flex items-center justify-center bg-[#E0F4FB] rounded-full shadow-sm cursor-pointer mt-[30px] transition-all duration-300 ease-in-out"
                        onClick={() => setShowLicence(true)}
                      >
                        <FiPlus className="text-[#3A98BB]" />
                      </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Job Card */}
                <Link href={`/artist-page/job-details-page`} className="block">
                  <div className="relative px-4 py-6 bg-white border border-[#EAEAEA] rounded-2xl shadow-sm cursor-pointer mt-6">
                    {/* Top-right Icons */}
                    <div className="absolute top-4 right-4 flex gap-4">
                      <FaShareAlt className="text-gray-500" />
                      <FaRegBookmark className="text-[#9FD2E5]" />
                    </div>

                    {/* Job Info */}
                    <p className="text-[#878787] text-xs leading-4">
                      Job Status:{' '}
                      <span className="text-green-600">{jobData[0].status}</span>
                    </p>
                    <h2 className="text-lg text-[#222222] font-bold mt-2">
                      {jobData[0].title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{jobData[0].details}</p>
                    <p className="text-sm text-[#727272] mt-2">
                      {jobData[0].description}
                      <span className="text-[#3A98BB]"> Read More</span>
                    </p>
                    <div className="flex space-x-2 mt-4 flex-wrap">
                      {['Native', 'African', 'Native'].map((btn, idx) => (
                        <button
                          key={idx}
                          disabled
                          className="px-4 py-1 text-[#767676] bg-[#F0F0F0] rounded-full cursor-not-allowed"
                        >
                          {btn}
                        </button>
                      ))}
                    </div>
                    <p className="text-gray-800 font-semibold mt-4">
                      Budget - {jobData[0].budget}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProjectPage;
