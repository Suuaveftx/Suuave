"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [showLicenseBtn, setShowLicenseBtn] = useState(false);
  const router = useRouter();

  const tabClasses = (tab) =>
    `px-1 py-2 cursor-pointer ${
      activeTab === tab
        ? "text-[#3A98BB] font-bold border-b-[3px] border-[#3A98BB]"
        : "text-gray-500"
    }`;

  const jobData = [
    {
      status: "Active",
      title: "Fashion Illustrator For African Attire Design",
      details: "Fixed Price | Posted 2 days ago",
      description:
        "We are seeking a talented and creative Fashion Illustrator to collaborate with our design team on a new line of African-inspired attire. The ideal candidate will have a strong understanding of African fashion, culture, and textile patterns. You will be responsible for bringing our design concepts to life through detailed illus... ",
      budget: "$200",
    },
  ];

  return (
    <div className="p-6">
      {/* Tab Bar */}
      <div className="flex lg:space-x-4 border-b mb-4 mx-4">
        <div
          className={tabClasses("recent")}
          onClick={() => setActiveTab("recent")}
        >
          Recently
        </div>
        <div
          className={tabClasses("saved")}
          onClick={() => setActiveTab("saved")}
        >
          Saved (90)
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(6)].map((_, index) => (
          <Link key={index} href={`/artist-page/job-details-page`} className="block">
            <div className="relative px-6 py-6 bg-white border-1 border-[#EAEAEA] rounded-2xl shadow-sm cursor-pointer mt-[29px] lg:mx-0 lg:my-0 mx-4">
              {/* Top-right Icons */}
              <div className="absolute mt-0 right-2 flex gap-6">
                <FaShareAlt color="#878787" />
                <FaRegBookmark color="#9FD2E5" />
              </div>

              {/* Job Information */}
              <p className="text-[#878787] text-xs leading-4 gap-1">
                Job Status:{" "}
                <span className="text-green-600">{jobData[0].status}</span>
              </p>
              <h2 className="text-lg text-[#222222] font-bold mt-2">
                {jobData[0].title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{jobData[0].details}</p>
              <p className="text-sm text-[#727272] mt-2">
                {jobData[0].description}
                <span className="text-[#3A98BB]"> Read More</span>
              </p>

              <div className="flex space-x-2 mt-4">
                {["Native", "African", "Native"].map((btn, idx) => (
                  <button
                    key={idx}
                    disabled
                    className="px-4 py-1 text-[#767676] bg-[#F0F0F0] rounded-full cursor-not-allowed"
                  >
                    {btn}
                  </button>
                ))}
              </div>

              <p className="text-gray-800 font-normal mt-4">
                Budget - <span className="font-bold"> {jobData[0].budget}</span>
              </p>

              {/* Special Mobile View for 2nd Card - bottom right */}
              {index === 1 && (
  <div className="absolute  right-4 mt-10 z-10 sm:hidden">
    {!showLicenseBtn ? (
      // Circle + at bottom right of card
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent card link
          setShowLicenseBtn(true);
        }}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_top_left,_#EAF9FF_19%,_#CCE7F2_100%)] text-[#035A7A] shadow-md"
      >
        <FiPlus size={24} />
      </button>
    ) : (
      // Expanded button in same card
      <button
        onClick={(e) => {
          e.preventDefault();
          router.push("/artist-page/license-your-design");
        }}
        className="flex items-center gap-2 bg-[radial-gradient(circle_at_top_left,_#EAF9FF_19%,_#CCE7F2_100%)] text-[#035A7A] px-6 py-4 rounded-full text-base  font-bold shadow-md w-full"
      >
        License Your Design
        <FiPlus size={18} />
      </button>
    )}
  </div>
)}

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
