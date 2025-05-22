'use client';

import { useState } from "react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <nav className="flex items-center justify-between p-6 md:px-20 bg-[#012D3E]">
          {/* Logo */}
          <div className="flex items-center gap-2 ">
            <img src={"/icons/logo.png"} alt=" Suuave Logo" width={100} height={100}  />
            <span className="text-white font-semibold text-2xl"></span>
          </div>

        {/* Desktop Menu */}
        
        <ul className="hidden md:flex gap-8 text-white items-center text-sm justify-items-center">
            <div className="hidden md:flex gap-8 text-white items-center text-sm justify-items-center">
            <li className="cursor-pointer hover:text-gray-300">Blogs</li>
            <li className="cursor-pointer hover:text-gray-300">How it works</li>
            <li className="cursor-pointer hover:text-gray-300">FAQS</li>
            <li className="cursor-pointer hover:text-gray-300">About us</li>
       
            </div>
              
        </ul>

        <div className="hidden md:flex gap-8 text-white items-center text-sm justify-items-center ">
                <li className="cursor-pointer hover:text-gray-300 list-none">Login</li>
                <li className="list-none">
                <button className="bg-gradient-to-r from-[#C3E2F9] to-[#E9F5FF] text-[#002D4F] font-semibold py-2 px-5 rounded-full list-none">
                    Get Started
                </button>
               </li>
                </div>


       

        {/* Mobile Hambuger */}
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
            </div>
        </div>


             {/* Mobile Menu */}
             {isOpen &&  (
                <ul className="absolute top-20 right-0 bg-[#012D3E] flex flex-col items-center gap-6 py-6 md:hidden">
                    <li className="cursor-pointer text-white ">Blogs</li>
                    <li className="cursor-pointer text-white ">How it works</li>
                    <li className="cursor-pointer text-white ">FAQS</li>
                    <li className="cursor-pointer text-white ">About us</li>
                    <li className="cursor-pointer text-white ">Login</li>

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
    
