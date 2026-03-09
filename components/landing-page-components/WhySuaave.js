import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomButton from "../CustomButton";
import WhySuuaveCard from "../WhySuuaveCard";
import { homePageCardData } from "../../utils/utils";

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
      <div className="text-center mb-4 font-medium  text-lg uppercase px-4 p-2 mx-auto text-customWhiteBgText bg-customPrimary w-fit rounded-md">
        Why Suuave ?
      </div>

      {/* Description */}
      <p className="text-center text-md lg:text-[40px] text-gray-700 mb-10 font-[500] text-[27px]   lg:px-0 px-5">
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
      <div className="slider-container lg:hidden overflow-hidden [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full">
        <Slider {...settings}>
          {homePageCardData.map((card, index) => (
            <div key={index} className="h-full px-2">
              <WhySuuaveCard
                title={card.title}
                text={card.text}
                svgIcon={card.image}
                className="h-full p-4 w-full mb-7 flex flex-col"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Call to Action Button */}
      <div className="text-center w-full mt-8 hidden lg:block">
        <CustomButton
          text="Join 5000+ Members"
          className="shadow-md h-12 mx-auto w-fit"
          href="/onboarding"
        />
      </div>
    </div>
  );
};

export default WhySuaave;
