"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-[22.44px] pt-[22px] pb-[23px] md:pr-[65px] md:pl-[67.02px] bg-[#012D3E] text-[#CECECE] h-[101px]">
      {/* Logo */}
      <div className="flex items-center gap-2 ">
        <Link href="/">
          {/* <img
            src={"/icons/logo.png"}
            alt=" Suuave Logo"
            width={100}
            height={100}
          /> */}
          <Image
            width={100}
            height={100}
            src={"/icons/logo.png"}
            alt=" Suuave Logo"
          />
        </Link>
        <span className=" font-semibold text-2xl"></span>
      </div>

      {/* Desktop Menu */}

      <ul className="hidden md:flex gap-8 items-center text-sm justify-items-center">
        <div className="hidden md:flex gap-8 items-center text-sm justify-items-center">
          <li className="cursor-pointer hover:text-gray-300">Blogs</li>
          <li className="cursor-pointer hover:text-gray-300">How it works</li>
          <li className="cursor-pointer hover:text-gray-300">FAQS</li>
          <li className="cursor-pointer hover:text-gray-300">About us</li>
        </div>
      </ul>

      <div className="hidden md:flex gap-8  items-center text-sm justify-items-center ">
        <li className="cursor-pointer hover:text-gray-300 list-none">Login</li>
        <li className="list-none">
          <button className="bg-gradient-to-r from-[#C3E2F9] to-[#E9F5FF] text-[#002D4F] font-semibold py-2 px-5 rounded-full list-none">
            Get Started
          </button>
        </li>
      </div>

      {/* Mobile Hambuger */}
      <div
        className="md:hidden flex items-center gap-[26px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Link href="/auth" className=" tracking-[0.33px]">
          Login
        </Link>
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-[#CDCDCD]"></span>
          <span className="block w-6 h-0.5 bg-[#CDCDCD]"></span>
          <span className="block w-6 h-0.5 bg-[#CDCDCD]"></span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-20 right-0 bg-[#012D3E] flex flex-col items-center gap-6 py-6 md:hidden">
          <li className="cursor-pointer  ">Blogs</li>
          <li className="cursor-pointer  ">How it works</li>
          <li className="cursor-pointer  ">FAQS</li>
          <li className="cursor-pointer  ">About us</li>
          <li className="cursor-pointer  ">Login</li>

          <li>
            <button className="bg-gradient-to-r from-[#C3E2F9] to-[#E9F5FF] text-[#002D4F] font-semibold px-5 py-2 rounded-full ">
              Get Started
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
