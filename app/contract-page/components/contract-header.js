"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import React from "react";

export default function ContractHeader({ title }) {
  return (
    <div className="max-w-6xl mx-auto my-8">
      <h1 className=" text-2xl md:text-4xl font-semibold text-[#444444] flex items-center gap-2">
        {/* Show the arrow only on mobile view (sm and below) */}
        <Button
          isIconOnly
          variant="flat"
          className="block lg:hidden ml-2 bg-transparent -mr-2"
        >
          <ChevronLeftIcon width={20} height={20} />
        </Button>
        {title}
      </h1>
    </div>
  );
}
