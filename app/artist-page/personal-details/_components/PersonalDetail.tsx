'use client';
import React, { useState, useEffect } from 'react';
import {
  DatePicker,
  Input as HeroInput,
  Textarea,
  Button,
  type DatePickerProps,
} from '@heroui/react';
import { parseDate } from '@internationalized/date';
import CustomSelect from '@/components/ui/CustomSelect';
import PhoneInputCustom from '@/components/ui/PhoneInputCustom';
import { useFormContext, Controller } from 'react-hook-form';
import LanguageSelectCustom from '@/components/ui/LanguageSelectCustom';
import { CountrySelect, GetCountries, StateSelect } from 'react-country-state-city';

const languageOptions = [
  { key: 'English', label: 'English' },
  { key: 'Spanish', label: 'Spanish' },
  { key: 'French', label: 'French' },
];

const getSelectedValue = (value) => {
  if (value instanceof Set) return Array.from(value)[0] || '';
  return typeof value === 'string' ? value : '';
};

const PersonalDetail = ({
  setSelected,
  setHoveredField,
  isEdit = false,
  submitHref = '/artist-page/profile-for-artist',
}) => {
  const {
    control,
    register,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [countries, setCountries] = useState([]);
  const [countryid, setCountryid] = useState(0);
  const [locationError, setLocationError] = useState('');
  const countryOfResidence = getSelectedValue(watch('countryOfResidence'));

  useEffect(() => {
    let isMounted = true;
    GetCountries()
      .then((items) => {
        if (isMounted) setCountries(items);
      })
      .catch((error) => {
        if (isMounted) {
          setLocationError(
            (error?.message as string) || 'Unable to load country and state options.'
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
      'firstName',
      'lastName',
      'username',
      'email',
      'phoneNumber',
      'language',
      'about',
      'nationality',
      'countryOfResidence',
      'currentCity',
      'dob',
    ]);
    if (isValid) {
      setSelected('ProfessionalInformation');
    }
  };

  return (
    <div className='w-full bg-[#FAFAFA] border border-[#DEDEDE] p-6 md:p-6 rounded-2xl pb-8'>
      <h1 className='text-[#222222] font-bold text-[28px] mb-1'>Personal Details</h1>
      <p className='text-[#767676] font-normal text-sm mb-8'>
        Fill in the following information carefully
      </p>
      <section className='flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10'>
        {/* First and last name */}
        <div
          className='w-full flex flex-col gap-2'
          onMouseEnter={() => setHoveredField('First Name')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <HeroInput
            id='firstName'
            label='First Name'
            labelPlacement='outside'
            placeholder='Chinedu'
            variant='bordered'
            classNames={{
              label: 'text-sm font-medium !text-[#767676]',
              inputWrapper:
                'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm',
            }}
            {...register('firstName', { required: 'First name is required' })}
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message as string}
          />
        </div>
        <div
          className='w-full flex flex-col gap-2'
          onMouseEnter={() => setHoveredField('Last Name')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <HeroInput
            id='lastName'
            label='Last Name'
            labelPlacement='outside'
            placeholder='Ozulu'
            variant='bordered'
            classNames={{
              label: 'text-sm font-medium !text-[#767676]',
              inputWrapper:
                'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm',
            }}
            {...register('lastName', { required: 'Last name is required' })}
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message as string}
          />
        </div>
        <div
          className='w-full flex flex-col gap-2'
          onMouseEnter={() => setHoveredField('Username')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <HeroInput
            id='username'
            label='Username'
            labelPlacement='outside'
            placeholder='username'
            variant='bordered'
            classNames={{
              label: 'text-sm font-medium !text-[#767676]',
              inputWrapper:
                'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm',
            }}
            {...register('username', { required: 'Username is required' })}
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message as string}
          />
        </div>
        {/* Email Address */}
        <div
          className='w-full flex flex-col gap-2'
          onMouseEnter={() => setHoveredField(' Email Address')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <HeroInput
            id='email'
            label='Email Address'
            labelPlacement='outside'
            placeholder='czysdgv@gmail.com'
            variant='bordered'
            isReadOnly
            classNames={{
              label: 'text-sm font-medium !text-[#767676] opacity-100',
              inputWrapper:
                'bg-gray-100 !border-gray-300 opacity-100 data-[hover=true]:!border-gray-300 data-[focus=true]:!border-gray-300 hover:!border-gray-300 focus-within:!border-gray-300',
              input: 'text-gray-500 text-sm',
            }}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message as string}
          />
        </div>
        {/*Phone Number */}
        <div
          className='w-full flex flex-col gap-2'
          style={{ position: 'relative', zIndex: 45 }}
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
                error={
                  (errors.phoneNumber?.message as string) ||
                  (errors.phoneCode?.message as string)
                }
              />
            )}
          />
        </div>
        {/*Language */}
        <div
          className='w-full flex flex-col gap-2'
          onMouseEnter={() => setHoveredField('Language')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <label htmlFor='language' className='text-sm font-medium text-[#767676] block'>
            Language
          </label>
          <Controller
            name='language'
            control={control}
            rules={{ required: 'Language is required' }}
            render={({ field }) => (
              <LanguageSelectCustom
                label=''
                value={field.value}
                onChange={field.onChange}
                error={errors.language?.message as string}
              />
            )}
          />
        </div>
        {/* textarea */}
        <div
          className='w-full flex flex-col gap-2'
          onMouseEnter={() => setHoveredField('About Yourself')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Textarea
            id='about'
            label='Describe Yourself'
            labelPlacement='outside'
            placeholder='Write About Your Design Style'
            variant='bordered'
            minRows={4}
            classNames={{
              label: 'text-sm font-medium !text-[#767676]',
              inputWrapper:
                'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm',
            }}
            {...register('about', { required: 'Description is required' })}
            isInvalid={!!errors.about}
            errorMessage={errors.about?.message as string}
          />
        </div>
        {/* Company Name */}
        <div className='w-full flex flex-col gap-2'>
          <HeroInput
            id='companyName'
            label='Company/Brand Name (Optional)'
            labelPlacement='outside'
            placeholder='Enter Company Name'
            variant='bordered'
            classNames={{
              label: 'text-sm font-medium !text-[#767676]',
              inputWrapper:
                'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm',
            }}
            {...register('companyName')}
            isInvalid={!!errors.companyName}
            errorMessage={errors.companyName?.message as string}
          />
        </div>
        {/*Nationality */}
        <div
          className='w-full flex flex-col gap-2'
          style={{ position: 'relative', zIndex: 50 }}
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
                (val instanceof Set ? val.size > 0 : !!val) || 'Nationality is required',
            }}
            render={({ field }) => {
              const selectedNationality = countries.find(
                (item) =>
                  item.name.toLowerCase() ===
                  getSelectedValue(field.value).trim().toLowerCase()
              );
              return (
                <div className='w-full suuave-location-select'>
                  <CountrySelect
                    key={selectedNationality?.id || 'empty-nationality'}
                    defaultValue={selectedNationality}
                    onChange={(e) => {
                      field.onChange(new Set([e.name]));
                    }}
                    placeHolder='Select Nationality'
                  />
                </div>
              );
            }}
          />
          {errors.nationality && (
            <p className='text-danger text-xs'>
              {errors?.nationality?.message as string}
            </p>
          )}
        </div>
        {/*Country of Residence*/}
        <div
          className='w-full flex flex-col gap-2'
          style={{ position: 'relative', zIndex: 45 }}
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
            render={({ field }) => {
              const selectedCountry = countries.find(
                (item) =>
                  item.name.toLowerCase() ===
                  getSelectedValue(field.value).trim().toLowerCase()
              );
              return (
                <div className='w-full suuave-location-select'>
                  <CountrySelect
                    key={selectedCountry?.id || 'empty-residence'}
                    defaultValue={selectedCountry}
                    onChange={(e) => {
                      setCountryid(e.id);
                      field.onChange(new Set([e.name]));
                      setValue('currentCity', '');
                    }}
                    placeHolder='Select Country'
                  />
                </div>
              );
            }}
          />
          {errors.countryOfResidence && (
            <p className='text-danger text-xs'>
              {errors?.countryOfResidence?.message as string}
            </p>
          )}
        </div>
        {/*Current City*/}
        <div
          className='w-full flex flex-col gap-2'
          style={{ position: 'relative', zIndex: 40 }}
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
                <StateSelect
                  key={countryid}
                  countryid={countryid}
                  disabled={!countryid}
                  defaultValue={field.value}
                  onChange={(e) => {
                    field.onChange(e.name);
                  }}
                  placeHolder='Select City'
                />
              </div>
            )}
          />
          {errors.currentCity && (
            <p className='text-danger text-xs'>
              {errors?.currentCity?.message as string}
            </p>
          )}
        </div>
        {locationError && (
          <p role='alert' className='text-danger text-xs md:col-span-2'>
            {locationError}
          </p>
        )}
        {/*Date of Birth*/}
        <div
          className='w-full flex flex-col gap-2'
          onMouseEnter={() => setHoveredField(' Date of Birth')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Controller
            name='dob'
            control={control}
            rules={{ required: 'Date of birth is required' }}
            render={({ field }) => (
              <DatePicker<NonNullable<DatePickerProps['value']>>
                id='dateofBirth'
                label='Date Of Birth'
                labelPlacement='outside'
                variant='bordered'
                isInvalid={!!errors.dob}
                errorMessage={errors.dob?.message as string}
                value={
                  field.value
                    ? (parseDate(field.value) as unknown as NonNullable<
                        DatePickerProps['value']
                      >)
                    : null
                }
                onChange={(date: DatePickerProps['value']) =>
                  field.onChange(date ? date.toString() : '')
                }
                showMonthAndYearPickers
                popoverProps={{ placement: 'top-start' }}
                classNames={{
                  base: 'w-full',
                  label: 'text-sm font-medium !text-[#767676]',
                  inputWrapper: [
                    'w-full border rounded-lg bg-transparent px-2 py-1',
                    errors.dob ? 'border-danger' : 'border-[#D1D1D1]',
                    'data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
                    'shadow-none',
                  ],
                  input: 'text-black font-normal text-sm',
                }}
                calendarProps={{
                  classNames: {
                    base: 'shadow-lg rounded-xl border border-[#D1D1D1]',
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
        </div>
      </section>

      <div className='w-full flex flex-col md:flex-row justify-center md:justify-end items-center mt-10 gap-4'>
        {isEdit ? (
          <button
            onClick={async () => {
              const isValid = await trigger([
                'firstName',
                'lastName',
                'username',
                'email',
                'phoneNumber',
                'language',
                'about',
                'nationality',
                'countryOfResidence',
                'currentCity',
                'dob',
              ]);
              if (isValid) setSelected('ProfessionalInformation');
            }}
            className='flex items-center justify-center w-full md:w-auto text-[#3A98BB] bg-transparent border border-[#3A98BB] font-semibold rounded-[40px] px-12 py-3.5 hover:bg-[#EAF9FF] transition-colors shadow-none'
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className='flex items-center justify-center w-full md:w-auto text-[#035A7A] font-semibold rounded-[40px] px-12 py-3.5 bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)]'
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalDetail;
