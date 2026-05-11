'use client';
import React, { useState, useEffect } from 'react';
import { DatePicker, Input as HeroInput, Textarea, Skeleton } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import FormLabel from '@/components/ui/FormLabel';
import CustomSelect from '@/components/ui/CustomSelect';
import PhoneInputCustom from '@/components/ui/PhoneInputCustom';
import { CountrySelect } from "react-country-state-city";
import { useFormContext, Controller } from 'react-hook-form';
import LanguageSelectCustom from '@/components/ui/LanguageSelectCustom';
import { ChevronLeft } from 'lucide-react';

import { dialCodes as numCodeList } from '../../../../utils/countryData';

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
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [countryid, setCountryid] = React.useState(0);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [step]);

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
    <div className='w-full h-full bg-[#FAFAFA] border border-[#DEDEDE] p-3 md:p-6 rounded-2xl'>
      {step > 1 && (
        <button
          className='flex items-center text-[#848484] mb-4 hover:opacity-80 transition-opacity focus:outline-none'
          onClick={() => setStep(step - 1)}
        >
          <ChevronLeft size={24} />
          <span className='ml-1 font-medium'>Back</span>
        </button>
      )}
      <h1 className='text-[#222222] font-bold text-2xl md:text-[32px]'>
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
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='fullName' text='Full Name' required />
                <HeroInput
                  id='fullName'
                  placeholder='Enter Full Name'
                  variant="bordered"
                  classNames={{ 
                    inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                    input: 'text-black' 
                  }}
                  {...register("fullName")}
                  isInvalid={!!errors.fullName}
                  errorMessage={errors.fullName?.message}
                />
              </Skeleton>
            </div>
            {/* Business Name */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Business Name')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='businessName' text='Business Name' required />
                <HeroInput
                  id='businessName'
                  placeholder='Suuave Fashion Ltd.'
                  variant="bordered"
                  classNames={{ 
                    inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                    input: 'text-black' 
                  }}
                  {...register("businessName")}
                  isInvalid={!!errors.businessName}
                  errorMessage={errors.businessName?.message}
                />
              </Skeleton>
            </div>
            {/* Username */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Username')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='username' text='Username' required />
                <HeroInput
                  id='username'
                  placeholder='@ocean'
                  variant="bordered"
                  classNames={{ 
                    inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                    input: 'text-black' 
                  }}
                  {...register("username")}
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                />
              </Skeleton>
            </div>
            {/* Brand Category*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Brand Category')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='brandCategory' text='Brand Category' required />
                <Controller
                  name="brandCategory"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      id="brandCategory"
                      value={field.value}
                      onChange={field.onChange}
                      data={brandCategoryOptions}
                      isInvalid={!!errors.brandCategory}
                      errorMessage={errors.brandCategory?.message}
                    />
                  )}
                />
              </Skeleton>
            </div>
            {/* Email Address */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Email Address')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='emailAddress' text='Email Address' required />
                <HeroInput
                  id='emailAddress'
                  placeholder='czysdgv@gmail.com'
                  variant="bordered"
                  classNames={{ 
                    inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                    input: 'text-black' 
                  }}
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              </Skeleton>
            </div>
            {/* Position */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Position')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='role' text='Position' required />
                <HeroInput
                  id='role'
                  placeholder='Creative Director'
                  variant="bordered"
                  classNames={{ 
                    inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                    input: 'text-black' 
                  }}
                  {...register("role")}
                  isInvalid={!!errors.role}
                  errorMessage={errors.role?.message}
                />
              </Skeleton>
            </div>
          </section>

          <div className='w-full flex justify-center md:justify-end mt-10'>
            <Skeleton isLoaded={!isLoading} className="rounded-full">
              <button
                onClick={handleContinue}
                className='text-[#035A7A] rounded-3xl cursor-pointer px-6 py-2 mt-4 text-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] w-full md:w-auto font-semibold shadow-[0px_4px_12px_rgba(3,90,122,0.1)]'
              >
                Continue
              </button>
            </Skeleton>
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
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='nationality' text='Nationality' />
                <Controller
                  name="nationality"
                  control={control}
                  render={({ field }) => (
                    <div className="max-w-[280px] suuave-location-select">
                      <CountrySelect
                        onChange={(e) => {
                          setCountryid(e.id);
                          field.onChange(new Set([e.name]));
                        }}
                        placeHolder="Search Country"
                      />
                    </div>
                  )}
                />
              </Skeleton>
            </div>
            {/*Phone Number */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Phone Number')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='phoneNumber' text='Phone Number' />
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <PhoneInputCustom
                      id="phoneNumber"
                      value={field.value}
                      onChange={(val, data) => {
                        field.onChange(val);
                        // Maintain backward compatibility with phoneCode Set
                        if (data?.dialCode) {
                          setValue("phoneCode", new Set([`+${data.dialCode}`]));
                        }
                      }}
                      onBlur={field.onBlur}
                      error={errors.phoneNumber?.message || errors.phoneCode?.message}
                    />
                  )}
                />
              </Skeleton>
            </div>
            {/*Current City*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Current City')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='currentCity' text='Current City' />
                <Controller
                  name="currentCity"
                  control={control}
                  render={({ field }) => (
                    <HeroInput
                      id="currentCity"
                      placeholder="Enter City"
                      variant="bordered"
                      className="max-w-[280px]"
                      classNames={{ 
                        inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                        input: 'text-black' 
                      }}
                      {...field}
                      isInvalid={!!errors.currentCity}
                      errorMessage={errors.currentCity?.message}
                    />
                  )}
                />
              </Skeleton>
            </div>
            {/*Language */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Language')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='language' text='Language' />
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <LanguageSelectCustom
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.language?.message}
                    />
                  )}
                />
              </Skeleton>
            </div>
            {/*Date of Birth*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Date of Birth')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <FormLabel htmlFor='dob' text='Date Of Birth' />
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      id='dob'
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
                      popoverProps={{ placement: 'bottom-start', shouldFlip: false }}
                      classNames={{
                        base: 'max-w-[280px]',
                        inputWrapper: [
                          'w-full border border-[#D1D1D1] rounded-lg bg-transparent px-2 py-1',
                          'hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
                          'shadow-none',
                        ],
                        input: 'text-black font-normal text-base',
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
              </Skeleton>
              {errors.dob && <p className="text-danger text-xs">{errors.dob.message}</p>}
            </div>
          </section>

          {/* textarea */}
          <section
            className='w-full flex flex-col gap-2 mt-10'
            onMouseEnter={() => setHoveredField('About Yourself')}
            onMouseLeave={() => setHoveredField(null)}
          >
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <FormLabel htmlFor='about' text='Describe Yourself' />
              <Controller
                name="about"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id='about'
                    placeholder='Tell Us About Yourself, Your Relevant Skills and Professional Experience.'
                    variant="bordered"
                    classNames={{ 
                      inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                      input: 'text-black' 
                    }}
                    minRows={4}
                    {...field}
                    isInvalid={!!errors.about}
                    errorMessage={errors.about?.message}
                  />
                )}
              />
            </Skeleton>
          </section>

          <div className='w-full flex flex-col md:flex-row justify-between items-center mt-10 gap-4'>
            <Skeleton isLoaded={!isLoading} className="rounded-full">
              <button
                onClick={() => setStep(1)}
                className='flex items-center justify-center cursor-pointer px-6 py-2 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold hover:bg-[#EAF9FF] transition-colors'
              >
                Previous
              </button>
            </Skeleton>
            <div className='flex flex-col md:flex-row justify-center md:justify-end gap-4 w-full md:w-auto'>
              <Skeleton isLoaded={!isLoading} className="rounded-full">
                <a
                  href={submitHref}
                  className='flex items-center justify-center cursor-pointer px-6 py-2 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold hover:bg-[#EAF9FF] transition-colors'
                >
                  Skip
                </a>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} className="rounded-full">
                <a
                  href={submitHref}
                  onClick={handleSubmitClick}
                  className='text-[#035A7A] rounded-3xl cursor-pointer px-6 py-2 text-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] w-full md:w-auto font-semibold shadow-[0px_4px_12px_rgba(3,90,122,0.1)]'
                >
                  Submit
                </a>
              </Skeleton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BrandDetails;

