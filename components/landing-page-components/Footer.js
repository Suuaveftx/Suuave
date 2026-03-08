"use client";
import { Link as HeroLink } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#223B44] text-white lg:px-14 px-4 py-12">
      <div className="  grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 items-start">
        {/* First Column */}
        <div className=" flex-col gap-4 hidden lg:flex">
          <Image
            src={"/dev-images/navLogo.png"}
            alt="logocombo"
            width={262}
            height={76}
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
            <li>Contact Us</li>
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

        <div className="flex lg:justify-center lg:items-center gap-6 mt-4">
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white hover:bg-white/10 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/suuaveftx?igsh=dWgzYzF6YXl5M3N3"
          >
            <Image
              src="/dev-images/insta.png"
              alt="Instagram"
              width={20}
              height={20}
            />
          </a>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white hover:bg-white/10 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/SuuaveFTx"
          >
            <Image
              src="/dev-images/X.png"
              alt="X"
              width={20}
              height={20}
            />
          </a>
          <Link
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white hover:bg-white/10 transition-colors"
            href="/"
          >
            <Image
              src="/dev-images/Face.png"
              alt="Facebook"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
