import { useState, useRef, useEffect } from 'react';
import { HiOutlineAdjustments, HiOutlineCalendar } from 'react-icons/hi';

const FilterDropdown = ({
    label,
    options,
    selectedOption,
    setSelectedOption,
    defaultLabel,
    placeholder = 'Select',
    className = '',
    trigger
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
        <div className={`relative z-30 ${className}`} ref={dropdownRef}>
            {trigger ? (
                <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                    {trigger}
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='bg-transparent border border-gray-300 gap-2 md:gap-4 px-2 md:px-4 py-2 rounded-full flex items-center justify-between min-w-[120px] md:min-w-[150px] whitespace-nowrap'
                >
                    <div className='flex items-center gap-1 md:gap-2'>
                        <HiOutlineAdjustments className='w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0' />
                        <span className='text-xs md:text-sm text-[#222222]'>{selectedOption || label}</span>
                    </div>
                    <div className='flex items-center gap-1 ml-auto'>
                        <span className='text-[8px] md:text-[10px] text-gray-400'>▼</span>
                    </div>
                </button>
            )}

            {isOpen && (
                <div
                    className='absolute top-full right-0 mt-2 min-w-full w-max max-w-[280px] bg-[#FAFAFA] rounded-xl z-50 overflow-hidden border-0'
                    style={{
                        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    {isFiltered && (
                        <div
                            onClick={() => {
                                setSelectedOption(defaultLabel || label);
                                setIsOpen(false);
                            }}
                            className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-[#3A98BB] text-sm font-semibold border-b border-[#EAEAEA]'
                        >
                            Reset Filter
                        </div>
                    )}
                    {options.map((option, index) => (
                        <button
                            key={option}
                            className={`w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-gray-100 transition-colors flex items-center gap-2 font-medium ${index !== options.length - 1 ? 'border-b border-[#EAEAEA]' : ''
                                }`}
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
                className="absolute opacity-0 pointer-events-none w-px h-px"
                style={{ top: '100%', left: '0', marginTop: '4px' }}
                onChange={handleDateChange}
            />
        </div>
    );
};

export default FilterDropdown;
