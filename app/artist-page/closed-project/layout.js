"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/Brand-Navbar";


export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <div className="max-w-[1700px] mx-auto ">
        {/* Navbar */}
        <Navbars />
        {/* Main Content */}
        <main className="font-satoshi bg-[#F1F1F1] h-full py-10 px-16">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
