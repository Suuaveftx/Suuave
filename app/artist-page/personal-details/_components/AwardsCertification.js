"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { X, ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@heroui/react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const AwardsCertification = ({ setSelected, setHoveredField }) => {
  const router = useRouter();
  const { control, register, trigger } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "awards"
  });

  const handleFileChange = (index, e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPreviews = files.map((f) => URL.createObjectURL(f));
      addAwardPreview(index, newPreviews);
    }
  };

  return (
    <div className='bg-[#FAFAFA] border border-[#DEDEDE] rounded-2xl p-3 md:p-6 w-full h-full'>
      {/* Mobile back arrow */}
      <button
        className='flex items-center text-[#3A98BB] mb-3'
        onClick={() => setSelected('ProfessionalInformation')}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Header row: title + Add button */}
      <div className='flex items-start justify-between gap-3 flex-wrap'>
        <div>
          <h1 className='text-[#3A98BB] font-bold text-2xl md:text-[32px] leading-tight'>
            Awards/Certifications
          </h1>
          <p className='text-[#767676] font-normal text-base mt-1'>
            Add any relevant awards or certifications.
          </p>
        </div>
        <button
          type="button"
          onClick={() => append({ name: '', issuedBy: '', previews: [] })}
          className='flex items-center gap-1 border border-[#3A98BB] text-[#3A98BB] rounded-full px-4 py-2 text-sm font-semibold hover:bg-[#EAF9FF] transition-colors mt-1'
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <section className='space-y-6 mt-5'>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='border border-[#DEDEDE] rounded-xl p-4 space-y-6 relative'
          >
            {/* Remove entry (only if more than one) */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className='absolute top-3 right-3 bg-white border border-[#D1D1D1] rounded-full p-1 shadow-sm hover:bg-red-50 transition-colors'
              >
                <X size={14} className='text-red-500' />
              </button>
            )}

            {/* Name of Award/Certificate */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Name')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor={`awardName-${index}`} text='Name Of Award/Certificate' />
              <Input
                id={`awardName-${index}`}
                placeholder='Eg Best Illustrator Award'
                {...register(`awards.${index}.name`)}
              />
            </div>

            {/* Awarded/Issued by */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField('Issued/Awarded by')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable htmlFor={`issuedBy-${index}`} text='Awarded/Issued By' />
              <Input
                id={`issuedBy-${index}`}
                placeholder='Organization that issued/awarded'
                {...register(`awards.${index}.issuedBy`)}
              />
            </div>

            {/* Upload Certificate/Award */}
            <div
              className='w-full flex flex-col gap-2'
              onMouseEnter={() => setHoveredField(' Upload Certificate/Award')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <Lable
                htmlFor={`cert-${index}`}
                text='Upload Certificate/Award (Optional)'
              />
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {field.previews?.map((src, pi) => (
                  <div
                    key={pi}
                    className='relative w-full h-32 rounded-lg overflow-hidden border border-[#D1D1D1]'
                  >
                    <Image src={src} alt={`award-${index}-${pi}`} fill className='object-cover' />
                    <button
                      type='button'
                      onClick={() => {}}
                      className='absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm transition-colors'
                    >
                      <X size={14} className='text-red-500' />
                    </button>
                  </div>
                ))}
                <label
                  htmlFor={`cert-${index}`}
                  className='flex flex-col items-center cursor-pointer justify-center gap-1 w-full h-32 rounded-lg border border-dashed border-[#3A98BB] bg-[#F4FBFE]'
                >
                  <Image src='/svg/paper-clip.svg' alt='icon' width={20} height={20} />
                  <p className='text-[#3A98BB] font-medium text-xs text-center px-2'>
                    {(field.previews?.length || 0) > 0 ? 'Add more' : 'Upload Certificate'}
                  </p>
                  <input
                    id={`cert-${index}`}
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={(e) => handleFileChange(index, e)}
                    className='hidden'
                  />
                </label>
              </div>
            </div>
          </div>
        ))}

        {/* Action buttons */}
        <div className='w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-3 mt-12'>
          <Button
            as={Link}
            href='/artist-page/project-page'
            className='w-full md:w-auto bg-transparent border border-[#3A98BB] text-[#3A98BB] font-semibold rounded-[40px] px-12 py-3.5 hover:bg-[#EAF9FF] transition-colors shadow-none'
          >
            Skip
          </Button>
          <Button
            onPress={async () => {
              const isValid = await trigger("awards");
              if (isValid) router.push('/artist-page/project-page');
            }}
            className='w-full md:w-auto text-[#035A7A] font-semibold rounded-[40px] px-12 py-3.5 bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)]'
          >
            Submit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AwardsCertification;

const Input = React.forwardRef(({ placeholder, id, name, onChange, onBlur }, ref) => {
  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
      id={id}
      placeholder={placeholder}
      className='w-full border border-[#D1D1D1] text-[#878787] font-normal text-base py-2 px-2 rounded-lg outline-[#3A98BB] bg-transparent'
    />
  );
});

Input.displayName = "Input";

const Lable = ({ text, htmlFor, required }) => {
  return (
    <label htmlFor={htmlFor} className='text-sm font-medium text-[#222222]'>
      {text}{required && <span className='text-red-500 ml-0.5'>*</span>}
    </label>
  );
};
