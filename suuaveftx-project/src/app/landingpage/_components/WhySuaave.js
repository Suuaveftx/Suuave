import Image from "next/image";
import { FaLock, FaCopyright, FaUserCheck, FaExchangeAlt, FaGavel, FaBullseye } from "react-icons/fa";

const WhySuaave = () => {
  return (
    <div className="py-12 bg-gray-50">
      {/* Disabled Button */}
      <div className="text-center mb-6">
        <button
          disabled
          className="text-lg font-bold px-6 py-3 bg-[#EAF9FF] text-[#035A7A] rounded-full cursor-not-allowed"
        >
          Why Suaave?
        </button>
      </div>

      {/* Description */}
      <p className="text-center text-md text-2xl text-gray-700 mb-12 font-semibold">
        Enjoy unlimited advantages of easy and <br /> smooth collaboration process.
      </p>

      {/* Cards Section */}
      <div className="flex overflow-x-scroll scrollbar-none md:grid md:grid-cols-3 md:grid-rows-3 gap-6 px-4 lg:px-16">
  {/* Secure Payment Card */}
  <div className="flex-shrink-0 md:flex-shrink bg-white shadow-lg rounded-[16px] p-6 text-left">
    <div className="flex items-center mb-4">
      <div className="bg-[#E3F7FF] p-4 rounded-full border-4 border-[#86DEFF]">
        <Image
          src="/dev-images/Secure.png"
          alt="Secure Icon"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2 text-[#035A7A]">Secure Payment</h3>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
  </div>

  {/* Copyright Protection Card */}
  <div className="flex-shrink-0 md:flex-shrink bg-white shadow-lg rounded-[16px] p-6 text-left">
    <div className="flex items-center mb-4">
      <div className="bg-[#E3F7FF] p-4 rounded-full border-4 border-[#86DEFF]">
        <Image
          src="/dev-images/copy.png"
          alt="Copyright Icon"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2 text-[#035A7A]">Copyright Protection</h3>
    <p className="text-gray-600">
      Suuave offers copyright protection and Business Promotion to all designers and designs posted.
    </p>
  </div>

  {/* User Verification Card */}
  <div className="flex-shrink-0 md:flex-shrink bg-white shadow-lg rounded-[16px] p-6 text-left">
    <div className="flex items-center mb-4">
      <div className="bg-[#E3F7FF] p-4 rounded-full border-4 border-[#86DEFF]">
        <Image
          src="/dev-images/user.png"
          alt="User Verification Icon"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2 text-[#035A7A]">User Verification</h3>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
  </div>

  {/* Streamlined Collaboration Card */}
  <div className="flex-shrink-0 md:flex-shrink bg-white shadow-lg rounded-[16px] p-6 text-left">
    <div className="flex items-center mb-4">
      <div className="bg-[#E3F7FF] p-4 rounded-full border-4 border-[#86DEFF]">
        <Image
          src="/dev-images/streamed.png"
          alt="Streamlined Collaboration Icon"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2 text-[#035A7A]">Streamlined Collaboration</h3>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
  </div>

  {/* Open Dispute Resolution Card */}
  <div className="flex-shrink-0 md:flex-shrink bg-white shadow-lg rounded-[16px] p-6 text-left">
    <div className="flex items-center mb-4">
      <div className="bg-[#E3F7FF] p-4 rounded-full border-4 border-[#86DEFF]">
        <Image
          src="/dev-images/justice.png"
          alt="Dispute Resolution Icon"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2 text-[#035A7A]">Open Dispute Resolution</h3>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
  </div>

  {/* Exclusivity Card */}
  <div className="flex-shrink-0 md:flex-shrink bg-white shadow-lg rounded-[16px] p-6 text-left">
    <div className="flex items-center mb-4">
      <div className="bg-[#E3F7FF] p-4 rounded-full border-4 border-[#86DEFF]">
        <Image
          src="/dev-images/target.png"
          alt="Exclusivity Icon"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2 text-[#035A7A]">Exclusivity</h3>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
  </div>
</div>



      {/* Call to Action Button */}
      <div className="text-center mt-[8px] md:mt-[-250px]">
        <button
          className="text-[#035A7A] font-bold px-8 py-3 rounded-full text-lg hover:opacity-90 transition"
          style={{
            background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
          }}
        >
          Join 500+ Members
        </button>
      </div>

    </div>
  );
};

export default WhySuaave;
