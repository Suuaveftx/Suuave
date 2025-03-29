"use client";
import Tabs from "../../../components/Tabs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const AwardMobile = () => {
  const [award, setAward] = useState({
    name: "",
    issuedBy: "",
    certificate: null,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAward({ ...award, certificate: file });
    }
  };

  return (
    <>
      {/* Centered Logo */}
      <div className="sm:hidden flex justify-center mt-4">
        <Image src="/dev-images/logo.png" alt="Logo" width={50} height={50} />
      </div>

      {/* Tab component */}
      <div className=" sm:hidden mb-[22px]">
        <Tabs />
      </div>
      <div className="sm:hidden flex flex-col items-center bg-[#FAFAFA] px-4 py-6 space-y-8 w-full min-h-screen overflow-y-auto">
        {/* Award Header and Description */}
        <div className="w-full space-y-2 mb-[24px] text-left">
          <h1 className="text-[22px] font-bold text-[#444444]">
            Awards/Certification (Optional)
          </h1>
          <p className="text-sm text-gray-500">
            Add any related Awards/Certification you acquired
          </p>
        </div>

        {/* Name of Award/Certificate Input */}
        <div className="space-y-2 mb-[16px] w-full">
          <label
            className="text-[16px] font-medium text-[#444444]"
            htmlFor="awardName"
          >
            Name of Award/Certificate
          </label>
          <input
            type="text"
            id="awardName"
            value={award.name}
            onChange={(e) => setAward({ ...award, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md pl-[12px] pr-[16px] pt-[12px] pb-[12px] text-sm"
            placeholder="Enter Award/Certificate Name"
          />
        </div>

        {/* Awarded/Issued by Input */}
        <div className="space-y-2 mb-[16px] w-full">
          <label
            className="text-[16px] font-medium text-[#444444]"
            htmlFor="issuedBy"
          >
            Awarded/Issued by
          </label>
          <input
            type="text"
            id="issuedBy"
            value={award.issuedBy}
            onChange={(e) => setAward({ ...award, issuedBy: e.target.value })}
            className="w-full border border-gray-300 rounded-md pl-[12px] pr-[16px] pt-[12px] pb-[12px] text-sm"
            placeholder="Enter Issuer Name"
          />
        </div>

        {/* Upload Certificate/Award Section */}
        <div className="space-y-2 mb-[24px] w-full">
          <label
            className="text-[16px] font-medium text-[#444444]"
            htmlFor="certificateUpload"
          >
            Upload Certificate/Award (Optional)
          </label>
          <div className="flex flex-col justify-center items-center border border-gray-300 h-[122px]">
            <div
              className="rounded-md flex justify-center items-center cursor-pointer"
              onClick={() =>
                document.getElementById("certificateUpload").click()
              }
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.672 7.21159L9.08602 13.7976C8.895 13.9821 8.74264 14.2028 8.63782 14.4468C8.533 14.6908 8.47783 14.9532 8.47552 15.2188C8.47321 15.4843 8.52381 15.7477 8.62438 15.9935C8.72494 16.2393 8.87344 16.4626 9.06123 16.6504C9.24902 16.8382 9.47232 16.9867 9.71811 17.0872C9.9639 17.1878 10.2273 17.2384 10.4928 17.2361C10.7584 17.2338 11.0208 17.1786 11.2648 17.0738C11.5088 16.969 11.7295 16.8166 11.914 16.6256L18.328 10.0396C19.0567 9.28518 19.4598 8.27477 19.4507 7.22598C19.4416 6.1772 19.0209 5.17395 18.2793 4.43232C17.5377 3.69068 16.5344 3.27001 15.4856 3.26089C14.4368 3.25178 13.4264 3.65496 12.672 4.38359L6.25702 10.9686C5.13171 12.0939 4.49951 13.6202 4.49951 15.2116C4.49951 16.803 5.13171 18.3293 6.25702 19.4546C7.38233 20.5799 8.90859 21.2121 10.5 21.2121C12.0915 21.2121 13.6177 20.5799 14.743 19.4546L21 13.2116"
                  stroke="#3A98BB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-500">Click to upload file</span>
            <input
              type="file"
              id="certificateUpload"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between space-x-[39px] mt-6">
          <button className="text-sm text-[#3A98BB] font-bold">Skip</button>
          <Link href={"/donemobile"}>
            <button className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] text-[#0A4A66] pl-[24px] pr-[24px] pt-[16px] pb-[16px] rounded-full flex-1 w-[128px] h-[52px] text-sm">
              Submit
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AwardMobile;
