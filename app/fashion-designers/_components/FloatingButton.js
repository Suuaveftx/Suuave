"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Simply check if user has scrolled past 60px — no direction tracking
      setIsScrolled(window.scrollY > 60);
    };

    // Set initial state in case page loads already scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-6 z-[9999] lg:hidden">
      <Link
        href="/fashion-designers/post-project"
        className="flex items-center bg-[#EAF9FF] border border-[#73D9FF] text-[#035A7A] rounded-full shadow-2xl p-4 transition-all duration-300 ease-in-out"
        aria-label="Post Project"
      >
        <Plus className="w-6 h-6 shrink-0" />
        <span
          className="font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxWidth: isScrolled ? "120px" : "0px",
            opacity: isScrolled ? 1 : 0,
            marginLeft: isScrolled ? "8px" : "0px",
          }}
        >
          Post Project
        </span>
      </Link>
    </div>
  );
};

export default FloatingButton;
