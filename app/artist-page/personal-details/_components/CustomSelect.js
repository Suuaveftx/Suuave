import { Select, SelectItem } from "@heroui/react";
import React from "react";

const CustomSelect = ({ formData, setFormData, value, data, className , htmlFor }) => {
  return (
    <Select
      aria-label={htmlFor}
      className={`${className} font-normal text-base`}
      placeholder="Select"
      variant="bordered"
      selectedKeys={formData.value}
      onSelectionChange={(keys) => setFormData({ ...formData, value: keys })}
      disableAnimation={false}
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
      {data.map((animal) => (
        <SelectItem
          key={animal.key}
          className="text-[#878787] data-[selected=true]:!text-[#878787] data-[hover=true]:!text-[#3A98BB]"
        >
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
