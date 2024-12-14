import Image from "next/image"; // For optimized images in Next.js

const ImageFashion = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 gap-12 bg-[#181818] text-white">
      {/* Left Section */}
      <div className="max-w-lg space-y-6">
        {/* Small Header */}
        <h3 className="text-[#035A7A] text-sm font-semibold tracking-wide">
          FOR FASHION ARTISTS
        </h3>

        {/* Big Header */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white leading-snug">
          Get Global Exposure and Monetize your Creativity
        </h1>

        {/* 4-Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Register */}
          <div className="text-left space-y-2">
            <Image
              src="/dev-images/register.png" // Replace with your icon path
              alt="Register Icon"
              width={30}
              height={30}
            />
            <h4 className="text-lg font-extrabold text-white text-left">Register</h4>
            <p className="text-sm text-[#888888] text-left">
              Join over 5000 other artists and illustrators by signing up with
              your email address and through Google. Easy and seamless sign-up.
            </p>
          </div>

          {/* Apply */}
          <div className="text-left space-y-2">
            <Image
              src="/dev-images/apply.png" // Replace with your icon path
              alt="Apply Icon"
              width={30}
              height={30}
            
            />
            <h4 className="text-lg font-extrabold text-white text-left">
              Apply for Jobs
            </h4>
            <p className="text-sm text-[#888888] text-left">
              Browse job postings from top designers/brands seeking African
              fashion expertise and apply for projects that match your skills
              and style.
            </p>
          </div>

          {/* Publish */}
          <div className="text-left space-y-2">
            <Image
              src="/dev-images/publish.png" // Replace with your icon path
              alt="Publish Icon"
              width={30}
              height={30}
            />
            <h4 className="text-lg font-extrabold text-white">
              Publish your Designs
            </h4>
            <p className="text-sm text-[#888888]">
              Post your designs for brands/designers to license or buy exclusive
              rights to use in their collections. Earn money.
            </p>
          </div>

          {/* Get Paid */}
          <div className="text-left space-y-2">
            <Image
              src="/dev-images/cash.png" // Replace with your icon path
              alt="Money Icon"
              width={30}
              height={30}
            />
            <h4 className="text-lg font-extrabold text-white text-left">Get Paid</h4>
            <p className="text-sm text-[#888888] text-left">
              Your payment is automatically processed after a satisfactory job
              and when your designs are licensed.
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-6">
          <p className="text-lg text-[#035A7A] font-semibold">
            Begin your journey to success
          </p>
          <button className="flex items-center gap-2 mt-4 text-[#035A7A] font-medium hover:underline">
            Get Started
            <Image
              src="/dev-images/arrowright.png" // Replace with your arrow icon path
              alt="Arrow Icon"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      {/* Right Image Section */}
      <div>
  <Image
    src="/dev-images/ImageFashion.png" // Replace with your image path
    alt="Fashion Artist Illustration"
    width={655} // Adjust as needed
    height={684} // Adjust as needed
    className="rounded-lg hidden sm:block" // Hidden on mobile, visible on desktop
  />
</div>


    </div>
  );
};

export default ImageFashion;
