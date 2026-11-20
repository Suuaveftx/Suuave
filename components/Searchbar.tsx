'use client';
import { Input } from '@heroui/react';
import React from 'react';
import { SearchIcon } from './SearchIcon';

type SearchBarProps = {
  placeholder?: string;
  width?: string;
  className?: string;
  endContent?: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = ({
  placeholder = 'Search...',
  width = '',
  className = '',
  endContent = null,
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <div className={`w-full rounded-full  ${className}`}>
      <Input
        classNames={{
          base: `${width} h-12`,
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'w-full h-full font-normal text-default-500 bg-[#FAFAFA] rounded-full px-6 py-0 outline-none shadow-md border border-gray-100',
        }}
        placeholder={placeholder}
        size='sm'
        startContent={<SearchIcon width={18} height={18} size={18} />}
        endContent={endContent}
        type='search'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
