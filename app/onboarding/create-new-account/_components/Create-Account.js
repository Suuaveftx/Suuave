import React from "react";
import { Form, Input, Checkbox } from "@heroui/react";

import Image from "next/image";
import CustomButton from "../../../../components/CustomButton";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { EyeIcon, EyeOff } from "lucide-react";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <div className="flex flex-col p-5 lg:p-10 rounded-2xl items-center bg-[#FAFAFA] border-1 border[#EAEAEA] h-full">
      <Image src="/dev-images/logo.png" alt="Logo" width={60} height={60} />
      <h1 className="font-medium text-2xl text-[#181818] mt-5">
        Create New Account
      </h1>
      <button className="flex mt-5 items-center justify-center gap-2 border-[#D1D1D1] border-1 rounded-lg py-2 w-full">
        <Image src="/svg/google.svg" alt="icon" width={24} height={24} />
        Continue with Google
      </button>
      <div className="flex w-full 0 gap-4 items-center mt-3 ">
        <hr className="w-full" />
        <p className="text-[#767676] text-base font-normal">Or</p>{" "}
        <hr className="w-full" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-3 flex flex-col gap-5"
      >
        <div className="w-full flex items-center justify-between gap-10">
          <label className="w-full  text-[#222222] text-base font-medium">
            First Name <span className="text-red-500 ml-1">*</span>
            <input
              placeholder="First name"
              {...register("firstName")}
              className=" outline-[#9FD2E5] text-[#BABABA] font-normal text-sm border-1 border-[#D1D1D1] rounded-lg p-2 w-full"
            />
          </label>
          <label className="w-full text-[#222222] text-base font-medium">
            Last Name <span className="text-red-500 ml-1">*</span>
            <input
              placeholder="Last name"
              {...register("lastName")}
              className=" outline-[#9FD2E5] text-[#BABABA] font-normal text-sm border-1 border-[#D1D1D1] rounded-lg p-2 w-full"
            />
          </label>
        </div>
        <label className="w-full text-[#222222] text-base font-medium">
          Username <span className="text-red-500 ml-1">*</span>
          <input
            placeholder="ocean"
            {...register("userName")}
            className=" outline-[#9FD2E5] text-[#BABABA] font-normal text-sm border-1 border-[#D1D1D1] rounded-lg p-2 w-full"
          />
        </label>
        <label className="w-full text-[#222222] text-base font-medium">
          Email <span className="text-red-500 ml-1">*</span>
          <input
            placeholder="cdzzsfd@email.com"
            {...register("email")}
            className=" outline-[#9FD2E5] text-[#BABABA] font-normal text-sm border-1 border-[#D1D1D1] rounded-lg p-2 w-full"
          />
        </label>
        <label className="w-full text-[#222222] text-base font-medium">
          Create Password <span className="text-red-500 ml-1">*</span>
          <span className="w-full flex items-center border border-[#D1D1D1] rounded-lg px-2 focus-within:border-[#9FD2E5]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="xxxxxxxxxxxxxx"
              {...register("password", { min: 8 })}
              className="text-[#BABABA] font-normal text-sm p-2 w-full outline-none"
            />
            {showPassword ? (
              <EyeOff
                className="w-5 h-5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeIcon
                className="w-5 h-5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </span>
          <b className="text-[#767676] font-normal p-0  text-sm">
            *Password must contain at least 8 characters.
          </b>
        </label>

        <span className="font-normal text-sm text-[#222222]">
          <Checkbox defaultSelected />
          By creating account, I agree to Suuave <br className="lg:hidden" />
          <b className="text-[#035A7A] ml-10 lg:ml-0  cursor-pointer">
            Terms and conditions
          </b>
        </span>
        <Link
          href="email-confirmation"
          className="text-[#035A7A] drop-shadow-md rounded-3xl cursor-pointer px-20 py-3 mt-5 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]"
        >
          Create Account
        </Link>
      </form>
      <span className="font-normal mt-5  text-center text-sm text-[#222222]">
        Already have an account?
        <Link href="/auth/login" className="text-[#9FD2E5] ml-2 cursor-pointer">
          Login
        </Link>
      </span>
    </div>
  );
};

export default CreateAccount;
