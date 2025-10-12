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
        <main className="font-proximanova lg:px-[36.51px]  lg:pt-[95.68px]">
          {children}
        </main>
      </div>
    </HeroUIProvider>
  );
}
