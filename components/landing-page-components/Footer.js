"use client";
import { Link as HeroLink } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaArrowUp } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isArtist = mounted && (pathname?.startsWith('/artist-page') || window.location.search.includes('source=artist'));
  const isBrand = mounted && (pathname?.startsWith('/fashion-designers') || window.location.search.includes('source=brand'));

  const getPrivacyPolicyHref = () => {
    if (isArtist) return "/artist-page/privacy-policy";
    if (isBrand) return "/fashion-designers/privacy-policy";
    return "/privacy-policy";
  };

  const getTermsOfServiceHref = () => {
    if (isArtist) return "/terms-of-service?source=artist#p1-main";
    if (isBrand) return "/terms-of-service?source=brand#p1-main";
    return "/terms-of-service#p1-main";
  };

  const getCollabPolicyHref = () => {
    if (isArtist) return "/terms-of-service?source=artist#p2-main";
    if (isBrand) return "/terms-of-service?source=brand#p2-main";
    return "/terms-of-service#p2-main";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#223B44] text-white lg:px-14 px-4 py-8 md:py-12 h-[498px] overflow-y-auto overflow-x-hidden relative">
      <div className="  grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 items-start">
        {/* First Column */}
        <div className="flex flex-col gap-4 mb-8 lg:mb-0">
          <Image
            src="/dev-images/SuaaveTxtWhite.png"
            alt="Suuave Logo"
            width={160}
            height={50}
            className="object-contain"
            style={{ width: "160px", height: "auto" }}
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
            <li>
              <HeroLink
                href="#"
                className=" text-sm font-thin text-[#C8C8C8]"
              >
                Blog
              </HeroLink>
            </li>
            <li>Help &amp; Support</li>
          </ul>
        </div>

        {/* Third Column */}
        <div className="">
          <h2 className="text-lg font-normal mb-4 border-b-1 border-white pb-1 lg:w-fit">
            IMPORTANT LINKS
          </h2>
          <ul className="space-y-2 text-sm font-thin text-[#C8C8C8]">
            {isBrand && (
              <li><Link href="/fashion-designers/my-collection" className="text-sm font-thin text-[#C8C8C8]">Discover Designs</Link></li>
            )}
            {isArtist && (
              <li><Link href="/artist-page/project-page" className="text-sm font-thin text-[#C8C8C8]">Find Job Opportunities</Link></li>
            )}
            <li><Link href="/#howitworks" className="text-sm font-thin text-[#C8C8C8]">How It Works</Link></li>
          </ul>
        </div>

        {/* Fourth Column */}
        <div className="">
          <h2 className="text-lg font-normal mb-4 border-b-1 border-white pb-1 lg:w-fit">
            LEGAL
          </h2>
          <ul className="space-y-2 text-sm font-thin text-[#C8C8C8]">
            <li><Link href={getTermsOfServiceHref()} className="text-sm font-thin text-[#C8C8C8]">Terms of Service</Link></li>
            <li><Link href={getPrivacyPolicyHref()} className="text-sm font-thin text-[#C8C8C8]">Privacy Policy</Link></li>
            <li><Link href={getCollabPolicyHref()} className="text-sm font-thin text-[#C8C8C8]">Collaboration &amp; Licencing Policy</Link></li>
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
            href="https://t.me/suuavefashion"
          >
            <FaTelegram className="w-5 h-5 text-[#229ED9]" />
          </a>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 w-12 h-12 bg-white text-[#223B44] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg z-50 cursor-pointer"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
