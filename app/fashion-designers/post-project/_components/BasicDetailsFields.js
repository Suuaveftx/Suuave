'use client';

import { Input, Textarea } from '@heroui/react';
import { Controller } from 'react-hook-form';
import { responsiveClasses } from '../_constants';

const BasicDetailsFields = ({ control, disabled = false }) => (
  <>
    <Controller
      name='projectTitle'
      control={control}
      rules={{
        required: 'Please enter a title',
        validate: (value) =>
          value.trim().length >= 10 || 'Title must be at least 10 characters',
        minLength: { value: 10, message: 'Title must be at least 10 characters' },
        maxLength: { value: 200, message: 'Title must be 200 characters or fewer' },
      }}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          isDisabled={disabled}
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
          label={
            <span>
              Project Title <span className='text-red-500'>*</span>
            </span>
          }
          variant='bordered'
          radius='sm'
          placeholder='Type the title of the project'
          labelPlacement='outside'
          type='text'
          maxLength={200}
          classNames={responsiveClasses}
        />
      )}
    />
    <Controller
      name='projectDetails'
      control={control}
      rules={{
        required: 'Please enter a description',
        validate: (value) =>
          value.trim().length >= 50 || 'Description must be at least 50 characters',
        minLength: { value: 50, message: 'Description must be at least 50 characters' },
        maxLength: { value: 5000, message: 'Description must be 5,000 characters or fewer' },
      }}
      render={({ field, fieldState }) => (
        <Textarea
          {...field}
          isDisabled={disabled}
          labelPlacement='outside'
          classNames={responsiveClasses}
          radius='sm'
          isClearable
          variant='bordered'
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
          minRows={7}
          label={
            <span>
              Project Description <span className='text-red-500'>*</span>
            </span>
          }
          placeholder='Describe the project details'
          maxLength={5000}
        />
      )}
    />
  </>
);

export default BasicDetailsFields;
