import Image from "next/image";

export const Global = () => {
    const mapImageSrc = '/icons/fe.svg';

    return (
        <div>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">  We are currently spreading across Africa, with <br /> a vision to cover the global stage.</h2>
          
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <Image src={mapImageSrc} alt="World Map with Office Location in Lagos, Nigeria" layout="responsive" width={800} height={400} objectFit="contain" />
          
            </div>
          </div>
        </section>
  

                {/* Partner With Us Section */}
        <section className="py-16 bg-[#012A39] text-center">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#CCD6F6] mb-4">PARTNER WITH US</h2>
            <p className="text-[#A8B2D1] mb-8">
              We are open for partnership and sponsorships to help us
              expand our global reach and improve this product.
            </p>
            <button className="bg-[#CCE7F2] text-[#0A192F] font-semibold rounded-full py-3 px-8 hover:bg-[#EAF9FF] transition duration-300 ">
              Build With Us
            </button>
          </div>
        </section>
      </div>
      
    );
};

export default Global;