// import Tabs from "../../../components/Tabs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tabs from "../../../../components/Tabs";
import { africanDialCodes as dialCodes, africanCountries as countries } from "../../../../utils/countryData";
import { Select, SelectItem } from "@heroui/react";

const NationalityMobile = () => {
  return (
    <>
      {/* Centered Logo */}
      <div className="sm:hidden flex justify-center">
        <Image src="/dev-images/logo.png" alt="Logo" width={50} height={50} />
      </div>

      {/* Tab component */}
      <div className=" sm:hidden mb-[22px]">
        <Tabs />
      </div>
      <div className="sm:hidden flex flex-col bg-[#FAFAFA] border-2 border-[#E0E0E0] rounded-[8px] px-4 py-6  w-full h-auto">
        {/* Section 1: Nationality */}
        <div className="space-y-4 mb-[16px]">
          {/* Header and Paragraph */}
          <div className="mb-[24px]">
            <h1 className="text-[32px] font-bold text-[#444444]">
              Tell us about where you reside
            </h1>
            <p className="text-sm text-[#BABABA]">Fill in your location.</p>
          </div>

          {/* Nationality Input */}
          <div className="space-y-2 mb-[16px]">
            <label
              className="text-[16px] font-medium text-[#444444]"
              htmlFor="nationality"
            >
              Nationality
            </label>
            <select
              id="nationality"
              className="w-full border border-[#D1D1D1] rounded-[8px] pl-[8px] pr-[16px] pt-[12px] pb-[12px] text-[16px] bg-white text-black"
            >
              <option value="">Select</option>
              {countries.map((country) => (
                <option key={country.key} value={country.key.toLowerCase()}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          {/* Current City Input */}
          <div className="space-y-2 mb-[32px]">
            <label
              className="text-[16px] font-medium text-[#444444]"
              htmlFor="currentCity"
            >
              Current City
            </label>
            <select
              id="currentCity"
              className="w-full border border-[#D1D1D1] rounded-[8px] pl-[10px] pr-[10px] pt-[12px] pb-[12px] text-[16px] text-[#BABABA] bg-white"
            >
              <option value="">Select</option>
              <option value="lagos">Lagos</option>
              <option value="accra">Accra</option>
              <option value="new-york">New York</option>
              {/* Add more cities as needed */}
            </select>
          </div>
        </div>

        {/* Section 2: Phone Number */}
        <div className="space-y-4">
          {/* Header and Paragraph */}
          <div>
            <h1 className="text-[32px] font-bold text-[#444444]">
              Kindly fill in your Phone number
            </h1>
            <p className="text-sm text-gray-500">
              This will not be accessible by visitors.
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-[#444444]"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <div className="flex space-x-2">
              {/* Country Code */}
              <div className="w-[130px] shrink-0">
                <Select
                  aria-label="Country Code"
                  className="font-normal text-sm"
                  placeholder="Select"
                  variant="bordered"
                  classNames={{
                    trigger: "border border-[#D1D1D1] rounded-[8px] bg-white h-[46px] shadow-none",
                  }}
                  renderValue={(items) => {
                    return items.map((item) => (
                      <div key={item.key} className="flex items-center gap-2">
                        {item.data?.icon && (
                          <img
                            alt={item.data.label}
                            className="w-5 h-4 object-cover rounded-[2px]"
                            src={item.data.icon}
                          />
                        )}
                        <span className="truncate">{item.data?.label}</span>
                      </div>
                    ));
                  }}
                >
                  {dialCodes.map((code) => (
                    <SelectItem
                      key={code.key}
                      textValue={code.label}
                      startContent={
                        code.icon ? (
                          <img
                            alt={code.label}
                            className="w-5 h-4 object-cover rounded-[2px]"
                            src={code.icon}
                          />
                        ) : null
                      }
                    >
                      {code.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Phone Number */}
              <input
                type="text"
                id="phone"
                className="flex-1 w-full border border-[#D1D1D1] rounded-[8px] pl-[12px] pr-[16px] pt-[12px] pb-[12px] text-sm"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex space-x-[39px] mt-6 w-[306px] h-[52px]">
          <button className="text-[16px] text-[#3A98BB]">Skip</button>
          <Link href={"/portfoliomobile"}>
            <button className="bg-[#E8E8E8] bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] text-[#0A4A66] pl-[24px] pr-[24px] pt-[16px] pb-[16px] rounded-full w-[128px] h-[52px] text-[16px]">
              Next
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NationalityMobile;
