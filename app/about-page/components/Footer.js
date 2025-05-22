import Image from 'next/image'; // Ensure you import the Next.js Image component no forget am 
const Footer = () => {
    return (
        <footer className="bg-[#223B44] py-12 text-white text-sm mt-7">
        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
                <Image src="/icons/logo.png" alt="Suuave Logo" width={200} height={200} className="mr-2" />
              <span className="text-lg font-semibold"></span>
            </div>
            <p className="text-gray-400">
              At Suuave, we connect African fashion illustrators with
              designers and brands to inspire collaboration and create
              groundbreaking fashion.
            </p>
          </div>
          <div>
            <h6 className="font-semibold text-gray-300 mb-2  decoration-1 underline decoration-gray-300 underline-offset-[8px]">OUR COMPANY</h6>
            <ul className="text-gray-400">
              <li className="mb-1"><a href="#" className="hover:text-teal-300">Contact Us</a></li>
              <li className="mb-1"><a href="#" className="hover:text-teal-300">About Us</a></li>
              <li><a href="#" className="hover:text-teal-300">Help And Support</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-300 mb-2 decoration-1 underline decoration-gray-300 underline-offset-[8px]">IMPORTANT LINKS</h6>
            <ul className="text-gray-400">
              <li className="mb-1"><a href="#" className="hover:text-teal-300">Job Posts</a></li>
              <li className="mb-1"><a href="#" className="hover:text-teal-300">Explore Talents</a></li>
              <li className="mb-1"><a href="#" className="hover:text-teal-300">How it Works</a></li>
              <li><a href="#" className="hover:text-teal-300">How it Works</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-300 mb-2  decoration-1 underline decoration-gray-300 underline-offset-[8px] ">POLICIES</h6>
            <ul className="text-gray-400">
              <li className="mb-1"><a href="#" className="hover:text-teal-300">Term & Conditions</a></li>
              <li className="mb-1"><a href="#" className="hover:text-teal-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-300">Collaboration Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-mt-8 py-2 text-center">
        <h6 className="font-semibold text-gray-300 mb-2">OUR SOCIALS</h6>
        <div className="border-t border-gray-300 mx-auto w-[90%] py-2 text-center">

        </div>
        <div className="flex justify-center space-x-4">
        <a href="#" className="text-gray-400 hover:text-teal-300">
            <img src="/icons/face.svg" alt="Facebook" className="w-6 h-6 fill-current" />
          </a>
          <a href="#" className="text-gray-400 hover:text-teal-300">
          <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6 fill-current " />
          </a>
          <a href="#" className="text-gray-400 hover:text-teal-300">
            <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6 fill-current" />
          </a>
        </div>
      </div>
    </footer>
    );
};

export default Footer;