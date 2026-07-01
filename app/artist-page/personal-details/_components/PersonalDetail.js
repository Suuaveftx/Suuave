"use client";
import React, { useState, useEffect } from "react";
import { DatePicker, Input as HeroInput, Textarea, Button } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import CustomSelect from "@/components/ui/CustomSelect";
import PhoneInputCustom from "@/components/ui/PhoneInputCustom";
import { useFormContext, Controller } from "react-hook-form";
import LanguageSelectCustom from '@/components/ui/LanguageSelectCustom';
import { CountrySelect, StateSelect } from "react-country-state-city";

const languageOptions = [
  { key: "English", label: "English" },
  { key: "Spanish", label: "Spanish" },
  { key: "French", label: "French" },
];

const NIGERIA_DEFAULT = { id: 161, name: "Nigeria", iso2: "NG" };

const PersonalDetail = ({ setSelected, setHoveredField, isEdit = false, submitHref = '/artist-page/profile-for-artist' }) => {
  const {
    control,
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [countryid, setCountryid] = useState(161);
  const [stateid, setStateid] = useState(0);


  const handleContinue = async () => {
    const isValid = await trigger(["fullName", "email", "phoneNumber", "language", "about", "nationality", "countryOfResidence", "currentCity", "dob"]);
    if (isValid) {
      setSelected("ProfessionalInformation");
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] border border-[#DEDEDE] p-6 md:p-6 rounded-2xl pb-8">
      <h1 className="text-[#222222] font-bold text-[28px] mb-1">Personal Details</h1>
      <p className="text-[#767676] font-normal text-sm mb-8">
        Fill in the following information carefully
      </p>
      <section className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Enter Full Name */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Full Name")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <HeroInput
            id="fullName"
            label="Full Name"
            labelPlacement="outside"
            placeholder="Chinedu Ozulu"
            variant="bordered"
            classNames={{
              label: "text-sm font-medium !text-[#767676]",
              inputWrapper: 'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm'
            }}
            {...register("fullName", { required: "Full name is required" })}
            isInvalid={!!errors.fullName}
            errorMessage={errors.fullName?.message}
          />
        </div>
        {/* Email Address */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField(" Email Address")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <HeroInput
            id="email"
            label="Email Address"
            labelPlacement="outside"
            placeholder="czysdgv@gmail.com"
            variant="bordered"
            classNames={{
              label: "text-sm font-medium !text-[#767676]",
              inputWrapper: 'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm'
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
        {/*Phone Number */}
        <div
          className="w-full flex flex-col gap-2"
          style={{ position: "relative", zIndex: 45 }}
          onMouseEnter={() => setHoveredField('Phone Number')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <label htmlFor="phoneNumber" className="text-sm font-medium text-[#767676] block">Phone Number</label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Phone number is required" }}
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
        {/*Language */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Language")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <label htmlFor="language" className="text-sm font-medium text-[#767676] block">Language</label>
          <Controller
            name="language"
            control={control}
            rules={{ required: "Language is required" }}
            render={({ field }) => (
              <LanguageSelectCustom
                value={field.value}
                onChange={field.onChange}
                error={errors.language?.message}
              />
            )}
          />
        </div>
        {/* textarea */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("About Yourself")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Textarea
            id="about"
            label="Describe Yourself"
            labelPlacement="outside"
            placeholder="Write About Your Design Style"
            variant="bordered"
            minRows={4}
            classNames={{
              label: "text-sm font-medium !text-[#767676]",
              inputWrapper: 'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm'
            }}
            {...register("about", { required: "Description is required" })}
            isInvalid={!!errors.about}
            errorMessage={errors.about?.message}
          />
        </div>
        {/* Company Name */}
        <div className="w-full flex flex-col gap-2">
          <HeroInput
            id="companyName"
            label="Company/Brand Name (Optional)"
            labelPlacement="outside"
            placeholder="Enter Company Name"
            variant="bordered"
            classNames={{
              label: "text-sm font-medium !text-[#767676]",
              inputWrapper: 'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-sm'
            }}
            {...register("companyName")}
            isInvalid={!!errors.companyName}
            errorMessage={errors.companyName?.message}
          />
        </div>
        {/*Nationality */}
        <div
          className="w-full flex flex-col gap-2"
          style={{ position: "relative", zIndex: 50 }}
          onMouseEnter={() => setHoveredField('Nationality')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <label htmlFor="nationality" className="text-sm font-medium text-[#767676] block">Nationality</label>
          <Controller
            name="nationality"
            control={control}
            rules={{
              required: "Nationality is required",
              validate: (val) => (val instanceof Set ? val.size > 0 : !!val) || "Nationality is required"
            }}
            render={({ field }) => (
              <div className="w-full suuave-location-select">
                <CountrySelect
                  defaultValue={NIGERIA_DEFAULT}
                  onChange={(e) => {
                    field.onChange(new Set([e.name]));
                  }}
                  placeHolder="Select Nationality"
                />
              </div>
            )}
          />
          {errors.nationality && <p className="text-danger text-xs">{errors.nationality.message}</p>}
        </div>
        {/*Country of Residence*/}
        <div
          className="w-full flex flex-col gap-2"
          style={{ position: "relative", zIndex: 45 }}
          onMouseEnter={() => setHoveredField('Country of Residence')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <label htmlFor="countryOfResidence" className="text-sm font-medium text-[#767676] block">Country of Residence</label>
          <Controller
            name="countryOfResidence"
            control={control}
            rules={{
              required: "Country of Residence is required",
              validate: (val) => (val instanceof Set ? val.size > 0 : !!val) || "Country of Residence is required"
            }}
            render={({ field }) => (
              <div className="w-full suuave-location-select">
                <CountrySelect
                  defaultValue={NIGERIA_DEFAULT}
                  onChange={(e) => {
                    setCountryid(e.id);
                    setStateid(0);
                    field.onChange(new Set([e.name]));
                    setValue("currentCity", "");
                  }}
                  placeHolder="Select Country"
                />
              </div>
            )}
          />
          {errors.countryOfResidence && <p className="text-danger text-xs">{errors.countryOfResidence.message}</p>}
        </div>
        {/*Current City*/}
        <div
          className="w-full flex flex-col gap-2"
          style={{ position: "relative", zIndex: 40 }}
          onMouseEnter={() => setHoveredField('Current City')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <label htmlFor="currentCity" className="text-sm font-medium text-[#767676] block">Current City</label>
          <Controller
            name="currentCity"
            control={control}
            rules={{ required: "Current city is required" }}
            render={({ field }) => (
              <div className="w-full suuave-location-select">
                <StateSelect
                  countryid={countryid}
                  value={stateid}
                  defaultValue={field.value ? { id: 0, name: field.value } : undefined}
                  onChange={(e) => {
                    setStateid(e.id);
                    field.onChange(e.name);
                  }}
                  placeHolder="Select City"
                />
              </div>
            )}
          />
          {errors.currentCity && <p className="text-danger text-xs">{errors.currentCity.message}</p>}
        </div>
        {/*Date of Birth*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField(" Date of Birth")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Controller
            name="dob"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <DatePicker
                id="dateofBirth"
                label="Date Of Birth"
                labelPlacement="outside"
                variant="bordered"
                isInvalid={!!errors.dob}
                errorMessage={errors.dob?.message}
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
                  base: 'w-full',
                  label: "text-sm font-medium !text-[#767676]",
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

      <div className="w-full flex flex-col md:flex-row justify-center md:justify-end items-center mt-10 gap-4">
        {isEdit ? (
          <button
            onClick={async () => {
              const isValid = await trigger(["fullName", "email", "phoneNumber", "language", "about", "nationality", "countryOfResidence", "currentCity", "dob"]);
              if (isValid) setSelected("ProfessionalInformation");
            }}
            className="flex items-center justify-center w-full md:w-auto text-[#3A98BB] bg-transparent border border-[#3A98BB] font-semibold rounded-[40px] px-12 py-3.5 hover:bg-[#EAF9FF] transition-colors shadow-none"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="flex items-center justify-center w-full md:w-auto text-[#035A7A] font-semibold rounded-[40px] px-12 py-3.5 bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)]"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalDetail;






