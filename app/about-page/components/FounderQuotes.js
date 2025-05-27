import Image from "next/image";

const FounderQuotes = () => {
  const founderImageSrc = "/team/two.jpg";

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        {/* Founder Info */}
        <div className="flex items-center justify-center mb-6 flex-wrap gap-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={founderImageSrc}
              alt="Hamzat Ibrahim O."
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-800">HAMZAT IBRAHIM O.</h3>
            <p className="text-sm text-[#3A98BB]">Founder & CEO</p>
          </div>
        </div>

        {/* Quote Box */}
        <div className="relative max-w-3xl mx-auto">
          {/* Decorative Quote Icons */}
          <Image
            width={72}
            height={32}
            src="/icons/fr1.svg"
            alt="quote"
            className="absolute -top-6 -left-6"
          />
          <Image
            width={72}
            height={32}
            src="/icons/fr2.svg"
            alt="quote"
            className="absolute -bottom-6 -right-6"
          />

          <p className="bg-blue-100 rounded-t-[80px] rounded-br-[80px] shadow-md px-6 py-8 text-gray-700 italic leading-relaxed text-sm sm:text-base">
            African fashion industry needs to be illuminated and sold globally, as it has yet to tap into
            its full potential. I envision a platform that connects talented African creatives and unlocks
            new levels of innovation in the industry, similar to how digital streaming platforms have
            globalized the beauty of Nollywood, Afrobeat, Amapiano, etc.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderQuotes;
