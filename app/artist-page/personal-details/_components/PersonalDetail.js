"use client";
import React, { useState, useEffect } from "react";
import { DatePicker, Input as HeroInput, Textarea, Button, Skeleton } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import FormLabel from "@/components/ui/FormLabel";
import CustomSelect from "@/components/ui/CustomSelect";
import PhoneInputCustom from "@/components/ui/PhoneInputCustom";
import { useFormContext, Controller } from "react-hook-form";
import LanguageSelectCustom from '@/components/ui/LanguageSelectCustom';
import CountrySelectCustom from '@/components/ui/CountrySelectCustom';

const languageOptions = [
  { key: "English", label: "English" },
  { key: "Spanish", label: "Spanish" },
  { key: "French", label: "French" },
];

const PersonalDetail = ({ setSelected, setHoveredField }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    control,
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = async () => {
    const isValid = await trigger(["fullName", "email", "phoneCode", "phoneNumber", "language", "about", "nationality", "currentCity", "day", "month", "year"]);
    if (isValid) {
      setSelected("ProfessionalInformation");
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] border border-[#DEDEDE] p-6 md:p-6 rounded-2xl pb-8">
      <h1 className="text-[#222222] font-bold text-[32px] mb-1">Personal Details</h1>
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
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="fullName" text="Full Name" required />
            <HeroInput
              id="fullName"
              placeholder="Chinedu Ozulu"
              variant="bordered"
              classNames={{
                inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
                input: 'text-black text-sm'
              }}
              {...register("fullName")}
              isInvalid={!!errors.fullName}
              errorMessage={errors.fullName?.message}
            />
          </Skeleton>
        </div>
        {/* Email Address */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField(" Email Address")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="emailAddress" text="Email Address" required />
            <HeroInput
              id="email"
              placeholder="czysdgv@gmail.com"
              variant="bordered"
              readOnly
              classNames={{
                inputWrapper: 'bg-[#F1F1F1] border-none',
                input: 'text-[#767676] text-sm'
              }}
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </Skeleton>
        </div>
        {/*Phone Number */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Phone Number")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="phoneNumber" text="Phone Number" required />
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
        {/*Language */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Language")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="language" text="Language" required />
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
        {/* textarea */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("About Yourself")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="about" text="Describe Yourself" required />
            <Textarea
              id="about"
              placeholder="Write About Your Design Style"
              variant="bordered"
              minRows={4}
              classNames={{
                inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
                input: 'text-black text-sm'
              }}
              {...register("about")}
              isInvalid={!!errors.about}
              errorMessage={errors.about?.message}
            />
          </Skeleton>
        </div>
        {/* Company Name */}
        <div className="w-full flex flex-col gap-2">
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="companyName" text="Company/Brand Name (Optional)" />
            <HeroInput
              id="companyName"
              placeholder="Enter Company Name"
              variant="bordered"
              classNames={{
                inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
                input: 'text-black text-sm'
              }}
              {...register("companyName")}
              isInvalid={!!errors.companyName}
              errorMessage={errors.companyName?.message}
            />
          </Skeleton>
        </div>
        {/*Nationality */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Nationality")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="nationality" text="Nationality" required />
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <div className="max-w-[280px]">
                  <CountrySelectCustom
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.nationality?.message}
                  />
                </div>
              )}
            />
          </Skeleton>
        </div>
        {/*Current City*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Current City")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="currentCity" text="Current City" required />
            <Controller
              name="currentCity"
              control={control}
              render={({ field }) => (
                <HeroInput
                  id="currentCity"
                  placeholder="Lagos"
                  variant="bordered"
                  className="max-w-[280px]"
                  classNames={{
                    inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
                    input: 'text-black text-sm'
                  }}
                  {...field}
                  isInvalid={!!errors.currentCity}
                  errorMessage={errors.currentCity?.message}
                />
              )}
            />
          </Skeleton>
        </div>
        {/*Date of Birth*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField(" Date of Birth")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <FormLabel htmlFor="dob" text="Date Of Birth" required />
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="dateofBirth"
                  aria-label="Date of Birth"
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
          </Skeleton>
          {errors.dob && <p className="text-danger text-xs">{errors.dob.message}</p>}
        </div>
      </section>

      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-3 mt-12">
        <Skeleton isLoaded={!isLoading} className="rounded-full">
          <Button
            onPress={handleContinue}
            className="w-full md:w-auto text-[#035A7A] font-semibold rounded-[40px] px-12 py-3.5 bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)]"
          >
            Continue
          </Button>
        </Skeleton>
      </div>
    </div>
  );
};

export default PersonalDetail;
