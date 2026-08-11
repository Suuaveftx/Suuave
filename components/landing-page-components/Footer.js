"use client";
import { Link as HeroLink } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#223B44] text-white lg:px-14 px-4 py-8 md:py-12 h-[498px] overflow-y-auto overflow-x-hidden">
      <div className="  grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 items-start">
        {/* First Column */}
        <div className=" flex-col gap-4 hidden lg:flex">
          <Image
            src={"/dev-images/navLogo.png"}
            alt="logocombo"
            width={262}
            height={76}
            style={{ height: "auto" }}
          />
          <p className="text-sm font-thin w-[77%]">
            At Suuave, we connect African fashion artists with designers
            and brands to inspire collaboration and create groundbreaking
            fashion.
          </p>
        </div>

        {/* Second Column */}
        <div className="">
          <h2 className="text-lg font-normal mb-4 border-b-1 border-white pb-1 lg:w-fit">
            OUR COMPANY
          </h2>
          <ul className="space-y-2 text-sm font-thin text-[#C8C8C8]">
            <li>
              <HeroLink href="/partner-with-us" className="text-sm font-thin text-[#C8C8C8]">
                Contact Us
              </HeroLink>
            </li>
            <li>
              <HeroLink
                href="/about-page"
                className=" text-sm font-thin text-[#C8C8C8]"
              >
                About Us
              </HeroLink>
            </li>
            <li>Help and Support</li>
          </ul>
        </div>

        {/* Third Column */}
        <div className="">
          <h2 className="text-lg font-normal mb-4 border-b-1 border-white pb-1 lg:w-fit">
            IMPORTANT LINKS
          </h2>
          <ul className="space-y-2 text-sm font-thin text-[#C8C8C8]">
            <li>Job Posts</li>
            <li>Explore Talents</li>
            <li>How It Works</li>
          </ul>
        </div>

        {/* Fourth Column */}
        <div className="">
          <h2 className="text-lg font-normal mb-4 border-b-1 border-white pb-1 lg:w-fit">
            POLICIES
          </h2>
          <ul className="space-y-2 text-sm font-thin text-[#C8C8C8]">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Collaboration Policy</li>
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-12 lg:text-center">
        <h2 className="text-lg font-medium mb-4 border-b-2 border-white pb-1 w-full lg:text-center">
          OUR SOCIALS
        </h2>

        <div className="flex flex-wrap lg:justify-center items-center gap-4 mt-4 mb-8 pb-4">
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/SuuaveFTx"
          >
            <FaXTwitter className="w-5 h-5 text-black" />
          </a>
          <Link
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1877F2] bg-white transition-colors"
            href="/"
          >
            <FaFacebook className="w-5 h-5 text-[#1877F2]" />
          </Link>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E4405F] bg-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/suuaveftx"
          >
            <FaInstagram className="w-5 h-5 text-[#E4405F]" />
          </a>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#0A66C2] bg-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href="https://linkedin.com"
          >
            <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />
          </a>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#FF0000] bg-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/@SuuaveFTx"
          >
            <FaYoutube className="w-5 h-5 text-[#FF0000]" />
          </a>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#229ED9] bg-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href="https://telegram.org"
          >
            <FaTelegram className="w-5 h-5 text-[#229ED9]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
