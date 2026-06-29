import React from 'react';

export default function PageContainer({ children, className = "", withTopSpacing = false }) {
    return (
        <div
            className={`mx-auto w-full min-w-0 max-w-[1440px] px-4 md:px-6 lg:px-8 overflow-x-hidden ${withTopSpacing ? 'pt-6 md:pt-7' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
