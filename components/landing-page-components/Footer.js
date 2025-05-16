'use client'
import { Button, Link } from "@heroui/react";
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
            At Suuave, we connect African fashion illustrators with designers
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
            <li>About Us</li>
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
          <Button
            isIconOnly
            as={Link}
            radius="full"
            variant="bordered"
            target="_blank"
            href={"https://www.instagram.com/suuaveftx?igsh=dWgzYzF6YXl5M3N3"}
          >
            <Image
              src="/dev-images/insta.png"
              alt="Instagram"
              width={40}
              height={40}
            />
          </Button>
          <Button
            isIconOnly
            as={Link}
            radius="full"
            variant="bordered"
            target="_blank"
            href={"https://x.com/SuuaveFTx"}
          >
            <Image
              src="/dev-images/X.png"
              alt="Instagram"
              width={40}
              height={40}
            />
          </Button>
          <Button
            isIconOnly
            as={Link}
            radius="full"
            variant="bordered"
            href={"/"}
          >
            <Image
              src="/dev-images/Face.png"
              alt="Instagram"
              width={40}
              height={40}
            />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
