"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
    const [savedCardIds, setSavedCardIds] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Function to refresh state from localStorage (useful for detail pages)
    const refreshBookmarks = useCallback(() => {
        const stored = localStorage.getItem("savedCardIds");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSavedCardIds(parsed);
            } catch (e) {
                console.error("Failed to parse savedCardIds from localStorage", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Load from localStorage on mount
    useEffect(() => {
        refreshBookmarks();
    }, [refreshBookmarks]);

    // Save to localStorage whenever state changes, BUT only after initial load
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("savedCardIds", JSON.stringify(savedCardIds));
        }
    }, [savedCardIds, isLoaded]);

    // Listen for storage events to sync across tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "savedCardIds") {
                try {
                    setSavedCardIds(JSON.parse(e.newValue) || []);
                } catch (err) {
                    console.error("Error syncing bookmark state across tabs", err);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const toggleBookmark = useCallback((id) => {
        if (!id) return;
        const normalizedId = String(id).trim();
        setSavedCardIds((prev) =>
            prev.includes(normalizedId)
                ? prev.filter((cardId) => cardId !== normalizedId)
                : [...prev, normalizedId]
        );
    }, []);

    const isBookmarked = useCallback((id) => {
        if (!id) return false;
        return savedCardIds.includes(String(id).trim());
    }, [savedCardIds]);

    return (
        <BookmarkContext.Provider
            value={{ savedCardIds, toggleBookmark, isBookmarked, refreshBookmarks }}
        >
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error("useBookmarks must be used within a BookmarkProvider");
    }
    return context;
};
