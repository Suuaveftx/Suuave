const Misson = () => {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-20 font-proximanova">
      <div className="max-w-3xl mx-auto text-center space-y-20">
        {/* Vision */}

        <div>
          <h3 className="text-2xl md:text-4xl font-bold text-[#222222] uppercase mb-6 ">
            Our Vision
          </h3>
          <p className="text-[#767676] text-base text-center">
            To be the foremost go-to platform for discovering and connecting
            with <br className="hidden lg:block" /> talented African creatives,
            and unlocking new levels of innovation in the
            <br className="hidden lg:block" /> African fashion industry.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h3 className="text-2xl md:text-4xl font-bold text-[#222222] uppercase mb-6">
            Our Mission
          </h3>
          <p className=" text-center text-[#767676] text-base leading-relaxed">
            To create a streamlined network for our prospects to
            <br className="hidden lg:block" /> connect, collaborate and create.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Misson;
