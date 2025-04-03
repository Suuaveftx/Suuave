'use client';
import React, { useState } from 'react';

const SkillsForm = ({ setActiveProfessionalLink }) => {
  const [skill, setSkill] = useState('');
  const [company, setCompany] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [availabilityDay, setAvailabilityDay] = useState('Monday'); // Default to Monday
  const [isAvailable, setIsAvailable] = useState(true); // Toggle state for availability
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [uploadedFile, setUploadedFile] = useState(null); // State to track uploaded file
  const [loading, setLoading] = useState(false); // Loading state for the button

  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };

  const handleSkillSubmit = () => {
    // Validate skill and portfolio URL before submitting
    if (!skill) {
      alert('Please enter a skill.');
      return;
    }
    if (portfolioLink && !isValidUrl(portfolioLink)) {
      alert('Please enter a valid URL for the portfolio.');
      return;
    }

    // Handle skill submission logic here
    console.log('Skill submitted:', skill);
    console.log('Company/Brand:', company);
    console.log('Portfolio Link:', portfolioLink);
    console.log('Uploaded File:', uploadedFile);
    console.log('Availability Day:', availabilityDay);
    console.log('Is Available:', isAvailable);

    // Optionally set the active professional link
    // setActiveProfessionalLink('New Link Based on Submission');
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectDay = (day) => {
    setAvailabilityDay(day);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    console.log('Uploaded file:', file);
  };

  const handleContinue = () => {
    setLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setLoading(false);
      // Call handleSkillSubmit to submit the form
      handleSkillSubmit();
    }, 2000); // Simulated loading time
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#FAFAFA] p-8 w-[1083px]  border-1 border-[#DEDEDE] rounded-lg">
        <h2 className="text-[16px] font-semibold mb-2 text-[#3A98BB]">Professional Details</h2>
        <p className="text-[#727272] mb-8 text-[12px]">Add any related information</p>

        {/* Skill input field */}
        <div className="mb-2">
          <label className="block text-[12px] font-medium mb-1 text-[#444444]">Skill</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md pl-[12px] pr-[25px] pt-[12px] pb-[12px] w-full text-[12px] focus:border-[#3A98BB] focus:border-2 focus:outline-none bg-transparent mb-[42px]"
            placeholder="Eg illustrator"
            value={skill}
            onChange={handleSkillChange}
          />
        </div>

        {/* Company/Brand Name */}
        <div className="mb-6">
          <label className="block text-[12px] font-medium mb-1 text-[#444444]">Company/Brand Name (Optional)</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-gray-300 rounded-md pl-[8px] pr-[16px] pt-[12px] pb-[12px] w-full focus:border-[#3A98BB] focus:border-2 focus:outline-none bg-transparent text-[12px] mb-[42px]"
            placeholder="Enter Company Name"
          />
        </div>

        {/* Portfolio Link */}
        <div className="mb-6">
          <label className="block text-[12px] font-medium mb-1 text-[#444444]">Link to Your Portfolio</label>
          <input
            type="url"
            value={portfolioLink}
            onChange={(e) => setPortfolioLink(e.target.value)}
            className="border border-gray-300 rounded-md pl-[12px] pr-[25px] pt-[12px] pb-[12px] w-full text-[12px] focus:border-[#3A98BB] focus:border-2 focus:outline-none bg-transparent  mb-[42px]"
            placeholder="Enter portfolio link"
          />
        </div>

        {/* Portfolio Upload */}
        <div className="mb-[42px]">
          <label className="block text-[12px] font-medium mb-1 text-[#444444]">Portfolio</label>
          <div className="border border-gray-300 rounded-md p-4 h-40 flex items-center justify-center cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="portfolioUpload"
              onChange={handleFileChange}
            />
            <label htmlFor="portfolioUpload" className="flex items-center">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.672 7.21159L9.08602 13.7976C8.895 13.9821 8.74264 14.2028 8.63782 14.4468C8.533 14.6908 8.47783 14.9532 8.47552 15.2188C8.47321 15.4843 8.52381 15.7477 8.62438 15.9935C8.72494 16.2393 8.87344 16.4626 9.06123 16.6504C9.24902 16.8382 9.47232 16.9867 9.71811 17.0872C9.9639 17.1878 10.2273 17.2384 10.4928 17.2361C10.7584 17.2338 11.0208 17.1786 11.2648 17.0738C11.5088 16.969 11.7295 16.8166 11.914 16.6256L18.328 10.0396C19.0567 9.28518 19.4598 8.27477 19.4507 7.22598C19.4416 6.1772 19.0209 5.17395 18.2793 4.43232C17.5377 3.69068 16.5344 3.27001 15.4856 3.26089C14.4368 3.25178 13.4264 3.65496 12.672 4.38359L6.25702 10.9686C5.13171 12.0939 4.49951 13.6202 4.49951 15.2116C4.49951 16.803 5.13171 18.3293 6.25702 19.4546C7.38233 20.5799 8.90859 21.2121 10.5 21.2121C12.0915 21.2121 13.6177 20.5799 14.743 19.4546L21 13.2116" stroke="#3A98BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className='text-[#878787] text-[12px]'>Upload samples of your designs</span>
            </label>
          </div>
          {uploadedFile && (
            <p className="text-sm text-gray-600 mt-2">Uploaded: {uploadedFile.name}</p>
          )}
        </div>

        {/* Availability Section */}
        <div className="mb-6">
          <label className="block text-[12px] font-medium mb-1 text-[#444444]">Availability</label>
          <div className="flex items-center mb-2">
            <div className="relative flex items-center">
              <button
                className="p-2 flex items-center text-[12px]"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
              >
                <span>{availabilityDay}</span>
              </button>
              {isDropdownOpen && (
                <ul className="absolute z-10 bg-white shadow-md mt-1 w-full rounded-md max-h-40 overflow-y-auto">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <li
                      key={day}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2 transition-colors duration-200"
                      onClick={() => selectDay(day)}
                    >
                      {day}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Availability Toggle */}
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isAvailable}
                onChange={() => setIsAvailable(!isAvailable)}
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${isAvailable ? 'transform translate-x-5' : ''}`}
                  style={{ background: isAvailable ? 'white' : 'transparent' }}
                ></span>
              </div>
              <span className="ml-2 text-xs">
                <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="6" fill={isAvailable ? 'green' : 'gray'} />
                </svg>
              </span>
            </label>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex items-center gap-8 justify-end text-[12px]">
          <span className='text-[#2C7A9C] font-bold'>Skip</span>
          <button
            className={`bg-[#E8E8E8] text-[#BFBFBF] pl-[24px] pr-[24px] pt-[16px] pb-[16px] px-4 rounded-full w-32  transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
