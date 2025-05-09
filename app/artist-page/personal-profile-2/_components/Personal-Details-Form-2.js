'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const PersonalDetailsForm2 = ({ setActiveLink, setActiveProfessionalLink, setIsEditingPersonalDetails = () => {} }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    username: '',
    currentCity: '',
    aboutYourself: '',
    day: '',
    month: '',
    year: '',
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
 
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#FAFAFA] rounded-lg p-8 w-[1083px] border-1 border-[#DEDEDE] shadow-md" style={{ borderRadius: '16px' }}>
      <div className='mb-8'>
    <h2 className="text-[16px] font-semibold mb-1 text-[#3A98BB]">Personal Details</h2>
    <p className="text-gray-600 text-[12px] mt-1">Fill in the following information carefully.</p>
</div>
    <div>
        {/* Group: Full Name, Email Address, Phone Number, Language */}
        <div className="flex gap-10 mb-8">
          <div className="flex flex-col space-y-4 w-full">
            {/* Full Name */}
            <div style={{ marginBottom: '32px' }}>
              <label htmlFor="fullName" className="block text-[12px] font-medium mb-1 text-[#444444]">Full Name</label>
              <input
  type="text"
  id="fullName"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  className="border border-gray-300 rounded-md pl-3 pr-[25px] pt-3 pb-3 w-full text-[12px] focus:border-[#3A98BB] focus:border-2 focus:outline-none bg-transparent"
  placeholder="Enter your Full Name"
  onFocus={() => setActiveLink('Full Name')}
/>

            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '32px' }}>
              <label htmlFor="email" className="block text-[12px] font-medium mb-1 text-[#444444]">Email Address</label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded-md pl-3 pr-[25px] pt-3 pb-3 w-full text-[12px]"
                placeholder="czysdgv@gmail.com"
                disabled
                onFocus={() => setActiveLink('Email Address')}
              />
            </div>

            {/* Phone Number */}
            <div style={{ marginBottom: '32px' }}>
              <label className="block text-[12px] font-medium mb-1 text-[#444444]">Phone Number</label>
              <div className="flex">
                <select className="border border-gray-300 rounded-l-md p-2 w-20 mr-2 text-[#878787] text-[12px] bg-transparent">
                  <option value="234">+234</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-r-md pl-3 pr-[16px] pt-3 pb-3 w-2/3 text-[12px] bg-transparent"
                  placeholder="Enter your phone number"
                  onFocus={() => setActiveLink('Phone Number')}
                />
              </div>
            </div>

            {/* Language */}
            <div style={{ marginBottom: '32px' }}>
              <label htmlFor="language" className="block text-[12px] font-medium mb-1 text-[#444444]">Language</label>
              <select
                id="language"
                className="border border-gray-300 rounded-md p-[10px] w-full text-[#878787] text-[12px] bg-transparent"
                onFocus={() => setActiveLink('Language')}
              >
                <option value="en">English</option>
                <option value="ha">Hausa</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col space-y-4 w-full">
            {/* Username */}
            <div style={{ marginBottom: '32px' }}>
              <label className="block text-[12px] font-medium mb-1 text-[#444444]">Company/brand Name (Optional)</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-3 pr-[16px] pt-3 pb-3 w-full text-[#878787] text-[12px] bg-transparent"
                placeholder="Enter Company Name"
              />
            </div>

            {/* Nationality */}
            <div style={{ marginBottom: '32px' }}>
              <label className="block text-[12px] font-medium mb-1 text-[#444444]">Nationality</label>
              <select
                className="border border-gray-300 rounded-md pl-3 pr-[16px] pt-3 pb-3 w-full text-[#878787] text-[12px] bg-transparent"
                onFocus={() => setActiveLink('Nationality')}
              >
                <option value="NG">Nigeria</option>
              </select>
            </div>

            {/* City */}
            <div style={{ marginBottom: '32px' }}>
              <label className="block text-[12px] font-medium mb-1 text-[#444444]">Current City</label>
              <input
                type="text"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-[10px] pr-[10px] pt-3 pb-3 w-full text-[#878787] text-[12px] bg-transparent"
                placeholder="Enter your city"
                onFocus={() => setActiveLink('Current City')}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-[12px] font-medium mb-1 text-[#444444]">Date of Birth</label>
              <div className="flex space-x-2">
                {/* Day Select */}
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md pl-[10px] pr-[8px] pt-[10px] pb-[10px] text-[#878787] text-[12px] bg-transparent"
                  onFocus={() => setActiveLink('Day')}
                >
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                {/* Month Select */}
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md pl-[10px] pr-[8px] pt-[10px] pb-[10px] text-[#878787] text-[12px] bg-transparent"
                  onFocus={() => setActiveLink('Month')}
                >
                  <option value="">Month</option>
                  {[
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                  ].map((month, i) => (
                    <option key={i + 1} value={i + 1}>
                      {month}
                    </option>
                  ))}
                </select>

                {/* Year Select */}
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md pl-[10px] pr-[8px] pt-[10px] pb-[10px] text-[#878787] text-[12px] bg-transparent"
                  onFocus={() => setActiveLink('Year')}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* About Yourself */}
        <div className="flex flex-col w-full mb-4" style={{marginBottom:"32px"}}>
          <label className="block text-sm font-medium mb-1 text-[#444444] text-[12px]">Describe Yourself</label>
          <textarea
    name="aboutYourself"
    value={formData.aboutYourself}
    onChange={handleChange}
    className="border border-gray-300 rounded-md text-[#878787] text-[12px] bg-transparent"
    style={{
        width: '1023px',
        height: '196px',
        padding: '8px 12px 12px 25px',
    }}
    rows="4"
    placeholder="Write about your design style"
    onFocus={() => setActiveLink('About Yourself')}
/>

        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <Link href={"/skills"} >
    <button
        className={`bg-[#E8E8E8] text-[#BFBFBF] rounded-full`}
        style={{
            width: '169px',
            height: '52px',
            padding: '16px 24px'
        }}
    >
        Continue
    </button>
    </Link>
</div>

        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm2;
