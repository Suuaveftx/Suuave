"use client";

import React, { useState, useEffect } from "react";
import LogoImg from "./_components/LogoImg";
import CreateAccount from "./_components/Create-Account";
import Image from "next/image";
import BackButton from "../../../components/BackButton";
const Page = () => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    let savedCategory = localStorage.getItem("activeCategory");
    if (savedCategory === "Fashion Artist") savedCategory = "artist";
    if (savedCategory === "Fashion Brand") savedCategory = "brand";
    if (savedCategory) {
      setCategory(savedCategory);
    }
  }, []);

  return (
    <main className="flex flex-col lg:flex-row h-full  w-full bg-[#F1F1F1]">

      <div className=" lg:hidden w-full h-20 ">
        <BackButton />
      </div>
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
              {category === "brand"
                ? "Collaborate with a pool of talented African fashion artists."
                : "Monetize your creativity through global brand collaborations."}
            </p>
          </div>
        </div>
      </section>
      <section className="  w-full lg:w-3/6 h-full p-3 lg:p-5 xl:p-10">
        <CreateAccount />
      </section>
    </main>
  );
};

export default Page;
