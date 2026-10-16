'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@heroui/react';

const SIZE_CLASSES = {
  sm: 'h-10 min-h-10 min-w-[44px] px-5 text-sm',
  md: 'h-11 min-h-11 min-w-[44px] px-6 text-base',
  lg: 'h-12 min-h-12 min-w-[44px] px-8 text-base',
};

/**
 * Brand-primary CTA built on HeroUI Button for consistent sizing and accessibility.
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
  size = 'md',
  ...props
}) => {
  const defaultStyle = {
    background: 'radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)',
    color: '#035A7A',
    ...style,
  };

  const handlePress = (e) => {
    if (onClick) onClick(e);
    if (onPress) onPress(e);
  };

  const content = (
    <span className='flex items-center justify-center gap-2 whitespace-nowrap'>
      {text}
      {showIcon && icon ? <span className='flex items-center'>{icon}</span> : null}
    </span>
  );

  const sharedProps = {
    radius: 'full',
    className: `font-proximanova font-medium shadow-md transition-shadow hover:shadow-lg data-[pressed=true]:scale-[0.98] ${SIZE_CLASSES[size] || SIZE_CLASSES.md} ${className}`,
    style: defaultStyle,
    onPress: handlePress,
    ...props,
  };

  if (href) {
    return (
      <Button as={Link} href={href} {...sharedProps}>
        {content}
      </Button>
    );
  }

  return <Button {...sharedProps}>{content}</Button>;
};

export default CustomButton;
