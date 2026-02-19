'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Pencil } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import CustomButton from '../../../../components/CustomButton';
import { IoLocationSharp } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditOccupationModal from './EditOccupationModal';



const ProfileArtist = ({ isVisitor = false }) => {
  const fullText = `Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.`;

  const [isExpanded, setIsExpanded] = useState(false);
  const [aboutValue, setAboutValue] = useState(fullText);
  const [titleValue, setTitleValue] = useState("Fashion Artist | 3D Illustrator");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [previewProfileUrl, setPreviewProfileUrl] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleRetainArtist = () => {
    const returnPath = encodeURIComponent('/artist-page/profile-for-artist');
    router.push(`/fashion-designers/contracts/retain?artist=Ocean&returnUrl=${returnPath}`);
  };

  useEffect(() => {
    // Access localStorage in useEffect to avoid hydration issues
    const role = isVisitor ? 'Fashion Brand' : localStorage.getItem('activeCategory');
    const savedOccupation = localStorage.getItem('artist_occupation');
    if (savedOccupation) {
      setTitleValue(savedOccupation);
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
    localStorage.setItem('artist_occupation', newOccupation);
  };

  return (
    <div
      className='w-full h-full lg:h-fit lg:sticky lg:top-[120px] lg:max-w-xs lg:mx-auto lg:bg-white rounded-lg lg:space-y-2 
      flex flex-col items-center lg:items-start lg:text-left shadow-sm lg:shadow-none'
    >
      <div className='bg-white lg:bg-[#ffffff] w-full lg:px-6 lg:py-6 px-4 py-8 rounded-lg shadow-sm relative'>
        {userRole === 'Fashion Artist' && (
          <div className="absolute top-6 right-4 z-10">
            <Link
              href="/artist-page/edit-profile"
              className="px-6 py-2 rounded-full transition-all flex items-center justify-center shadow-md font-proximanova font-medium"
              style={{
                background: "radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)",
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
            <div className='w-[100px] h-[100px] flex items-center justify-center rounded-full overflow-hidden relative border-2 border-[#f1f1f1]'>
              <Image
                src='/dev-images/Clients.png'
                alt='Profile Picture'
                fill
                className='object-cover'
              />
            </div>
          </div>


          {/* Name */}
          <div className='w-full flex flex-col items-center'>
            <h4 className='lg:text-2xl font-bold text-xl text-[#222222] flex items-center gap-2'>
              OCEAN CLARA
              <span className='w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow-sm'></span>
            </h4>
          </div>

          {/* Occupation */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center gap-2">
              <p className="text-[#222222] text-[16px] font-medium">
                {userRole === 'Fashion Brand' ? 'Designer/Brand' : titleValue}
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

            <div className='flex items-center space-x-2 mt-2'>
              <div className='flex gap-1'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} className={i < 4 ? 'text-[#F8B73B]' : 'text-gray-300'} />
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-[#222222] font-semibold">4.0</span>
                <span className='text-[#3A98BB]'>(5.0 reviews)</span>
              </div>
            </div>

            {isVisitor && (
              <div className="mt-4 w-full">
                <button
                  onClick={handleRetainArtist}
                  className="w-full px-6 py-2 rounded-full transition-all flex items-center justify-center shadow-md font-proximanova font-medium"
                  style={{
                    background: "radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)",
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
      <div className='bg-white w-full py-8 lg:py-0 border-y border-[#f1f1f1] lg:border-none'>
        <div className={`flex flex-row justify-center ${userRole === 'Fashion Brand' ? 'gap-4 px-2' : 'gap-12'}`}>
          <div className='flex flex-col items-center text-[#222222] min-w-[80px]'>
            <span className='font-bold text-xl mb-1 order-first'>7</span>
            <h4 className='text-[#767676] text-[12px] font-medium text-center uppercase tracking-tight'>
              {userRole === 'Fashion Brand' ? 'Jobs Posted' : 'Design Collections'}
            </h4>
          </div>

          <div className='flex flex-col items-center text-[#222222] min-w-[80px]'>
            <span className='font-bold text-xl mb-1 order-first'>7</span>
            <h4 className='text-[#767676] text-[12px] font-medium text-center uppercase tracking-tight'>
              Projects Completed
            </h4>
          </div>

          {userRole === 'Fashion Brand' && (
            <div className='flex flex-col items-center text-[#222222] min-w-[80px]'>
              <span className='font-bold text-xl mb-1 order-first'>$10000</span>
              <h4 className='text-[#767676] text-[12px] font-medium text-center uppercase tracking-tight'>
                Total Spent
              </h4>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-2 bg-[#F1F1F1] lg:hidden"></div>

      {/* About Us Section */}
      <div className='bg-white lg:bg-[#ffffff] w-full flex flex-col items-start lg:px-6 px-4 py-8 text-left lg:mt-0 rounded-lg shadow-sm mb-10'>
        {/* Heading */}
        <div className='flex items-center w-full justify-between mb-4'>
          <h4 className='text-lg text-[#222222] font-bold'>
            About Me
          </h4>
        </div>

        {/* Text */}
        <p
          className={`text-[#222222] text-sm leading-relaxed
      ${isExpanded ? '' : 'line-clamp-3'} 
      lg:line-clamp-none`}
        >
          {aboutValue}
        </p>
      </div>
      <EditOccupationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValue={titleValue}
        onSave={handleSaveOccupation}
      />
    </div >
  );
};

export default ProfileArtist;
