import Image from "next/image";
import CustomButton from "../../../components/CustomButton";

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
          The home of
          <span className="italic font-thin"> African fashion artists</span> and
          licensable stunning designs
        </h1>
        <CustomButton
          text="Join Suuave"
          className="w-44 h-14 font-semibold text-lg"
        />
      </div>
    </div>
  );
};

export default Banner;
