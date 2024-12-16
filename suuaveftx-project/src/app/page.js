import Image from "next/image";
import HeroSection from "./landingpage/_components/Hero";
import AppLayout2 from "./components/Applayout2";
import WhySuaave from "./landingpage/_components/WhySuaave";
import HowItWorks from "./landingpage/_components/HowitWorks";
import ImageFashion from "./landingpage/_components/ImageFashion";
import ImageDesigners from "./landingpage/_components/ImageDesigners";
import ExploreComponent from "./landingpage/_components/Explore";
import Banner from "./landingpage/_components/Banner";
import Footer from "./landingpage/_components/Footer";

export default function Home() {
  return (
    <div>
     <main>
     <>
    <AppLayout2>
    <div className='mb-8'>
        <HeroSection />
    </div>
    </AppLayout2>
    <div className='mb-8'>
        <WhySuaave />
    </div>
    <div className='mb-8'>
      <HowItWorks />
    </div>
    <div className='mb-8'>
      <ImageFashion />
    </div>
    <div className='mb-8'>
      <ImageDesigners />
    </div>
    <div className='mb-8'>
      <ExploreComponent />
    </div>
    <div className='mb-8'>
      <Banner />
    </div>
    <div className='mt-10'>
      <Footer />
    </div>
    </>
     </main>
    </div>
  );
}
