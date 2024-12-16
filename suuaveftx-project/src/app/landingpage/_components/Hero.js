import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div
    className="flex flex-col md:flex-row justify-between items-center bg-[#000B0F] text-white px-6 py-12"
    style={{
      backgroundImage: "url('/dev-images/Mask.png')", // Replace with your image path
      backgroundSize: "cover", // Ensures the image covers the entire div
      backgroundPosition: "center", // Centers the image
    }}
  >
    {/* Left Section */}
    <div className="max-w-md text-center md:text-left flex flex-col items-center md:items-start">
      <Image
        src="/dev-images/images.png" // Replace with your mobile image path
        alt="African Fashion Artist - Mobile"
        width={300}
        height={300}
        className="mb-4 mx-auto md:ml-0 md:mb-0" // Mobile-only image
      />
      <h1 className="text-2xl font-bold mb-2">
        Find and Collaborate with the Ideal <span className='italic font-thin'>African</span> Fashion Artist
      </h1>
      <p className="mb-6">
        Unlock the potential of fashion collaboration and merge creativity, culture, and
        expertise to create groundbreaking culturally-rich designs.
      </p>
      <Link href={"/onboarding"}>
      <button
        className="text-[#035A7A] px-6 py-3 rounded-full transition hover:opacity-90"
        style={{
          background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
        }}
      >
        Get Started
      </button>
      </Link>
    </div>
  
    {/* Right Section */}
    <div className="md:block md:ml-10">
      <Image
        src="/dev-images/SideHero.png" // Desktop image path
        alt="Fashion Collaboration"
        width={500}
        height={500}
        className="rounded-md"
      />
    </div>
  </div>
  
  );
};

export default HeroSection;
