'use client';

/**
 * ProductTour.js
 *
 * A self-contained, reusable, data-driven product tour system for the
 * Fashion Brand Platform. No external libraries required.
 *
 * Architecture:
 *   TourContext  — shared state
 *   useTour()    — hook to read/control the tour
 *   TourProvider — wraps the layout, renders overlay + tooltip
 */

import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { usePathname } from 'next/navigation';
import { tourSteps, mobileTourSteps, artistDesktopTourSteps, artistMobileTourSteps } from './tourSteps';
import { TourContext } from './TourContext';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
export { TourContext } from './TourContext';

const defaultTourContext = {
    active: false,
    stepIndex: 0,
    currentStep: null,
    isMobile: false,
    getActiveSteps: () => [],
    startTour: () => {},
    closeTour: () => {},
    finishTour: () => {},
    goNext: () => {},
    goBack: () => {},
};

export function useTour() {
    const ctx = useContext(TourContext);
    return ctx || defaultTourContext;
}

// ─────────────────────────────────────────────
// Helper: determine tooltip placement
// ─────────────────────────────────────────────
const TOOLTIP_W = 340;
const TOOLTIP_H = 200;
const GAP = 14;

function computePosition(rect, preferredPlacement, vpW, vpH) {
    // On small screens always use bottom-sheet (handled by CSS)
    if (vpW < 640) return { placement: 'sheet', top: 0, left: 0 };

    const placements = [preferredPlacement, 'bottom', 'top', 'right', 'left'];

    for (const p of placements) {
        let top, left;
        if (p === 'bottom') {
            top = rect.bottom + GAP;
            left = rect.left + rect.width / 2 - TOOLTIP_W / 2;
        } else if (p === 'top') {
            top = rect.top - TOOLTIP_H - GAP;
            left = rect.left + rect.width / 2 - TOOLTIP_W / 2;
        } else if (p === 'right') {
            top = rect.top + rect.height / 2 - TOOLTIP_H / 2;
            left = rect.right + GAP;
        } else if (p === 'left') {
            top = rect.top + rect.height / 2 - TOOLTIP_H / 2;
            left = rect.left - TOOLTIP_W - GAP;
        }

        const clampedLeft = Math.max(12, Math.min(left, vpW - TOOLTIP_W - 12));
        const clampedTop = Math.max(12, Math.min(top, vpH - TOOLTIP_H - 12));

        const fits =
            clampedTop >= 8 &&
            clampedTop + TOOLTIP_H <= vpH - 8 &&
            clampedLeft >= 8 &&
            clampedLeft + TOOLTIP_W <= vpW - 8;

        if (fits) return { placement: p, top: clampedTop, left: clampedLeft };
    }

    return {
        placement: 'center',
        top: vpH / 2 - TOOLTIP_H / 2,
        left: vpW / 2 - TOOLTIP_W / 2,
    };
}

// ─────────────────────────────────────────────
// Overlay — dims everything except the target
// ─────────────────────────────────────────────
function TourOverlay({ targetRect, onClick }) {
    if (!targetRect) return null;

    const { top, left, width, height } = targetRect;

    return (
        <>
            {/* Top */}
            <div
                className="fixed bg-[#0F0F14]/60 z-[10000] pointer-events-auto transition-all duration-200 ease-in-out"
                style={{ top: 0, left: 0, right: 0, height: Math.max(0, top - 4) }}
                onClick={onClick}
            />
            {/* Bottom */}
            <div
                className="fixed bg-[#0F0F14]/60 z-[10000] pointer-events-auto transition-all duration-200 ease-in-out"
                style={{ top: Math.max(0, top + height + 4), left: 0, right: 0, bottom: 0 }}
                onClick={onClick}
            />
            {/* Left */}
            <div
                className="fixed bg-[#0F0F14]/60 z-[10000] pointer-events-auto transition-all duration-200 ease-in-out"
                style={{
                    top: Math.max(0, top - 4),
                    left: 0,
                    width: Math.max(0, left - 4),
                    height: height + 8,
                }}
                onClick={onClick}
            />
            {/* Right */}
            <div
                className="fixed bg-[#0F0F14]/60 z-[10000] pointer-events-auto transition-all duration-200 ease-in-out"
                style={{
                    top: Math.max(0, top - 4),
                    left: Math.max(0, left + width + 4),
                    right: 0,
                    height: height + 8,
                }}
                onClick={onClick}
            />
            {/* Highlight ring */}
            <div
                className="fixed rounded-lg z-[10010] pointer-events-none transition-all duration-200 ease-in-out"
                style={{
                    top: top - 4,
                    left: left - 4,
                    width: width + 8,
                    height: height + 8,
                    boxShadow: '0 0 0 3px #3A98BB, 0 0 20px 2px rgba(58,152,187,0.25)',
                }}
            />
        </>
    );
}

// ─────────────────────────────────────────────
// Tooltip Card
// ─────────────────────────────────────────────
function TourTooltip({
    step,
    stepIndex,
    totalSteps,
    position,
    onNext,
    onBack,
    onClose,
}) {
    const isFirst = stepIndex === 0;
    const isLast = stepIndex === totalSteps - 1;
    const isSheet = position.placement === 'sheet';

    return (
        <Card
            role="dialog"
            aria-modal="true"
            aria-label={`Tour step ${stepIndex + 1} of ${totalSteps}: ${step.title}`}
            className={`fixed z-[10020] animate-appearance-in bg-white border border-gray-100 shadow-2xl ${isSheet ? "bottom-0 left-0 right-0 rounded-t-2xl max-w-[100vw]" : "rounded-xl"
                }`}
            style={isSheet ? undefined : { top: position.top, left: position.left, width: TOOLTIP_W }}
            classNames={{
                base: isSheet ? "p-4 pb-safe" : "p-2",
            }}
        >
            <CardHeader className="flex flex-row justify-between items-center pb-2">
                <div className="flex gap-[5px] items-center">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-200 ease-linear ${i === stepIndex
                                    ? "w-[18px] bg-[#3A98BB]"
                                    : i < stepIndex
                                        ? "w-1.5 bg-[#A8D8EA]"
                                        : "w-1.5 bg-[#D8EEF8]"
                                }`}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-400 tracking-wide">
                        {stepIndex + 1} of {totalSteps}
                    </span>
                    <button
                        onClick={onClose}
                        aria-label="Close tour"
                        className="text-gray-400 hover:text-gray-700 transition-colors p-0.5"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </CardHeader>

            <CardBody className="py-2">
                <h3 className="text-[17px] font-bold text-gray-900 leading-snug mb-2 font-satoshi tracker-tight">
                    {step.title}
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                    {step.description}
                </p>
            </CardBody>

            <CardFooter className="flex justify-end gap-2 pt-2 pb-1">
                <Button
                    variant="light"
                    onPress={onClose}
                    className="mr-auto text-gray-400 hover:text-gray-700 font-medium text-[13px] px-2 h-10"
                >
                    Skip tour
                </Button>

                <Button
                    variant="bordered"
                    onPress={onBack}
                    isDisabled={isFirst}
                    className="border-gray-200 bg-gray-50 text-gray-700 font-semibold text-[13px] rounded-lg px-4 hover:bg-gray-100 disabled:opacity-50 h-11"
                >
                    Back
                </Button>

                <Button
                    color="primary"
                    onPress={onNext}
                    className="bg-[#3A98BB] text-white font-semibold text-[13px] rounded-lg px-5 hover:bg-[#2e88a8] h-11"
                >
                    {isLast ? 'Finish' : 'Next →'}
                </Button>
            </CardFooter>
        </Card>
    );
}

// ─────────────────────────────────────────────
// TourProvider
// ─────────────────────────────────────────────
export function TourProvider({ children }) {
    const [active, setActive] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [targetRect, setTargetRect] = useState(null);
    const [position, setPosition] = useState({ placement: 'bottom', top: 0, left: 0 });
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 640 : false
    );
    const pathname = usePathname();
    const isArtistTour = pathname?.startsWith('/artist-page');

    // ── Track isMobile, reset tour index on breakpoint change ──
    useEffect(() => {
        const handleResize = () => {
            const nowMobile = window.innerWidth < 640;
            setIsMobile(prev => {
                if (prev !== nowMobile) {
                    // Breakpoint switched — reset to step 0 to avoid out-of-bounds
                    setStepIndex(0);
                    setTargetRect(null);
                }
                return nowMobile;
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ── Use a ref so all callbacks always read the current list ──
    const activeStepsRef = useRef(tourSteps);
    useEffect(() => {
        if (isArtistTour) {
            activeStepsRef.current = isMobile && artistMobileTourSteps?.length > 0
                ? artistMobileTourSteps
                : artistDesktopTourSteps;
        } else {
            activeStepsRef.current = isMobile && mobileTourSteps.length > 0
                ? mobileTourSteps
                : tourSteps;
        }
    }, [isMobile, isArtistTour]);

    const getActiveSteps = () => {
        if (isArtistTour) return isMobile && artistMobileTourSteps?.length > 0 ? artistMobileTourSteps : artistDesktopTourSteps;
        return isMobile && mobileTourSteps.length > 0 ? mobileTourSteps : tourSteps;
    };

    const activeSteps = getActiveSteps();
    const currentStep = activeSteps[stepIndex] ?? activeSteps[0];

    // ── Start tour ──────────────────────────────
    const startTour = useCallback(() => {
        setStepIndex(0);
        setTargetRect(null);
        setActive(true);
    }, []);

    // ── Close tour ──────────────────────────────
    const closeTour = useCallback(() => {
        setActive(false);
        setTargetRect(null);
    }, []);

    // ── Finish tour (persists completion) ───────
    const finishTour = useCallback(() => {
        closeTour();
    }, [closeTour]);

    // ── Navigate steps ─────────────────────────
    const goNext = useCallback(() => {
        const steps = activeStepsRef.current;
        setStepIndex(i => {
            if (i < steps.length - 1) return i + 1;
            // Last step — finish asynchronously to avoid state conflicts
            setTimeout(finishTour, 0);
            return i;
        });
    }, [finishTour]);

    const goBack = useCallback(() => {
        setStepIndex(i => (i > 0 ? i - 1 : 0));
    }, []);

    // ── Measure target & recompute tooltip pos ──
    const measureTarget = useCallback((retryCount = 0) => {
        if (!active) return;
        const steps = activeStepsRef.current;
        const step = steps[stepIndex];
        if (!step) return;

        // Support comma-separated selectors (first match wins)
        const selectors = step.target.split(',').map(s => s.trim());
        const el = selectors.reduce((found, sel) => found || document.querySelector(sel), null);

        if (!el) {
            // Retry up to 3 times with a delay before auto-skipping.
            // This prevents premature skipping when the hamburger menu is
            // animating open and the target isn't painted yet.
            if (retryCount < 3) {
                setTimeout(() => measureTarget(retryCount + 1), 300);
            } else {
                // After retries, skip only if there's a next step
                const next = stepIndex + 1;
                if (next < steps.length) {
                    setStepIndex(next);
                } else {
                    finishTour();
                }
            }
            return;
        }

        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

        setTimeout(() => {
            const rect = el.getBoundingClientRect();
            setTargetRect(rect);
            setPosition(computePosition(rect, step.placement, window.innerWidth, window.innerHeight));
        }, 350);
    }, [active, stepIndex, finishTour, isMobile]);

    // Clear targetRect on step change so the old highlight disappears instantly
    useEffect(() => {
        if (active) setTargetRect(null);
    }, [stepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    // Re-measure on step change or window resize
    useLayoutEffect(() => {
        if (!active) return;
        measureTarget();
        const handleResize = () => measureTarget();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, stepIndex, isMobile]);

    // Keyboard navigation
    useEffect(() => {
        if (!active) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') closeTour();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goBack();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [active, goNext, goBack, closeTour]);

    // Auto-start only on specific dashboard landing pages
    useEffect(() => {
        let shouldAutoStart = false;

        if (isArtistTour) {
            shouldAutoStart = pathname === '/artist-page/project-page';
        } else {
            shouldAutoStart = pathname === '/fashion-designers';
        }

        if (shouldAutoStart) {
            const t = setTimeout(() => setActive(true), 900);
            return () => clearTimeout(t);
        }
    }, [pathname, isArtistTour]);

    const value = { active, stepIndex, currentStep, isMobile, getActiveSteps, startTour, closeTour, finishTour, goNext, goBack };

    return (
        <TourContext.Provider value={value}>
            {children}

            {active && (
                <>
                    <TourOverlay targetRect={targetRect} onClick={closeTour} />
                    {targetRect && currentStep && (
                        <TourTooltip
                            step={currentStep}
                            stepIndex={stepIndex}
                            totalSteps={activeSteps.length}
                            position={position}
                            onNext={goNext}
                            onBack={goBack}
                            onClose={closeTour}
                        />
                    )}
                </>
            )}
        </TourContext.Provider>
    );
}
