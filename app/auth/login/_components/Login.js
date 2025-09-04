"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../../../components/CustomButton";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // temporaly routing user
    if (email === "artist@gmail.com") {
      return router.push("/artist-page");
    }
    if (email === "brand@gmail.com") {
      return router.push("/fashion-designers");
    }
  };

  return (
    <main className="h-full  w-full flex items-center bg-[#F1F1F1]">
      <section className=" flex flex-col justify-between w-3/6  bg-[#0F0F0F] ">
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
              Collaborate with a pool of <br /> talented African fashion <br />{" "}
              artists.
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center w-3/6 h-full p-10 ">
        {/* Right section for Email Sign In */}
        {/* Back Arrow - Positioned Outside Only on Mobile */}
        {/* Mobile View: Logo & Back Arrow Outside */}
        <div className="sm:hidden flex justify-center mt-4">
          <Image src="/dev-images/logo.png" alt="Logo" width={60} height={60} />
        </div>

        <div className="sm:hidden absolute left-4 top-4">
          <Image
            src="/dev-images/ArrowLeft.png"
            alt="Back Arrow"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>

        {/* Desktop View: Everything Inside the Container */}
        <div
          className="relative flex flex-col justify-center items-center bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] pl-[32px] pr-[32px] pt-[45px] pb-[45px] sm:mt-0 mt-[30px] w-[70%]"
          style={{ borderRadius: "16px" }}
        >
          {/* Desktop: Logo Centered */}
          <div className="hidden sm:flex items-center w-full justify-center mb-4">
            <Image
              src="/dev-images/logo.png"
              alt="Logo"
              width={60}
              height={60}
            />
          </div>

          {/* Desktop: Welcome Text Centered */}
          <h1 className="hidden sm:block text-xl font-semibold text-[#444444] text-center">
            Welcome back
          </h1>

          {/* Mobile: Welcome Text */}
          <h1 className="text-xl font-semibold text-[#444444] text-center block sm:hidden">
            Welcome to Suuave
          </h1>

          <div className="w-full">
            {/* Input Fields */}
            <div className="relative mt-4">
              <label className="absolute left-3 -mt-3 text-gray-500 text-sm transition-all duration-200 transform origin-left">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-md pl-[8px] pr-[8px] pt-[10px] pb-[10px] focus:outline-none focus:border-[#9FD2E5] placeholder-transparent"
                placeholder=" "
              />
              <HiOutlineMail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>

            {/* Password Input */}
            <div className="relative mt-8">
              <label className="absolute left-3 -mt-3 text-gray-500 text-sm transition-all duration-200 transform origin-left">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-md pl-[8px] pr-[8px] pt-[12px] pb-[12px] focus:outline-none focus:border-[#9FD2E5] placeholder-transparent"
                placeholder=" "
              />
              <Image
                src={"/dev-images/Lock.png"}
                alt="lock"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                width={20}
                height={20}
              />
              {showPassword ? (
                <IoEyeOffOutline
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEyeOutline
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-8">
              <Link
                href="#"
                className="text-base text-[#9FD2E5] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="w-96 text-[#035A7A] rounded-xl cursor-pointer py-2 mt-4 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]"
              >
                Login
              </button>
            </div>

            {/* Don't have an account prompt */}
            <p className="text-center text-base text-gray-600 mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href={"/onboarding"}
                className="text-[#9FD2E5] hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
