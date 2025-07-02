"use client";
import Image from "next/image";
import { useState } from "react";

const InfoSection = () => {
  const [readMore, setReadMore] = useState(false);
  return (
    // <div>
    //   <section className="flex flex-col md:flex-row items-center md:items-start gap-10 px-6 md:pr-[113.61px] md:pl-[68.21px] py-[86.5px] md:justify-between">
    //     <div className="relative w-full max-w-md md:w-[50%]">
    //       <div className="relative">
    //         <Image
    //           width={200}
    //           height={200}
    //           src="/team/one.png"
    //           alt="African Fashion"
    //           className="rounded-2xl w-full z-50 relative"
    //         />
    //         {/* <img
    //           src="/team/one.png"
    //           alt="African Fashion"
    //           className="rounded-2xl w-full z-50 relative"
    //         /> */}
    //         <Image
    //           width={200}
    //           height={200}
    //           className="absolute -top-[33.5px] -left-[48.79px] z-10 w-50"
    //           src="/icons/Rec0.svg"
    //           alt="shape"
    //         />
    //         {/* <img
    //           className="absolute -top-9 -left-20 z-10 w-50"
    //           src="/icons/Rec0.svg"
    //           alt="shape"
    //         /> */}

    //         <Image
    //           width={200}
    //           height={200}
    //           className="absolute -bottom-[33.5px] -right-[52px] z-10 w-50"
    //           src="/icons/Rec1.svg"
    //           alt="shape"
    //         />
    //       </div>
    //       <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-tr-2xl rounded-bl-2xl z-[-1]" />
    //     </div>
    //     <div className=" w-[50%]">
    //       <div className="flex items-center gap-2 mb-4">
    //         <span className="text-xs font-bold uppercase text-gray-700 p-1.5 bg-[#CCE7F2]">
    //           About Us
    //         </span>
    //         <span>
    //           {/* <img
    //             className="stroke-2 stroke-black"
    //             src="/icons/vec.svg"
    //             alt=""
    //           /> */}
    //           <Image
    //             width={100}
    //             height={100}
    //             className="stroke-2 stroke-black"
    //             src="/icons/vec.svg"
    //             alt="vec"
    //           />
    //         </span>
    //       </div>

    //       <h2 className="text-2xl md:text-3xl font-bold mb-6">
    //         Together, let &#39;s inspire, create,
    //         <br /> and celebrate the beauty <br /> of African fashion.
    //       </h2>
    //       <p className="text-gray-600 mb-4">
    //         We understand that collaboration is key to unleashing the full
    //         <br />
    //         potential of creativity. By bringing together fashion designers
    //         <br />
    //         and brands with African fashion illustrators, we envision a <br />
    //         dynamic environment that encourages the exploration of fresh <br />
    //         perspectives, cultural influences, and innovative designs. <br />
    //         Through this synergy, we believe that groundbreaking and <br />
    //         trend-setting creations can be realized.
    //       </p>
    //       <p className="text-gray-600 mb-4">
    //         By embracing the rich tapestry of African culture and <br />
    //         integrating it into the global fashion landscape, we aim to <br />
    //         contribute to the evolution and amplification of African fashion
    //         <br />
    //         as a force to be reckoned with.
    //       </p>
    //     </div>
    //   </section>

    //   <div className="px-6 md:px-20 py-10 mt-2.5">
    //     <div className="max-w-full mx-auto  text-gray-700 space-y-6">
    //       <p>
    //         Not only do we provide a space for collaboration, but we also strive
    //         to ensure that both designers and illustrators receive the
    //         recognition and exposure <br />
    //         they deserve. By showcasing their collaborative projects, we aim to
    //         shine a light on the talent, skill, and creativity of African
    //         fashion illustrators, helping <br /> them gain visibility within the
    //         industry.
    //       </p>
    //       <p>
    //         We are thrilled to embark on this journey of creativity,
    //         collaboration, and cultural appreciation. Join us as we strive to
    //         revolutionize the fashion industry by <br /> connecting fashion
    //         designers and brands with African fashion illustrators, allowing for
    //         the realization of extraordinary and boundary-pushing creations.
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <section className=" px-[16.85px] mt-[55.71px] lg:pl-[68.21px] lg:pr-[93.46px] lg:pt-[86.5px] overflow-hidden font-proximanova">
      <div className=" lg:flex gap-[82px] ">
        <div>
          <Image
            width={677.79}
            height={646}
            className=""
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
                className=" hidden lg:block stroke-2 stroke-black  "
                src="/icons/vec.svg"
                alt="vec"
              />
            </span>
          </div>
          {/* <h2 className="text-2xl  lg:text-[42px] font-semibold mb-[32.5px] mt-[26px] leading-10 text-[#222222]">
            Together, let's inspire, create,
            <br /> and celebrate the beauty <br /> of African fashion.
          </h2> */}
          <h2 className=" text-center text-[24px] mt-4 lg:mt-0 md:text-start font-semibold text-[#222222] lg:text-[32px] xl:text-[42px] ">
            Together, let's inspire, create,
            <br className="hidden lg:block" /> and celebrate the beauty of
            African fashion.
          </h2>
          <p className="text-[#767676] text-center lg:text-start text-base xl:text-xl tracking-[0.33px] mt-6 lg:mt-4">
            We understand that collaboration is key to unleashing the full
            <br className="hidden lg:block" />
            potential of creativity. By bringing together fashion designers
            <br className="hidden lg:block" />
            and brands with African fashion illustrators, we envision a{" "}
            <br className="hidden lg:block" />
            dynamic environment that encourages the exploration of fresh{" "}
            <br className="hidden lg:block" />
            perspectives, cultural influences, and innovative designs.{" "}
            <br className="hidden lg:block" />
            Through this synergy, we believe that groundbreaking and{" "}
            <br className="hidden lg:block" />
            trend-setting creations can be realized.
          </p>
          <p className="text-[#767676]  text-center lg:text-start text-base mt-6 lg:mt-4  xl:text-xl tracking-[0.33px]">
            By embracing the rich tapestry of African culture and{" "}
            <br className="hidden lg:block" />
            integrating it into the global fashion landscape, we aim to{" "}
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
            Read more
          </span>
        </p>
        <p className={`${readMore ? "block" : "hidden"} lg:block`}>
          We are thrilled to embark on this journey of creativity,
          collaboration, and cultural appreciation. Join us as we strive to
          revolutionize the fashion industry by connecting fashion designers and
          brands with African fashion illustrators, allowing for the realization
          of extraordinary and boundary-pushing creations.
        </p>
      </div>
    </section>
  );
};

export default InfoSection;
