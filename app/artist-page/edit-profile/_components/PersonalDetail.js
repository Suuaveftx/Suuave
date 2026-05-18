"use client";
import React from "react";
import { Select, SelectItem } from "@heroui/react";
import CustomSelect from "./CustomSelect";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { dialCodes as numCode } from "../../../../utils/countryData";

const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  key: String(i + 1),
  label: String(i + 1),
}));

const monthOptions = [
  { key: "1", label: "January" },
  { key: "2", label: "February" },
  { key: "3", label: "March" },
  { key: "4", label: "April" },
  { key: "5", label: "May" },
  { key: "6", label: "June" },
  { key: "7", label: "July" },
  { key: "8", label: "August" },
  { key: "9", label: "September" },
  { key: "10", label: "October" },
  { key: "11", label: "November" },
  { key: "12", label: "December" },
];

const yearOptions = Array.from({ length: 80 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { key: String(year), label: String(year) };
});

const numberCode = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
];

const nationality = [
  { key: "Nigeria", label: "Nigeria" },
  { key: "Ghana", label: "Ghana" },
  { key: "Togo", label: "Togo" },
];
const language = [
  { key: "English", label: "English" },
  { key: "Spanish", label: "Spanish" },
];

const PersonalDetail = ({ setSelected, formData, setFormData }) => {
  const router = useRouter();
  return (
    <div className="w-full h-full bg-white md:bg-[#FAFAFA] border border-[#EAEAEA] md:border-[#DEDEDE] p-6 md:p-6 rounded-2xl shadow-sm md:shadow-none">
      <h1 className="text-[#3A98BB] font-bold text-xl mb-1 hidden md:block">Personal Details</h1>
      <p className="text-[#767676] font-normal text-sm mb-8">
        Fill in the following information carefully
      </p>
      <section className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Enter Full Name */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="fullName" text="Full Name" />
          <Input
            id="fullName"
            placeholder="Chinedu Ozulu"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </div>
        {/* Email Address */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="emailAddress" text="Email Address" />
          <div className="relative">
            <Input
              id="emailAddress"
              placeholder="czysdgv@gmail.com"
              value={formData.email}
              readOnly
              className="bg-[#F1F1F1] border-none text-[#767676]"
            />
          </div>
        </div>

        {/*Phone Number */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="phoneCode" text="Phone Number" />
          <div className="flex items-center gap-3">
            <div className="w-[130px] shrink-0">
              <CustomSelect
                formData={formData}
                setFormData={setFormData}
                value={formData.phoneCode}
                data={numCode}
                className="w-full"
                htmlFor="phoneCode"
              />
            </div>
            <Input
              id="number"
              className="flex-1"
              placeholder="0000000000"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>
        </div>
        {/*Language */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="Language" text="Language" />
          <CustomSelect
            formData={formData}
            setFormData={setFormData}
            value={formData.language}
            data={language}
            className="w-full"
            htmlFor="language"
          />
        </div>
        {/* textarea */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="about" text="Describe Yourself" />
          <textarea
            name="about"
            id="about"
            placeholder="Write About Your Design Style"
            className="w-full border border-[#D1D1D1] text-[#222222] placeholder:text-[#ADADAD] font-normal text-sm py-2 px-3 rounded-lg outline-none focus:border-[#3A98BB] bg-transparent h-32 resize-none"
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          />
        </div>
        {/* Company Name */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="companyName" text="Company/Brand Name (Optional)" />
          <Input
            id="companyName"
            placeholder="Enter Company Name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
        </div>
        {/*Nationality */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="nationality" text="Nationality" />
          <CustomSelect
            formData={formData}
            setFormData={setFormData}
            value={formData.nationality}
            data={nationality}
            className="w-full"
            htmlFor="nationality"
          />
        </div>
        {/*Current City*/}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="currentCity" text="Current City" />
          <div className="relative">
            <Input
              id="currentCity"
              placeholder="Select"
              value={formData.currentCity}
              onChange={(e) =>
                setFormData({ ...formData, currentCity: e.target.value })
              }
            />
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767676] md:hidden pointer-events-none" />
          </div>
        </div>
        {/*Date of Birth*/}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="dateofBirth" text="Date of Birth" />
          <div className="grid grid-cols-3 gap-3">
            <CustomSelect
              formData={formData}
              setFormData={setFormData}
              value={formData.day}
              data={dayOptions}
              className="w-full"
              htmlFor="day"
            />
            <CustomSelect
              formData={formData}
              setFormData={setFormData}
              value={formData.month}
              data={monthOptions}
              className="w-full"
              htmlFor="month"
            />
            <CustomSelect
              formData={formData}
              setFormData={setFormData}
              value={formData.year}
              data={yearOptions}
              className="w-full"
              htmlFor="year"
            />
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center md:justify-end mt-12">
        <button
          onClick={() => {
            router.push("/artist-page/profile-for-artist");
          }}
          className="w-full md:w-auto text-[#035A7A] font-semibold rounded-[40px] cursor-pointer px-12 py-3.5 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)] active:scale-95 transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PersonalDetail;

const Input = ({ placeholder, id, value, onChange, className, readOnly }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      id={id}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full border border-[#D1D1D1] text-[#222222] placeholder:text-[#ADADAD] font-normal text-sm py-2 px-3 rounded-lg outline-none focus:border-[#3A98BB] bg-transparent ${className}`}
    />
  );
};

const Lable = ({ text, htmlFor }) => {
  return <label htmlFor={htmlFor}>{text}</label>;
};
