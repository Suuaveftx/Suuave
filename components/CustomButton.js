import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

/**
 * CustomButton component for rendering a button with optional link and icon.
 *
 * @param {string} text - Button text (default: "Get Started").
 * @param {string} [href] - Optional link URL.
 * @param {string} [className] - Additional CSS classes.
 * @param {Function} [onPress] - Click handler function.
 * @param {React.ReactNode} [icon] - Optional icon component.
 */

const CustomButton = ({
  text = "Get Started",
  href,
  className,
  onPress,
  icon,
   style = {}, // Allow incoming style override
}) => {
   // Default radial background
  const defaultStyle = {
    background: "radial-gradient(circle at top left, #ff7e5f, #feb47b)",
    color: "white",
    ...style, // style prop overrides defaultStyle
  };

  return (
    <Button
      className={`flex items-center justify-center gap-2 font-proximanova   font-medium px-6 py-3 rounded-full shadow-md ${className}`}
      onClick={onPress}
       style={defaultStyle}
    >
      {href ? (
        <Link href={href} className="flex items-center">
          {text}
        </Link>
      ) : (
        text
      )}
      {icon && <span className="flex items-center">{icon}</span>}
    </Button>
  );
};

export default CustomButton;
