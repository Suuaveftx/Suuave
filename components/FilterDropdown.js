import { useState, useRef, useEffect } from 'react';
import { HiOutlineAdjustments, HiOutlineCalendar } from 'react-icons/hi';

const FilterDropdown = ({
    label,
    options,
    selectedOption,
    setSelectedOption,
    defaultLabel,
    placeholder = 'Select',
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dateInputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isFiltered = selectedOption !== label && selectedOption !== defaultLabel;

    const handleOptionClick = (option) => {
        if (option === 'Calendar') {
            dateInputRef.current?.showPicker();
        } else {
            setSelectedOption(option);
            setIsOpen(false);
        }
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        if (date) {
            setSelectedOption(date);
            setIsOpen(false);
        }
    };

    return (
        <div className={`relative z-10 ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='bg-transparent border border-gray-300 gap-4 px-4 py-2 rounded-full flex items-center justify-between min-w-[150px] whitespace-nowrap'
            >
                <div className='flex items-center gap-2'>
                    <HiOutlineAdjustments className='w-5 h-5 text-gray-400 flex-shrink-0' />
                    <span className='text-sm text-[#222222]'>{selectedOption || label}</span>
                </div>
                <div className='flex items-center gap-1 ml-auto'>
                    <span className='text-[10px] text-gray-400'>▼</span>
                </div>
            </button>

            {isOpen && (
                <div className='absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md overflow-hidden'>
                    {isFiltered && (
                        <div
                            onClick={() => {
                                setSelectedOption(defaultLabel || label);
                                setIsOpen(false);
                            }}
                            className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB] font-medium border-b border-gray-100'
                        >
                            Reset Filter
                        </div>
                    )}
                    {options.map((option) => (
                        <button
                            key={option}
                            className='w-full text-left px-4 py-2 text-sm text-[#222222] hover:bg-gray-100 transition-colors flex items-center gap-2'
                            onClick={() => handleOptionClick(option)}
                        >
                            {option === 'Calendar' && <HiOutlineCalendar className='w-4 h-4 text-gray-500' />}
                            {option}
                        </button>
                    ))}
                </div>
            )}
            <input
                type="date"
                ref={dateInputRef}
                className="absolute opacity-0 pointer-events-none"
                style={{ top: '100%', left: 0 }}
                onChange={handleDateChange}
            />
        </div>
    );
};

export default FilterDropdown;
