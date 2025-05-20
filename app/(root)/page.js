"use client";
import HeroSection from "../landing-page/_components/Hero";
import AppLayout2 from "../../components/Applayout2";
import WhySuaave from "../landing-page/_components/WhySuaave";
import HowItWorks from "../landing-page/_components/HowitWorks";
import ImageFashion from "../landing-page/_components/ImageFashion";
import ImageDesigners from "../landing-page/_components/ImageDesigners";
import ExploreComponent from "../landing-page/_components/Explore";
import Banner from "../landing-page/_components/Banner";
import Footer from "../landing-page/_components/Footer";

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
