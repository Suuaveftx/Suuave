"use client";
import HeroSection from "../landingpage/_components/Hero";
import AppLayout2 from "../../components/Applayout2";
import WhySuaave from "../landingpage/_components/WhySuaave";
import HowItWorks from "../landingpage/_components/HowitWorks";
import ImageFashion from "../landingpage/_components/ImageFashion";
import ImageDesigners from "../landingpage/_components/ImageDesigners";
import ExploreComponent from "../landingpage/_components/Explore";
import Banner from "../landingpage/_components/Banner";
import Footer from "../landingpage/_components/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhySuaave />
      <HowItWorks />

      <ImageFashion />
      <div className="h-11 bg-white" />
      <ImageDesigners />

      <ExploreComponent />
      <Banner />
      <div className="h-11 bg-white" />
    </div>
  );
}
