"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/ArtistNavbar";


export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <Navbars />
      <div className="max-w-[1700px] mx-auto overflow-x-hidden">
        <main className="font-proximanova pt-20 lg:pt-20">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
