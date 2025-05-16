import { Input } from "@heroui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({ placeholder = "Search", className }) => {
  return (
    <div>
      <Input
        className={className}
        startContent={<FiSearch className="size-5" />}
        variant="bordered"
        placeholder={placeholder}
        radius="full"
      />
    </div>
  );
};

export default SearchInput;
