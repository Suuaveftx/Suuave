'use client';
import React from 'react';
import { Autocomplete, AutocompleteItem } from "@heroui/react";

/**
 * CustomAutocomplete Component
 * 
 * A wrapper around HeroUI Autocomplete for a premium, searchable selection experience.
 */
const CustomAutocomplete = ({
  value,
  onChange,
  onSelectionChange,
  data = [],
  placeholder,
  label,
  className = '',
  id,
  isInvalid,
  errorMessage,
  isDisabled,
}) => {
  // Map our data to AutocompleteItems
  // data should be [{ key, label, icon }]

  return (
    <div className={className}>
      <Autocomplete
        id={id}
        label={label}
        placeholder={placeholder}
        variant="bordered"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        defaultItems={data}
        selectedKey={value ? String(Array.from(value)[0] || value) : undefined}
        onSelectionChange={(key) => {
          if (onSelectionChange) {
            onSelectionChange(key);
          } else if (onChange) {
            // For react-hook-form compatibility with Sets if needed
            onChange(new Set([key]));
          }
        }}
        classNames={{
          base: "max-w-full",
          listboxWrapper: "max-h-[300px] overflow-y-auto visible-scrollbar",
          popoverContent: "bg-white border border-[#D1D1D1] shadow-xl rounded-xl",
        }}
        inputProps={{
          classNames: {
            inputWrapper: [
              "bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]",
              "!rounded-[8px] h-[42px]"
            ].join(" "),
            input: "text-black text-base placeholder:text-gray-400",
          }
        }}
      >
        {(item) => (
          <AutocompleteItem
            key={item.key}
            textValue={item.label}
            className="text-black hover:bg-[#EAF9FF]"
            startContent={
              item.icon ? (
                <img
                  alt={item.label}
                  className="w-5 h-4 object-cover rounded-[2px]"
                  src={item.icon}
                />
              ) : null
            }
          >
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default CustomAutocomplete;
