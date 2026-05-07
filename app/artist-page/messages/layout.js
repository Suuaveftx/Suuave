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
    const referrer = typeof document !== 'undefined' ? document.referrer : "";

    if (activeCategory) {
      const lowerCategory = activeCategory.toLowerCase();
      // Most common values are 'brand' or 'Fashion Brand'
      if (lowerCategory.includes("brand") || lowerCategory.includes("designer")) {
        setRole("brand");
      } else if (lowerCategory.includes("artist")) {
        setRole("artist");
      } else {
        setRole("artist");
      }
    } else if (referrer.includes("/fashion-designers")) {
      // Fallback if store is missing but they came from the brand side
      setRole("brand");
    } else {
      // If no category and no brand referrer, default to artist as it's under artist-page
      setRole("artist");
    }
  }, [activeCategory]);

  // Show nothing while determining the role to avoid showing the wrong navbar
  if (role === null) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <HeroUIProvider>
      <div className="max-w-[1700px] mx-auto pt-20 lg:pt-20">
        {/* Navbar */}
        {role === "brand" ? <FashionDesignerHeader /> : <Navbars />}
        {/* Main Content */}
        <main className="font-proximanova">{children}</main>
      </div>
    </HeroUIProvider>
  );
}
