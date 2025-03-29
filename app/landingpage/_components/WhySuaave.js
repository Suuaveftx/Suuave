import {
  FaLock,
  FaCopyright,
  FaUserCheck,
  FaExchangeAlt,
  FaGavel,
  FaBullseye,
} from "react-icons/fa";
import { homePageCardData } from "../../utils/utils";
import WhySuuaveCard from "../../../components/WhySuuaveCard";
import CustomButton from "../../../components/CustomButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const WhySuaave = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "20px",
    slidesToShow: 1,
    speed: 500,
  };
  return (
    <div className="py-8  bg-customWhite">
      <div className="text-center mb-4 font-medium  text-lg uppercase p-2 mx-auto text-customWhiteBgText bg-customPrimary w-fit rounded-md">
        Why Suuave ?
      </div>

      {/* Description */}
      <p className="text-center text-md lg:text-[40px] text-gray-700 mb-10 font-[500] text-[27px]  lg:px-0 px-5">
        Enjoy unlimited advantages of easy and{" "}
        <br className="hidden lg:block" /> smooth collaboration process.
      </p>

      {/* Cards Section */}
      <div className="lg:grid grid-cols-1 md:grid-cols-3 gap-8 px-14 gap-y-12 hidden">
        {homePageCardData.map((card, index) => (
          <WhySuuaveCard
            key={index}
            title={card.title}
            text={card.text}
            svgIcon={card.image}
          />
        ))}
      </div>

      {/* for mobile slider */}
      <div className="slider-container lg:hidden overflow-hidden ">
        <Slider {...settings}>
          {homePageCardData.map((card, index) => (
            <WhySuuaveCard
              key={index}
              title={card.title}
              text={card.text}
              svgIcon={card.image}
              className="min-h-72 p-4 w-[94%] mb-7"
            />
          ))}
        </Slider>
      </div>

      {/* Call to Action Button */}
      <div className="text-center w-full mt-8 hidden lg:block">
        <CustomButton
          text="Join 5000+ Members"
          className="shadow-md h-12 mx-auto"
        />
      </div>
      {/* <div className="text-center mt-[8px] md:mt-[-250px]">
        <button
          className="text-[#035A7A] font-bold px-8 py-3 rounded-full text-lg hover:opacity-90 transition"
          style={{
            background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
          }}
        >
          Join 5000+ Members
        </button>
      </div> */}
    </div>
  );
};

export default WhySuaave;
