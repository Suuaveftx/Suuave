import { Button } from "@heroui/react";
import React from "react";

const HeroSlimCard = ({
  text = "Streamlined Collaboration",
  svg,
  className,
}) => {
  return (
    <div
      className={`flex gap-2 z-40 items-center justify-center px-4 py-3 bg-black/30 w-fit rounded-md ${className}`}
    >
      <div>{svg}</div>
      <p className="text-customText text-sm font-thin">{text}</p>
    </div>
  );
};

export default HeroSlimCard;
