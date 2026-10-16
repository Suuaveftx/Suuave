"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import BrandDetails from "../_components/BrandDetails";
import Profile from "../_components/Profile";
import { useForm, FormProvider } from "react-hook-form";

export default function Page() {
  const router = useRouter();
  const [selected, setSelected] = useState("PersonalDetail");
  const [preview, setPreview] = useState("/dev-images/profile.png");

  // image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const [step, setStep] = useState(1);
  const [hoveredField, setHoveredField] = useState(null);

  const methods = useForm({
    defaultValues: {
      fullName: "Ocean Clara",
      username: "ocean_clara",
      email: "ocean@suuave.com",
      nationality: new Set(["Nigeria"]),
      countryOfResidence: new Set(["Nigeria"]),
      phoneCode: new Set(["+234"]),
      phoneNumber: "8000000000",
      currentCity: "Lagos",
      language: "English",
      dob: "1990-03-22",
      about: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
      skill: "Fashion Designer | Branding",
      companyName: "Ocean Avenue",
      portfolioLink: "https://behance.net/oceanclara",
      uploadedPortfolio: "",
      availability: true,
      nameofAwardCertificate: "Excellence in Fashion Design 2023",
      awardedIssuedBy: "Fashion Council Nigeria",
      uploadCertificateAward: "",
      brandCategory: new Set(["Independent Brand / Designer"]),
      businessName: "Ocean Avenue Ltd.",
      role: "Creative Director",
    },
    mode: "onChange"
  });

  const { watch } = methods;
  const formData = watch();

  return (
    <>
      <FormProvider {...methods}>
        <div className="min-h-screen bg-[#DBDBDB]/30">

          <div className="flex flex-col md:flex-row px-5 md:px-10 pt-2">
            <Profile
              setSelected={setSelected}
              formData={formData}
              selected={selected}
              step={step}
              setStep={setStep}
              hoveredField={hoveredField}
              className="flex"
              preview={preview}
              handleImageChange={handleImageChange}
            />
            <div className="flex-1">
              <BrandDetails
                step={step}
                setStep={setStep}
                setHoveredField={setHoveredField}
                isEdit={true}
                submitHref="/fashion-designers/profile"
              />
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
