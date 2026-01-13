"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/Brand-Navbar";
import FashionDesignerHeader from "../../fashion-designers/_components/studio-page-components/FashionDesignerHeader";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const activeCategory = localStorage.getItem("activeCategory");
    setRole(activeCategory);
  }, []);

  return (
    <HeroUIProvider>
      <div className="max-w-[1700px] mx-auto">
        {/* Navbar */}
        {role === "Fashion Brand" ? <FashionDesignerHeader /> : <Navbars />}
        {/* Main Content */}
        <main className="font-proximanova">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
