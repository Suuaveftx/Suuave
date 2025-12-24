"use client";

import { HeroUIProvider } from "@heroui/react";
import Navbars from "../../../components/Brand-Navbar";



export default function Layout({ children }) {
    return (
        <HeroUIProvider>
            <div className="max-w-[1700px] mx-auto">
                {/* Navbar */}
                <Navbars />
                {/* Main Content */}
                <main className="font-proximanova">{children}</main>
            </div>
        </HeroUIProvider>
    );
}
