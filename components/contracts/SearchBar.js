'use client';
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@heroui/react';

export default function SearchBar({ value, onChange }) {
    return (
        <div className="w-full max-w-[500px] mb-8">
            <Input
                value={value}
                onValueChange={onChange}
                placeholder="Search by job title"
                startContent={<MagnifyingGlassIcon className="w-5 h-5 text-[#9CA3AF] shrink-0" />}
                classNames={{
                    inputWrapper:
                        'bg-white border hover:border-gray-300 focus-within:!border-gray-300 border-gray-200 shadow-none rounded-full h-[45px] px-4',
                    input: 'text-[13px] text-[#2B2B2B] placeholder:text-[#9CA3AF]',
                }}
            />
        </div>
    );
}
