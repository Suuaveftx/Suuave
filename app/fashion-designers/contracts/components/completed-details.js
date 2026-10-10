"use client";

import React from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, Button, Avatar, Chip } from "@heroui/react";

import ContractHeader from "./contract-header";
import { useRouter } from "next/navigation";
import { TiLocation } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";
import PageContainer from "../../../../components/layout/PageContainer";

export default function CompletedDetailsPage({ params }) {
  const contractId = params?.id || "24t64754"; // fallback for demo
  console.log(contractId);
  // Mock data - replace with actual data fetching based on contractId
  const contractData = {
    jobTitle: "Modern Fashion Attire Illustration",
    contractNumber: "24t64754",
    role: "Fashion Artist",
    budget: "₦200,000",
    timeframe: "21 Days",
    status: "Completed",
    attachedDocuments: [
      { name: "Doc1534re", type: "document" },
      { name: "Doc573", type: "legal" },
    ],
    artist: {
      name: "Tolu",
      fullName: "Tolu Ego",
      username: "tolu",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      rating: 0.0,
      reviews: 0,
      avatar: "/contract/designer.jpg",
      jobsPosted: 1,

      paymentMade: 0,
    },
    submittedWork: {
      message: "Hello Josh,\nHere is the final submission of the work. Kindly review and if any iteration please let me know. Thanks.",
      files: [
        { name: "Look 1.png", size: "1.3mb", image: "/dev-images/fashionImg1.png" },
        { name: "Look 1.png", size: "1.3mb", image: "/dev-images/fashionImg2.png" },
      ]
    }
  };

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-[#035A7A]";
      case "ongoing":
        return "text-[#279711]";
      case "completed":
        return "text-[#949494]";
      default:
        return "default";
    }
  };

  const router = useRouter();

  return (
    <>
      <PageContainer>
        <ContractHeader title="Contracts Information" maxWidth="max-w-6xl" tab="completed" showBack={true} withNavbarOffset={false} />
        <div className="w-full mx-auto pb-6 lg:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-0 -mx-4 lg:mx-0">
            {/* Left Column - Contract Details & Documents */}
            <div className="lg:col-span-2 space-y-[6px] lg:space-y-2">
              {/* Contract Details Card */}
              <Card className="bg-white border border-gray-200" shadow="none">
                <CardBody className="p-4 lg:p-6 pb-8 lg:pb-12">
                  {/* Combined header logic: title + badge visible everywhere */}
                  <div className="flex items-center justify-between mb-4 lg:mb-6 lg:border-b lg:pb-2">
                    <h2 className="text-[17px] lg:text-2xl font-bold lg:font-semibold text-gray-900">Contract Details</h2>
                    <span className="bg-[#F5F5F5] text-[#949494] px-3 py-1 rounded-full text-xs font-semibold capitalize">{contractData.status}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      {[
                        { label: "Job Title", value: contractData.jobTitle },
                        { label: "Status", value: contractData.status },
                        { label: "Contract Number", value: contractData.contractNumber },
                        { label: "Role", value: contractData.role },
                        { label: "Budget", value: contractData.budget },
                        { label: "Timeframe", value: contractData.timeframe },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-[38%_62%] sm:grid-cols-[8rem_1fr] md:gap-4 gap-2 items-start w-full ${item.label === 'Status' ? 'hidden lg:grid' : ''}`}
                        >
                          <span
                            className={`${item.label === "Status" ? "lg:hidden" : ""
                              } ${item.label === "Contract Number" ? "lg:-mt-4" : ""
                              }  md:text-md text-sm mb-1 sm:mb-0 font-light`}
                          >
                            {item.label}
                          </span>
                          {item.label === "Status" ? (
                            <div className="flex items-center gap-2 lg:hidden">
                              <span className="bg-[#F5F5F5] text-[#949494] px-3 py-1 rounded-full text-xs font-semibold capitalize">
                                {item.value}
                              </span>
                            </div>
                          ) : (
                            <span
                              className={`${item.label === "Contract Number" ? "lg:-mt-4" : ""
                                }  md:text-md text-sm font-proximanova break-words whitespace-normal`}
                            >
                              {item.value}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Attached Documents Card */}
              <Card className="bg-white" shadow="none">
                <CardBody className="p-6 pb-4">
                  <h2 className="md:text-2xl text-lg font-semibold md:mb-2 -mt-2">
                    Attached Documents
                  </h2>

                  {contractData.attachedDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start px-3 md:py-3 py-2 rounded-lg transition-colors cursor-pointer "
                    >
                      <div className="flex items-center justify-center gap-2">
                        <PaperClipIcon className="md:h-5 md:w-5 h-4 w-4" />
                        <p className="md:text-md text-sm font-proximanova text-[#3A98BB]">
                          {doc.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>

              {/* Submitted Work & Files Card */}
              <Card className="bg-white mt-[6px] lg:mt-2" shadow="none">
                <CardBody className="p-4 lg:p-6 pb-6 lg:pb-8">
                  <h2 className="md:text-2xl text-lg font-semibold md:mb-6 mb-4">
                    Submitted Work
                  </h2>
                  <div className="border border-gray-100 rounded-xl p-5 md:p-6 bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar
                        src={contractData.artist.avatar}
                        className="w-8 h-8 rounded-full"
                        name={contractData.artist.fullName}
                      />
                      <span className="font-bold text-gray-900 text-[15px]">
                        {contractData.artist.fullName}
                      </span>
                    </div>
                    <p className="text-[#333333] text-[14px] font-proximanova leading-relaxed whitespace-pre-wrap">
                      {contractData.submittedWork.message}
                    </p>
                  </div>

                  <h2 className="md:text-[19px] text-lg font-semibold text-gray-900 md:mb-4 mb-3 mt-6 md:mt-8">
                    Files
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {contractData.submittedWork.files.map((file, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-3 flex items-center gap-4 bg-white hover:border-gray-300 transition-colors w-full sm:w-[240px]">
                        <img src={file.image} alt={file.name} className="w-[60px] h-[60px] object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 overflow-hidden">
                          <p className="text-[13px] font-bold text-gray-900 truncate">{file.name}</p>
                          <p className="text-[12px] text-gray-500 mt-0.5">{file.size}</p>
                        </div>
                        <button className="text-gray-800 hover:text-black transition-colors flex-shrink-0 mr-2" onClick={() => {}}>
                          <FiDownload className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Right Column - Artist Info & Actions */}
            <div className="flex gap-2 flex-col lg:flex-col">
              {/* Action Buttons - Desktop Only */}
              <Card className="hidden lg:block bg-white border border-gray-200 drop-shadow-md rounded-2xl">
                <CardBody className="py-4 lg:py-6 px-6 md:px-8 flex flex-col items-center justify-center gap-4">
                  <Button
                    className="w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] h-[44px] text-[#035A7A] font-semibold rounded-full border-0 shadow-sm text-sm"
                    radius="full"
                    onClick={() =>
                      router.push(
                        `/fashion-designers/contracts/retain?artist=${contractData.artist.username}`
                      )
                    }
                  >
                    Retain Artist
                  </Button>
                  <Button
                    className="w-full bg-transparent h-[44px] text-[#111111] font-semibold rounded-full border border-[#3A98BB] text-sm"
                    radius="full"
                    onClick={() => router.push("/fashion-designers/rate-review")}
                  >
                    Rate Artist
                  </Button>
                </CardBody>
              </Card>

              {/* Artist Information Card */}
              <Card className="bg-white border font-satoshi border-gray-200 mt-[6px] lg:mt-0" shadow="none">
                <CardBody className="p-4 lg:p-4">
                  {/* Mobile: compact horizontal row */}
                  <div className="lg:hidden">
                    <h3 className="text-[15px] font-semibold text-[#111111] mb-3 border-b border-gray-100 pb-3">About the Artist</h3>
                    <Link href="/artist-page/profile-vistor-view" className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={contractData.artist.avatar}
                          className="w-11 h-11 rounded-full flex-shrink-0"
                          name={contractData.artist.name}
                        />
                        <div>
                          <p className="text-[15px] font-semibold text-[#3A98BB] leading-tight">{contractData.artist.name}</p>
                          <p className="text-[13px] text-gray-500 mt-0.5">{contractData.artist.role}</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>

                  {/* Desktop: centered layout */}
                  <div className="hidden lg:block text-center font-satoshi">
                    <h3 className="text-2xl font-bold mb-6">About the Artist</h3>
                    <Link href="/artist-page/profile-vistor-view" className="block w-fit mx-auto">
                      <Avatar
                        src={contractData.artist.avatar}
                        className="w-28 h-28 mx-auto mb-4 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                        name={contractData.artist.name}
                      />
                    </Link>
                    <h3 className="text-md font-proximanova mb-1">
                      <Link href="/artist-page/profile-vistor-view" className="text-[#3A98BB] hover:underline">@{contractData.artist.username}</Link>
                    </h3>
                    <p className="text-sm text-[#222222] mb-4">{contractData.artist.role}</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-[#222222] mb-2">
                      <TiLocation className="size-5 fill-[#878787]" />
                      <span>{contractData.artist.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-6 text-[#222222]">
                      <span>Ratings</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < contractData.artist.rating ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-sm text-[#3A98BB]">({contractData.artist.reviews} <Link href="/artist-page/profile-vistor-view?tab=reviews">Reviews</Link>)</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-4 z-50 lg:hidden drop-shadow-xl">
        <div className="flex flex-row items-center justify-center gap-3 w-full">
          <Button
            className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] h-[44px] text-[#035A7A] font-semibold rounded-full border-0 shadow-sm text-sm"
            radius="full"
            onClick={() =>
              router.push(
                `/fashion-designers/contracts/retain?artist=${contractData.artist.username}`
              )
            }
          >
            Retain Artist
          </Button>
          <Button
            className="flex-1 bg-transparent h-[44px] text-[#111111] font-semibold rounded-full border border-[#3A98BB] text-sm"
            radius="full"
            onClick={() => router.push("/fashion-designers/rate-review")}
          >
            Rate Artist
          </Button>
        </div>
      </div>
    </>
  );
}
