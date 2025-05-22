import Image from "next/image";

const FounderQuotes = () => {
    const founderImageSrc = '/team/two.jpg';

    return (
        <section className="py-12 bg-white"> 
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mr-4">
              <Image src={founderImageSrc} alt="Hamzat Ibrahim O." layout="fill" objectFit="cover" className="rounded-full" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">HAMZAT IBRAHIM O.</h3>
              <p className="text-sm text-[#3A98BB]">Founder & CEO</p>
            </div>
          </div>
          <div className="flex items-center justify-center">

      
           
            <div className="relative"> 
              <p className="bg-gray-50 rounded-lg shadow-md p-20 lg:p-8 italic text-gray-700 h-40 rounded-t-[100px] rounded-br-[100px] ">
                African fashion industry needs to be illuminated and sold globally, as it has yet to tap into its full
                potential. I envision a platform that connects talented African creatives and unlocks new levels of
                innovation in the industry, similar to how digital streaming platforms have globalized the beauty of
                Nollywood, Afrobeat, Amapiano etc
              </p>
              <img className="absolute -top-25 left-25 " src="/icons/fr1.svg" alt="" />
              <img className="absolute -bottom-25 right-25" src="/icons/fr2.svg" alt="" />
            
            </div>
          </div>
        </div>
      </section>
    );
};

export default FounderQuotes;