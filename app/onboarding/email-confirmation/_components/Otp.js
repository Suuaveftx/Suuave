"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { InputOtp } from "@heroui/react";
import CustomButton from "../../../../components/CustomButton";
import OtpValue from "./OtpValue";
import BackButton from "../../../../components/BackButton";

const Otp = () => {
  const [value, setValue] = React.useState("");

  return (
    <main className=" h-full  w-full lg:flex items-center bg-[#F1F1F1]">
      <div className="lg:hidden">
        <BackButton />
      </div>
      <section className=" hidden lg:flex flex-col justify-between w-3/6  bg-[#0F0F0F] ">
        <div className="p-10">
          <h1 className="font-bold text-3xl text-[#EAEAEA] tracking-wide">
            Connect with the African <br /> Fashion World.
          </h1>
        </div>
        <div className="flex">
          <Image
            src="/svg/confirm-logo.svg"
            alt="logo"
            width={300}
            height={500}
            className="object-contain object-left"
          />
          <div className="flex flex-col gap-20 items-start ">
            <Image
              src="/svg/create-logo-1.svg"
              alt="logo"
              width={600}
              height={600}
              className="object-contain object-left -ml-28 -mt-20"
            />
            <p className="font-bold text-xl text-[#F5F5F5]">
            Monetize your creativity through global brand collaborations.
            </p>
          </div>
        </div>
      </section>
      <section className=" flex items-center justify-center lg:w-3/6 h-screen lg:h-full p-10 ">
        {/* Right section for OTP confirmation */}
        <div className="flex flex-col mt-[-80px] items-start pl-4 pr-4 pt-[45px] pb-[45px] bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] md:pl-8 md:pr-8 md:pt-11 md:pb-11 rounded-lg">
          {/* Inner content wrapper */}
          <div className="w-full flex flex-col items-start">
            <h1 className="text-[22px] text-center font-semibold text-[#444444]">
              Confirm your email address
            </h1>
            <p className="text-[#727272] text-sm mb-3 font-normal text-center">
              Kindly enter the six(6) digit code sent to the <br /> email
              address czulu07@gmail.com
            </p>

            {/* OTP input fields */}
            <div className="w-full flex flex-col items-center gap-2">
              {/* <OtpValue /> */}
              <InputOtp
                variant="bordered"
                length={6}
                value={value}
                onValueChange={setValue}
              />
              <div className=" text-small text-default-500">
                Didn’t receive code?{" "}
                <button className="text-md cursor-pointer font-medium text-[#9FD2E5]">
                  Resend
                </button>
              </div>
            </div>
          </div>
          <Link
            href={"/onboarding/intro-to-profile-setup"}
            className="w-72 text-[#035A7A] rounded-3xl cursor-pointer py-2 mt-4 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]"
          >
            Submit
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Otp;
