'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Form, Input, Select, SelectItem,} from "@heroui/react";
import {Textarea} from "@heroui/react";
import CustomButton from '../../../components/CustomButton';

const PersonalDetailsForm = ({ setActiveLink, setActiveProfessionalLink, setIsEditingPersonalDetails = () => {} }) => {
 
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setSubmitted(data);
  };
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
    <Form onSubmit={onSubmit} validationBehavior="native" className="w-full">
          <div className="flex gap-12 mt-4">
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="First Name"
        labelPlacement="outside"
        name="firstname"
        placeholder="First Name"
        type="name"
        className="w-96 border-1 border-[#D1D1D1] rounded-[8px]"
      />
       <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="@ocean"
        type="name"
        className="w-96 border-1 border-[#D1D1D1] rounded-[8px]"
      />
    </div>
    <div className="mt-4 w-full flex gap-12">
    <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Email Address"
        labelPlacement="outside"
        name="email"
        placeholder="ocean"
        type="email"
        className="w-96 border-1 border-[#D1D1D1] rounded-[8px]"
      />
      <Select
          isRequired
          label="Nationality"
          labelPlacement="outside"
          name="country"
          placeholder="Select country"
          className='w-96'
        >
          <SelectItem key="ar" value="ar">
            Argentina
          </SelectItem>
          <SelectItem key="us" value="us">
            United States
          </SelectItem>
          <SelectItem key="ca" value="ca">
            Canada
          </SelectItem>
          <SelectItem key="uk" value="uk">
            United Kingdom
          </SelectItem>
          <SelectItem key="au" value="au">
            Australia
          </SelectItem>
        </Select>
      </div>
      <div className="mt-4 w-full flex gap-12">
      <div className="flex gap-4 items-center">
  <Select
    isRequired
    label="Phone Number"
    labelPlacement="outside"
    name="country"
    placeholder="+234"
    className="w-24 whitespace-nowrap border-1 border-[#D1D1D1] rounded-[8px]"
  >
    <SelectItem key="ar" value="ar">Argentina</SelectItem>
    <SelectItem key="us" value="us">United States</SelectItem>
    <SelectItem key="ca" value="ca">Canada</SelectItem>
    <SelectItem key="uk" value="uk">United Kingdom</SelectItem>
    <SelectItem key="au" value="au">Australia</SelectItem>
  </Select>
  
  <Input
    isRequired
    errorMessage="Please enter a valid phone number"
    name="phoneNumber"
    placeholder="Enter your phone number"
    type="number"
    className="w-72  border-1 border-[#D1D1D1] rounded-[8px] mt-6"
  />
</div>



      <Select
          isRequired
          label="Current City"
          labelPlacement="outside"
          name="country"
          placeholder="Select country"
          className='w-96'
        >
          <SelectItem key="ar" value="ar">
            Argentina
          </SelectItem>
          <SelectItem key="us" value="us">
            United States
          </SelectItem>
          <SelectItem key="ca" value="ca">
            Canada
          </SelectItem>
          <SelectItem key="uk" value="uk">
            United Kingdom
          </SelectItem>
          <SelectItem key="au" value="au">
            Australia
          </SelectItem>
        </Select>
      </div>
      <div className='mt-4 flex gap-12'>
      <Select
          isRequired
          label="Language"
          labelPlacement="outside"
          name="country"
          placeholder="English"
          className='w-96'
        >
          <SelectItem key="ar" value="ar">
            Argentina
          </SelectItem>
          <SelectItem key="us" value="us">
            United States
          </SelectItem>
          <SelectItem key="ca" value="ca">
            Canada
          </SelectItem>
          <SelectItem key="uk" value="uk">
            United Kingdom
          </SelectItem>
          <SelectItem key="au" value="au">
            Australia
          </SelectItem>
        </Select>
        <div className="flex gap-4 items-center ml-4">
  <Select
    isRequired
    label="Date of Birth"
    labelPlacement="outside"
    name="country"
    placeholder="Day"
    className="w-32 whitespace-nowrap border-1 border-[#D1D1D1] rounded-[8px]"
  >
    <SelectItem key="ar" value="ar">Argentina</SelectItem>
    <SelectItem key="us" value="us">United States</SelectItem>
    <SelectItem key="ca" value="ca">Canada</SelectItem>
    <SelectItem key="uk" value="uk">United Kingdom</SelectItem>
    <SelectItem key="au" value="au">Australia</SelectItem>
  </Select>
  <Select
    isRequired
    name="country"
    placeholder="Month"
    className="w-24 whitespace-nowrap border-1 border-[#D1D1D1] rounded-[8px] mt-6"
  >
    <SelectItem key="ar" value="ar">Argentina</SelectItem>
    <SelectItem key="us" value="us">United States</SelectItem>
    <SelectItem key="ca" value="ca">Canada</SelectItem>
    <SelectItem key="uk" value="uk">United Kingdom</SelectItem>
    <SelectItem key="au" value="au">Australia</SelectItem>
  </Select>
  <Select
    isRequired
    
    name="country"
    placeholder="Year"
    className="w-32 whitespace-nowrap border-1 border-[#D1D1D1] rounded-[8px] mt-6"
  >
    <SelectItem key="ar" value="ar">Argentina</SelectItem>
    <SelectItem key="us" value="us">United States</SelectItem>
    <SelectItem key="ca" value="ca">Canada</SelectItem>
    <SelectItem key="uk" value="uk">United Kingdom</SelectItem>
    <SelectItem key="au" value="au">Australia</SelectItem>
  </Select>
</div>
      </div>
      <div className='w-full h-full text-left mt-4'>
      <Textarea
  isRequired
  className="w-full min-h-[150px]" // Adjust the min height
  label="Describe yourself"
  labelPlacement="outside"
  placeholder="Write about your design style"
/>

</div>
  <div className='flex w-full justify-end items-end'>
    <CustomButton text='continue' className="w-32" href='/skills' />
  </div>
    </Form>
       


   

        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
