"use client";

import { HeroUIProvider } from "@heroui/react";
import FashionDesignerHeader from "../../fashion-designers/_components/studio-page-components/FashionDesignerHeader";
import Footer from "../../../components/landing-page-components/Footer";

export default function Layout({ children }) {
    return (
        <HeroUIProvider>
            <div className="bg-[#DBDBDB]/30 pt-[80px] min-h-screen">
                <FashionDesignerHeader />
                <main className="font-satoshi h-full">{children}</main>
                <Footer />
            </div>
        </HeroUIProvider>
    );
}
