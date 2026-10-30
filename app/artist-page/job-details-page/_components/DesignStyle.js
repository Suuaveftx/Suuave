'use client'

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
            <div key={style} className='bg-[#F6F6F6] px-4 py-2 rounded-full text-[#757575] text-[13px] font-medium'>
              {style}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View (Preserved) */}
      <div className='hidden lg:block w-full bg-[#FAFAFA] border border-[#EAEAEA] font-bold px-8 py-6 mt-4 lg:text-[22px] rounded-2xl'>
        <div className='lg:mb-4 text-[#222222]'>
          <h4 className='tracking-[0.33px]'>Design Style</h4>
        </div>
        <div className='flex flex-wrap gap-[11px] mt-4 w-full max-w-[50%]'>
          {styles.map((style) => (
            <div key={style} className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] max-w-full lg:max-w-[30%] flex-1 min-w-[100px] flex justify-center items-center text-[#222222] text-sm font-normal'>
              {style}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DesignStyle
