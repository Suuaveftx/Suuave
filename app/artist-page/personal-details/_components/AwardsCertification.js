import Image from "next/image";
import React from "react";

const AwardsCertification = ({ setSelected, formData, setFormData }) => {
  return (
    <div className="bg-[#FAFAFA] border border-[#DEDEDE] rounded-2xl p-3 md:p-6 w-full h-full">
      <h1 className="text-[#3A98BB] font-bold text-xl">Awards/Certification</h1>
      <p className="text-[#767676] font-normal text-base mt-2">
        Add any related awards or certifications.
      </p>
      <section className="space-y-10 mt-5">
        {/*Name of Award/Certificate*/}
        <div className="w-full flex flex-col gap-2">
          <Lable
            htmlFor="nameofAwardCertificate"
            text="Name of Award/Certificate"
          />
          <Input
            id="nameofAwardCertificate"
            placeholder="Eg Best Illustrator Award"
            value={formData.nameofAwardCertificate}
            onChange={(e) =>
              setFormData({
                ...formData,
                nameofAwardCertificate: e.target.value,
              })
            }
          />
        </div>
        {/*Awarded/Issued by */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="awardedIssuedBy" text="Awarded/Issued by" />
          <Input
            id="awardedIssuedBy"
            placeholder="Organization that issued/awarded "
            value={formData.awardedIssuedBy}
            onChange={(e) =>
              setFormData({
                ...formData,
                awardedIssuedBy: e.target.value,
              })
            }
          />
        </div>
        {/*Upload Certificate/Award*/}
        <div className="w-full flex flex-col gap-2">
          <Lable
            htmlFor="uploadCertificateAward"
            text="Upload Certificate/Award (Optional)"
          />
          <div className="flex flex-col md:flex-row items-center cursor-pointer justify-center gap-3 w-full h-32 rounded-lg border border-[#D1D1D1]">
            <Image
              src="/svg/paper-clip.svg"
              alt="icon"
              width={24}
              height={24}
            />
            <p className="text-[#767676] font-normal text-base">
              Click to upload file
            </p>
          </div>
        </div>
        <b className="text-[#222222] font-normal text-base">DOC00263R</b>

        {/* submit button */}
        <div className="w-full px-10 md:px-0 justify-between flex md:justify-end items-center gap-5">
          <button className="text-[#3A98BB] px-6 py-2 cursor-pointer ">
            Skip
          </button>
          <button
            onClick={() => setSelected("Awards/Certifications")}
            className="text-[#035A7A] rounded-xl cursor-pointer drop-shadow-xl px-6 py-2  text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default AwardsCertification;

const Input = ({ placeholder, id, value, onChange }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      id={id}
      placeholder={placeholder}
      className="w-full border border-[#D1D1D1] text-[#878787] font-normal text-base py-2 px-2 rounded-lg outline-[#3A98BB] bg-transparent "
    />
  );
};

const Lable = ({ text, htmlFor }) => {
  return <label htmlFor={htmlFor}>{text}</label>;
};
