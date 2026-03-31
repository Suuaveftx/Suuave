import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { X } from 'lucide-react';

const AwardsCertification = ({
  setSelected,
  formData,
  setFormData,
  uploadedAwardCertificate,
  previewAwardCertificate,
  removeAwardCertificateItem,
}) => {
  return (
    <div className='bg-[#FAFAFA] border border-[#DEDEDE] rounded-2xl p-3 md:p-6 w-full h-full'>
      <h1 className='text-[#3A98BB] font-bold text-[32px]'>Awards/Certifications</h1>
      <p className='text-[#767676] font-normal text-base mt-2'>
        Add any relevant awards or certifications.
      </p>
      <section className='space-y-10 mt-5'>
        {/*Name of Award/Certificate*/}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='nameofAwardCertificate' text='Name Of Award/Certificate' />
          <Input
            id='nameofAwardCertificate'
            placeholder='Eg Best Illustrator Award'
            value={formData.nameofAwardCertificate}
            onChange={(e) =>
              setFormData({
                ...formData,
                nameofAwardCertificate: e.target.value,
              })
            }
          />
        </div>
        {/*Awarded/Issued by */}
        <div className='w-full flex flex-col gap-2'>
          <Lable htmlFor='awardedIssuedBy' text='Awarded/Issued By' />
          <Input
            id='awardedIssuedBy'
            placeholder='Organization that issued/awarded '
            value={formData.awardedIssuedBy}
            onChange={(e) =>
              setFormData({
                ...formData,
                awardedIssuedBy: e.target.value,
              })
            }
          />
        </div>
        {/*Upload Certificate/Award*/}
        <div className='w-full flex flex-col gap-2'>
          <Lable
            htmlFor='uploadCertificateAward'
            text='Upload Certificate/Award (Optional)'
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewAwardCertificate.map((src, index) => (
              <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden border border-[#D1D1D1]">
                <Image src={src} alt={`award-${index}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeAwardCertificateItem(index)}
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm transition-colors"
                >
                  <X size={14} className="text-red-500" />
                </button>
              </div>
            ))}
            <label
              htmlFor='uploadedAwardCertificate'
              className='flex flex-col items-center cursor-pointer justify-center gap-1 w-full h-32 rounded-lg border border-dashed border-[#3A98BB] bg-[#F4FBFE]'
            >
              <Image src='/svg/paper-clip.svg' alt='icon' width={20} height={20} />
              <p className='text-[#3A98BB] font-medium text-xs text-center px-2'>
                {previewAwardCertificate.length > 0 ? "Add more" : "Upload Certificate"}
              </p>
              <input
                id='uploadedAwardCertificate'
                type='file'
                accept='image/*'
                multiple
                onChange={uploadedAwardCertificate}
                className='hidden'
              />
            </label>
          </div>
        </div>


        {/* submit button */}
        <div className='w-full px-10 md:px-0 justify-center flex md:justify-end items-center gap-5'>
          <Link href="/artist-page/project-page" className='text-[#3A98BB] px-6 py-2 cursor-pointer '>Skip</Link>
          <Link
            href="/artist-page/project-page"
            className='text-[#035A7A] rounded-3xl cursor-pointer px-6 py-2  text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]'
          >
            Submit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AwardsCertification;

const Input = ({ placeholder, id, value, onChange }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      id={id}
      placeholder={placeholder}
      className='w-full border border-[#D1D1D1] text-[#878787] font-normal text-base py-2 px-2 rounded-lg outline-[#3A98BB] bg-transparent '
    />
  );
};

const Lable = ({ text, htmlFor, required }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-[#222222]">
      {text}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
};
