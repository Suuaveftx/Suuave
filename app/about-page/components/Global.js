import Image from 'next/image';
import Link from 'next/link';

export const Global = () => {
  const mapImageSrc = '/icons/fe.svg';
  const mapImageMobile = '/icons/map_mobile.svg';

  return (
    <>
      <section className=' px-4 pb-[92px] lg:pb-[136.72px] lg:pr-[77.48px] lg:pl-[78.52px] pt-[166.47px] bg-white'>
        <div className=' '>
          <h2 className='text-2xl text-center lg:text-left font-bold text-[#222222] mb-4 '>
            We are currently spreading across Africa,
            <br className='hidden lg:block' /> with a vision to cover the global stage.
          </h2>

          <div
            style={{
              backgroundImage: `url(/svg/location-map.svg)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className=' bg-[#EAEAEA80] hidden lg:flex items-center overflow-hidden mt-[46px] h-[294px] lg:h-[439px]'
          >
            <div className='bg-[#FAFAFA] shadow-md rounded-[8px] p-5 gap-2 w-[230px] ml-[60px] mt-[40px]'>
              <div className=' flex '>
                <Image
                  width={24}
                  height={24}
                  alt='map-icon'
                  src='/svg/location-icon.svg'
                />
                <p className='text-[#222222] font-600 text-lg'>Office Location</p>
              </div>
              <p className='text-[#767676] font-400 text-base'>Lagos, Nigeria.</p>
            </div>
          </div>

          <div className=' lg:hidden overflow-hidden mt-[46px] h-[294px] lg:h-[439px]'>
            <Image
              src={mapImageMobile}
              alt='World Map with Office Location in Lagos, Nigeria'
              layout='responsive'
              width={800}
              height={400}
              className='h-[294px] lg:h-[439px]'
              // objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className=' text-center font-proximanova px-4 lg:px-0'>
        <div className='bg-[#012A39] pt-[48.5px] pb-[35px] px-[19.06px]'>
          <h2 className='text-3xl font-bold text-[#EEEEEE] mb-4'>PARTNER WITH US</h2>
          <p className='text-[#EEEEEE] mb-8 text-center'>
            We are open for partnership and sponsorships to help us
            <br className='hidden lg:block' />
            expand our global reach and improve this product.
          </p>
          <Link
            href='/partner-with-us'
            className='bg-[#CCE7F2] text-[#0A192F] font-semibold rounded-full py-3 px-8 hover:bg-[#EAF9FF] transition duration-300 '
          >
            Build With Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default Global;
