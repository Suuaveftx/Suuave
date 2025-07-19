"use client";

import React from "react";
import {
  ChevronLeftIcon,
  PaperClipIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Card, CardBody, Button, Avatar, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";
import Navbar3 from "../../../components/Navbar3";
import ContractHeader from "./contract-header";

export default function ContractDetailsPage({ params }) {
  const router = useRouter();
  const contractId = params?.id || "24t64754"; // fallback for demo
  console.log(contractId);
  // Mock data - replace with actual data fetching based on contractId
  const contractData = {
    jobTitle: "Modern Fashion Attire Illustration",
    contractNumber: "24t64755",
    contractType: "Hire",
    role: "Fashion Artist",
    budget: "₦200,000",
    duration: "Within A Month",
    status: "Pending",
    attachedDocuments: [
      { name: "DocTGFile", type: "document" },
      { name: "DocE75", type: "legal" },
    ],
    artist: {
      name: "Tolu Otou",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      rating: 4.0,
      reviews: 2,
      avatar: "/logo.png",
    },
  };

  // Function to handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "ongoing":
        return "primary";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-[#EAEAEA] min-h-screen">
      <Navbar3 />
      <ContractHeader
        title="Contract Information"
        showBack
        onBack={handleBack}
      />

      <div className="max-w-6xl mx-auto px-2 md:px-8 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contract Details & Documents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contract Details Card */}
            <Card className="bg-white border border-gray-200" shadow="none">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Contract Details
                  </h2>
                  <Chip
                    color={getStatusColor(contractData.status)}
                    variant="flat"
                    size="sm"
                    className="font-medium"
                  >
                    {contractData.status}
                  </Chip>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-sm text-gray-600 w-32 mb-1 sm:mb-0">
                      Job Title -
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {contractData.jobTitle}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-sm text-gray-600 w-32 mb-1 sm:mb-0">
                      Contract Number -
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {contractData.contractNumber}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-sm text-gray-600 w-32 mb-1 sm:mb-0">
                      Contract Type -
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {contractData.contractType}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-sm text-gray-600 w-32 mb-1 sm:mb-0">
                      Role -
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {contractData.role}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-sm text-gray-600 w-32 mb-1 sm:mb-0">
                      Budget -
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {contractData.budget}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-sm text-gray-600 w-32 mb-1 sm:mb-0">
                      Contract Duration -
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {contractData.duration}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Attached Documents Card */}
            <Card className="bg-white border border-gray-200" shadow="none">
              <CardBody className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Attached Documents
                </h2>

                <div className="space-y-3">
                  {contractData.attachedDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <PaperClipIcon className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {doc.type} Document
                          {doc.type === "legal" ? " (NDA)" : ""}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Artist Info & Actions */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card className="bg-white border border-gray-200" shadow="none">
              <CardBody className="p-4 space-y-3">
                <Button
                  className="w-full bg-[#3A98BB] text-white font-medium rounded-full"
                  size="md"
                >
                  Message Artist
                </Button>
                <Button
                  variant="bordered"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 font-medium rounded-full"
                  size="md"
                >
                  Cancel Project
                </Button>
              </CardBody>
            </Card>

            {/* Artist Information Card */}
            <Card className="bg-white border border-gray-200" shadow="none">
              <CardBody className="p-6">
                <div className="text-center">
                  <Avatar
                    src={contractData.artist.avatar}
                    className="w-20 h-20 mx-auto mb-4"
                    name={contractData.artist.name}
                  />

                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {contractData.artist.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2">
                    {contractData.artist.role}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    📍 {contractData.artist.location}
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">Ratings</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(contractData.artist.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {contractData.artist.rating} (
                      {contractData.artist.reviews} Reviews)
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
