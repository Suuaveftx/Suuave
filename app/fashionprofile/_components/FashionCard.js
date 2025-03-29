'use client'
import { useState } from "react";
import Image from "next/image";
import { Eye} from "lucide-react";
import CustomButton from "../../../components/CustomButton";
import ThreeDotsDropdown from "./ThreeDotsDropDown";

const FashionCard = () => {
  const [activeTab, setActiveTab] = useState("design");

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
        <div className="flex justify-end">
        <CustomButton text="View Public Mode" className="bg-[#F0F0F0] text-[#222222]" />
        </div>
      <div className="flex space-x-2 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2  mb-2 text-lg font-medium rounded-lg transition duration-300 ${
              activeTab === tab.id ? "bg-[#035A7A] text-white" : " text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "design" && (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
   {[...Array(6)].map((_, i) => (
     <div
       key={i}
       className="relative border  rounded-lg shadow w-64 h-60 bg-cover bg-center flex items-end"
       style={{ backgroundImage: `url('/dev-images/FashionImg.png')` }}
     >
       {/* Three Dots Menu (Horizontal) */}
       <div className="absolute top-0 left-56 p-1 rounded-md w-10 flex justify-center cursor-pointer">
  <ThreeDotsDropdown />
</div>

 
       {/* Bottom Content */}
       <div className="bg-black bg-opacity-50 text-white w-full">
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
   ))}
 </div>    
      
      )}

{activeTab === "awards" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0  w-4/5">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="relative border rounded-lg shadow w-[350px] h-[250px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${awardImages[i]})` }}
      >
      </div>
    ))}
  </div>
)}

      {activeTab === "work" && (
        <div className="flex space-x-6 overflow-x-auto">
            {[...Array(4)].map((_, i) => (
     <div
       key={i}
       className="relative border  rounded-lg shadow w-52 h-60 bg-cover bg-center flex items-end"
       style={{ backgroundImage: `url('/dev-images/Awards3.png')` }}
     >
     
     </div>
   ))}
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
           <div className="flex flex-col justify-center items-center shadow-lg rounded-md w-64 h-40 mx-auto text-center">
  <h2 className="text-2xl font-semibold text-[#F8B73B]">4.0/5</h2>
  <Image src="/dev-images/ratings3.png" width={150} height={30} alt="Review Stars" className="my-2" />
  <p className="text-gray-600">15 Verified Ratings</p>
</div>

<div className="mt-6 w-4/5 border rounded-lg shadow p-4 divide-y">
  {[...Array(3)].map((_, i) => (
    <div key={i} className="py-4 flex items-start">
      <Image src="/dev-images/Clients.png" width={50} height={50} alt="User" className="rounded-full" />
      <div className="ml-4">
        <p className="font-semibold">Alinko Amin {i + 1}</p>
        <div className="flex items-center mt-1">
          <p className="text-gray-600">Ratings:</p>
          <Image src="/dev-images/ratings3.png" width={100} height={20} alt="Stars" className="ml-2" />
        </div>
        <p className="mt-3 text-gray-700">This is a great product! Highly recommend.</p>
        <p className="text-gray-500 text-sm mt-2">11 October 2024</p>
      </div>
    </div>
  ))}
</div>


          <button className="mt-6 px-6 py-2 bg-black text-white rounded-lg">View More</button>
        </div>
      )}
    </div>
  );
};

export default FashionCard;