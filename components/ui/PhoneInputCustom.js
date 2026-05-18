'use client';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './phone-input.css'; // We'll create this for custom overrides

/**
 * PhoneInputCustom Component
 * 
 * A wrapper around react-phone-input-2 that matches the Suuave design system.
 * Handles both the dial code and the phone number.
 */
const PhoneInputCustom = ({ 
  value, 
  onChange, 
  onBlur, 
  error, 
  className = '',
  id
}) => {
  return (
    <div className={`suuave-phone-input-container ${className} ${error ? 'has-error' : ''}`}>
      <PhoneInput
        country={'ng'}
        value={value}
        onChange={(val, data) => onChange(val, data)}
        onBlur={onBlur}
        inputProps={{
          id: id,
          name: id,
        }}
        containerClass="suuave-phone-input"
        inputClass="suuave-phone-input-field"
        buttonClass="suuave-phone-input-button"
        dropdownClass="suuave-phone-input-dropdown"
        enableSearch={true}
        disableSearchIcon={true}
      />
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInputCustom;
