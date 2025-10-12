import Image from "next/image";

const FounderQuotes = () => {
  const founderImageSrc = "/team/two.jpg";

  return (
    <section className=" px-4 pt-[129px] bg-white font-proximanova lg:pl-[64px] lg:pr-[64px] xl:pl-[95.73px] xl:pr-[119px]">
      <div className="">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden mr-4">
            <Image
              src={founderImageSrc}
              alt="Hamzat Ibrahim O."
              objectFit="cover"
              className="rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="text-left">
            <h3 className="text-[20px] font-bold text-[#222222] mb-1">
              HAMZAT IBRAHIM O.
            </h3>
            <p className="text-base text-[#3A98BB]">Founder & CEO</p>
          </div>
        </div>
        <div>
          <div className="relative flex">
            <Image
              width={104}
              height={113}
              src="/icons/fr1.svg"
              alt=""
              className=" hidden lg:block relative -bottom-[76px] "
            />
            <div className="bg-[#CCE7F2]    text-center xl:text-xl rounded-bl-[50px] rounded-tr-[50px]  lg:rounded-bl-[100px] lg:rounded-tr-[100px] pl-[18px] pr-[20px] py-[31px] lg:pt-[52.2px] lg:pb-[72.2px] lg:pl-[102.08px] lg:pr-[99.92px] ">
              <p className=" leading-8  italic text-[#222222]">
                African fashion industry needs to be illuminated and sold
                globall, as it has yet to tap into its full potential. I
                envision a platfor that connects talented African creatives and
                unlocks new levels of innovation in the industry, similar to how
                digital streaming platforms have globalized the beauty of
                Nollywood, Afrobeat, Amapiano etc
              </p>
            </div>
            <Image
              width={80}
              height={113}
              src="/icons/fr2.svg"
              alt=""
              className=" hidden lg:block relative bottom-[76px] -left-6 z-10 "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderQuotes;
