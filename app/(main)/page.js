"use client";

import Banner from "../../components/landing-page-components/Banner";
import ExploreComponent from "../../components/landing-page-components/Explore";
import HeroSection from "../../components/landing-page-components/Hero";
import HowItWorks from "../../components/landing-page-components/HowitWorks";
import ImageDesigners from "../../components/landing-page-components/ImageDesigners";
import ImageFashion from "../../components/landing-page-components/ImageFashion";
import WhySuaave from "../../components/landing-page-components/WhySuaave";

// import Banner from "../../components/landing-page-components/Banner";
// import ExploreComponent from "../../components/landing-page-components/Explore";
// import HeroSection from "../../components/landing-page-components/Hero";
// import HowItWorks from "../../components/landing-page-components/HowitWorks";
// import ImageDesigners from "../../components/landing-page-components/ImageDesigners";
// import ImageFashion from "../../components/landing-page-components/ImageFashion";
// import WhySuaave from "../../components/landing-page-components/WhySuaave";

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
