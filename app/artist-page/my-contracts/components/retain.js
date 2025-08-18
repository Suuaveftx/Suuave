"use client";

import React from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import Navbar3 from "../../../../components/Navbar3";
import ContractHeader from "./contract-header";

export default function RetainArtist() {
  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  return (
    <div className="bg-[#EAEAEA] font-satoshi">
      <Navbar3 />
      <ContractHeader title="Retain Artist" />
      <div className="min-h-screen max-w-6xl mx-auto  flex flex-col items-start justify-start ">
        <Card className="w-full max-w-xl md:max-w-2xl p-6 bg-white shadow-md rounded-xl">
          <CardBody className="space-y-6">
            <div className="space-y-4 text-sm ">
              <div className="border-b border-gray-300 pb-4">
                <h4 className="text-md font-semibold">
                  Continue the creative journey with artist for future project
                </h4>
                <p>
                  We understand the value of successful collaborations. Explore
                  opportunities to continue working with them on future
                  projects.
                </p>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h4 className="font-semibold text-md">Payment</h4>
                <p>
                  A one-time payment of <strong>$5</strong> grants you life-time
                  access to directly work with artist anytime you wish.
                </p>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h4 className="font-semibold text-md">Benefits</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Access to direct message/chat</li>
                  <li>Direct access to send contract to artist</li>
                  <li>Skip the process of hiring to proposals</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-4">
              <Button
                variant="light"
                className=" bg-radial from-[#EAF9FF] to-[#E8E8E8] text-[#222222] font-medium rounded-full border-0 shadow-sm"
                size="md"
                onPress={() => window.history.back()}
              >
                Cancel
              </Button>

              <Button
                className=" bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-medium rounded-full border-0 shadow-sm"
                size="md"
              >
                Retain{" "}
                {artist && artist.charAt(0).toUpperCase() + artist.slice(1)}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
