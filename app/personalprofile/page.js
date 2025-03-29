import React from "react";
import Image from "next/image";
import PersonalProfile from "./_components/PersonalProfile";
import AppLayout from "../../components/Applayout";
import Tabs from "../../components/Tabs";
import Link from "next/link";

// SkillsFormMobile component
const SkillsFormMobile = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md w-full">
      {/* Header: Let's know your major skills */}
      <h2 className="text-[22px] text-[#444444] font-semibold mb-1">
        Let&apos;s know your major skills
      </h2>
      <p className="text-sm text-[#727272] mb-4">
        Fill in your most comfortable skills.
      </p>
      <input
        type="text"
        placeholder="Eg 3D Illustrator"
        className="w-full border border-gray-300 rounded-md pl-[16px] pr-[16px] pt-[12px] pb-[12px] text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-[24px]"
      />

      {/* Header: Tell us about Yourself */}
      <h2 className="text-[22px] text-[#444444] font-semibold mt-6 mb-1">
        Tell us about Yourself
      </h2>
      <p className="text-sm text-[#727272] mb-2">
        Describe yourself to attract potential clients.
      </p>
      <textarea
        placeholder="Write about yourself..."
        rows={4}
        className="w-full border border-gray-300 rounded-md pl-[12px] pr-[25px] pt-[8px] pb-[12px] text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-[24px]"
      ></textarea>

      {/* Header: What language are you most comfortable with? */}
      <h2 className="text-[22px] text-[#444444] font-semibold mt-6 mb-1">
        What language are you most comfortable with?
      </h2>
      <p className="text-sm text-[#727272] mb-4">
        This will help us match you with the right clients.
      </p>
      <select
        className="w-full border border-gray-300 rounded-md p-[10px] text-sm text-[#3A98BB] shadow-sm   bg-white mb-[48px]"
        defaultValue="english" // Sets English as the default option
      >
        <option value="english" className="text-[#CCE7F2]">
          English
        </option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
        <option value="german">German</option>
        <option value="mandarin">Mandarin</option>
      </select>

      {/* Next Button */}
      <Link href={"/profileupload"}>
        <button
          type="button"
          className="w-full mt-6 bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] text-[#0A4A66] pl-[24px] pr-[24px] pt-[16px] pb-[16px] rounded-[32px]"
        >
          Next
        </button>
      </Link>
    </div>
  );
};

// Main Page Component
const page = () => {
  return (
    <>
      {/* Mobile view */}
      <div className="sm:hidden flex flex-col justify-center items-center">
        <Image
          src="/dev-images/logo.png"
          alt="Logo"
          width={70}
          height={60}
          className="mt-4"
        />
        <Tabs />
        {/* SkillsFormMobile visible only on mobile */}
        <SkillsFormMobile />
      </div>

      {/* Desktop view */}
      <div className="hidden sm:block">
        <AppLayout>
          <PersonalProfile />
        </AppLayout>
      </div>
    </>
  );
};

export default page;
