"use client";

import { HeroUIProvider } from "@heroui/react";
import CustomNavbar from "../../components/Navbar";
<<<<<<< HEAD:app/(root)/layout.js
import Footer from "../landing-page/_components/Footer";
=======
import Footer from "../../components/landing-page-components/Footer";
>>>>>>> 325f0a950e904904b411cd920d7c1c9f2ffac0dd:app/(main)/layout.js

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
