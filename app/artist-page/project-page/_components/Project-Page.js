'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegBookmark, FaBookmark, FaShareAlt, FaWhatsapp, FaTwitter, FaFacebook, FaLinkedin, FaCopy } from 'react-icons/fa';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [loading, setLoading] = useState(true);
  const [showLicence, setShowLicence] = useState(false);
  const [activeProposals, setActiveProposals] = useState({});
  const [savedJobs, setSavedJobs] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Load active proposals
    const storedProposals = JSON.parse(localStorage.getItem('activeProposals') || '{}');
    setActiveProposals(storedProposals);

    // Load saved jobs
    const storedSavedJobs = JSON.parse(localStorage.getItem('savedJobs') || '{}');
    setSavedJobs(storedSavedJobs);

    return () => clearTimeout(timer);
  }, []);

  const handleBookmark = (e, jobId) => {
    // Prevent navigation to the job details page
    e.preventDefault();
    e.stopPropagation();

    const newSavedJobs = { ...savedJobs };
    if (newSavedJobs[jobId]) {
      delete newSavedJobs[jobId];
    } else {
      newSavedJobs[jobId] = true;
    }

    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };

  const handleSocialShare = (platform, jobId) => {
    const url = `${window.location.origin}/artist-page/job-details-page?id=${jobId}`;
    const text = "Check out this fashion illustrator job!";

    let shareUrl = "";
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopiedId(jobId);
        setTimeout(() => setCopiedId(null), 2000);
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const tabClasses = (tab) =>
    `px-1 py-2 cursor-pointer ${activeTab === tab
      ? 'text-[#3A98BB] font-bold border-b-[3px] border-[#3A98BB]'
      : 'text-gray-500'
    }`;

  const jobData = [
    {
      status: 'Active',
      title: 'Fashion Illustrator For African Attire Design',
      details: 'Posted 2 days ago',
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
          Saved ({Object.keys(savedJobs).length})
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
          : [...Array(6)].map((_, index) => {
            const jobId = `job-${index}`;
            const isApplied = activeProposals[jobId];
            const isSaved = savedJobs[jobId];

            // If on 'saved' tab and not saved, don't show
            if (activeTab === 'saved' && !isSaved) return null;

            return (
              <div key={index} className={`relative ${index > 1 ? 'hidden md:block' : ''}`}>

                {/* Job Card */}
                <Link href={`/artist-page/job-details-page?id=${jobId}`} className="block">
                  <div className="relative px-4 py-6 bg-white border border-[#EAEAEA] rounded-2xl shadow-sm cursor-pointer mt-6 hover:shadow-md transition-shadow">
                    {/* Top-right Icons */}
                    <div className="absolute top-4 right-4 flex gap-4 z-20">
                      <div className="relative group">
                        <Dropdown>
                          <DropdownTrigger>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                            >
                              <FaShareAlt className="text-gray-500 hover:text-gray-700" />
                            </button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Share options"
                            onAction={(key) => handleSocialShare(key, jobId)}
                          >
                            <DropdownItem key="whatsapp" startContent={<FaWhatsapp className="text-green-500" />}>
                              WhatsApp
                            </DropdownItem>
                            <DropdownItem key="twitter" startContent={<FaTwitter className="text-blue-400" />}>
                              X (Twitter)
                            </DropdownItem>
                            <DropdownItem key="facebook" startContent={<FaFacebook className="text-blue-700" />}>
                              Facebook
                            </DropdownItem>
                            <DropdownItem key="linkedin" startContent={<FaLinkedin className="text-blue-800" />}>
                              LinkedIn
                            </DropdownItem>
                            <DropdownItem key="copy" startContent={<FaCopy className="text-gray-500" />}>
                              Copy Link
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        {copiedId === jobId && (
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-30">
                            Copied!
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleBookmark(e, jobId)}
                        className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                      >
                        {isSaved ? (
                          <FaBookmark className="text-[#3A98BB]" />
                        ) : (
                          <FaRegBookmark className="text-[#9FD2E5] hover:text-[#3A98BB]" />
                        )}
                      </button>
                    </div>

                    {/* Job Info */}
                    <p className="text-[#878787] text-xs leading-4">
                      Job Status:{' '}
                      <span className={isApplied ? "text-[#035A7A] font-medium" : "text-green-600"}>
                        {isApplied ? 'Applied' : jobData[0].status}
                      </span>
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
            )
          })}
      </div>

      {/* Fixed Redesigned License Design Button for Mobile */}
      <div className="fixed bottom-24 right-[52px] flex items-center z-30 sm:hidden">
        {showLicence ? (
          <div
            className="flex items-center rounded-full shadow-lg px-4 py-2"
            style={{
              background: 'radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)',
            }}
          >
            <Link href="/artist-page/license-your-design" className="flex items-center">
              <span className="text-base text-[#035A7A] font-bold whitespace-nowrap mr-2">
                License your design
              </span>
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <FiMinus
                  className="text-[#3A98BB] cursor-pointer ml-2 text-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLicence(false);
                  }}
                />
              </motion.div>
            </Link>
          </div>
        ) : (
          <div
            className="w-[52px] h-[52px] flex items-center justify-center bg-[#E0F4FB] rounded-full shadow-lg cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => setShowLicence(true)}
          >
            <motion.div
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <FiPlus className="text-[#035A7A] text-2xl font-bold" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
