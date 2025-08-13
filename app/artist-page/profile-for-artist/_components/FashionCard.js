'use client'
import { useState } from "react";
import Image from "next/image";
import { Eye, Plus} from "lucide-react";
import ThreeDotsDropdown from "./ThreeDotsDropDown";
import CustomButton from "../../../../components/CustomButton";


const FashionCard = () => {
  const [activeTab, setActiveTab] = useState("design");
  const [showAll, setShowAll] = useState(false);


  const tabs = [
    { id: "design", label: "Design Collections" },
    { id: "awards", label: "Awards/Certificate" },
    { id: "work", label: "Work Samples" },
    { id: "reviews", label: "Reviews" },
  ];
  const awardImages = [
    "/dev-images/Awards.png",
    "/dev-images/Awards2.png",
    "/dev-images/Awards.png",
    "/dev-images/Awards2.png"
  ];
  return (
    <div className="w-full p-6">
        <div className=" hidden lg:flex lg:justify-end mb-8">
        <CustomButton text="View Visitors Mode" className="text-[#222222]" style={{
          background: "#F0F0F0"
        }} />
        </div>
<div className="flex space-x-2 mb-6 border-b overflow-x-auto scrollbar-hide w-full">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex-shrink-0 px-6 py-2 mb-2 text-[16px] md:text-[18px] text-[#767676] font-normal rounded-lg transition duration-300 
        ${activeTab === tab.id ? "bg-[#035A7A] text-white" : "text-gray-700"}`}
    >
      {tab.label}
    </button>
  ))}
</div>



{activeTab === "design" && (
  <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className={`relative border rounded-lg shadow w-[95%] sm:w-full h-60 bg-cover bg-center flex items-end 
          ${!showAll && i > 1 ? "hidden sm:flex" : ""}`}
        style={{ backgroundImage: `url('/dev-images/FashionImg.png')` }}
      >
        {/* Eye icon + number - MOBILE ONLY */}
        <div className="absolute top-2 left-2 sm:hidden flex items-center gap-1 px-2 py-1 mt-2 bg-black bg-opacity-50 rounded-md text-white text-xs font-medium">
          <Eye size={16} />
          <span>14</span>
        </div>

        {/* Three Dots Menu - always far right */}
        <div className="absolute top-0 lg:ml-[250px] ml-[128px] mt-1 flex items-center justify-center rounded-md w-10 cursor-pointer">
  <ThreeDotsDropdown />
</div>


        {/* Bottom Content */}
        <div className="lg:bg-black lg:bg-opacity-50 bg-white lg:text-white text-[#222222] w-full">
          {/* Mobile layout */}
          <div className="sm:hidden p-2">
            <p className="font-semibold lg:text-base text-sm">Casual Top Design</p>
            <div className="flex justify-between items-center">
              <p className="font-bold">$235</p>
              <p className="text-sm">Licensed 14</p>
            </div>
          </div>

          {/* Desktop/tablet layout */}
          <div className="hidden sm:block">
            <div className="flex justify-between items-center p-2">
              <p className="font-semibold">Casual Top Design</p>
              <p className="font-bold">$235</p>
            </div>
            <div className="flex gap-4 items-center pl-2">
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>14</span>
              </div>
              <p className="text-sm">Licensed 14</p>
            </div>
          </div>
        </div>

        {/* Plus Button in middle of 2nd card - MOBILE ONLY */}
        {!showAll && i === 1 && (
          <button
            onClick={() => setShowAll(true)}
            className="absolute sm:hidden w-12 h-12 rounded-full text-[#035A7A] flex items-center justify-center shadow-lg"
            style={{
              background: "radial-gradient(circle, #CCE7F2, #F4FCFF)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Plus size={24} />
          </button>
        )}
      </div>
    ))}
  </div>
)}




{activeTab === "awards" && (
  <div className="flex flex-col items-center w-full">
    {/* Awards grid */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="relative border rounded-lg shadow w-full h-[200px] bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${awardImages[i]})` }}
        >
        </div>
      ))}
    </div>

    {/* Add More button - hidden on mobile */}
    <button
      className="hidden sm:block mt-4 px-6 py-2 bg-[#F3F3F3] text-[#222222] rounded-lg shadow hover:bg-[#e0e0e0] transition"
      onClick={() => console.log("Add more clicked")}
    >
      Add More
    </button>
  </div>
)}



     {activeTab === "work" && (
  <div className="grid grid-cols-2 sm:flex sm:space-x-6 sm:overflow-x-auto gap-4 sm:gap-0">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="relative border rounded-lg shadow aspect-square w-full sm:w-52 bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('/dev-images/Awards3.png')` }}
      >
      </div>
    ))}
  </div>
)}



      {activeTab === "reviews" && (
        <div>
           <div className="flex flex-col justify-center items-center bg-[#fafafa] border-2 border-[#E6E6E6] rounded-md w-64 h-40 lg:ml-32 ml-8  text-center">
  <h2 className="text-2xl font-semibold text-[#F8B73B]">4.0/5</h2>
  <Image src="/dev-images/ratings3.png" width={150} height={30} alt="Review Stars" className="my-2" />
  <p className="text-gray-600">15 Verified Ratings</p>
</div>

<div className="mt-6 lg:w-full lg:max-w-[70%] w-full border rounded-lg shadow p-4 divide-y">
  {[...Array(3)].map((_, i) => (
    <div
      key={i}
      className={`py-4 flex items-start ${i > 0 ? "hidden sm:flex" : ""}`}
    >
      <Image
        src="/dev-images/Clients.png"
        width={50}
        height={50}
        alt="User"
        className="rounded-full"
      />
      <div className="ml-4">
        <p className="font-semibold">Alinko Amin {i + 1}</p>
        <div className="flex items-center mt-1">
          <p className="text-gray-600">Ratings:</p>
          <Image
            src="/dev-images/ratings3.png"
            width={100}
            height={20}
            alt="Stars"
            className="ml-2"
          />
        </div>
        <p className="mt-3 text-gray-700">
          squ ad litora torquent per conubia nostra, per inceptos himenaeos.
          Praesent auctor purus luctus enim egestas, ac scelerisque ante
          pulvinar. Donec ut rhoncus ex. Suspendisse .
        </p>
        <p className="text-gray-500 text-sm mt-2">11 October, 2024</p>
      </div>
    </div>
  ))}
</div>


           <div className=" hidden lg:flex w-full ml-48">
          <button className="mt-6 px-6 py-2 bg-transparent border-1 border-[#CCE7F2]  text-[#222222] rounded-lg">View More</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionCard;