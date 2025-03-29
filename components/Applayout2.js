"use client";

import React from "react";
import Navbar2 from "./Navbar2";
import { HeroUIProvider } from "@heroui/react";

const AppLayout2 = ({ children }) => {
  return (
    <HeroUIProvider>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar2 />

        {/* Main Content */}
        <main className="flex-grow">{children}</main>
      </div>
    </HeroUIProvider>
  );
};

export default AppLayout2;
