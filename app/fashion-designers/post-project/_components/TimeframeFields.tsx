'use client';

import { Input } from '@heroui/react';
import { Controller } from 'react-hook-form';
import { responsiveClasses } from '../_constants';

const TimeframeFields = ({ control, isApiEditMode = false, disabled = false }) => (
  <>
    <Controller
      name='projectTimeframe'
      control={control}
      rules={
        isApiEditMode
          ? {}
          : {
              required: 'Please enter a timeframe',
              validate: (value) =>
                (/^[1-9]\d*$/.test(String(value)) && Number(value) > 0) ||
                'Timeframe must be a positive whole number',
            }
      }
      render={({ field, fieldState }) => (
        <Input
          {...field}
          variant='bordered'
          radius='sm'
          labelPlacement='outside'
          classNames={responsiveClasses}
          className='lg:w-96 w-full'
          isDisabled={disabled}
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
          label={
            <span>
              Project Timeframe (Days) <span className='text-red-500'>*</span>
            </span>
          }
          placeholder='1 day, 2 days, 3 days, 10 days'
          type='number'
          min={1}
          step={1}
          inputMode='numeric'
          onKeyDown={(event) => {
            if (['e', 'E', '+', '-', '.'].includes(event.key)) event.preventDefault();
          }}
        />
      )}
    />
  </>
);

export default TimeframeFields;
