import Image from "next/image";
import CustomButton from "../CustomButton";

const Banner = () => {
  return (
    <div
      className=" bg-cover bg-center md:bg-cover lg:h-[400px] h-[270px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/dev-images/Banner.png')",
      }}
    >
      {/* Content */}
      <div className=" text-center text-white px-4 flex flex-col justify-center items-center">
        <h1 className="lg:text-[44px] text-[24px] font-medium mb-12 lg:w-[1100px] text-center">
          The future of fashion is African.
          <span className="italic font-thin"> Own a piece of It.</span>
        </h1>
        <CustomButton
          text="Enter the Marketplace"
          href="/onboarding"
          className="w-fit px-8 h-14 font-semibold text-lg"
        />
      </div>
    </div>
  );
};

export default Banner;
