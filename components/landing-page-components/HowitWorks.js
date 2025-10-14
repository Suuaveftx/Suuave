import { Image } from '@heroui/react';

const HowItWorks = () => {
  return (
    <div className='bg-customWhite py-5 pb-1s' id='howitworks'>
      <div className='px-4 lg:px-14'>
        {/* Grouped Section */}
        <div>
          <button className='bg-[#EAF9FF] text-[#035A7A] px-4 py-3 cursor-default rounded-lg text-lg uppercase font-medium flex items-center gap-2'>
            <Image
              src='/dev-images/Microphone.png' // icon's path
              alt='Icon'
              width={20}
              draggable={false}
            />
            How it works
          </button>

          {/* Supporting Text */}
          <p className='mt-6 lg:text-[32px] text-[30px]  md:text-4xl text-customTextBlack font-semibold'>
            Let&apos;s help you achieve your goals.
          </p>
        </div>

        {/* Youtube Section */}
        <div className='w-full  aspect-video mx-auto mt-4'>
          <iframe
            className='w-full h-full rounded-lg'
            src='https://www.youtube.com/embed/ONVt56eek8s?si=0im4jvm4a9ZA2Nmh'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
