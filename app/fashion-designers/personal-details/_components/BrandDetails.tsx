'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  DatePicker,
  Input as HeroInput,
  Textarea,
  type DatePickerProps,
} from '@heroui/react';
import { parseDate } from '@internationalized/date';
import CustomSelect from '@/components/ui/CustomSelect';
import PhoneInputCustom from '@/components/ui/PhoneInputCustom';
import { CountrySelect, GetCountries, StateSelect } from 'react-country-state-city';
import type { Country } from 'react-country-state-city/dist/esm/types';
import { useFormContext, Controller } from 'react-hook-form';
import LanguageSelectCustom from '@/components/ui/LanguageSelectCustom';
import { ChevronLeft } from 'lucide-react';

type BrandDetailsFormValues = {
  fullName: string;
  businessName: string;
  username: string;
  brandCategory: Set<string>;
  email: string;
  role: string;
  nationality: Set<string>;
  countryOfResidence: Set<string>;
  phoneNumber: string;
  phoneCode: Set<string>;
  currentCity: string;
  language: string;
  dob: string;
  about: string;
};

type BrandDetailsProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setHoveredField: Dispatch<SetStateAction<string | null>>;
  submitHref?: string;
  isEdit?: boolean;
  onSubmit?: () => Promise<void>;
  isSubmitting?: boolean;
};

type CountrySelectProps = Omit<
  React.ComponentProps<typeof CountrySelect>,
  'defaultValue'
> & {
  defaultValue?: string;
};

type StateSelectProps = Omit<
  React.ComponentProps<typeof StateSelect>,
  'defaultValue'
> & {
  defaultValue?: string;
};

// The package types intersect defaultValue with the native input type, unlike its runtime.
const CountrySelectWithValue = CountrySelect as React.ComponentType<CountrySelectProps>;
const StateSelectWithValue = StateSelect as React.ComponentType<StateSelectProps>;

const getSelectedValue = (value: Set<string> | string | undefined) => {
  if (value instanceof Set) return Array.from(value)[0] || '';
  return typeof value === 'string' ? value : '';
};

const brandCategoryOptions = [
  {
    key: 'Independent Brand / Designer',
    label: 'Independent Brand / Designer',
    description: 'Best for solo creators and boutique labels',
  },
  {
    key: 'Corporate Brand / Retailer',
    label: 'Corporate Brand / Retailer',
    description: 'Best for multi-stockist or mass-market companies',
  },
  {
    key: 'Creative / Sourcing Agency',
    label: 'Creative / Sourcing Agency',
    description: 'Best for representatives managing projects for multiple clients',
  },
];

const languageOptions = [
  { key: 'English', label: 'English' },
  { key: 'French', label: 'French' },
  { key: 'Spanish', label: 'Spanish' },
  { key: 'Portuguese', label: 'Portuguese' },
  { key: 'Arabic', label: 'Arabic' },
];

const BrandDetails = ({
  step,
  setStep,
  setHoveredField,
  submitHref = '/fashion-designers',
  isEdit = false,
  onSubmit,
  isSubmitting = false,
}: BrandDetailsProps) => {
  const {
    register,
    control,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BrandDetailsFormValues>();

  const [countries, setCountries] = useState<Country[]>([]);
  const [countryid, setCountryid] = useState(0);
  const [locationError, setLocationError] = useState('');
  const countryOfResidence = getSelectedValue(watch('countryOfResidence'));

  useEffect(() => {
    let isMounted = true;
    GetCountries()
      .then((items) => {
        if (isMounted) setCountries(items);
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setLocationError(
            error instanceof Error
              ? error.message
              : 'Unable to load country and state options.'
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const country = countries.find(
      (item) => item.name.toLowerCase() === countryOfResidence.trim().toLowerCase()
    );
    setCountryid(country?.id || 0);
  }, [countries, countryOfResidence]);

  const handleContinue = async () => {
    const isValid = await trigger([
      'fullName',
      'businessName',
      'username',
      'brandCategory',
      'email',
      'role',
    ]);
    if (isValid) setStep(2);
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
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
        </button>
      )}
      <h1 className='text-[#222222] font-bold text-2xl md:text-[28px]'>
        {step === 1 ? 'Brand Fundamentals' : 'Personal Details'}
      </h1>
      <p className='text-[#767676] font-normal text-base mt-2'>
        {step === 1
          ? 'Establish your business presence and operational category'
          : "Let's get to know you more."}
      </p>

      {step === 1 && (
        <>
          <section className='grid md:grid-cols-2 mt-12 gap-10'>
            {/* Enter Full Name */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Full Name')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <HeroInput
                id='fullName'
                label='Full Name'
                labelPlacement='outside'
                placeholder='Enter Full Name'
                variant='bordered'
                classNames={{
                  label: 'text-sm font-medium !text-[#767676]',
                  inputWrapper:
                    'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
                  input: 'text-black text-sm',
                }}
                {...register('fullName', { required: 'Full name is required' })}
                isInvalid={!!errors.fullName}
                errorMessage={errors?.fullName?.message as string}
              />
            </div>
            {/* Business Name */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Business Name')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <HeroInput
                id='businessName'
                label='Business Name'
                labelPlacement='outside'
                placeholder='Suuave Fashion Ltd.'
                variant='bordered'
                classNames={{
                  label: 'text-sm font-medium !text-[#767676]',
                  inputWrapper:
                    'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
                  input: 'text-black text-sm',
                }}
                {...register('businessName', { required: 'Business name is required' })}
                isInvalid={!!errors.businessName}
                errorMessage={errors?.businessName?.message as string}
              />
            </div>
            {/* Username */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Username')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <HeroInput
                id='username'
                label='Username'
                labelPlacement='outside'
                placeholder='@ocean'
                variant='bordered'
                classNames={{
                  label: 'text-sm font-medium !text-[#767676]',
                  inputWrapper:
                    'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
                  input: 'text-black text-sm',
                }}
                {...register('username', { required: 'Username is required' })}
                isInvalid={!!errors.username}
                errorMessage={errors?.username?.message as string}
              />
            </div>
            {/* Brand Category*/}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Brand Category')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Controller
                name='brandCategory'
                control={control}
                rules={{ required: 'Brand category is required' }}
                render={({ field }) => (
                  <CustomSelect
                    id='brandCategory'
                    label='Brand Category'
                    labelPlacement='outside'
                    placeholder='Select brand category'
                    ariaLabel='Brand Category'
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
              <HeroInput
                id='emailAddress'
                label='Email Address'
                labelPlacement='outside'
                placeholder='czysdgv@gmail.com'
                variant='bordered'
                classNames={{
                  label: 'text-sm font-medium !text-[#767676]',
                  inputWrapper:
                    'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
                  input: 'text-black text-sm',
                }}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                isInvalid={!!errors.email}
                errorMessage={errors?.email?.message as string}
              />
            </div>
            {/* Position */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Position')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <HeroInput
                id='role'
                label='Position'
                labelPlacement='outside'
                placeholder='Creative Director'
                variant='bordered'
                classNames={{
                  label: 'text-sm font-medium !text-[#767676]',
                  inputWrapper:
                    'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
                  input: 'text-black text-sm',
                }}
                {...register('role', { required: 'Position is required' })}
                isInvalid={!!errors.role}
                errorMessage={errors?.role?.message as string}
              />
            </div>
          </section>
          <div className='w-full flex justify-center md:justify-end mt-10'>
            <button
              onClick={handleContinue}
              className={`rounded-3xl cursor-pointer px-6 py-2 mt-4 text-center w-full md:w-auto font-semibold transition-all ${
                isEdit
                  ? 'border border-[#3A98BB] text-[#3A98BB] hover:bg-[#EAF9FF]'
                  : 'text-[#035A7A] bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)]'
              }`}
            >
              {isEdit ? 'Next' : 'Continue'}
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <section className='grid md:grid-cols-2 mt-12 gap-10'>
            {/*Nationality */}
            <div
              className='w-full flex flex-col gap-2'
              style={{ position: 'relative', zIndex: 30 }}
              onMouseEnter={() => setHoveredField('Nationality')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <label
                htmlFor='nationality'
                className='text-sm font-medium text-[#767676] block'
              >
                Nationality
              </label>
              <Controller
                name='nationality'
                control={control}
                rules={{
                  required: 'Nationality is required',
                  validate: (val) =>
                    (val instanceof Set ? val.size > 0 : !!val) ||
                    'Nationality is required',
                }}
                render={({ field }) => (
                  <div className='w-full suuave-location-select'>
                    <CountrySelectWithValue
                      defaultValue={getSelectedValue(field.value) || undefined}
                      onChange={(e) => {
                        field.onChange(new Set([e.name]));
                      }}
                      placeHolder='Select Nationality'
                    />
                  </div>
                )}
              />
              {errors.nationality && (
                <p className='text-danger text-xs mt-1'>
                  {errors?.nationality?.message as string}
                </p>
              )}
            </div>
            {/*Country of Residence*/}
            <div
              className='w-full flex flex-col gap-2'
              style={{ position: 'relative', zIndex: 29 }}
              onMouseEnter={() => setHoveredField('Country of Residence')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <label
                htmlFor='countryOfResidence'
                className='text-sm font-medium text-[#767676] block'
              >
                Country of Residence
              </label>
              <Controller
                name='countryOfResidence'
                control={control}
                rules={{
                  required: 'Country of Residence is required',
                  validate: (val) =>
                    (val instanceof Set ? val.size > 0 : !!val) ||
                    'Country of Residence is required',
                }}
                render={({ field }) => (
                  <div className='w-full suuave-location-select'>
                    <CountrySelectWithValue
                      defaultValue={getSelectedValue(field.value) || undefined}
                      onChange={(e) => {
                        setCountryid(e.id);
                        setValue('currentCity', '');
                        field.onChange(new Set([e.name]));
                      }}
                      placeHolder='Select Country'
                    />
                  </div>
                )}
              />
              {errors.countryOfResidence && (
                <p className='text-danger text-xs mt-1'>
                  {errors?.countryOfResidence?.message as string}
                </p>
              )}
            </div>
            {/*Phone Number */}
            <div
              className='w-full flex flex-col gap-2'
              style={{ position: 'relative', zIndex: 28 }}
              onMouseEnter={() => setHoveredField('Phone Number')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <label
                htmlFor='phoneNumber'
                className='text-sm font-medium text-[#767676] block'
              >
                Phone Number
              </label>
              <Controller
                name='phoneNumber'
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                  <PhoneInputCustom
                    id='phoneNumber'
                    value={field.value}
                    onChange={(val, data) => {
                      field.onChange(val);
                      // Maintain backward compatibility with phoneCode Set
                      if (data?.dialCode) {
                        setValue('phoneCode', new Set([`+${data.dialCode}`]));
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
              style={{ position: 'relative', zIndex: 27 }}
              onMouseEnter={() => setHoveredField('Current City')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <label
                htmlFor='currentCity'
                className='text-sm font-medium text-[#767676] block'
              >
                Current City
              </label>
              <Controller
                name='currentCity'
                control={control}
                rules={{ required: 'Current city is required' }}
                render={({ field }) => (
                  <div className='w-full suuave-location-select'>
                    <StateSelectWithValue
                      key={countryid}
                      countryid={countryid}
                      disabled={!countryid}
                      defaultValue={field.value || undefined}
                      onChange={(e) => {
                        field.onChange(e.name);
                      }}
                      placeHolder='Select City'
                    />
                  </div>
                )}
              />
              {errors.currentCity && (
                <p className='text-danger text-xs mt-1'>
                  {errors?.currentCity?.message as string}
                </p>
              )}
            </div>
            {/*Language */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Language')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Controller
                name='language'
                control={control}
                rules={{ required: 'Language is required' }}
                render={({ field }) => (
                  <LanguageSelectCustom
                    label='Language'
                    labelPlacement='outside'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.language?.message}
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
              <Controller
                name='dob'
                control={control}
                rules={{ required: 'Date of birth is required' }}
                render={({ field }) => (
                  <DatePicker<NonNullable<DatePickerProps['value']>>
                    id='dob'
                    label='Date of birth'
                    labelPlacement='outside'
                    aria-label='Date of birth'
                    value={
                      field.value
                        ? (() => {
                            try {
                              return parseDate(field.value) as unknown as NonNullable<
                                DatePickerProps['value']
                              >;
                            } catch {
                              return null;
                            }
                          })()
                        : null
                    }
                    onChange={(date: DatePickerProps['value']) =>
                      field.onChange(date ? date.toString() : '')
                    }
                    showMonthAndYearPickers
                    popoverProps={{ placement: 'bottom-start', shouldFlip: false }}
                    classNames={{
                      base: 'w-full',
                      label: 'text-sm font-medium !text-[#767676]',
                      inputWrapper: [
                        'w-full border border-[#D1D1D1] rounded-lg bg-transparent px-2 py-1',
                        'data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
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
              {errors.dob && (
                <p className='text-danger text-xs'>{errors?.dob?.message as string}</p>
              )}
            </div>
          </section>
          {locationError && (
            <p role='alert' className='text-danger text-xs mt-4'>
              {locationError}
            </p>
          )}

          {/* textarea */}
          <section
            className='w-full flex flex-col gap-2 mt-10'
            onMouseEnter={() => setHoveredField('About Yourself')}
            onMouseLeave={() => setHoveredField(null)}
          >
            <Controller
              name='about'
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <Textarea
                  id='about'
                  label='Describe Yourself'
                  labelPlacement='outside'
                  placeholder='Tell Us About Yourself, Your Relevant Skills and Professional Experience.'
                  variant='bordered'
                  classNames={{
                    label: 'text-sm font-medium !text-[#767676]',
                    inputWrapper:
                      'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
                    input: 'text-black text-sm',
                  }}
                  minRows={4}
                  {...field}
                  isInvalid={!!errors.about}
                  errorMessage={errors?.about?.message as string}
                />
              )}
            />
          </section>

          <div className='w-full flex flex-col md:flex-row justify-between items-center mt-10 gap-4'>
            <button
              onClick={() => setStep(1)}
              className='flex items-center justify-center cursor-pointer px-6 py-2 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold hover:bg-[#EAF9FF] transition-colors'
            >
              Previous
            </button>
            <div className='flex flex-col md:flex-row justify-center md:justify-end items-center gap-4 w-full md:w-auto'>
              {!isEdit && (
                <a
                  href={submitHref}
                  className='flex items-center justify-center cursor-pointer px-6 py-2 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold hover:bg-[#EAF9FF] transition-colors'
                >
                  Skip
                </a>
              )}
              {isEdit ? (
                <button
                  onClick={async () => {
                    const isValid = await trigger();
                    if (!isValid) return;
                    if (onSubmit) {
                      await onSubmit();
                    } else {
                      window.location.href = submitHref;
                    }
                  }}
                  disabled={isSubmitting}
                  className='flex items-center justify-center rounded-3xl cursor-pointer px-6 py-2 text-center w-full md:w-auto font-semibold transition-all border border-[#3A98BB] text-[#3A98BB] hover:bg-[#EAF9FF]'
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              ) : (
                <a
                  href={submitHref}
                  onClick={handleSubmitClick}
                  className='flex items-center justify-center rounded-3xl cursor-pointer px-6 py-2 text-center w-full md:w-auto font-semibold transition-all text-[#035A7A] bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)]'
                >
                  Submit
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BrandDetails;
