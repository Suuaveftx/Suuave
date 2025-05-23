"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/Navbar2";

export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <div className="max-w-[1700px] mx-auto ">
        {/* Navbar */}
        <Navbars />
        {/* Main Content */}
        <main className="font-proximanova px-[36.51px] pt-[95.68px]">
          {children}
        </main>
      </div>
    </HeroUIProvider>
  );
}
