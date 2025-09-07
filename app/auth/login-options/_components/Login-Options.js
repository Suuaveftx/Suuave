"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginOptions = () => {
  const handleEmailLogin = () => {
    // Logic for handling email login
    console.log("Login with Email clicked");
  };

  const handleGoogleLogin = () => {
    // Logic for handling Google login
    console.log("Login with Google clicked");
  };

  return (
    <main className="h-full  w-full flex bg-[#F1F1F1]">
      <section className=" hidden lg:flex flex-col justify-between w-3/6  bg-gradient-to-b from-[#9FD2E5] from-10% to-[#00709A] ">
        <div className="p-10">
          <h1 className="font-bold text-3xl text-[#EAEAEA] tracking-wide">
            Connect with the African <br /> Fashion World.
          </h1>
        </div>
        <div className="flex">
          <Image
            src="/svg/create-log.svg"
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
      <section className=" flex items-center justify-center h-screen lg:h-auto p-4 lg:p-0  w-full lg:w-3/6   ">
        {/* Right section for Login with border */}
        <div className=" w-full lg:w-[70%] px-4 lg:px-10 flex flex-col justify-center items-center bg-white  border-2 border-gray-300 shadow-md rounded-lg">
          <div className="mt-[45px]">
            <Image
              src={"/dev-images/logo.png"}
              alt="logo"
              width={80}
              height={80}
            />
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-semibold text-[#444444] mb-[24px] text-center mt-2">
              Suuave
            </h1>

            {/* Login with Google */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-4 w-full pl-[24px] pr-[24px] pt-[12px] pb-[12px] text-sm font-medium text-gray-600 border border-gray-300 rounded-lg mt-4 hover:bg-gray-50 text-[12px]"
            >
              <Image
                src="/dev-images/Google.png"
                alt="Google Logo"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Google
            </button>

            {/* Login with Email */}
            <Link href={"/auth/login"}>
              <button
                onClick={handleEmailLogin}
                className="flex items-center  justify-center gap-4  w-full py-3 border border-gray-300 font-normal text-[#444444] rounded-lg mt-6 text-base"
              >
                <Image
                  src="/dev-images/Mail.png"
                  alt="Email Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Email
              </button>
            </Link>

            {/* Create Account link */}
            <p className="text-base text-gray-600 mt-9 mb-[45px]">
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

export default LoginOptions;
