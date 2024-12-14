const ImageDesigners = () => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-8 bg-[#124456]">
      {/* Left Section with Background Image */}
      <div
        className="flex-1 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url('/dev-images/imagedesigners.png')`,
        }}
      >
        {/* Ensure proper height is set for mobile and desktop */}
        <div className="h-[513px] lg:h-auto"></div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-6 lg:p-12 space-y-6 bg-[#124456]">
        {/* Sub-header */}
        <h3 className="text-[#049AD1] text-sm font-semibold tracking-wide">
          For Fashion Designers / Brand
        </h3>

        {/* Main Header */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white leading-snug">
          Access Africa's Top Fashion Artists in Few Steps
        </h1>

        {/* Content Cards */}
        <div className="space-y-6">
          {/* Card 1 - Register */}
          <div className="p-4 bg-[#093D50] rounded-lg shadow-md">
            <h4 className="text-lg font-bold text-white">Register</h4>
            <p className="text-sm text-white mt-2">
              Create a profile, showcasing your brand identity to explore a pool
              of limitless designs.
            </p>
            <div className="flex justify-end items-center mt-4 gap-2 text-white font-bold cursor-pointer hover:underline">
              <span>Get started</span>
              <img
                src="/dev-images/arrow.png" // Replace with your arrow icon path
                alt="Arrow Icon"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Card 2 - Post Jobs */}
          <div className="p-4 bg-[#093D50] rounded-lg shadow-md">
            <h4 className="text-lg font-bold text-white">
              Post Jobs and Hire Artist
            </h4>
            <p className="text-sm text-white mt-2">
              Post job descriptions outlining your needs. Connect with artists
              that resonate with your brand.
            </p>
            <div className="flex justify-end items-center mt-4 gap-2 text-white font-bold cursor-pointer hover:underline">
              <span>Post jobs</span>
              <img
                src="/dev-images/arrow.png" // Replace with your arrow icon path
                alt="Arrow Icon"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Card 3 - Explore and License */}
          <div className="p-4 bg-[#093D50] rounded-lg shadow-md">
            <h4 className="text-lg font-medium text-white">
              Explore and License
            </h4>
            <p className="text-sm text-white mt-2">
              Browse our gallery of stunning designs. Acquire licenses for
              existing designs that uplift your brand. Seamlessly manage
              projects and payments within our platform.
            </p>
            <div className="flex justify-end items-center mt-4 gap-2 text-white font-bold cursor-pointer hover:underline">
              <span>Explore</span>
              <img
                src="/dev-images/arrow.png" // Replace with your arrow icon path
                alt="Arrow Icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDesigners;
