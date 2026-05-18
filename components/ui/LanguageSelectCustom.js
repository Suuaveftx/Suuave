'use client';
import React from 'react';
import { Autocomplete, AutocompleteItem, Avatar } from "@heroui/react";

// Common languages with their flags
export const languages = [
  { code: 'EN', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'FR', name: 'French', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'ES', name: 'Spanish', flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'PT', name: 'Portuguese', flag: 'https://flagcdn.com/w40/pt.png' },
  { code: 'AR', name: 'Arabic', flag: 'https://flagcdn.com/w40/sa.png' },
  { code: 'ZH', name: 'Chinese', flag: 'https://flagcdn.com/w40/cn.png' },
  { code: 'DE', name: 'German', flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'IT', name: 'Italian', flag: 'https://flagcdn.com/w40/it.png' },
  { code: 'YO', name: 'Yoruba', flag: 'https://flagcdn.com/w40/ng.png' },
  { code: 'IG', name: 'Igbo', flag: 'https://flagcdn.com/w40/ng.png' },
  { code: 'HA', name: 'Hausa', flag: 'https://flagcdn.com/w40/ng.png' },
  { code: 'SW', name: 'Swahili', flag: 'https://flagcdn.com/w40/ke.png' },
];

const LanguageSelectCustom = ({ value, onChange, placeholder = "Select Language", error }) => {
  return (
    <Autocomplete
      aria-label={placeholder}
      placeholder={placeholder}
      variant="bordered"
      defaultItems={languages}
      selectedKey={value}
      onSelectionChange={onChange}
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
          key={item.name} 
          textValue={item.name}
          className="hover:bg-[#EAF9FF] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar
              alt={item.name}
              className="w-6 h-4 rounded-sm"
              src={item.flag}
            />
            <span className="text-sm font-satoshi text-black">{item.name}</span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default LanguageSelectCustom;
