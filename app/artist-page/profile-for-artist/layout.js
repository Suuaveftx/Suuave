"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/ArtistNavbar";
import FashionDesignerHeader from "../../fashion-designers/_components/studio-page-components/FashionDesignerHeader";
import { useEffect, useState } from "react";

import { useAppStore } from "../../../store";

export default function Layout({ children }) {
  const { activeCategory } = useAppStore();
  const [role, setRole] = useState(null);

  useEffect(() => {
    let category = activeCategory;
    if (category === "Fashion Artist") category = "artist";
    if (category === "Fashion Brand") category = "brand";
    setRole(category);
  }, [activeCategory]);

  return (
    <HeroUIProvider>
      <div className={`max-w-[1700px] mx-auto`}>
        {/* Navbar */}
        {role === "brand" ? <FashionDesignerHeader /> : <Navbars />}
        {/* Main Content */}
        <main className="font-proximanova pt-20 lg:pt-20">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
