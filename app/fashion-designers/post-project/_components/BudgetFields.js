'use client';

import { Input, Select, SelectItem } from '@heroui/react';
import { Controller } from 'react-hook-form';
import { CURRENCIES, responsiveClasses } from '../_constants';

const BudgetFields = ({ control, currency, currencyDisabled = false, disabled = false }) => (
  <>
    <Controller
      name='projectCurrency'
      control={control}
      rules={{ required: 'Please select a currency' }}
      render={({ field, fieldState }) => (
        <Select
          label='Currency'
          labelPlacement='outside'
          variant='bordered'
          radius='sm'
          classNames={responsiveClasses}
          selectedKeys={field.value ? [field.value] : []}
          onSelectionChange={(keys) => field.onChange(Array.from(keys)[0] || '')}
          onBlur={field.onBlur}
          isDisabled={currencyDisabled}
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
        >
          {CURRENCIES.map((item) => (
            <SelectItem key={item}>{item}</SelectItem>
          ))}
        </Select>
      )}
    />
    <Controller
      name='projectBudget'
      control={control}
      rules={{
        required: 'Please enter a budget',
        min: { value: 1000, message: 'Budget must be at least 1,000' },
        validate: (value) =>
          (Number.isFinite(Number(value)) && Number(value) >= 1000) ||
          'Enter a valid budget of at least 1,000',
      }}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          isDisabled={disabled}
          variant='bordered'
          radius='sm'
          labelPlacement='outside'
          classNames={responsiveClasses}
          className='lg:w-96 w-full'
          errorMessage={fieldState.error?.message}
          isInvalid={!!fieldState.error}
          label={
            <span>
              Budget <span className='text-red-500'>*</span>
            </span>
          }
          startContent={
            <span className='text-[#222222] font-medium text-sm pointer-events-none select-none'>
              {currency}
            </span>
          }
          placeholder='0.00'
          type='number'
          inputMode='decimal'
          min={1000}
          step='0.01'
          onKeyDown={(event) => {
            if (['e', 'E', '+', '-'].includes(event.key)) event.preventDefault();
          }}
        />
      )}
    />
  </>
);

export default BudgetFields;
