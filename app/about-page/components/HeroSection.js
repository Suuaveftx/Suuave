import React from "react";
import NavBar from "./NavBar";
import CustomNavbar from "../../../components/Navbar";

const HeroSection = () => {
  return (
    <header className="relative bg-[#012D3E] bg-cover bg-center  overflow-hidden  md:pt-0 ">
      {/* <NavBar /> */}
        <CustomNavbar bgColor="bg-transparent"/>

      <section className="text-[#EEEEEE] font-proximanova flex flex-col items-center justify-center text-center pt-[85.5px] md:pt-[95.73px] pb-[117px] md:pb-[104px] px-[20.76px]   ">
        <div className="absolute inset-0 bg-[url('/about-page-assets/about-hero-bg.png')] bg-cover bg-center opacity-30 "></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl xl:text-6xl 2xl:text-[70px] font-bold  leading-tight mb-[20px]">
            About Us
          </h1>
          <p className="text-base hidden md:block  md:text-xl md:text-center  leading-[160%]">
            Connecting fashion designers and brands with African fashion <br />{" "}
            artists to inspire collaboration for optimum creativity,
            <br /> productivity and exposure
          </p>
          <p className="text-base md:hidden text-center  md:text-xl md:text-center  leading-[160%]">
            Connecting fashion designers and brands with African fashion artists
            to inspire collaboration for optimum creativity,productivity and
            exposure
          </p>
        </div>
      </section>
    </header>
  );
};

export default HeroSection;
