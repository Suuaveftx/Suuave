'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";

const ExploreComponent = () => {


  const [isMobile, setIsMobile] = useState(false);



  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize(); // Set the initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="bg-gray-100 p-8">
      {/* Disabled Button */}
      <div className="mb-2">
        <button
          className="bg-[#EAF9FF] text-[#035A7A] px-6 py-3 rounded-full cursor-not-allowed"
          disabled
        >
          Find Talented Fashion Artist
        </button>
      </div>

      {/* Header and Subtext */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Explore and get license to our <br/> top-rated designs.</h2>
      </div>

      {/* Image Grid */}
      <div className="grid sm:grid-cols-2 gap-8">
  {/* Grouped Images */}
  <div className="grid grid-rows-2 gap-0 mb-9 sm:col-span-1">
    {/* Top Image */}
    <div className="overflow-hidden mb-2 grid grid-cols-2 gap-2 md:grid-cols-1">
  <Image
    src={isMobile ? "/dev-images/images1.png" : "/dev-images/fashiondesigner.png"}
    alt="Top Image"
    className="rounded object-cover w-full h-full"
    style={{
      width: isMobile ? 'auto' : '100%', // Full width only on desktop
      height: isMobile ? 'auto' : '100%', // Full height only on desktop
    }}
    width={809.77}
    height={385.99}
  />

<Image
  src={isMobile ? "/dev-images/images2.png" : "/dev-images/fashiondesigner.png"}
  alt="Top Image"
  className="rounded object-cover w-full h-full sm:w-auto sm:h-auto md:hidden"
  style={{
    width: isMobile ? 'auto' : '0px', // Hide on desktop
    height: isMobile ? 'auto' : '0px', // Hide on desktop
  }}
  width={809.77}
  height={385.99}
/>

</div>



    {/* Bottom Images */}
    <div className="grid grid-cols-2 gap-2">
      <Image
        src={isMobile ? "/dev-images/images3.png" : "/dev-images/Gropie2.png"}
        alt="Bottom Left"
        className="rounded object-cover"
        style={{
          width: isMobile ? '171px' : 'auto',
          height: isMobile ? '175px' : 'auto',
        }}
        width={406}
        height={100}
      />

      <Image
        src={isMobile ? "/dev-images/images4.png" : "/dev-images/fashiondesigner2.png"}
        alt="Bottom Right"
        className="rounded object-cover"
        style={{
          width: isMobile ? '171px' : 'auto',
          height: isMobile ? '175px' : 'auto',
        }}
        width={403}
        height={361}
      />
    </div>
    <div className="md:hidden  flex flex-col items-center">
    <p className="text-base mb-8 w-[304px] h-[76px] mt-2">
    All designs are licensable and available for <br /> collaborations. <br /> You are
    just a step away from owning the right to use these designs.
  </p>
  <button
    className="bg-[] px-4 py-2 rounded-full text-[#035A7A] font-bold mb-8 flex justify-center items-center"
    style={{
      background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
    }}
  >
    Explore More
  </button>
    </div>
  </div>

  {/* Image with Text Overlay */}
  <div className="relative sm:col-span-1">
  <Image
  src={isMobile ? "/dev-images/images4.png" : "/dev-images/fashiondesigner3.png"}
  alt="Side Image"
  className="rounded object-cover"
  style={{
    display: isMobile ? 'none' : 'block',
    width: isMobile ? '171px' : 'auto',
    height: isMobile ? '175px' : 'auto',
  }}
  width={563}
  height={753}
/>


<div className="absolute inset-0  flex-col justify-center items-center text-center text-white pl-[8px] pr-[8px] pt-[12px] pb-[12px] rounded mt-[450px] bg-black bg-opacity-50 w-[320px] h-[189px] mx-auto hidden sm:block">
  <p className="text-base mb-8 w-[304px] h-[76px] mt-2">
    All designs are licensable and available for <br /> collaborations. <br /> You are
    just a step away from owning the right to use these designs.
  </p>
  <button
    className="bg-[] px-4 py-2 rounded-full text-[#035A7A] font-bold mb-8"
    style={{
      background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
    }}
  >
    Explore More
  </button>
</div>

  </div>
</div>
    </div>
  );
};

export default ExploreComponent;
