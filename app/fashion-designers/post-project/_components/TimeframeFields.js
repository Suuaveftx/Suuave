'use client';

import { Input, Select, SelectItem } from '@heroui/react';
import { Controller } from 'react-hook-form';
import { DURATION_UNITS, responsiveClasses } from '../_constants';

const TimeframeFields = ({ control, isApiEditMode = false, disabled = false }) => (
  <>
    <Controller
      name='durationType'
      control={control}
      rules={isApiEditMode ? {} : { required: 'Please select a timeframe unit' }}
      render={({ field, fieldState }) => (
        <Select
          label='Timeframe Unit'
          labelPlacement='outside'
          variant='bordered'
          radius='sm'
          classNames={responsiveClasses}
          selectedKeys={field.value ? [field.value] : []}
          onSelectionChange={(keys) => field.onChange(Array.from(keys)[0] || '')}
          onBlur={field.onBlur}
          isDisabled={disabled}
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
        >
          {DURATION_UNITS.map((unit) => (
            <SelectItem key={unit}>{unit}</SelectItem>
          ))}
        </Select>
      )}
    />

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
              Project Timeframe <span className='text-red-500'>*</span>
            </span>
          }
          placeholder='e.g. 2'
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
