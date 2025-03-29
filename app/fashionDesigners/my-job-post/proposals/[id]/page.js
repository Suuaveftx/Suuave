"use client";
import { Avatar, Button, Card, CardBody } from "@heroui/react";
import React, { use } from "react";
import CustomButton from "../../../../../components/CustomButton";
import { TiLocation } from "react-icons/ti";
import { FaStar } from "react-icons/fa";

const Page = ({ params }) => {
  const { id } = use(params); // Unwrap the promise before accessing `id`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.5fr] gap-10 p-6 max-w-[1500px] mx-auto">
      <div className="flex flex-col gap-10">
        <Card>
          <CardBody className="gap-4 pb-20">
            <p className="text-sm text-customGray">Sent: 5 Hours ago</p>
            <p className="text-xl font-semibold">Proposal</p>
            <p>
              Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis. Ut commodo efficitur neque...
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="gap-4 text-sm">
            <div className="flex gap-2 items-center">
              <p className="text-[#767676]">Quotation :</p>
              <p className="font-semibold">N200,000</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[#767676]">Duration :</p>
              <p className="font-semibold">Within A Month</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[#767676]">Skill Set :</p>
              <p className="font-semibold">Adobe Illustrator</p>
            </div>
          </CardBody>
        </Card>
        <Card shadow="none" className="w-fit p-3 ">
          <p className="font-semibold text-xl mb-2">Attachment (4)</p>
          <p className=" font-semibold underline cursor-pointer">Docloremlir</p>
          <p className=" font-semibold underline cursor-pointer">loremlir</p>
        </Card>
      </div>

      <div className="flex flex-col gap-10">
        <Card>
          <CardBody className="flex gap-5 flex-col my-5">
            <CustomButton text="Hire" className="w-[80%] mx-auto h-14" />
            <Button
              radius="full"
              className="w-[80%] text-[#035A7A] h-14 bg-[#F0F0F0] border-2 border-[#CCE7F2] font-semibold mx-auto"
            >
              Message
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody className=" flex items-center justify-center gap-5 mt-5 mb-16">
            <Avatar className="w-24 h-24 text-large" />
            <div className="flex text-center flex-col items-center justify-center">
              <p>
                <span className="text-customDarkBlue font-semibold">Ciana</span>{" "}
                @Ocean
              </p>
              <p>Fashion Illustrator</p>
            </div>

            <div className="flex text-center flex-col items-center justify-center">
              <div className="flex gap-2">
                <TiLocation className="size-5 fill-[#878787]" />

                <p className="text-sm ">Lagos, Nigeria</p>
              </div>

              <div className="flex items-center space-x-1 text-yellow-500">
                <span className="text-sm text-gray-600 mr-1">Rating</span>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < 4 // add user rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-sm text-[#3A98BB] pl-1">(5 Reviews)</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Page;
