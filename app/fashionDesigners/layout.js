"use client";

import Footer from "../landingpage/_components/Footer";
import FashionDesignerHeader from "./_components/FashionDesignerHeader";

export default function Layout({ children }) {
  return (
    <div className="mx-auto  bg-[#DBDBDB]/30">
      <FashionDesignerHeader />
      <main className="font-satoshi">{children}</main>;
      <Footer />
    </div>
  );
}
