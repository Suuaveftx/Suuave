import Image from "next/image"; // Only needed if using Next.js for image optimization

const HowItWorks = () => {
  return (
    <div className="mt-12 p-6">
      {/* Disabled Button */}
      <button
        className="bg-[#EAF9FF] text-[#035A7A] px-6 py-3 rounded-full text-lg cursor-not-allowed flex items-center justify-center gap-2"
        disabled
      >
        <Image
          src="/dev-images/Microphone.png" // Replace with your icon's path
          alt="Icon"
          className="w-5 h-5"
          width={50}
          height={50}
        />
        How it works
      </button>

      {/* Supporting Text */}
      <p className="mt-4 text-[32px] md:text-4xl text-[#404040] font-medium">
        Let&apos;s help you achieve your goals.
      </p>

      {/* Image Section */}
      <div className="mt-6">
        {/* Mobile Image */}
        <Image
          src="/dev-images/Yimages.png" // Replace with your image path
          alt="How It Works Illustration"
          layout="responsive"
          width={375} // Adjust width for mobile
          height={200} // Adjust height for mobile
          className="mx-auto sm:hidden" // Hide on larger screens
        />

        {/* Desktop Image */}
        <Image
          src="/dev-images/Youtube.png" // Replace with your image path
          alt="How It Works Illustration"
          width={1384} // Original width for desktop
          height={689.23} // Original height for desktop
          className="mx-auto hidden sm:block" // Show only on larger screens
        />
      </div>
    </div>
  );
};

export default HowItWorks;
