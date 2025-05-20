const CoreValues = () => {
    return (
        <section className="py-16 bg-[#002938]"> 
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <h2 className="text-xl font-semibold text-[#CCD6F6] mr-4 bg-[#004967] p-2">OUR CORE VALUES</h2>
          <div className=""></div>
         <img src="/icons/ve.svg" alt="" />
        </div>
        <p className="text-2xl lg:text-4xl font-bold text-[#CCD6F6] mb-10">
          We are driven by a set of core values that <br /> guide every aspect of our business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#002938] rounded-lg p-6 lg:p-8 border border-[#D1D1D1]">
            <div className="w-10 h-10 rounded-full bg-[#64FFDA1A] text-[#64FFDA] flex items-center justify-center mb-4">
             <img src="/icons/003.svg" alt="" />
            </div>
            <h3 className="text-lg font-semibold text-[#3A98BB] mb-2">RELIABILITY</h3>
            <p className="text-sm text-[#A8B2D1]">
              Our commitment lies in delivering top-tier services to our prospects. Upholding a standard of excellence and transparency throughout all their interactions is paramount to our ethos.
            </p>
          </div>

          <div className="bg-[#002938] rounded-lg p-6 lg:p-8 border border-[#D1D1D1]">
            <div className="w-10 h-10 rounded-full bg-[#64FFDA1A] text-[#64FFDA] flex items-center justify-center mb-4">
             
              <img src="/icons/001.svg" alt="" />
            </div>
            <h3 className="text-lg font-semibold text-[#3A98BB] mb-2">INCLUSIVITY</h3>
            <p className="text-sm text-[#A8B2D1]">
              We believe that everyone should have access to this platform, regardless of where they live or what their skill set may be. We are not only providing access to information, but also creating opportunities for people from all backgrounds.
            </p>
          </div>

          <div className="bg-[#002938] rounded-lg p-6 lg:p-8 border border-[#D1D1D1]">
            <div className="w-10 h-10 rounded-full bg-[#64FFDA1A] text-[#64FFDA] flex items-center justify-center mb-4">
             
              <img src="/icons/002.svg" alt="" />
            </div>
            <h3 className="text-lg font-semibold text-[#3A98BB] mb-2">COLLABORATION</h3>
            <p className="text-sm text-[#A8B2D1]">
              Our long-term goal is to establish a seamless network that facilitates effective communication and collaboration, fostering creativity and stimulating innovation.
            </p>
          </div>
        </div>
      </div>

        
    </section>
    
    
    );
}

export default CoreValues;