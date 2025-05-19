
import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection";
import InfoSection from "./components/InfoSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";
import Misson from "./components/Misson";
import CoreValues from "./components/CoreValues";
import FounderQuotes from "./components/FounderQuotes";
import  Global  from "./components/Global"
export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      
      <NavBar />
      <HeroSection />
      <InfoSection />
      <Misson />
      <CoreValues />
      <TeamSection />
      <FounderQuotes />
      <Global />
      <Footer />
    </main>
  )
}
