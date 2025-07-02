import Image from "next/image";

const CoreValues = () => {
  return (
    <section className="pt-[76px]  pb-[113px] lg:px-[67.18px] bg-[#002938] font-proximanova">
      <div className=" ">
        <div className="flex justify-center lg:justify-start   mb-[40.7px]">
          <h2 className=" text-sm lg:text-xl font-bold text-[#EEEEEE]  bg-[#004967] px-[10px] py-2">
            OUR CORE VALUES
          </h2>

          <Image
            src="/icons/ve.svg"
            alt=""
            width={109}
            height={25.75}
            className="hidden lg:block"
          />
        </div>
        <p className=" text-center lg:text-start text-2xl lg:text-4xl xl:text-[42px] font-semibold text-[#E4E4E4] lg:text-[#EEEEEE] mb-10 px-[33px]">
          We are driven by a set of core values that{" "}
          <br className="hidden lg:block" /> guide every aspect of our business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[49px] lg:mt-[136px] px-[14px]">
          <div className="flex flex-col items-center lg:flex lg:items-start rounded-lg p-6 lg:px-6 lg:py-8 border border-[#1C3F4D] w-full">
            <div className="w-[40px] h-[40px]  lg:w-[50px] lg:h-[50px] rounded-full bg-[#64FFDA1A] text-[#64FFDA] flex items-center justify-center mb-6">
              <Image
                src="/icons/003.svg"
                alt=""
                width={50}
                height={50}
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#3A98BB] mb-4">
              RELIABILITY
            </h3>
            <p className="text-center lg:text-start text-base text-[#EEEEEE] leading-[160%] tracking-[0.33px]">
              Our commitment lies in delivering top-tier services to our
              prospects. Upholding a standard of excellence and transparency
              throughout all their interactions is paramount to our ethos.
            </p>
          </div>

          <div className=" flex flex-col items-center  lg:flex lg:items-start rounded-lg p-6 lg:p-8 border border-[#1C3F4D]  w-full">
            <div className="w-[40px] h-[40px]  lg:w-[50px] lg:h-[50px] rounded-full bg-[#64FFDA1A] text-[#64FFDA] flex items-center justify-center mb-6">
              <Image
                src="/icons/001.svg"
                alt=""
                width={50}
                height={50}
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#3A98BB] mb-4">
              INCLUSIVITY
            </h3>
            <p className="text-center lg:text-start text-base text-[#EEEEEE] leading-[160%] tracking-[0.33px]">
              We believe that everyone should have access to this platform,
              regardless of where they live or what their skill set may be. We
              are not only providing access to information, but also creating
              opportunities for people from all backgrounds.
            </p>
          </div>

          <div className=" flex flex-col items-center  lg:flex lg:items-start  rounded-lg p-6 lg:p-8 border border-[#1C3F4D]  w-full">
            <div className="w-[40px] h-[40px]  lg:w-[50px] lg:h-[50px] rounded-full bg-[#64FFDA1A] text-[#64FFDA] flex items-center justify-center mb-6">
              <Image
                src="/icons/002.svg"
                alt=""
                width={50}
                height={50}
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#3A98BB] mb-4">
              COLLABORATION
            </h3>
            <p className=" text-center lg:text-start text-base text-[#EEEEEE] leading-[160%] tracking-[0.33px]">
              Our long-term goal is to establish a seamless network that
              facilitates effective communication and collaboration, fostering
              creativity and stimulating innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
