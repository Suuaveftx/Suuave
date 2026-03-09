import Link from 'next/link';
import React from 'react';

/**
 * CustomButton component for rendering a button with optional link and icon.
 *
 * @param {string} text - Button text (default: "Get Started").
 * @param {string} [href] - Optional link URL.
 * @param {string} [className] - Additional CSS classes.
 * @param {Function} [onPress] - Click handler function.
 * @param {React.ReactNode} [icon] - Optional icon component.
 * @param {boolean} [showIcon] - Whether to show the icon (default: true).
 */

const CustomButton = ({
  text = 'Get Started',
  href,
  className = '',
  onPress,
  onClick,
  icon,
  showIcon = true,
  style = {},
  ...props
}) => {
  // Default radial background
  const defaultStyle = {
    background: 'radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)',
    color: '#035A7A',
    ...style,
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (onPress) onPress(e);
  };

  const content = (
    <span className='flex items-center gap-2'>
      {text}
      {showIcon && icon && <span className='flex items-center'>{icon}</span>}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`flex items-center justify-center gap-2 font-proximanova font-medium px-6 py-3 rounded-full shadow-md transition-shadow hover:shadow-lg whitespace-nowrap ${className}`}
        style={defaultStyle}
        onClick={handleClick}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 font-proximanova font-medium px-6 py-3 rounded-full shadow-md transition-shadow hover:shadow-lg active:shadow-sm active:scale-[0.98] whitespace-nowrap ${className}`}
      onClick={handleClick}
      style={defaultStyle}
      type="button"
      {...props}
    >
      {content}
    </button>
  );
};

export default CustomButton;
