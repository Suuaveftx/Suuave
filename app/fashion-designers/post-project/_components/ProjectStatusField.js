'use client';

import { Select, SelectItem } from '@heroui/react';
import { Controller } from 'react-hook-form';
import { PROJECT_STATUSES, responsiveClasses } from '../_constants';

const ProjectStatusField = ({ control, disabled = false }) => (
  <Controller
    name='projectStatus'
    control={control}
    rules={{ required: 'Please select a project status' }}
    render={({ field, fieldState }) => (
      <Select
        label='Project Status'
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
        {PROJECT_STATUSES.map((status) => (
          <SelectItem key={status}>{status.replace('_', ' ')}</SelectItem>
        ))}
      </Select>
    )}
  />
);

export default ProjectStatusField;
