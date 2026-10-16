'use client';
import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Image as NextImage } from 'next/image';

export default function RecommendationCard({ imageUrl, title, price }) {
    return (
        <Card shadow="none" className="w-[145px] flex-shrink-0 bg-transparent border-none rounded-none p-0">
            <CardBody className="p-0 overflow-visible cursor-pointer">
                <div className="w-[145px] h-[180px] rounded-xl overflow-hidden mb-[10px]">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h4 className="font-bold text-[11px] text-[#222222] leading-tight truncate px-0">{title}</h4>
                <span className="font-bold text-[12px] text-[#3A98BB] mt-1 block px-0">{price}</span>
            </CardBody>
        </Card>
    );
}
