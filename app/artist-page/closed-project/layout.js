"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/ArtistNavbar";


export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <div className="max-w-[1700px] mx-auto ">
        {/* Navbar */}
        <Navbars />
        {/* Main Content */}
        <main className="font-proximanova bg-[#F1F1F1] h-full py-10 px-0 lg:px-16 pt-20 lg:pt-20">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
