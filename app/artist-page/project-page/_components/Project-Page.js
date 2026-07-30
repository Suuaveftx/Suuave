'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaRegBookmark, FaBookmark, FaShareAlt, FaWhatsapp, FaTwitter, FaFacebook, FaLinkedin, FaCopy } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { useAppStore } from '@/store';

const BATCH_SIZE = 6;
const MAX_CARDS = 36; // stop after 36 cards (6 batches)

const jobData = {
  status: 'Active',
  title: 'Fashion Illustrator For African Attire Design',
  details: 'Posted 2 days ago',
  description:
    'We are seeking a talented and creative Fashion Illustrator to collaborate with our design team on a new line of African-inspired attire...',
  budget: '$200',
};

// Three-dot animated loading indicator
const ThreeDotLoader = () => (
  <div className="flex justify-center items-center gap-2 py-8">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-3 h-3 rounded-full bg-[#3A98BB] animate-bounce"
        style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
      />
    ))}
  </div>
);

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef(null);
  const { savedJobs, toggleSaveJob, activeProposals } = useAppStore();

  // Initial skeleton load
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll tracker for License button collapse
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for infinite scroll
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => {
        const next = prev + BATCH_SIZE;
        if (next >= MAX_CARDS) setHasMore(false);
        return Math.min(next, MAX_CARDS);
      });
      setLoadingMore(false);
    }, 1200);
  }, [loadingMore, hasMore]);

  useEffect(() => {
    if (initialLoading) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [initialLoading, loadMore]);

  const handleBookmark = (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveJob(jobId);
  };

  const handleSocialShare = (platform, jobId) => {
    const url = `${window.location.origin}/artist-page/job-details-page?id=${jobId}`;
    const text = 'Check out this fashion illustrator job!';
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp': shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`; break;
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`; break;
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopiedId(jobId);
        setTimeout(() => setCopiedId(null), 2000);
        return;
      default: return;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const tabClasses = (tab) =>
    `px-1 py-2 cursor-pointer ${activeTab === tab
      ? 'text-[#3A98BB] font-bold border-b-[3px] border-[#3A98BB]'
      : 'text-gray-500'
    }`;

  const allCards = Array.from({ length: visibleCount }, (_, index) => {
    const jobId = `job-${index}`;
    const isApplied = activeProposals[jobId];
    const isSaved = savedJobs.includes(jobId);
    if (activeTab === 'saved' && !isSaved) return null;
    return { jobId, isApplied, isSaved, index };
  }).filter(Boolean);

  return (
    <div className="w-full max-w-full overflow-x-hidden pb-6">
      {/* Tab Bar */}
      <div className="flex lg:space-x-4 border-b mb-4 gap-4">
        <div className={tabClasses('recent')} onClick={() => setActiveTab('recent')}>Recently</div>
        <div className={tabClasses('saved')} onClick={() => setActiveTab('saved')}>
          Saved ({savedJobs.length})
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {initialLoading
          ? [...Array(BATCH_SIZE)].map((_, index) => (
            <div key={index} className="animate-pulse px-4 py-6 bg-white border border-[#EAEAEA] rounded-2xl shadow-sm mt-6">
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-1/2 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-full bg-gray-200 rounded mb-2" />
              <div className="flex px-6 py-4 mt-4 gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>
              <div className="h-4 w-24 bg-gray-200 rounded mt-4" />
            </div>
          ))
          : allCards.map(({ jobId, isApplied, isSaved, index }) => (
            <div key={jobId} className="relative">
              <Link href={`/artist-page/job-details-page?id=${jobId}`} className="block">
                <div className="relative px-4 py-6 bg-white border border-[#EAEAEA] rounded-2xl shadow-sm cursor-pointer mt-6 hover:shadow-md transition-shadow">
                  {/* Top-right Icons */}
                  <div className="absolute top-4 right-4 flex gap-4 z-20">
                    <div className="relative group">
                      <Dropdown>
                        <DropdownTrigger>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                          >
                            <FaShareAlt className="text-gray-500 hover:text-gray-700" />
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Share options" onAction={(key) => handleSocialShare(key, jobId)}>
                          <DropdownItem key="whatsapp" startContent={<FaWhatsapp className="text-green-500" />}>WhatsApp</DropdownItem>
                          <DropdownItem key="twitter" startContent={<FaTwitter className="text-blue-400" />}>X (Twitter)</DropdownItem>
                          <DropdownItem key="facebook" startContent={<FaFacebook className="text-blue-700" />}>Facebook</DropdownItem>
                          <DropdownItem key="linkedin" startContent={<FaLinkedin className="text-blue-800" />}>LinkedIn</DropdownItem>
                          <DropdownItem key="copy" startContent={<FaCopy className="text-gray-500" />}>Copy Link</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      {copiedId === jobId && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-30">
                          Copied!
                        </span>
                      )}
                    </div>
                    <button onClick={(e) => handleBookmark(e, jobId)} className="hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                      {isSaved ? <FaBookmark className="text-[#3A98BB]" /> : <FaRegBookmark className="text-[#9FD2E5] hover:text-[#3A98BB]" />}
                    </button>
                  </div>

                  {/* Job Info */}
                  <p className="text-[#878787] text-xs leading-4">
                    Job Status:{' '}
                    <span className={isApplied ? 'text-[#035A7A] font-medium' : 'text-green-600'}>
                      {isApplied ? 'Applied' : jobData.status}
                    </span>
                  </p>
                  <h2 className="text-lg text-[#222222] font-bold mt-2">{jobData.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{jobData.details}</p>
                  <p className="text-sm text-[#727272] mt-2">
                    {jobData.description}
                    <span className="text-[#3A98BB]"> Read More</span>
                  </p>
                  <div className="flex space-x-2 mt-4 flex-wrap">
                    {['Native', 'African', 'Native'].map((btn, idx) => (
                      <button key={idx} disabled className="px-4 py-1 text-[#767676] bg-[#F0F0F0] rounded-full cursor-not-allowed">
                        {btn}
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-800 font-semibold mt-4">Budget - {jobData.budget}</p>
                </div>
              </Link>
            </div>
          ))
        }
      </div>

      {/* Infinite Scroll Sentinel */}
      {!initialLoading && (
        <>
          {loadingMore && <ThreeDotLoader />}
          {hasMore && !loadingMore && <div ref={sentinelRef} className="h-4" />}
          {!hasMore && (
            <p className="text-center text-gray-400 text-sm py-8">You've seen all jobs</p>
          )}
        </>
      )}

      {/* Fixed License Your Design Button for Mobile */}
      <div className="fixed bottom-24 right-6 z-[9999] lg:hidden">
        <Link
          href="/artist-page/license-your-design"
          className="flex items-center bg-[#EAF9FF] border border-[#73D9FF] text-[#035A7A] rounded-full shadow-2xl p-4 transition-all duration-300 ease-in-out"
          aria-label="License Your Design"
        >
          <FiPlus className="w-6 h-6 shrink-0" />
          <span
            className="font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxWidth: hasScrolled ? '150px' : '0px',
              opacity: hasScrolled ? 1 : 0,
              marginLeft: hasScrolled ? '8px' : '0px',
            }}
          >
            License Your Design
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectPage;


