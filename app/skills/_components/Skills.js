'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import {Form, Input, Select, SelectItem,} from "@heroui/react";
import {Switch} from "@heroui/react";
import CustomButton from '../../../components/CustomButton';

const Skills = ({ setActiveProfessionalLink }) => {
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
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setSubmitted(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#FAFAFA] p-8 w-[1083px]  border-1 border-[#DEDEDE] rounded-lg">
        <h2 className="text-[16px] font-semibold mb-2 text-[#3A98BB]">Professional Details</h2>
        <p className="text-[#727272] mb-8 text-[12px]">Add any related information</p>

        {/* Skill input field */}
        <Form className="w-full" validationBehavior="native" onSubmit={onSubmit}>
          <div className='w-full'>
      <Input
        isRequired
        errorMessage="Please enter a valid skills"
        label="Skills"
        labelPlacement="outside"
        name="name"
        placeholder="Eg illustrator"
        type="name"
        className='w-full  rounded-[8px]'
      />
      </div>
      <div className='w-full mt-4'>
      <Input
        errorMessage="Please enter a valid company name"
        label="Company/brand Name(Optional)"
        labelPlacement="outside"
        name="name"
        placeholder="Enter company name"
        type="name"
        className='w-full  rounded-[8px]'
      />
      </div>
      <div className='w-full mt-4'>
      <Input
      isRequired
        errorMessage="Please enter a valid company name"
        label="Link to your portfolio"
        labelPlacement="outside"
        name="name"
        placeholder="Enter portfolio link"
        type="name"
        className='w-full  rounded-[8px]'
      />
      </div>
      <div className="mt-4 w-full">
          <label className="block text-[12px] font-medium mb-1 text-[#444444]">Portfolio</label>
          <div className="border border-gray-300 rounded-md p-4 h-40 flex items-center justify-center cursor-pointer w-full">
            <Input
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
        <div className="mt-4 flex items-center gap-4">
  <Select
    isRequired
    label="Availability"
    labelPlacement="outside"
    name="availability"
    placeholder="Monday"
    className="w-96"
  >
    <SelectItem key="tue" value="ar">Tuesday</SelectItem>
    <SelectItem key="wed" value="us">Wednessday</SelectItem>
    <SelectItem key="th" value="ca">Thursday</SelectItem>
    <SelectItem key="fr" value="uk">Friday</SelectItem>
    <SelectItem key="sa" value="au">Saturday</SelectItem>
    <SelectItem key="su" value="au">Sunday</SelectItem>
  </Select>
  <div className='mt-8'>
  <Switch defaultSelected color="success"></Switch>
  </div>
</div>


    </Form>

       


        {/* Continue Button */}
        <div className="flex items-center gap-8 justify-end text-[12px]">
          <span className='text-[#2C7A9C] font-bold'>Skip</span>
         <CustomButton text='continue' className="w-32" href='/awards' />
        </div>
      </div>
    </div>
  );
};

export default Skills;
