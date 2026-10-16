"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer flex items-center p-2 hover:opacity-80"
    >
      <Image
        src="/dev-images/ArrowLeft.png"
        alt="Back Arrow"
        width={24}
        height={24}
      />
    </button>
  );
};

export default BackButton;
