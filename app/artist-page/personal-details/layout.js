"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/Brand-Navbar";

export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <div className=" lg:h-full bg-[#F1F1F1]">
        {/* Navbar */}
        <Navbars />
        {/* Main Content */}
        <main className="font-proximanova">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
