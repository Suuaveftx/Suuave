/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { Select, SelectItem } from "@heroui/react";

/**
 * CustomSelect Component
 * 
 * A wrapper around HeroUI Select that handles common patterns in the Suuave project:
 * - Handling Sets (as required by HeroUI) vs Arrays.
 * - Displaying icons (flags, etc.) in the trigger and items.
 * - Consistent styling for borders, focus, and typography.
 * - Supporting descriptions for options.
 */
const CustomSelect = ({
  value,
  onChange,
  data = [],
  placeholder,
  className = '',
  ariaLabel,
  id,
  isInvalid,
  errorMessage,
  placement = "bottom-start",
}) => {
  const selectedKeys = React.useMemo(() => {
    const vKeys = new Set(data.map((d) => String(d.key)));
    if (!value) return [];
    // If value is already a Set, convert to array of strings
    if (value instanceof Set) {
      return Array.from(value)
        .map((k) => String(k))
        .filter((k) => vKeys.has(k));
    }
    // If it's a string, wrap in array
    if (typeof value === 'string') {
      return vKeys.has(value) ? [value] : [];
    }
    return [];
  }, [value, data]);

  const handleSelectionChange = (keys) => {
    // HeroUI returns a Set of keys. We pass this directly back to onChange.
    if (onChange) {
      onChange(keys);
    }
  };

  return (
    <div className={className}>
      <Select
        id={id}
        aria-label={ariaLabel || id}
        placeholder={placeholder || `Select (${data?.length || 0})`}
        variant="bordered"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        placement={placement}
        popoverProps={{
          placement: placement,
          shouldFlip: false,
          offset: 10,
        }}
        classNames={{
          trigger: [
            "font-normal text-base text-[#878787] border border-[#D1D1D1] outline-0 rounded-[8px] py-2",
            "hover:border-[#3A98BB]",
            "data-[focus=true]:!border-[#3A98BB] data-[focus=true]:!ring-[#3A98BB]",
            "data-[invalid=true]:border-danger data-[invalid=true]:text-danger",
          ].join(" "),
          value: "!text-[#878787]",
          placeholder: "text-[#878787]",
          innerWrapper: "!text-[#878787]",
          listboxWrapper: "max-h-[300px] overflow-y-auto visible-scrollbar",
        }}
        scrollShadowProps={{
          isEnabled: false,
        }}
        renderValue={(items) => {
          return items.map((item) => {
            const originalItem = data.find(d => String(d.key) === String(item.key));
            return (
              <div key={item.key} className="flex items-center gap-2">
                {originalItem?.icon && (
                  <img
                    alt={originalItem?.label}
                    className="w-5 h-4 object-cover rounded-[2px]"
                    src={originalItem?.icon}
                  />
                )}
                <span className="truncate">{originalItem?.label || item.textValue}</span>
              </div>
            );
          });
        }}
      >
        {data.map((item) => (
          <SelectItem
            key={item.key}
            className="text-[#878787] data-[selected=true]:!text-[#878787]"
            textValue={item.label}
            description={item.description}
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
            <span className={item.description ? "font-bold text-[#222222]" : ""}>
              {item.label}
            </span>
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
