'use client';
import React from 'react';
import { DatePicker, Input as HeroInput, Textarea, Button } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import CustomSelect from './CustomSelect';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import { countries as nationalityList, dialCodes as numCodeList } from '../../../../utils/countryData';

const brandCategoryOptions = [
  { key: 'Independent Brand / Designer', label: 'Independent Brand / Designer', description: 'Best for solo creators and boutique labels' },
  { key: 'Corporate Brand / Retailer', label: 'Corporate Brand / Retailer', description: 'Best for multi-stockist or mass-market companies' },
  { key: 'Creative / Sourcing Agency', label: 'Creative / Sourcing Agency', description: 'Best for representatives managing projects for multiple clients' },
];

const languageOptions = [
  { key: "English", label: "English" },
  { key: "French", label: "French" },
  { key: "Spanish", label: "Spanish" },
  { key: "Portuguese", label: "Portuguese" },
  { key: "Arabic", label: "Arabic" },
];

const BrandDetails = ({ step, setStep, setHoveredField, submitHref = '/fashion-designers' }) => {
  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleContinue = async () => {
    const isValid = await trigger(["fullName", "businessName", "username", "brandCategory", "email", "role"]);
    if (isValid) setStep(2);
  };

  const handleSubmitClick = async (e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <div className='w-full h-full bg-[#FAFAFA] border-1-[#DEDEDE] p-3 md:p-6 rounded-2xl'>
      {step > 1 && (
        <button
          className='flex items-center text-[#3A98BB] mb-4 hover:opacity-80 transition-opacity'
          onClick={() => setStep(step - 1)}
        >
          <ChevronLeft size={24} />
          <span className='ml-1 font-medium'>Back</span>
        </button>
      )}
      <h1 className='text-[#3A98BB] font-bold text-2xl md:text-[32px]'>
        {step === 1 ? 'Brand Fundamentals' : 'Personal Details'}
      </h1>
      <p className='text-[#767676] font-normal text-base mt-2'>
        {step === 1 ? 'Establish your business presence and operational category' : "Let's get to know you more."}
      </p>

      {step === 1 && (
        <>
          <section className='grid md:grid-cols-2 mt-7 gap-10'>
            {/* Enter Full Name */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Full Name')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='fullName' text='Full Name' required />
              <HeroInput
                id='fullName'
                placeholder='Enter Full Name'
                variant="bordered"
                classNames={{ inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', input: 'text-[#878787]' }}
                {...register("fullName")}
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.message}
              />
            </div>
            {/* Business Name */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Business Name')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='businessName' text='Business Name' required />
              <HeroInput
                id='businessName'
                placeholder='Suuave Fashion Ltd.'
                variant="bordered"
                classNames={{ inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', input: 'text-[#878787]' }}
                {...register("businessName")}
                isInvalid={!!errors.businessName}
                errorMessage={errors.businessName?.message}
              />
            </div>
            {/* Username */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Username')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='username' text='Username' required />
              <HeroInput
                id='username'
                placeholder='@ocean'
                variant="bordered"
                classNames={{ inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', input: 'text-[#878787]' }}
                {...register("username")}
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
              />
            </div>
            {/* Brand Category*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Brand Category')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='brandCategory' text='Brand Category' required />
              <Controller
                name="brandCategory"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    data={brandCategoryOptions}
                    className='w-full'
                    htmlFor='brandCategory'
                  />
                )}
              />
              {errors.brandCategory && <p className="text-red-500 text-xs">{errors.brandCategory.message}</p>}
            </div>
            {/* Email Address */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Email Address')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='emailAddress' text='Email Address' required />
              <HeroInput
                id='emailAddress'
                placeholder='@czysdgv@gmail.com'
                variant="bordered"
                classNames={{ inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', input: 'text-[#878787]' }}
                {...register("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
            </div>
            {/* Position */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Position')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='role' text='Position' required />
              <HeroInput
                id='role'
                placeholder='Creative Director'
                variant="bordered"
                classNames={{ inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', input: 'text-[#878787]' }}
                {...register("role")}
                isInvalid={!!errors.role}
                errorMessage={errors.role?.message}
              />
            </div>
          </section>

          <div className='w-full flex justify-center md:justify-end mt-10'>
            <button
              onClick={handleContinue}
              className='text-[#035A7A] rounded-3xl cursor-pointer px-6 py-2 mt-4 text-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] w-full md:w-auto font-proximanova'
            >
              Continue
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <section className='grid md:grid-cols-2 mt-7 gap-10'>
            {/*Nationality */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Nationality')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='nationality' text='Nationality' />
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    data={nationalityList}
                    className='max-w-[280px]'
                    htmlFor='nationality'
                  />
                )}
              />
              {errors.nationality && <p className="text-red-500 text-xs">{errors.nationality.message}</p>}
            </div>
            {/*Phone Number */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Phone Number')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='phoneCode' text='Phone Number' />
              <div className='flex items-center gap-3'>
                <Controller
                  name="phoneCode"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      value={field.value}
                      onChange={field.onChange}
                      data={numCodeList}
                      className='w-[130px] shrink-0'
                      htmlFor='phoneCode'
                    />
                  )}
                />
                <HeroInput
                  id='number'
                  className='flex-1'
                  placeholder='814256763'
                  variant="bordered"
                  classNames={{ inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', input: 'text-[#878787]' }}
                  {...register("phoneNumber")}
                  isInvalid={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber?.message}
                />
              </div>
            </div>
            {/*Current City*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Current City')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='currentCity' text='Current City' />
              <HeroInput
                id='currentCity'
                placeholder='Lagos'
                variant="bordered"
                classNames={{ inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', input: 'text-[#878787]' }}
                {...register("currentCity")}
                isInvalid={!!errors.currentCity}
                errorMessage={errors.currentCity?.message}
              />
            </div>
            {/*Language */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Language')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='language' text='Language' />
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    data={languageOptions}
                    className='max-w-[280px]'
                    htmlFor='language'
                  />
                )}
              />
              {errors.language && <p className="text-red-500 text-xs">{errors.language.message}</p>}
            </div>
            {/*Date of Birth*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Date of Birth')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor='dateofBirth' text='Date Of Birth' />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id='dateofBirth'
                    aria-label='Date of Birth'
                    value={
                      field.value
                        ? (() => { try { return parseDate(field.value); } catch { return null; } })()
                        : null
                    }
                    onChange={(date) =>
                      field.onChange(date ? date.toString() : '')
                    }
                    showMonthAndYearPickers
                    popoverProps={{ placement: 'top-start', shouldFlip: false }}
                    classNames={{
                      base: 'max-w-[280px]',
                      inputWrapper: [
                        'w-full border border-[#D1D1D1] rounded-lg bg-transparent px-2 py-1',
                        'hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
                        'shadow-none',
                      ],
                      input: 'text-[#222222] font-normal text-base',
                      segment: 'data-[placeholder=true]:text-transparent',
                      calendarContent: 'font-proximanova',
                    }}
                    calendarProps={{
                      classNames: {
                        base: 'shadow-lg rounded-xl border border-[#D1D1D1]',
                        headerWrapper: 'bg-white',
                        title: 'text-[#035A7A] font-semibold',
                        cellButton: [
                          'data-[selected=true]:bg-[#CCE7F2] data-[selected=true]:text-[#035A7A]',
                          'data-[today=true]:border data-[today=true]:border-[#3A98BB]',
                          'hover:bg-[#EAF9FF] rounded-lg',
                        ],
                      },
                    }}
                  />
                )}
              />
              {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
            </div>
          </section>

          {/* textarea */}
          <section
            className='w-full flex flex-col gap-2 mt-10'
            onMouseEnter={() => setHoveredField('About Yourself')}
            onMouseLeave={() => setHoveredField(null)}
          >
            <Lable htmlFor='about' text='Describe Yourself' />
            <Controller
              name="about"
              control={control}
              render={({ field }) => (
                <Textarea
                  id='about'
                  placeholder='Tell Us About Yourself, Your Relevant Skills and Professional Experience.'
                  variant="bordered"
                  classNames={{ inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', input: 'text-[#878787]' }}
                  minRows={4}
                  {...field}
                  isInvalid={!!errors.about}
                  errorMessage={errors.about?.message}
                />
              )}
            />
          </section>

          <div className='w-full flex flex-col md:flex-row justify-center md:justify-end mt-10 gap-4'>
            <Link
              href={submitHref}
              className='text-center cursor-pointer px-6 py-2 mt-4 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold'
            >
              Skip
            </Link>
            <Link
              href={submitHref}
              onClick={handleSubmitClick}
              className='text-[#035A7A] rounded-3xl cursor-pointer px-6 py-2 mt-4 text-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] w-full md:w-auto font-proximanova'
            >
              Submit
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BrandDetails;

const Lable = ({ text, htmlFor, required }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-[#222222]">
      {text}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
};
