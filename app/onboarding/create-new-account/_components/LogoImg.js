import Image from 'next/image'
import React from 'react'

const LogoImg = () => {
  return (
    <div>
        <div className="hidden sm:flex justify-center items-start mt-8 ml-4">
            <Image
                  src="/dev-images/bg.png" 
                  alt="Background Image" 
                  className="rounded-lg w-full h-auto md:w-[500px] md:h-[500px]" 
                  width={574}
                  height={400}
                />
          </div>
    </div>
  )
}

export default LogoImg