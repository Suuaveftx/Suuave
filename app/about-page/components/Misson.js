const Misson = () => {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-20 font-proximanova">
      <div className="max-w-3xl mx-auto text-center space-y-20">
        {/* Vision */}

        <div>
          <h3 className="text-2xl md:text-4xl font-bold text-[#222222] uppercase mb-6 ">
            Vision
          </h3>
          <p className="text-[#767676] text-base text-center max-w-2xl mx-auto">
            To become the definitive global infrastructure for fashion licensing and creative partnerships, positioning African digital artists and worldwide creators at the forefront of the international design economy.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h3 className="text-2xl md:text-4xl font-bold text-[#222222] uppercase mb-6">
            Mission
          </h3>
          <p className=" text-center text-[#767676] text-base leading-relaxed max-w-2xl mx-auto">
            To equip global fashion designers and brands with secure IP frameworks, targeted exposure, and seamless tools to collaborate directly with African digital artists and scale worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Misson;
