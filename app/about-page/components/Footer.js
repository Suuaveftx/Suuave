"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaArrowUp } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTelegram } from "react-icons/fa6";

/**
 * @param {{ source?: 'artist' | 'brand' }} [props]
 */
const Footer = ({ source } = {}) => {
  const pathname = usePathname();

  // Allow explicit source prop to override pathname detection (e.g. on /help-support)
  const isArtist = source ? source === 'artist' : pathname?.startsWith('/artist-page');
  const isBrand = source ? source === 'brand' : pathname?.startsWith('/fashion-designers');

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
    <footer className="bg-[#223B44] py-12 text-white text-sm relative">
      <div className="  px-5 lg:px-8 xl:pl-[68.5px] xl:pr-[66.5px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="block mb-8 lg:mb-0">
          <div className="flex items-center mb-4">
            <Image
              src="/dev-images/SuaaveTxtWhite.png"
              alt="Suuave Logo"
              width={160}
              height={50}
              className="mr-2 object-contain"
              style={{ width: "160px", height: "auto" }}
            />
            <span className="text-lg font-semibold"></span>
          </div>
          <p className="text-gray-400">
            At Suuave, we connect African fashion illustrators with designers
            and brands to inspire collaboration and create groundbreaking
            fashion.
          </p>
        </div>
        <div>
          <h6 className="font-semibold text-[#EAEAEA] mb-2  decoration-1 underline decoration-gray-300 underline-offset-[8px]">
            OUR COMPANY
          </h6>
          <ul className="text-[#F3F3F3]">
            <li className="mb-1">
              <Link href="/partner-with-us" className="hover:text-teal-300">
                Contact Us
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-teal-300">
                About Us
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-teal-300">
                Blog
              </Link>
            </li>
            <li>
              <Link href={isBrand ? "/help-support?source=brand" : isArtist ? "/help-support?source=artist" : "/help-support"} className="hover:text-teal-300">
                Help &amp; Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold text-[#EAEAEA] mb-2 decoration-1 underline decoration-gray-300 underline-offset-[8px]">
            IMPORTANT LINKS
          </h6>

          <ul className="text-[#F3F3F3]">
            {isBrand && (
              <li className="mb-1">
                <Link href="/fashion-designers/my-collection" className="hover:text-teal-300">
                  Discover Designs
                </Link>
              </li>
            )}
            {isArtist && (
              <li className="mb-1">
                <Link href="/artist-page/project-page" className="hover:text-teal-300">
                  Find Job Opportunities
                </Link>
              </li>
            )}
            <li className="mb-1">
              <Link href="/#howitworks" className="hover:text-teal-300">
                How it Works
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold text-[#EAEAEA] mb-2  decoration-1 underline decoration-gray-300 underline-offset-[8px] ">
            LEGAL
          </h6>
          <ul className="text-[#F3F3F3]">
            <li className="mb-1">
              <Link href={getTermsOfServiceHref()} className="hover:text-teal-300">
                Terms of Service
              </Link>
            </li>
            <li className="mb-1">
              <Link href={getPrivacyPolicyHref()} className="hover:text-teal-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={getCollabPolicyHref()} className="hover:text-teal-300">
                Collaboration &amp; Licencing Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-12 lg:text-center">
        <h6 className="font-semibold text-[#EAEAEA] mb-2 pl-5 lg:pl-0">OUR SOCIALS</h6>
        <div className="border-t border-gray-300 lg:mx-auto w-[90%] py-2 text-center mx-5"></div>
        <div className="flex lg:justify-center space-x-4 mt-4 pl-5 lg:pl-0">
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/SuuaveFTx"
          >
            <FaXTwitter className="w-5 h-5 text-black" />
          </a>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1877F2] bg-white transition-colors"
            href="/"
          >
            <FaFacebook className="w-5 h-5 text-[#1877F2]" />
          </a>
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


