'use client';
import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { FiChevronDown } from 'react-icons/fi';

export default function LicenseCard() {
    return (
        <Card shadow="none" className="border border-[#EAEAEA] bg-[#FCFCFC] rounded-xl w-full">
            <CardBody className="p-4 overflow-hidden">
                <div className="flex justify-between items-center mb-[6px]">
                    <h3 className="text-[13px] font-bold text-[#222222]">Licensing Right (Non-Exclusive)</h3>
                    <FiChevronDown className="text-[#878787] stroke-2" size={16} />
                </div>
                <p className="text-[13px] text-[#767676] leading-[19px] pr-2">
                    Use this design in your collections without<br />
                    owning it exclusively.<br />
                    You&#39;re allowed to use it for both personal an<br />
                    <span className="text-[#3A98BB]">Read more...</span>
                </p>
            </CardBody>
        </Card>
    );
}
