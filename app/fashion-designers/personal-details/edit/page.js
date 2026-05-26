"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

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

  // Personal details form
  const [step, setStep] = useState(2); // In edit mode, we might want to start at personal details or fundamentals. Default to 2 for PersonalDetails if that's the intent.
  const [hoveredField, setHoveredField] = useState(null);

  const methods = useForm({
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

  const { watch } = methods;
  const formData = watch();

  return (
    <>
      <FormProvider {...methods}>
        <div className="md:hidden px-5 py-4 flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            className="-ml-3 text-black"
            onPress={() => router.push('/fashion-designers/profile')}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 font-satoshi">Personal Information</h1>
        </div>

        <div className="flex flex-col md:flex-row px-5 md:px-10 pt-4 md:pt-24">
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
      </FormProvider>
    </>
  );
}
