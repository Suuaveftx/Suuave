'use client';

import React from 'react';
import { useTour } from '../../../../components/tour/ProductTour';
import { PlayCircle } from 'lucide-react';

/**
 * Small card shown in settings that lets users restart the product tour.
 */
export default function RestartTourCard() {
    const { startTour } = useTour();

    const handleRestart = () => {
        try {
            localStorage.removeItem('tourCompleted');
        } catch (_) { }
        startTour();
    };

    return (
        <div
            style={{
                border: '1px solid #E5E7EB',
                borderRadius: 12,
                padding: '20px 24px',
                background: '#FAFAFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                maxWidth: 480,
            }}
        >
            <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#111827', marginBottom: 4 }}>
                    Platform Walkthrough
                </p>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
                    Replay the interactive tour to rediscover key features of the platform.
                </p>
            </div>
            <button
                onClick={handleRestart}
                aria-label="Restart the product tour"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 18px',
                    borderRadius: 8,
                    border: '1px solid #D1FAE5',
                    background: '#F0FDF4',
                    color: '#065F46',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#DCFCE7')}
                onMouseLeave={e => (e.currentTarget.style.background = '#F0FDF4')}
            >
                <PlayCircle size={15} />
                Restart Tour
            </button>
        </div>
    );
}
