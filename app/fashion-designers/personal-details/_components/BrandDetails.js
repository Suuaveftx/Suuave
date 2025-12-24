'use client';
'use client';
import React from 'react';
import { Select, SelectItem } from '@heroui/react';
import CustomSelect from './CustomSelect';
import Link from 'next/link';

const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  key: String(i + 1),
  label: String(i + 1),
}));

const monthOptions = [
  { key: '1', label: 'January' },
  { key: '2', label: 'February' },
  { key: '3', label: 'March' },
  { key: '4', label: 'April' },
  { key: '5', label: 'May' },
  { key: '6', label: 'June' },
  { key: '7', label: 'July' },
  { key: '8', label: 'August' },
  { key: '9', label: 'September' },
  { key: '10', label: 'October' },
  { key: '11', label: 'November' },
  { key: '12', label: 'December' },
];

const yearOptions = Array.from({ length: 80 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { key: String(year), label: String(year) };
});

const numberCode = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'elephant', label: 'Elephant' },
];

const nationality = [
  { key: 'Nigeria', label: 'Nigeria' },
  { key: 'Ghana', label: 'Ghana' },
  { key: 'Togo', label: 'Togo' },
];
const numCode = [
  { key: '+124', label: '+124' },
  { key: '+09', label: '+09' },
  { key: '+99', label: '+99' },
];

const language = [
  { key: 'English', label: 'English' },
  { key: 'Spanish', label: 'Spanish' },
];

const BrandDetails = ({ setSelected, formData, setFormData }) => {
  return (
    <div className='w-full h-full bg-[#FAFAFA] border-1-[#DEDEDE] p-3 md:p-6 rounded-2xl'>
      <h1 className='text-[#3A98BB] font-bold text-xl'>Personal Details</h1>
      <p className='text-[#767676] font-normal text-base mt-2'>
        Fill in the following information carefully
      </p>
      <section className='grid md:grid-cols-2 mt-7 gap-10'>
        {/* Enter Full Name */}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='fullName' text='Full Name' />
          <Input
            id='fullName'
            placeholder='Enter Full Name'
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        {/* Username */}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='username' text='Username' />
          <Input
            id='username'
            placeholder='@ocean'
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        {/* Email Address */}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='emailAddress' text='Email Address' />
          <Input
            id='emailAddress'
            placeholder='@czysdgv@gmail.com'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        {/*Nationality */}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='nationality' text='Nationality' />

          <CustomSelect
            formData={formData}
            setFormData={setFormData}
            value={formData.nationality}
            data={nationality}
            className='w-full'
            htmlFor='nationality'
          />
        </div>
        {/*Phone Number */}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='phoneCode' text='Phone Number' />

          <div className='flex items-center gap-3'>
            <CustomSelect
              formData={formData}
              setFormData={setFormData}
              value={formData.phoneCode}
              data={numCode}
              className='w-[30%]'
              htmlFor='number'
            />

            <Input
              id='number'
              placeholder='814256763'
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
        </div>
        {/*Current City*/}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='currentCity' text='Current City' />
          <Input
            id='currentCity'
            placeholder='New york city'
            value={formData.currentCity}
            onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
          />
        </div>
        {/*Language */}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='Language' text='Language' />

          <CustomSelect
            formData={formData}
            setFormData={setFormData}
            value={formData.language}
            data={language}
            className='w-full'
            htmlFor='language'
          />
        </div>
        {/*Date of Birth*/}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='dateofBirth' text='Date of Birth' />

          <div className='flex items-center gap-7'>
            {/* day */}

            <CustomSelect
              formData={formData}
              setFormData={setFormData}
              value={formData.day}
              data={dayOptions}
              className='w-full'
              htmlFor='day'
            />
            {/* month */}

            <CustomSelect
              formData={formData}
              setFormData={setFormData}
              value={formData.month}
              data={monthOptions}
              className='w-full'
              htmlFor='month'
            />
            {/* year */}

            <CustomSelect
              formData={formData}
              setFormData={setFormData}
              value={formData.year}
              data={yearOptions}
              className='w-full'
              htmlFor='year'
            />
          </div>
        </div>
      </section>
      {/* textarea */}
      <section className='w-full flex flex-col gap-2 mt-10'>
        <Lable htmlFor='about' text='Describe yourself' />
        <textarea
          name='about'
          id='about'
          cols='30'
          rows='10'
          placeholder='Tell us about yourself, your relevant skills and professional experience.'
          className='w-full  border border-[#D1D1D1] text-[#878787] font-normal text-base py-2 px-2 rounded-lg outline-[#3A98BB] bg-transparent h-32 resize-none'
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
        />
      </section>
      <div className='w-full flex justify-end mt-10'>
        <Link
          href='/auth/login'
          className='text-[#035A7A] rounded-3xl cursor-pointer px-6 py-2 mt-4 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]'
        >
          Submit
        </Link>
      </div>
    </div>
  );
};

export default BrandDetails;

const Input = ({ placeholder, id, value, onChange }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      id={id}
      placeholder={placeholder}
      className='w-full border border-[#D1D1D1] text-[#878787] font-normal text-base py-2 px-2 rounded-lg outline-[#3A98BB] bg-transparent '
    />
  );
};

const Lable = ({ text, htmlFor }) => {
  return <label htmlFor={htmlFor}>{text}</label>;
};
