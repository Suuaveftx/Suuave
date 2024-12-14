import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#223B44] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* First Column */}
        <div className="flex flex-col">
          <Image
            src={"/dev-images/logocombo1.png"}
            alt="logocombo"
            width={262}
            height={76}
          />
          <p className="text-sm leading-relaxed">
            At Suuave, we connect African fashion illustrators with designers
            and brands to inspire collaboration and create groundbreaking fashion.
          </p>
        </div>

        {/* Second Column */}
        <div className='mt-8'>
          <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-600 pb-1">
            OUR COMPANY
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Help and Support</li>
          </ul>
        </div>

        {/* Third Column */}
        <div className='mt-8'>
          <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-600 pb-1">
            IMPORTANT LINKS
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Job Posts</li>
            <li>Explore Talents</li>
            <li>How it Works</li>
          </ul>
        </div>

        {/* Fourth Column */}
        <div className='mt-8'>
          <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-600 pb-1">
            POLICIES
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Collaboration Policy</li>
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-12 text-center">
      <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-600 pb-1 w-full text-center">
  OUR SOCIALS
</h2>

        <div className="flex justify-center items-center gap-6 mt-4">
          <Image
            src="/dev-images/Face.png"
            alt="Facebook"
            width={40}
            height={40}
          />
          <Image
            src="/dev-images/insta.png"
            alt="Instagram"
            width={40}
            height={40}
          />
          <Image
            src="/dev-images/X.png"
            alt="X"
            width={40}
            height={40}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
