"use client";
import Image from "next/image";
import { useState } from "react";
import PersonalDetail from "./_components/PersonalDetail";
import PersonalInformation from "./_components/PersonalInformation";
import AwardsCertification from "./_components/AwardsCertification";
import Profile from "./_components/Profile";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalDetailsSchema } from "@/utils/validations";

export default function Page() {
  const [selected, setSelected] = useState("PersonalDetail");
  const [preview, setPreview] = useState("/dev-images/profile.png");
  const [previewPortfolio, setPreviewPortfolio] = useState([]);
  const [previewAwardCertificate, setPreviewAwardCertificate] = useState([]);

  // image preview handler

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadedPortfolio = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewPortfolio((prev) => [...prev, ...newPreviews]);
    }
  };

  const removePortfolioItem = (index) => {
    setPreviewPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadedAwardCertificate = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewAwardCertificate((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeAwardCertificateItem = (index) => {
    setPreviewAwardCertificate((prev) => prev.filter((_, i) => i !== index));
  };

  const [hoveredField, setHoveredField] = useState(null);

  // Personal details form
  const methods = useForm({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
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
      awards: [{ name: "", issuedBy: "", previews: [] }],
    },
    mode: "onChange"
  });

  const { watch, setValue } = methods;
  const formData = watch();
  const setFormData = (updates) => {
    Object.entries(updates).forEach(([key, value]) => {
      setValue(key, value);
    });
  };
  return (
    <>
    <FormProvider {...methods}>
      <div className="flex flex-col md:flex-row px-5 md:px-10 mt-10 md:mt-10">
        {/* profile view and button switch */}

        <Profile
          setSelected={setSelected}
          formData={formData}
          setFormData={setFormData}
          selected={selected}
          className="hidden md:flex"
          preview={preview}
          handleImageChange={handleImageChange}
          hoveredField={hoveredField}
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
              hoveredField={hoveredField}
            />
            <PersonalDetail
              setSelected={setSelected}
              formData={formData}
              setFormData={setFormData}
              setHoveredField={setHoveredField}
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
            removePortfolioItem={removePortfolioItem}
            setHoveredField={setHoveredField}
          />
        )}

        {selected === "Awards/Certifications" && (
          <AwardsCertification
            setSelected={setSelected}
            setHoveredField={setHoveredField}
          />
        )}


      </div>
    </FormProvider>
    </>
  );
}
