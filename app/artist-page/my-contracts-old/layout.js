"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/Brand-Navbar";

export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <Navbars />
      <div className="max-w-[1700px] mx-auto">
        <main className="font-proximanova">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
