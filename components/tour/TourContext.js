'use client';

import { createContext } from 'react';

/**
 * TourContext — isolated to break circular import chains.
 * ProductTour.js creates and provides the value.
 * Any other component (e.g. ArtistNavbar) imports only this file.
 */
export const TourContext = createContext(null);
