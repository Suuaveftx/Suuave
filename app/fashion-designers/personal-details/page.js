"use client";
import Image from "next/image";
import { useState } from "react";

import BrandDetails from "./_components/BrandDetails";
import Profile from "./_components/Profile";

export default function Page() {
  const [selected, setSelected] = useState("PersonalDetail");
  const [preview, setPreview] = useState("/dev-images/profile.png");

  // image preview handler

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Personal details state

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    nationality: new Set([]),
    phoneCode: new Set([]),
    phoneNumber: "",
    currentCity: "",
    language: new Set([]),
    day: new Set([]),
    month: new Set([]),
    year: new Set([]),
    about: "",
    skill: "",
    companyName: "",
    portfolioLink: "",
    uploadedPortfolio: "",
    availability: false,
    nameofAwardCertificate: "",
    awardedIssuedBy: "",
    uploadCertificateAward: "",
  });


  return (
    <>
      <div className="md:hidden px-5">
        <Image src="/svg/mobile-logo.svg" alt="icon" width={140} height={40} />
      </div>
      <h1 className=" border-b-2 md:mx-10 border-[#EAEAEA] py-3 font-bold text-2xl text-[#222222] px-5 md:px-0 hidden md:block">
        Profile Setting
      </h1>
      <div className="flex flex-col md:flex-row px-5 md:px-10">
        {/* Conditionally show content */}
        {selected === "PersonalDetail" && (
          <>
            <Profile
              setSelected={setSelected}
              formData={formData}
              setFormData={setFormData}
              selected={selected}
              className="flex "
              preview={preview}
              handleImageChange={handleImageChange}
            />
            <BrandDetails
              setSelected={setSelected}
              formData={formData}
              setFormData={setFormData}
            />
          </>
        )}
      </div>
    </>
  );
}
