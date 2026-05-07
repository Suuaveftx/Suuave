'use client';
import React from 'react';
import { DatePicker, Input as HeroInput, Textarea } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import FormLabel from '@/components/ui/FormLabel';
import CustomSelect from '@/components/ui/CustomSelect';
import PhoneInputCustom from '@/components/ui/PhoneInputCustom';
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
    setValue,
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
    <div className='w-full h-full bg-[#FAFAFA] border border-[#DEDEDE] p-3 md:p-6 rounded-2xl'>
      {step > 1 && (
        <button
          className='flex items-center text-[#3A98BB] mb-4 hover:opacity-80 transition-opacity focus:outline-none'
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
              <FormLabel htmlFor='fullName' text='Full Name' required />
              <HeroInput
                id='fullName'
                placeholder='Enter Full Name'
                variant="bordered"
                classNames={{ 
                  inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                  input: 'text-[#878787]' 
                }}
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
              <FormLabel htmlFor='businessName' text='Business Name' required />
              <HeroInput
                id='businessName'
                placeholder='Suuave Fashion Ltd.'
                variant="bordered"
                classNames={{ 
                  inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                  input: 'text-[#878787]' 
                }}
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
              <FormLabel htmlFor='username' text='Username' required />
              <HeroInput
                id='username'
                placeholder='@ocean'
                variant="bordered"
                classNames={{ 
                  inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                  input: 'text-[#878787]' 
                }}
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
            </div>
            {/* Email Address */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Email Address')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <FormLabel htmlFor='emailAddress' text='Email Address' required />
              <HeroInput
                id='emailAddress'
                placeholder='czysdgv@gmail.com'
                variant="bordered"
                classNames={{ 
                  inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                  input: 'text-[#878787]' 
                }}
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
              <FormLabel htmlFor='role' text='Position' required />
              <HeroInput
                id='role'
                placeholder='Creative Director'
                variant="bordered"
                classNames={{ 
                  inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                  input: 'text-[#878787]' 
                }}
                {...register("role")}
                isInvalid={!!errors.role}
                errorMessage={errors.role?.message}
              />
            </div>
          </section>

          <div className='w-full flex justify-center md:justify-end mt-10'>
            <button
              onClick={handleContinue}
              className='text-[#035A7A] rounded-3xl cursor-pointer px-6 py-2 mt-4 text-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] w-full md:w-auto font-semibold shadow-[0px_4px_12px_rgba(3,90,122,0.1)]'
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
              <FormLabel htmlFor='nationality' text='Nationality' />
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    id="nationality"
                    value={field.value}
                    onChange={field.onChange}
                    data={nationalityList}
                    className='max-w-[280px]'
                    isInvalid={!!errors.nationality}
                    errorMessage={errors.nationality?.message}
                  />
                )}
              />
            </div>
            {/*Phone Number */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Phone Number')}
              onMouseLeave={() => setHoveredField(null)}
            >
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
            </div>
            {/*Current City*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Current City')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <FormLabel htmlFor='currentCity' text='Current City' />
              <HeroInput
                id='currentCity'
                placeholder='Lagos'
                variant="bordered"
                classNames={{ 
                  inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
                  input: 'text-[#878787]' 
                }}
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
              <FormLabel htmlFor='language' text='Language' />
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    id="language"
                    value={field.value}
                    onChange={field.onChange}
                    data={languageOptions}
                    className='max-w-[280px]'
                    isInvalid={!!errors.language}
                    errorMessage={errors.language?.message}
                  />
                )}
              />
            </div>
            {/*Date of Birth*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Date of Birth')}
              onMouseLeave={() => setHoveredField(null)}
            >
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
              {errors.dob && <p className="text-danger text-xs">{errors.dob.message}</p>}
            </div>
          </section>

          {/* textarea */}
          <section
            className='w-full flex flex-col gap-2 mt-10'
            onMouseEnter={() => setHoveredField('About Yourself')}
            onMouseLeave={() => setHoveredField(null)}
          >
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
                    input: 'text-[#878787]' 
                  }}
                  minRows={4}
                  {...field}
                  isInvalid={!!errors.about}
                  errorMessage={errors.about?.message}
                />
              )}
            />
          </section>

          <div className='w-full flex flex-col md:flex-row justify-center md:justify-end mt-10 gap-4'>
            <a
              href={submitHref}
              className='flex items-center justify-center cursor-pointer px-6 py-2 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold hover:bg-[#EAF9FF] transition-colors'
            >
              Skip
            </a>
            <a
              href={submitHref}
              onClick={handleSubmitClick}
              className='text-[#035A7A] rounded-3xl cursor-pointer px-6 py-2 text-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] w-full md:w-auto font-semibold shadow-[0px_4px_12px_rgba(3,90,122,0.1)]'
            >
              Submit
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default BrandDetails;

