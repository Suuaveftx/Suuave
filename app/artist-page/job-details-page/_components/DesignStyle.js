'use client';

const DesignStyle = ({ project }) => {
  const styles = Array.isArray(project?.designStyle) ? project.designStyle : [];

  if (styles.length === 0) return null;

  return (
    <>
      {/* Mobile View */}
      <div className='lg:hidden bg-white p-5 rounded-[18px] border border-[#ECECEC] shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4'>
        <h4 className='font-bold text-[15px] text-[#2E2E2E] mb-3'>Design Style</h4>

        <div className='flex flex-wrap gap-2'>
          {styles.map((style) => (
            <div
              key={style}
              className='bg-[#F6F6F6] px-4 py-2 rounded-full text-[#757575] text-[13px] font-medium'
            >
              {style}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className='hidden lg:block w-full bg-[#FAFAFA] border border-[#EAEAEA] font-bold px-8 py-6 mt-4 rounded-2xl'>
        <h4 className='tracking-[0.33px] text-[22px] text-[#222222] mb-4'>
          Design Style
        </h4>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-[11px] w-full'>
          {styles.map((style) => (
            <div
              key={style}
              className='bg-[#F0F0F0] px-3 py-2 rounded-[32px] min-w-0 flex justify-center items-center text-center text-[#222222] text-sm font-normal break-words'
            >
              {style}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesignStyle;
