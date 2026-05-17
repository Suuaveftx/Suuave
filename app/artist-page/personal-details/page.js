"use client";
import { useState } from "react";
import PersonalDetail from "./_components/PersonalDetail";
import PersonalInformation from "./_components/PersonalInformation";
import AwardsCertification from "./_components/AwardsCertification";
import Profile from "./_components/Profile";
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
      fullName: "",
      username: "",
      email: "",
      nationality: new Set(["Nigeria"]),
      phoneCode: new Set([]),
      phoneNumber: "",
      currentCity: "",
      language: "",
      day: new Set([]),
      month: new Set([]),
      year: new Set([]),
      dob: "",
      about: "",
      skill: "",
      companyName: "",
      portfolioLink: "",
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
        <div className="min-h-screen bg-[#DBDBDB]/30">
          <div className="flex flex-col md:flex-row px-5 md:px-10 mt-5 md:mt-14 md:gap-32">
            {/* profile view and button switch */}

            <Profile
              setSelected={setSelected}
              formData={formData}
              setFormData={setFormData}
              selected={selected}
              step={step}
              setStep={setStep}
              className="hidden md:flex"
              preview={preview}
              handleImageChange={handleImageChange}
              hoveredField={hoveredField}
            />

            {/* Conditionally show content */}
            <div className="flex-1 mt-5 md:mt-6">
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
                    setHoveredField={setHoveredField}
                  />
                </>
              )}

              {selected === "ProfessionalInformation" && (
                <PersonalInformation
                  setSelected={setSelected}
                  setHoveredField={setHoveredField}
                  setStep={setStep}
                />
              )}

              {selected === "Awards/Certifications" && (
                <AwardsCertification
                  setSelected={setSelected}
                  setHoveredField={setHoveredField}
                />
              )}
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
