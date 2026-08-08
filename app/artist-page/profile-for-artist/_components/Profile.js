'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Pencil } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import CustomButton from '../../../../components/CustomButton';
import { IoLocationSharp } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import EditOccupationModal from './EditOccupationModal';
import EditAboutModal from './EditAboutModal';



const ProfileArtist = ({ isVisitor = false }) => {
  const fullText = `Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.`;

  const [isExpanded, setIsExpanded] = useState(false);
  const [aboutValue, setAboutValue] = useState(fullText);
  const [titleValue, setTitleValue] = useState("Fashion Artist | 3D Illustrator");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [previewProfileUrl, setPreviewProfileUrl] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [tempAboutValue, setTempAboutValue] = useState(fullText);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleRetainArtist = () => {
    const returnPath = encodeURIComponent('/artist-page/profile-for-artist');
    router.push(`/fashion-designers/contracts/retain?artist=Ocean&returnUrl=${returnPath}`);
  };

  useEffect(() => {
    let role = isVisitor ? 'brand' : localStorage.getItem('activeCategory');
    if (role === 'Fashion Artist') role = 'artist';
    if (role === 'Fashion Brand') role = 'brand';

    const storageKey = role === 'brand' ? 'brand_title' : 'artist_occupation';
    const savedTitle = localStorage.getItem(storageKey);
    if (savedTitle) {
      setTitleValue(savedTitle);
    } else if (role === 'brand') {
      setTitleValue('Designer/Brand');
    }
    setUserRole(role);
  }, [isVisitor]);

  // File handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous URL to prevent memory leaks
      setPreviewProfileUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return URL.createObjectURL(file);
      });
      setSelectedProfile(file);
    }
  };

  const handleSaveOccupation = (newOccupation) => {
    setTitleValue(newOccupation);
    const storageKey = userRole === 'brand' ? 'brand_title' : 'artist_occupation';
    localStorage.setItem(storageKey, newOccupation);
  };

  return (
    <div
      className='w-full h-full lg:h-fit lg:w-[320px] lg:bg-white rounded-lg lg:space-y-2 
      flex flex-col items-center lg:items-start lg:text-left shadow-sm lg:shadow-none'
    >
      <div className='bg-white lg:bg-[#ffffff] w-full lg:px-6 lg:py-6 px-4 py-8 rounded-lg shadow-sm relative'>
        {userRole === 'artist' && (
          <div className="absolute top-6 right-4 z-10">
            <Link
              href="/artist-page/edit-profile"
              className="px-6 py-2 rounded-full transition-all flex items-center justify-center shadow-md font-proximanova font-medium"
              style={{
                background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
                color: "#035A7A",
              }}
            >
              Edit
            </Link>
          </div>
        )}

        <div className='space-y-4 pb-3 w-full flex flex-col items-center'>
          {/* Profile Initials */}
          <div className='flex justify-center w-full'>
            <div className='relative w-[100px] h-[100px]'>
              <div className='w-full h-full flex items-center justify-center rounded-full overflow-hidden border-2 border-[#f1f1f1]'>
                <Image
                  src={previewProfileUrl || '/dev-images/Clients.png'}
                  alt='Profile Picture'
                  fill
                  className='object-cover'
                />
              </div>
              {!isVisitor && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className='absolute top-0 right-0 bg-white p-1.5 rounded-full shadow-md text-[#3A98BB] hover:opacity-75 transition-opacity'
                  >
                    <Pencil size={16} />
                  </button>
                </>
              )}
            </div>
          </div>


          {/* Name */}
          <div className='w-full flex flex-col items-center'>
            <h4 className='lg:text-2xl font-bold text-[28px] text-[#222222] flex items-center gap-2'>
              OCEAN CLARA
              <span className='w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow-sm'></span>
            </h4>
          </div>

          {/* Occupation */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center gap-2">
              <p className="text-[#222222] text-[16px] font-medium">
                {titleValue}
              </p>
              {!isVisitor && (
                <button onClick={() => setIsModalOpen(true)} className="text-[#3A98BB] hover:opacity-75 transition-opacity">
                  <Pencil size={18} />
                </button>
              )}
            </div>

            {/* Location */}
            <div className='flex items-center space-x-2 text-[#767676] text-sm font-medium mt-1'>
              <IoLocationSharp size={18} />
              <span>Lagos, Nigeria</span>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-2 mt-2 w-full justify-center'>
              <div className='flex gap-0.5 flex-shrink-0'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={15} className={i < 4 ? 'text-[#F8B73B]' : 'text-gray-300'} />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-sm whitespace-nowrap flex-shrink-0">
                <span className="text-[#222222] font-semibold">4.0</span>
                <span className='text-[#3A98BB] cursor-pointer hover:underline'>(5.0 reviews)</span>
              </div>
            </div>

            {isVisitor && (
              <div className="mt-4 w-full">
                <button
                  onClick={handleRetainArtist}
                  className="w-full px-6 py-2 rounded-full transition-all flex items-center justify-center shadow-md font-proximanova font-medium"
                  style={{
                    background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
                    color: "#035A7A",
                  }}
                >
                  Retain Artist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brand specific divider if needed */}
      <div className="w-full h-2 bg-[#F1F1F1] lg:hidden"></div>

      {/* Stats */}
      <div className='bg-white w-full py-6 lg:py-6 lg:px-6 px-4 border-y border-[#f1f1f1] lg:border-none'>
        <div className='flex flex-row lg:flex-col justify-center gap-6 lg:gap-4 w-full'>
          <div className='flex flex-row lg:justify-between items-center gap-2 lg:gap-0 text-[#222222] w-full'>
            <h4 className='text-[#767676] text-[14px] lg:text-[15px] font-medium order-2 lg:order-1'>
              Design Collections
            </h4>
            <span className='font-bold text-[18px] order-1 lg:order-2'>14</span>
          </div>

          <div className='flex flex-row lg:justify-between items-center gap-2 lg:gap-0 text-[#222222] w-full'>
            <h4 className='text-[#767676] text-[14px] lg:text-[15px] font-medium order-2 lg:order-1'>
              Completed Projects
            </h4>
            <span className='font-bold text-[18px] order-1 lg:order-2'>14</span>
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-[#F1F1F1] lg:hidden"></div>

      {/* About Us Section */}
      <div className='bg-white lg:bg-[#ffffff] w-full flex flex-col items-start lg:px-6 px-4 py-8 text-left lg:mt-0 rounded-lg shadow-sm mb-10'>
        {/* Heading */}
        <div className='flex items-center w-full justify-between mb-4'>
          <h4 className='text-[28px] text-[#222222] font-bold'>
            Description
          </h4>
          {!isVisitor && (
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="text-[#3A98BB] hover:opacity-75 transition-opacity"
            >
              <Pencil size={18} />
            </button>
          )}
        </div>

        {/* Text Area */}
        <div className="w-full">
          <p
            className={`text-[#222222] text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}
          >
            {aboutValue}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#3A98BB] font-semibold text-sm mt-1 hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>
      </div>
      <EditOccupationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValue={titleValue}
        onSave={handleSaveOccupation}
      />
      <EditAboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        initialValue={aboutValue}
        onSave={(newAbout) => setAboutValue(newAbout)}
      />
    </div >
  );
};

export default ProfileArtist;