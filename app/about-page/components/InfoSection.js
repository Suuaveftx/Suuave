"use client";
import { useState } from "react";
import Image from "next/image";

const InfoSection = () => {
  const [readMore, setReadMore] = useState(false);
  return (
    <section className=" px-[16.85px] mt-[55.71px] lg:px-8 xl:pl-[68.21px] xl:pr-[93.46px] xl:pt-[86.5px] 2xl:pl-[68.21px] 2xl:pr-[93.46px] 2xl:pt-[86.5px] overflow-hidden font-proximanova">
      <div className=" lg:flex lg:gap-6 xl:gap-12 2xl:gap-[82px] ">
        <div>
          <Image
            width={677.79}
            height={646}
            src="/about-page-assets/about-us-illus.png"
            alt="shape"
          />
        </div>
        <div>
          <div className="flex items-center justify-center mt-[87.71px] lg:justify-start md:gap-[15px] mb-4 md:mt-[19.5px]">
            <span className="text-[14px] lg:text-[20px] font-semibold uppercase text-[#004B67] py-2 px-[10px] bg-[#CCE7F2]">
              About Us
            </span>
            <span>
              <Image
                width={100}
                height={100}
                className=" hidden lg:block stroke-2 stroke-black"
                src="/icons/vec.svg"
                alt="vec"
              />
            </span>
          </div>

          <h2 className=" text-center text-[24px] mt-4 lg:mt-0 md:text-start font-semibold text-[#222222] lg:text-[32px] 2xl:text-[42px] ">
            Together, let&apos;s inspire, create,
            <br className="hidden lg:block" /> and celebrate the beauty of
            African fashion.
          </h2>
          <p className="text-[#767676] text-center lg:text-start text-base xl:text-base 2xl:text-xl tracking-[0.33px] mt-6 lg:mt-4">
            We understand that collaboration is key to unleashing the full
            <br className="hidden lg:block" />
            potential of creativity. By bringing together fashion designers
            <br className="hidden lg:block" />
            and brands with African fashion illustrators, we envision a
            <br className="hidden lg:block" />
            dynamic environment that encourages the exploration of fresh
            <br className="hidden lg:block" />
            perspectives, cultural influences, and innovative designs.
            <br className="hidden lg:block" />
            Through this synergy, we believe that groundbreaking and
            <br className="hidden lg:block" />
            trend-setting creations can be realized.
          </p>
          <p className="text-base  text-[#767676]  text-center lg:text-start  mt-6 lg:mt-4  xl:text-base   2xl:text-xl tracking-[0.33px]">
            By embracing the rich tapestry of African culture and
            <br className="hidden lg:block" />
            integrating it into the global fashion landscape, we aim to
            <br className="hidden lg:block" />
            contribute to the evolution and amplification of African fashion
            <br className="hidden lg:block" />
            as a force to be reckoned with.
          </p>
        </div>
      </div>
      <div className=" lg:mt-[42px]  text-[#767676]  text-center lg:text-start text-base space-y-4 leading-[160%] tracking-[0.33px]">
        <p>
          Not only do we provide a space for collaboration, but we also strive
          to ensure that both designers and illustrators receive the recognition
          and exposure they deserve. By showcasing their collaborative projects,
          we aim to shine a light on the talent, skill, and creativity of
          African fashion illustrators, helping them gain visibility within the
          industry.{" "}
          <span
            className={`text-[#3A98BB]   lg:hidden`}
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? " " : "Read more"}
          </span>
        </p>
        <p className={`${readMore ? "block" : "hidden"} lg:block`}>
          We are thrilled to embark on this journey of creativity,
          collaboration, and cultural appreciation. Join us as we strive to
          revolutionize the fashion industry by connecting fashion designers and
          brands with African fashion illustrators, allowing for the realization
          of extraordinary and boundary-pushing creations.{" "}
          <span
            className={`text-[#3A98BB]   lg:hidden`}
            onClick={() => setReadMore(!readMore)}
          >
            Read less
          </span>
        </p>
      </div>
    </section>
  );
};

export default InfoSection;
