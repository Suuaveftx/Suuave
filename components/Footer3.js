'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTelegram } from 'react-icons/fa6';

const Footer3 = () => {
  return (
    <footer className='bg-[#12333E] text-white py-8 h-[498px] overflow-y-auto overflow-x-hidden'>
      <div className='container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* OUR COMPANY */}
        <div>
          <h3 className='text-lg font-bold mb-4 border-b border-gray-400 pb-1'>
            OUR COMPANY
          </h3>
          <ul className='space-y-2'>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Help And Support</li>
          </ul>
        </div>

        {/* IMPORTANT LINKS */}
        <div>
          <h3 className='text-lg font-bold mb-4 border-b border-gray-400 pb-1'>
            IMPORTANT LINKS
          </h3>
          <ul className='space-y-2'>
            <li>Job Posts</li>
            <li>Explore Talents</li>
            <li>How it Works</li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className='text-lg font-bold mb-4 border-b border-gray-400 pb-1'>
            POLICIES
          </h3>
          <ul className='space-y-2'>
            <li>Term & Conditions</li>
            <li>Privacy Policy</li>
            <li>Collaboration Policy</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className='w-full text-lg font-bold mb-4 border-b border-gray-400 pb-1 whitespace-nowrap'>
            SUBSCRIBE TO OUR NEWSLETTER
          </h3>
          <p className='text-sm mb-4'>Get our latest offers</p>
          <div className='flex-col items-center bg-white rounded-md overflow-hidden'>
            <input
              type='email'
              placeholder='Enter Email Address'
              className='w-full px-4 py-2 text-gray-700 focus:outline-none'
            />
          </div>
          <div className='mt-4'>
            <button className='bg-[#C0E8FF] text-[#444444] text-[16px] font-semibold px-4 py-2 rounded-full'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA */}
      <div className='border-gray-400 mt-8 pt-6'>
        <div className='container mx-auto px-6 text-center'>
          <h3 className='text-lg font-bold mb-2 border-b'>OUR SOCIALS</h3>
          <div className='flex flex-wrap gap-4 justify-center mt-6'>
            <Link href='https://www.twitter.com' passHref>
              <div className='w-12 h-12 rounded-full border border-white bg-white flex items-center justify-center transition'>
                <FaXTwitter className='w-6 h-6 text-black' />
              </div>
            </Link>
            <Link href='https://www.facebook.com' passHref>
              <div className='w-12 h-12 rounded-full border border-[#1877F2] bg-white flex items-center justify-center transition'>
                <FaFacebook className='w-6 h-6 text-[#1877F2]' />
              </div>
            </Link>
            <Link href='https://www.instagram.com' passHref>
              <div className='w-12 h-12 rounded-full border border-[#E4405F] bg-white flex items-center justify-center transition'>
                <FaInstagram className='w-6 h-6 text-[#E4405F]' />
              </div>
            </Link>
            <Link href='https://www.linkedin.com' passHref>
              <div className='w-12 h-12 rounded-full border border-[#0A66C2] bg-white flex items-center justify-center transition'>
                <FaLinkedin className='w-6 h-6 text-[#0A66C2]' />
              </div>
            </Link>
            <Link href='https://www.youtube.com/@SuuaveFTx' passHref>
              <div className='w-12 h-12 rounded-full border border-[#FF0000] bg-white flex items-center justify-center transition'>
                <FaYoutube className='w-6 h-6 text-[#FF0000]' />
              </div>
            </Link>
            <Link href='https://telegram.org' passHref>
              <div className='w-12 h-12 rounded-full border border-[#229ED9] bg-white flex items-center justify-center transition'>
                <FaTelegram className='w-6 h-6 text-[#229ED9]' />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer3;
