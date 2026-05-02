/* eslint-disable @next/next/no-img-element */
import { Select, SelectItem } from "@heroui/react";
import React from "react";

const CustomSelect = ({
  formData,
  setFormData,
  value,
  data,
  className,
  htmlFor,
  onChange,
}) => {
  const validKeys = new Set(data.map((d) => String(d.key)));

  // normalize to a plain array — HeroUI Select calls .some() on selectedKeys internally,
  // which fails if it receives a Set (Sets don't have .some())
  const selectedKeys = (() => {
    if (!value) return [];
    return Array.from(value)
      .map((k) => String(k))
      .filter((k) => validKeys.has(k));
  })();

  const handleSelectionChange = (keys) => {
    const arr = Array.from(keys ?? []);
    const filtered = new Set(arr.map((k) => String(k)).filter((k) => validKeys.has(k)));
    if (onChange) {
      onChange(filtered);
    } else if (setFormData) {
      setFormData({ ...formData, [htmlFor]: filtered });
    }
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
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            {item.data?.icon && (
              <img
                alt={item.data.label}
                className="w-5 h-4 object-cover rounded-[2px]"
                src={item.data.icon}
              />
            )}
            <span className="truncate">{item.data?.label}</span>
          </div>
        ));
      }}
    >
      {data.map((item) => (
        <SelectItem
          key={item.key}
          className="text-[#878787] data-[selected=true]:!text-[#878787]"
          textValue={item.label}
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
        </SelectItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
