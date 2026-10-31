'use client';

import { useRef } from 'react';
import { Button } from '@heroui/react';
import { Paperclip, X } from 'lucide-react';

const ReferenceUpload = ({
  files,
  error,
  disabled = false,
  removeDisabled = false,
  onFileChange,
  onRemove,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className='flex flex-col gap-3'>
      <label className='text-sm font-bold text-[#222222]'>
        Reference Materials (Optional)
      </label>
      <p className='text-xs text-[#767676]'>Each file must be 5 MB or smaller.</p>
      <div className='flex flex-wrap gap-4'>
        <input
          type='file'
          ref={fileInputRef}
          onChange={onFileChange}
          className='hidden'
          multiple
          accept='image/*,.pdf'
          disabled={disabled}
        />
        <Button
          variant='bordered'
          radius='sm'
          onPress={() => fileInputRef.current.click()}
          isDisabled={disabled}
          className='lg:w-fit w-full sm:w-1/2  border-1 border-[#EAEAEA] lg:border-[#d1d1d1] font-medium lg:font-medium text-gray-400 lg:text-default-foreground min-h-[52px] lg:min-h-10 !rounded-xl lg:!rounded-sm shadow-none'
          startContent={<Paperclip className='w-4 h-4 text-gray-500' />}
        >
          <span className='hidden lg:inline'>Attach Files</span>
          <span className='lg:hidden'>Upload</span>
        </Button>

        <div className='flex flex-wrap gap-3'>
          {files.map((file, index) => (
            <div
              key={index}
              className='flex items-center gap-3 bg-[#FAFAFA] border border-[#EAEAEA] p-3 rounded-xl min-w-[200px] relative group'
            >
              <div className='bg-[#CCE7F2] p-2 rounded-lg'>
                <Paperclip className='w-4 h-4 text-[#035A7A]' />
              </div>
              <div className='flex flex-col pr-6'>
                <span className='text-sm font-medium text-[#222222] truncate max-w-[150px]'>
                  {file.name}
                </span>
                <span className='text-xs text-[#767676]'>{file.size}</span>
              </div>
              <button
                type='button'
                onClick={() => onRemove(index)}
                disabled={removeDisabled}
                className='absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors'
              >
                <X className='w-4 h-4 text-gray-400' />
              </button>
            </div>
          ))}
        </div>
      </div>
      {error && (
        <p role='alert' className='text-sm text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
};

export default ReferenceUpload;
