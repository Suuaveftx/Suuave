"use client";
import Image from "next/image";
import { useState } from "react";
import BrandDetails from "./_components/BrandDetails";
import Profile from "./_components/Profile";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandDetailsSchema } from "@/utils/validations";

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
  const [step, setStep] = useState(1);
  const [hoveredField, setHoveredField] = useState(null);
  // Personal details form
  const methods = useForm({
    resolver: zodResolver(brandDetailsSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      nationality: new Set([]),
      phoneCode: new Set([]),
      phoneNumber: "",
      currentCity: "",
      language: "",
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
      brandCategory: new Set([]),
      businessName: "",
      role: "",
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

      <div className="flex flex-col md:flex-row px-5 md:px-10 mt-5 md:mt-0">
        {/* sidebar */}
        <Profile
          setSelected={setSelected}
          formData={formData}
          setFormData={setFormData}
          selected={selected}
          step={step}
          setStep={setStep}
          hoveredField={hoveredField}
          className="flex"
          preview={preview}
          handleImageChange={handleImageChange}
        />

        {/* Form content */}
        <div className="flex-1">
          <BrandDetails
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            setHoveredField={setHoveredField}
          />
        </div>
      </div>
    </FormProvider>
    </>
  );
}
