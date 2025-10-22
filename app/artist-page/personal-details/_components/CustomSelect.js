import { Select, SelectItem } from "@heroui/react";
import React from "react";

const CustomSelect = ({
  formData,
  setFormData,
  value,
  data,
  className,
  htmlFor,
}) => {
  const validKeys = new Set(data.map((d) => String(d.key)));

  // normalize the incoming value into a Set (safe if value is undefined)
  const selectedKeys = (() => {
    if (!value) return new Set();
    const arr = Array.from(value);
    return new Set(arr.map((k) => String(k)).filter((k) => validKeys.has(k)));
  })();

  const handleSelectionChange = (keys) => {
    const arr = Array.from(keys ?? []);
    const filtered = new Set(arr.map((k) => String(k)).filter((k) => validKeys.has(k)));
    setFormData({ ...formData, [htmlFor]: filtered });
  };

  return (
    <Select
      aria-label={htmlFor}
      className={`${className} font-normal text-base`}
      placeholder="Select"
      variant="bordered"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
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
      {data.map((item) => (
        <SelectItem
          key={item.key}
          className="text-[#878787] data-[selected=true]:!text-[#878787]"
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
