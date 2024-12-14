import Image from 'next/image';

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center md:bg-cover h-[400px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/dev-images/Banner.png')",
       
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative text-center text-white px-4 flex flex-col justify-center items-center">
      <h1 className="text-[24px] md:text-[40px] font-bold mb-4 md:w-[1137.05px] text-center">
  The Home of <span className="italic font-thin">African fashion artists</span> and
  <span className="ml-1 md:text-[44px]">
    licensable stunning designs
  </span>
</h1>



        <button
          className="pl-[24px] pr-[24px] pt-[16px] pb-[16px] rounded-full text-[#035A7A] font-bold"
          style={{
            background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
          }}
        >
          Join Suuave
        </button>
      </div>
    </div>
  );
};

export default Banner;
