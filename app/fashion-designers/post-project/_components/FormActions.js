'use client';

import { Button } from '@heroui/react';

const FormActions = ({
  isEditMode,
  hasCreatedProject,
  isLoading,
  isSubmitDisabled,
}) => (
  <>
    <div className='flex items-center lg:justify-start justify-between gap-3 lg:gap-2 w-full lg:w-48 pt-4 lg:pt-0'>
      <Button
        type='reset'
        isDisabled={hasCreatedProject}
        size='sm'
        radius='full'
        variant='flat'
        className='flex-1 lg:flex-none bg-white lg:bg-default-100 border border-gray-100 lg:border-none shadow-sm lg:shadow-none min-h-[52px] lg:min-h-8 text-sm lg:text-xs text-gray-500 font-semibold px-4 lg:px-10'
      >
        Cancel
      </Button>
      <Button
        type='submit'
        isLoading={isLoading}
        isDisabled={isSubmitDisabled}
        size='sm'
        radius='full'
        variant='outlined'
        className='flex-1 lg:flex-none border-none text-[#035A7A] lg:text-customWhiteBgText text-sm lg:text-xs shadow-md font-semibold px-4 lg:px-10 min-h-[52px] lg:min-h-8'
        style={{ background: 'radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)' }}
      >
        {isEditMode ? 'Update' : hasCreatedProject ? 'Retry Reference Uploads' : 'Publish Project'}
      </Button>
    </div>
    {!isEditMode && (
      <p className='text-xs text-[#767676]'>You can publish up to 10 projects per day.</p>
    )}
  </>
);

export default FormActions;
