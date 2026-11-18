'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const labelClass =
  'font-semibold lg:font-bold text-[14px] lg:text-sm text-[#222222] pb-1 lg:pb-0';
const inputClass =
  'w-full border-1 border-[#EAEAEA] lg:border-[#d1d1d1] !rounded-2xl lg:!rounded-lg px-4 lg:px-3 lg:py-2 py-0 text-[15px] lg:text-base min-h-[52px] lg:min-h-10 focus:outline-none focus:border-[#3A98BB] relative z-10 bg-transparent font-satoshi placeholder:text-[#9CA3AF]';

/**
 * Reusable chip input with inline autocomplete.
 * Used for both "Skills Required" and "Design Style".
 */
const TagInput = ({
  id,
  label,
  required = false,
  values,
  onChange,
  suggestions = [],
  placeholderEmpty,
  placeholderMore,
  disabled = false,
  error,
}) => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const clearInput = () => {
    setInput('');
    setSuggestion('');
  };

  const addTag = (tag) => {
    if (!tag) return;
    onChange(values.includes(tag) ? values : [...values, tag]);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (!val.length) {
      setSuggestion('');
      return;
    }
    const match = suggestions.find((s) => s.toLowerCase().startsWith(val.toLowerCase()));
    setSuggestion(match ? val + match.slice(val.length) : '');
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && suggestion) {
      e.preventDefault();
      addTag(suggestion);
      clearInput();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      addTag(suggestion || input.trim());
      clearInput();
    }
  };

  const handleBlur = () => {
    if (input.trim() && !values.includes(input.trim())) addTag(input.trim());
    clearInput();
  };

  return (
    <div className='flex flex-col gap-2 relative w-full'>
      <label htmlFor={id} className={labelClass}>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>

      <div className='relative w-full'>
        <input
          id={id}
          type='text'
          value={input}
          disabled={disabled}
          placeholder={values.length === 0 ? placeholderEmpty : placeholderMore}
          className={inputClass}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        {suggestion &&
          input &&
          suggestion.toLowerCase().startsWith(input.toLowerCase()) && (
            <div className='absolute inset-0 px-3 py-2 text-base pointer-events-none flex items-center z-0 whitespace-pre overflow-hidden font-sans'>
              <span className='text-transparent'>{input}</span>
              <span className='text-gray-400'>{suggestion.slice(input.length)}</span>
            </div>
          )}
      </div>

      {values.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-2'>
          {values.map((value, index) => (
            <div
              key={index}
              className='flex items-center gap-1 bg-[#F3F4F6] text-[#222222] px-3 py-1.5 rounded-lg text-sm border border-[#EAEAEA]'
            >
              <span>{value}</span>
              <button
                type='button'
                onClick={() => onChange(values.filter((_, i) => i !== index))}
                disabled={disabled}
                className='text-gray-400 hover:text-red-500 transition-colors ml-1'
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && (
        <p role='alert' className='text-sm text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
};

export default TagInput;
