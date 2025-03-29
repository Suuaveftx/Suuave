"use client";

import { HeroUIProvider } from "@heroui/react";
import CustomNavbar from "../../components/Navbar";
import Footer from "../landingpage/_components/Footer";

export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <div className="max-w-[1700px] mx-auto bg-customNavBg">
        {/* Navbar */}
        <CustomNavbar />
        {/* Main Content */}
        <main className="font-proximanova">{children}</main>
        <Footer />
      </div>
    </HeroUIProvider>
  );
}
