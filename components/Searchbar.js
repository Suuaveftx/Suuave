'use client';
import { Input } from '@heroui/react';
import React from 'react';
import { SearchIcon } from './SearchIcon';

const SearchBar = ({ placeholder = 'Search...', width, className = '' }) => {
  return (
    <div className={`w-full rounded-full  ${className}`}>
      <Input
        classNames={{
          base: `${width} h-10`,
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'w-full h-full font-normal text-default-500 bg-[#FAFAFA] rounded-full px-6 py-6 outline-none',
        }}
        placeholder={placeholder}
        size='sm'
        startContent={<SearchIcon size={18} />}
        type='search'
      />
    </div>
  );
};

export default SearchBar;
