"use client";
import { Card, CardBody, CardHeader } from "@heroui/react";
import Image from "next/image";
import React from "react";

const ClientsOffer = () => {
  return (
    <div>
      <Card className="p-6">
        <CardHeader className=" flex items-center justify-center text-2xl font-semibold">
          Client&apos;s Profile
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center text-center space-y-3">
          {/* Client Image */}
          <Image
            src={"/dev-images/Clients.png"}
            width={150}
            height={150}
            alt="Clients-image"
          />

          {/* Client Name and Username */}
          <div className="flex gap-2 items-center">
            <h5 className="font-semibold">Tolu</h5>
            <span className="text-gray-600">@tolu</span>
          </div>

          {/* Role */}
          <h5 className="font-medium">Fashion Designer</h5>

          {/* Location */}
          <div className="flex gap-2 items-center">
            <Image
              src={"/dev-images/location.png"}
              width={20}
              height={20}
              alt="location"
            />
            <span className="text-gray-600">Lagos, Nigeria</span>
          </div>

          {/* Ratings */}
          <div className="flex gap-2 items-center">
            <span className="font-medium">Ratings</span>
            <Image
              src={"/dev-images/ratings.png"}
              width={60}
              height={60}
              alt="ratings"
            />
          </div>

          {/* Job Details */}
          <div className="flex flex-col w-full justify-center text-center">
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-bold">1</h4>
              <span className="text-gray-500 text-sm">Job Posted</span>
            </div>
            <div className="flex flex-col items-center mt-4">
              <h4 className="text-2xl font-bold">0</h4>
              <span className="text-gray-500 text-sm">Hire</span>
            </div>
            <div className="flex flex-col items-center mt-4">
              <h4 className="text-2xl font-bold">0</h4>
              <span className="text-gray-500 text-sm">Payment Made</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ClientsOffer;
