"use client";
import { Button, Link } from "@heroui/react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#223B44] text-white lg:px-14 px-4 py-12 mt-10">
      <div className="  grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 items-start">
       
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

      
        <div className="">
          <h2 className="text-lg font-normal mb-4 border-b-1 border-white pb-1 lg:w-fit">
            OUR COMPANY
          </h2>
          <ul className="space-y-2 text-sm font-thin text-[#C8C8C8]">
            <li>Contact Us</li>
            <li>
              <Link
                href="/about-page"
                className=" text-sm font-thin text-[#C8C8C8]"
              >
                About Us
              </Link>
            </li>
            <li>Help and Support</li>
          </ul>
        </div>

        
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
 



// import Image from "next/image"; 
// const Footer = () => {
//   return (
//     <footer className="bg-[#223B44] py-12 text-white text-sm mt-7">
//       <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         <div>
//           <div className="flex items-center mb-4">
//             <Image
//               src="/icons/logo.png"
//               alt="Suuave Logo"
//               width={200}
//               height={200}
//               className="mr-2"
//             />
//             <span className="text-lg font-semibold"></span>
//           </div>
//           <p className="text-gray-400">
//             At Suuave, we connect African fashion illustrators with designers
//             and brands to inspire collaboration and create groundbreaking
//             fashion.
//           </p>
//         </div>
//         <div>
//           <h6 className="font-semibold text-gray-300 mb-2  decoration-1 underline decoration-gray-300 underline-offset-[8px]">
//             OUR COMPANY
//           </h6>
//           <ul className="text-gray-400">
//             <li className="mb-1">
//               <a href="#" className="hover:text-teal-300">
//                 Contact Us
//               </a>
//             </li>
//             <li className="mb-1">
//               <a href="#" className="hover:text-teal-300">
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-teal-300">
//                 Help And Support
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h6 className="font-semibold text-gray-300 mb-2 decoration-1 underline decoration-gray-300 underline-offset-[8px]">
//             IMPORTANT LINKS
//           </h6>
//           <ul className="text-gray-400">
//             <li className="mb-1">
//               <a href="#" className="hover:text-teal-300">
//                 Job Posts
//               </a>
//             </li>
//             <li className="mb-1">
//               <a href="#" className="hover:text-teal-300">
//                 Explore Talents
//               </a>
//             </li>
//             <li className="mb-1">
//               <a href="#" className="hover:text-teal-300">
//                 How it Works
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-teal-300">
//                 How it Works
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h6 className="font-semibold text-gray-300 mb-2  decoration-1 underline decoration-gray-300 underline-offset-[8px] ">
//             POLICIES
//           </h6>
//           <ul className="text-gray-400">
//             <li className="mb-1">
//               <a href="#" className="hover:text-teal-300">
//                 Term & Conditions
//               </a>
//             </li>
//             <li className="mb-1">
//               <a href="#" className="hover:text-teal-300">
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-teal-300">
//                 Collaboration Policy
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="border-mt-8 py-2 text-center">
//         <h6 className="font-semibold text-gray-300 mb-2">OUR SOCIALS</h6>
//         <div className="border-t border-gray-300 mx-auto w-[90%] py-2 text-center"></div>
//         <div className="flex justify-center space-x-4">
//           <a href="#" className="text-gray-400 hover:text-teal-300">
        
//             <Image
//               src="/icons/face.svg"
//               alt="Suuave Logo"
//               width={24}
//               height={24}
//               className="mr-2"
//             />
//           </a>
//           <a href="#" className="text-gray-400 hover:text-teal-300">
//             <Image
//               src="/icons/instagram.svg"
//               alt="Instagram"
//               width={24}
//               height={24}
//               className="mr-2"
//             />
//           </a>
//           <a href="#" className="text-gray-400 hover:text-teal-300">
         
//             <Image
//               src="/icons/twitter.svg"
//               alt="Instagram"
//               width={24}
//               height={24}
//               className="mr-2"
//             />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;