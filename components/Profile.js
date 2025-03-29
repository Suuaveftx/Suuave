'use client';
import Image from 'next/image';
import { useState } from 'react';


const Profile = () => {
  const [activeLink, setActiveLink] = useState('Full Name');
  const [activeProfessionalLink, setActiveProfessionalLink] = useState('Skills');
  const [activeAwardsLink, setActiveAwardsLink] = useState('Names');
  const [isPersonalDropdownOpen, setIsPersonalDropdownOpen] = useState(false);
  const [isProfessionalDropdownOpen, setIsProfessionalDropdownOpen] = useState(false);
  const [isAwardsDropdownOpen, setIsAwardsDropdownOpen] = useState(false);
  const [activeFormStep, setActiveFormStep] = useState(1); // Track current form step
  const [isEditingPersonalDetails, setIsEditingPersonalDetails] = useState(true); // Track editing state

  const togglePersonalDropdown = () => {
    setIsPersonalDropdownOpen(!isPersonalDropdownOpen);
    setActiveFormStep(1); // Reset to personal details
  };

  const toggleProfessionalDropdown = () => {
    setIsProfessionalDropdownOpen(!isProfessionalDropdownOpen);
    setActiveFormStep(2); // Show professional information (skills)
  };

  const toggleAwardsDropdown = () => {
    setIsAwardsDropdownOpen(!isAwardsDropdownOpen);
    setActiveFormStep(3); // Show awards/certifications
  };

  const handleContinueFromSkills = () => {
    setActiveFormStep(3); // Move to Awards form
  };

  return (
    <div className="p-6 bg-[#F9F9F9] rounded-lg max-w-max mx-auto space-y-6">
      <div className="flex space-x-8 items-start">
        <div className="flex flex-col w-64">
          <Image
            src="/dev-images/profile.png"
            alt="Profile Picture"
            width={150}
            height={150}
            className="mb-4"
          />
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-[16px] font-semibold">Chinedu Ozulu</h2>
            <span className="text-gray-600 text-[12px]">@ocean</span>
          </div>

          {/* Personal Details Dropdown */}
          <div className="relative mb-4">
            <h4
              onClick={togglePersonalDropdown}
              className="ml-4 cursor-pointer text-[16px] font-medium text-gray-800 flex items-center"
              tabIndex={0}
              role="button"
              aria-expanded={isPersonalDropdownOpen}
            >
              Personal Details
            </h4>
            {isPersonalDropdownOpen && (
              <nav className="flex flex-col space-y-2 mt-2 w-full text-[12px]">
                {['Full Name', 'Email Address', 'Phone Number', 'Nationality', 'Current City', 'Date of Birth', 'About Yourself'].map((link) => (
                  <div key={link} onClick={() => setActiveLink(link)} className={`flex items-center cursor-pointer py-2 transition duration-200 ease-in-out pl-6 relative ${activeLink === link ? 'text-[#3A98BB]' : 'text-gray-800'}`}>
                    <div className={`absolute left-0 h-full w-0.5 ${activeLink === link ? 'bg-[#3A98BB]' : 'bg-gray-300'}`} />
                    <span>{link}</span>
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Professional Information Dropdown */}
          <div className="relative mb-4">
            <h4
              onClick={toggleProfessionalDropdown}
              className="ml-4 cursor-pointer text-[16px] font-medium text-gray-800 flex items-center"
              tabIndex={0}
              role="button"
              aria-expanded={isProfessionalDropdownOpen}
            >
              Professional Information
            </h4>
            {isProfessionalDropdownOpen && (
              <nav className="flex flex-col space-y-2 mt-2 w-full text-[12px]">
                {['Skills', 'Website (Optional)', 'Portfolio', 'Availability'].map((link) => (
                  <div key={link} onClick={() => setActiveProfessionalLink(link)} className={`flex items-center cursor-pointer py-2 transition duration-200 ease-in-out pl-6 relative ${activeProfessionalLink === link ? 'text-[#3A98BB]' : 'text-gray-800'}`}>
                    <div className={`absolute left-0 h-full w-0.5 ${activeProfessionalLink === link ? 'bg-[#3A98BB]' : 'bg-gray-300'}`} />
                    <span>{link}</span>
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Awards/Certifications Dropdown */}
          <div className="relative">
            <h4
              onClick={toggleAwardsDropdown}
              className="ml-4 cursor-pointer text-[16px] font-medium text-gray-800 flex items-center"
              tabIndex={0}
              role="button"
              aria-expanded={isAwardsDropdownOpen}
            >
              Awards/Certifications
            </h4>
            {isAwardsDropdownOpen && (
              <nav className="flex flex-col space-y-2 mt-2 w-full text-[12px]">
                {['Names', 'Date Issued/Awarded', 'Issued/Awarded by', 'Upload Certificate/Award'].map((link) => (
                  <div key={link} onClick={() => setActiveAwardsLink(link)} className={`flex items-center cursor-pointer py-2 transition duration-200 ease-in-out pl-6 relative ${activeAwardsLink === link ? 'text-[#3A98BB]' : 'text-gray-800'}`}>
                    <div className={`absolute left-0 h-full w-0.5 ${activeAwardsLink === link ? 'bg-[#3A98BB]' : 'bg-gray-300'}`} />
                    <span>{link}</span>
                  </div>
                ))}
              </nav>
            )}
          </div>
        </div>

  

      </div>
    </div>
  );
};

export default Profile;
