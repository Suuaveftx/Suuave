"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/ArtistNavbar";
import FashionDesignerHeader from "../../fashion-designers/_components/studio-page-components/FashionDesignerHeader";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    let activeCategory = localStorage.getItem("activeCategory");
    if (activeCategory === "Fashion Artist") activeCategory = "artist";
    if (activeCategory === "Fashion Brand") activeCategory = "brand";
    setRole(activeCategory);
  }, []);

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
