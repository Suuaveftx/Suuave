'use client';
import React from 'react';
import { Autocomplete, AutocompleteItem, Avatar } from "@heroui/react";
import { africanCountries } from '@/utils/countryData';

const CountrySelectCustom = ({ value, onChange, placeholder = "Select Nationality", error }) => {
  // Convert value (which might be a Set or string) to a key for Autocomplete
  const selectedKey = value instanceof Set ? Array.from(value)[0] : value;

  return (
    <Autocomplete
      aria-label={placeholder}
      placeholder={placeholder}
      variant="bordered"
      defaultItems={africanCountries}
      selectedKey={selectedKey}
      onSelectionChange={(key) => {
        // Return as a Set to maintain compatibility with the form's expectation
        onChange(new Set([key]));
      }}
      isInvalid={!!error}
      errorMessage={error}
      className="max-w-[280px]"
      popoverProps={{
        placement: "bottom",
        showArrow: false,
        offset: 5,
        shouldFlip: false,
      }}
      classNames={{
        base: "w-full",
        listbox: "bg-white",
        popoverContent: "bg-white border border-[#EAEAEA] shadow-xl rounded-xl",
      }}
      inputProps={{
        classNames: {
          inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB] h-11',
          input: 'text-black font-satoshi'
        }
      }}
    >
      {(item) => (
        <AutocompleteItem 
          key={item.label} 
          textValue={item.label}
          className="hover:bg-[#EAF9FF] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar
              alt={item.label}
              className="w-6 h-4 rounded-sm"
              src={item.icon}
            />
            <span className="text-sm font-satoshi text-black">{item.label}</span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default CountrySelectCustom;
