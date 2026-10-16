"use client";
import React, { useState } from "react";
import PersonalDetail from "../personal-details/_components/PersonalDetail";
import PersonalInformation from "../personal-details/_components/PersonalInformation";
import AwardsCertification from "../personal-details/_components/AwardsCertification";
import Profile from "../personal-details/_components/Profile";
import { useForm, FormProvider } from "react-hook-form";

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

  const [step, setStep] = useState(1);
  const [hoveredField, setHoveredField] = useState(null);

  // Personal details form
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
      language: new Set(["English"]),
      dob: "1995-05-15",
      about: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.",
      skill: "Fashion Artist | 3D Illustrator",
      companyName: "Ocean Avenue",
      portfolioLink: "https://behance.net/oceanclara",
      availability: true,
      awards: [
        {
          name: "Excellence in 3D Design 2023",
          issuedBy: "Recognition for outstanding contribution to digital fashion",
          previews: ["/dev-images/Awards.png"]
        }
      ],
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

        <div className="flex flex-col md:flex-row px-5 md:px-10 pt-2 md:gap-32">
          {/* profile view and button switch */}
          <Profile
            setSelected={setSelected}
            selected={selected}
            className="hidden md:flex"
            preview={preview}
            handleImageChange={handleImageChange}
            hoveredField={hoveredField}
            step={step}
            setStep={setStep}
          />

          {/* Conditionally show content */}
          <div className="flex-1 mt-5 md:mt-6">
            {selected === "PersonalDetail" && (
              <>
                <Profile
                  setSelected={setSelected}
                  selected={selected}
                  className="flex md:hidden"
                  preview={preview}
                  handleImageChange={handleImageChange}
                  hoveredField={hoveredField}
                  step={step}
                  setStep={setStep}
                />
                <PersonalDetail
                  setSelected={setSelected}
                  setHoveredField={setHoveredField}
                  isEdit={true}
                  submitHref="/artist-page/profile-for-artist"
                />
              </>
            )}

            {selected === "ProfessionalInformation" && (
              <>
                <Profile
                  setSelected={setSelected}
                  selected={selected}
                  className="flex md:hidden"
                  preview={preview}
                  handleImageChange={handleImageChange}
                  hoveredField={hoveredField}
                  step={step}
                  setStep={setStep}
                />
                <PersonalInformation
                  setSelected={setSelected}
                  setHoveredField={setHoveredField}
                  setStep={setStep}
                  isEdit={true}
                  submitHref="/artist-page/profile-for-artist"
                />
              </>
            )}

            {selected === "Awards/Certifications" && (
              <>
                <Profile
                  setSelected={setSelected}
                  selected={selected}
                  className="flex md:hidden"
                  preview={preview}
                  handleImageChange={handleImageChange}
                  hoveredField={hoveredField}
                  step={step}
                  setStep={setStep}
                />
                <AwardsCertification
                  setSelected={setSelected}
                  setHoveredField={setHoveredField}
                  isEdit={true}
                  submitHref="/artist-page/profile-for-artist"
                />
              </>
            )}
          </div>
        </div>
      </FormProvider>
    </>
  );
}
