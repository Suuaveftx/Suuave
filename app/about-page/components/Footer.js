import Image from "next/image"; // Ensure you import the Next.js Image component no forget am
import Link from "next/link";
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
              <Link href="#" className="hover:text-teal-300">
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
            <li>
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
                Term & Conditions
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

      <div className="border-mt-8 py-2 pl-5 text-left lg:text-center mt-[44px] lg:mt-[69px]">
        <h6 className="font-semibold text-[#EAEAEA] mb-2">OUR SOCIALS</h6>
        <div className="border-t border-gray-300 lg:mx-auto w-[90%] py-2 text-center"></div>
        <div className="flex lg:justify-center space-x-4 ">
          <Link href="#" className="text-gray-400 hover:text-teal-300">
            <Image
              src="/icons/face.svg"
              alt="Suuave Logo"
              width={24}
              height={24}
              className="mr-2"
            />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-teal-300">
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="mr-2"
            />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-teal-300">
            <Image
              src="/icons/twitter.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="mr-2"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
