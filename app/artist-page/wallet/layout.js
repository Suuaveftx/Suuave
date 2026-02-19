"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/Brand-Navbar";


export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      {/* Navbar - now handles its own internal centering */}
      <Navbars />
      <div className="max-w-[1700px] mx-auto">
        {/* Main Content */}
        <main className="font-proximanova">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
