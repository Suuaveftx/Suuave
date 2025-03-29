"use client";
import { Card, CardBody } from "@heroui/card";
import Image from "next/image";
import CustomButton from "../../../components/CustomButton";
import AcceptModal from "../../../components/AcceptModal";
import DeclineModal from "../../../components/DeclineModal";

const jobDetails = {
  details: [
    { label: "Job Title", value: "Modern Fashion Attire Illustration" },
    { label: "Contract Number", value: "24t64754" },
    { label: "Contract Type", value: "Hire" },
    { label: "Role", value: "Fashion Artist" },
    { label: "Payment", value: "N200,000" },
    { label: "Contract Duration", value: "Within A Month" },
  ],
  attachments: [
    { fileName: "Doc1534re", filePath: "/dev-images/Attach2.png" },
    { fileName: "Doc1534re", filePath: "/dev-images/Attach2.png" },
  ],
};

export default function JobCard() {
  return (
    <div className="flex flex-col p-6">
      <Card className="w-full h-[100vh] p-4 shadow-lg border-1 border-[#D3D3D3]">
        <CardBody className="space-y-4">
          {/* Mapping through job details */}
          {jobDetails.details.map((item, index) => (
            <div key={index} className="flex gap-8">
              <h5 className="font-semibold">{item.label} -</h5>
              <span className="text-gray-600">{item.value}</span>
            </div>
          ))}

          {/* Mapping through attachments */}
          {jobDetails.attachments.map((attachment, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Image
                src={attachment.filePath}
                width={20}
                height={20}
                alt="Attachment"
              />
              <span className="text-gray-600">{attachment.fileName}</span>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex gap-4">
            <DeclineModal />
            <AcceptModal />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
