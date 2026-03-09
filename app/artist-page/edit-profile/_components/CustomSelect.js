import { Select, SelectItem } from "@heroui/react";
import React, { useMemo, useState } from "react";

const CustomSelect = ({
  formData,
  setFormData,
  value,
  data,
  className,
  htmlFor,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Stabilize validKeys Set to prevent unnecessary filter re-runs
  const validKeys = useMemo(() => new Set(data.map((d) => String(d.key))), [data]);

  // Stabilize selection keys to ensure the Select component correctly reflects state
  const selectedKeys = useMemo(() => {
    if (!value) return new Set();
    const val = value instanceof Set ? Array.from(value)[0] : String(value);
    return new Set(val && val !== "undefined" && val !== "null" ? [String(val)] : []);
  }, [value]);

  const handleSelectionChange = (keys) => {
    const selectedValue = Array.from(keys)[0];
    if (selectedValue) {
      setFormData((prev) => ({ ...prev, [htmlFor]: selectedValue }));
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full relative group">
      <Select
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        aria-label={htmlFor}
        className={`${className} font-normal text-base`}
        placeholder="Select"
        variant="bordered"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        selectionMode="single"
        disallowEmptySelection={false}
        popoverProps={{
          placement: "bottom",
          showArrow: false,
          offset: 5,
          shouldFlip: false, // Force downward
        }}
        classNames={{
          trigger:
            "font-normal text-base text-[#878787] border border-[#D1D1D1] outline-0 rounded-[8px] py-2 " +
            "focus:!border-[#3A98BB] focus:!ring-1 focus:!ring-[#3A98BB] " +
            "data-[focus=true]:!border-[#3A98BB] data-[focus=true]:!ring-[#3A98BB]",
          value: "!text-[#878787]",
          placeholder: "text-[#878787]",
          innerWrapper: "!text-[#878787]",
        }}
      >
        {data.map((item) => (
          <SelectItem
            key={String(item.key)}
            textValue={item.label}
            className="text-[#878787] data-[selected=true]:!text-[#878787]"
          >
            {item.label}
          </SelectItem>
        ))}
      </Select>

      {/* 
          Overlay to handle "click trigger to close" behavior.
          When open, this invisible div sits over the Select component.
          Since the dropdown popover is rendered in a portal, it will be above this overlay.
          Clicking the input box area will hit this overlay and close the menu.
      */}
      {isOpen && (
        <div
          className="absolute inset-0 z-10 cursor-pointer rounded-[8px]"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default CustomSelect;
