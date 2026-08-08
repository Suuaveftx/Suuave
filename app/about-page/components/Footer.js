import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#223B44] py-12 text-white text-sm mt-7">
      <div className="  px-5 lg:px-8 xl:pl-[68.5px] xl:pr-[66.5px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block">
          <div className="flex items-center mb-4">
            <Image
              src="/icons/logo.png"
              alt="Suuave Logo"
              width={200}
              height={200}
              className="mr-2"
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
            <li>
              <Link href="#" className="hover:text-teal-300">
                Help And Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold text-[#EAEAEA] mb-2 decoration-1 underline decoration-gray-300 underline-offset-[8px]">
            IMPORTANT LINKS
          </h6>

          <ul className="text-[#F3F3F3]">
            <li className="mb-1">
              <Link href="#" className="hover:text-teal-300">
                Job Posts
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-teal-300">
                Explore Talents
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-teal-300">
                How it Works
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold text-[#EAEAEA] mb-2  decoration-1 underline decoration-gray-300 underline-offset-[8px] ">
            POLICIES
          </h6>
          <ul className="text-[#F3F3F3]">
            <li className="mb-1">
              <Link href="#" className="hover:text-teal-300">
                Term &amp; Conditions
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#" className="hover:text-teal-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-teal-300">
                Collaboration Policy
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


