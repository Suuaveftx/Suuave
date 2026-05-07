'use client';
import React from 'react';

const FormLabel = ({ text, htmlFor, required, className = '' }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`text-sm font-medium text-[#222222] ${className}`}
    >
      {text}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
};

export default FormLabel;
