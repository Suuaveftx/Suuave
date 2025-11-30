"use client";
import Image from "next/image";
import { useState } from "react";
import PersonalDetail from "./_components/PersonalDetail";
import PersonalInformation from "./_components/PersonalInformation";
import AwardsCertification from "./_components/AwardsCertification";
import Profile from "./_components/Profile";

export default function Page() {
  const [selected, setSelected] = useState("PersonalDetail");
  const [preview, setPreview] = useState("/dev-images/profile.png");
  const [previewPortfolio, setPreviewPortfolio] = useState(null);
  const [previewAwardCertificate, setPreviewAwardCertificate] = useState(null);

  // image preview handler

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

   const uploadedPortfolio = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewPortfolio(URL.createObjectURL(file));
    }
  };

     const uploadedAwardCertificate = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewAwardCertificate(URL.createObjectURL(file));
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
      <div className="md:hidden mt-5 px-5">
        <Image src="/svg/mobile-logo.svg" alt="icon" width={140} height={40} />
      </div>
      <h1 className=" border-b-2 md:mx-10 border-[#EAEAEA] py-3 font-bold text-2xl text-[#222222] px-5 md:px-0 md:mt-5 hidden md:block">
        Profile Setting
      </h1>
      <div className="flex flex-col md:flex-row mt-10 px-5 md:px-10">
        {/* profile view and button switch */}

        <Profile
          setSelected={setSelected}
          formData={formData}
          setFormData={setFormData}
          selected={selected}
          className="hidden md:flex"
          preview={preview}
          handleImageChange={handleImageChange}
        />

        {/* Conditionally show content */}
        {selected === "PersonalDetail" && (
          <>
            <Profile
              setSelected={setSelected}
              formData={formData}
              setFormData={setFormData}
              selected={selected}
              className="flex md:hidden"
              preview={preview}
              handleImageChange={handleImageChange}
            />
            <PersonalDetail
              setSelected={setSelected}
              formData={formData}
              setFormData={setFormData}
            />
          </>
        )}

        {selected === "ProfessionalInformation" && (
          <PersonalInformation
            setSelected={setSelected}
            formData={formData}
            setFormData={setFormData}
            uploadedPortfolio={uploadedPortfolio}
            previewPortfolio={previewPortfolio}
            

          />
        )}

        {selected === "Awards/Certifications" && (
          <AwardsCertification
            setSelected={setSelected}
            formData={formData}
            setFormData={setFormData}
            uploadedAwardCertificate={uploadedAwardCertificate}
            previewAwardCertificate={previewAwardCertificate}
          />
        )}
      </div>
    </>
  );
}
