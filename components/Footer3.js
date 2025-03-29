import Image from 'next/image';
import React from 'react';

const Footer3 = () => {
  return (
    <footer className="bg-[#12333E] text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* OUR COMPANY */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-gray-400 pb-1">OUR COMPANY</h3>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Help And Support</li>
          </ul>
        </div>

        {/* IMPORTANT LINKS */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-gray-400 pb-1">IMPORTANT LINKS</h3>
          <ul className="space-y-2">
            <li>Job Posts</li>
            <li>Explore Talents</li>
            <li>How it Works</li>
            <li>How it Works</li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-gray-400 pb-1">POLICIES</h3>
          <ul className="space-y-2">
            <li>Term & Conditions</li>
            <li>Privacy Policy</li>
            <li>Collaboration Policy</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="w-full text-lg font-bold mb-4 border-b border-gray-400 pb-1 whitespace-nowrap">SUBSCRIBE TO OUR NEWSLETTER</h3>
          <p className="text-sm mb-4">Get our latest offers</p>
          <div className="flex-col items-center bg-white rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-2 text-gray-700 focus:outline-none"
            />
          </div>
          <div className='mt-4'>
          <button className="bg-[#C0E8FF] text-[#444444] text-[16px] font-semibold px-4 py-2 rounded-full">Subscribe</button>
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA */}
      <div className=" border-gray-400 mt-8 pt-6">
        <div className="container mx-auto px-6">
          <h3 className="text-lg font-bold mb-2 border-b">OUR SOCIALS</h3>
          <div className="flex space-x-4">
            <Image src="/dev-images/insta1.png" alt="Instagram" className="w-8 h-8" width={15} height={15} />
            <Image src="/dev-images/face1.png" alt="Facebook" className="w-8 h-8" width={15} height={15} />
            <Image src="/dev-images/x1.png" alt="X (Twitter)" className="w-8 h-8" width={15} height={15} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer3;
