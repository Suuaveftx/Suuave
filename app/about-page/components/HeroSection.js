const HeroSection = () => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center bg-[#012D3E] bg-cover bg-center py-28 px-4 overflow-hidden ">
                 <div className="absolute inset-0 bg-[url('/icons/hero.png')] bg-cover bg-center opacity-20 "></div>
                     <div className="absolute inset-0 bg-gradient-to-b from-[#012D3E] to-[#012D3E] opacity-80"></div>
                 <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            About us
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
           
Connecting fashion designers and brands with African fashion <br /> artists
to inspire collaboration for optimum creativity,<br /> productivity and exposure
          </p>
        </div>
      </section>
    );
};

export default HeroSection;
