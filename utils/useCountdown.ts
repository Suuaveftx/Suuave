// import { useState, useEffect } from 'react';

// interface CountdownReturn {
//   time: number;
//   minutes: number;
//   seconds: number;
//   displayTime: string;
//   isRunning: boolean;
//   isFinished: boolean;
//   reset: (newDuration?: number) => void;
//   pause: () => void;
//   resume: () => void;
// }

// export function useCountdown(initialSeconds: number = 600): CountdownReturn {
//   const [countDown, setCountdown] = useState(initialSeconds);
//   const [isRunning, setIsRunning] = useState(true);

//   useEffect(() => {
//     if (countDown > 0 && isRunning) {
//       const timer = setTimeout(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [countDown, isRunning]);

//   const reset = (newDuration: number = initialSeconds) => {
//     setCountdown(newDuration);
//     setIsRunning(true);
//   };

//   const pause = () => setIsRunning(false);
//   const resume = () => setIsRunning(true);

//   const minutes = Math.floor(countDown / 60);
//   const seconds = countDown % 60;
//   const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//   return {
//     time: countDown,
//     minutes,
//     seconds,
//     displayTime,
//     isRunning,
//     isFinished: countDown === 0,
//     reset,
//     pause,
//     resume,
//   };
// }
//=================================
// import { useState, useEffect, useCallback } from 'react';

// interface CountdownReturn {
//   time: number;
//   minutes: number;
//   seconds: number;
//   displayTime: string;
//   isRunning: boolean;
//   isFinished: boolean;
//   reset: (newDuration?: number) => void;
//   pause: () => void;
//   resume: () => void;
// }

// export function useCountdown(initialSeconds: number = 600): CountdownReturn {
//   const [countDown, setCountdown] = useState(initialSeconds);
//   const [isRunning, setIsRunning] = useState(true);

//   // Unique key for storage
//   const STORAGE_KEY = 'auth_otp_expiry';

//   // Helper to calculate and store the end time
//   const setExpiry = useCallback((seconds: number) => {
//     const expiryTime = Date.now() + seconds * 1000;
//     localStorage.setItem(STORAGE_KEY, expiryTime.toString());
//     return expiryTime;
//   }, []);

//   useEffect(() => {
//     let expiry = localStorage.getItem(STORAGE_KEY);

//     // If no expiry exists, create one now (first mount)
//     if (!expiry) {
//       const expiryTime = Date.now() + initialSeconds * 1000;
//       localStorage.setItem(STORAGE_KEY, expiryTime.toString());
//       expiry = expiryTime.toString();
//     }

//     // Sync current remaining time immediately (avoids 1s delay on first tick)
//     const now = Date.now();
//     const remaining = Math.max(0, Math.floor((Number(expiry) - now) / 1000));
//     setCountdown(remaining);

//     const interval = setInterval(() => {
//       if (!isRunning) return;
//       const now = Date.now();
//       const remaining = Math.max(0, Math.floor((Number(expiry) - now) / 1000));
//       setCountdown(remaining);
//       if (remaining <= 0) {
//         clearInterval(interval);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isRunning, initialSeconds, countDown === initialSeconds]);

//   const reset = useCallback(
//     (newDuration: number = initialSeconds) => {
//       const expiryTime = Date.now() + newDuration * 1000;
//       localStorage.setItem(STORAGE_KEY, expiryTime.toString());

//       // Force the state update immediately
//       setCountdown(newDuration);
//       setIsRunning(true);
//     },
//     [initialSeconds]
//   );
//   const pause = () => setIsRunning(false);
//   const resume = () => setIsRunning(true);

//   const minutes = Math.floor(countDown / 60);
//   const seconds = countDown % 60;
//   const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//   return {
//     time: countDown,
//     minutes,
//     seconds,
//     displayTime,
//     isRunning,
//     isFinished: countDown === 0,
//     reset,
//     pause,
//     resume,
//   };
// }

import { useState, useEffect, useCallback, useRef } from 'react';

interface CountdownReturn {
  time: number;
  minutes: number;
  seconds: number;
  displayTime: string;
  isRunning: boolean;
  isFinished: boolean;
  reset: (newDuration?: number) => void;
  pause: () => void;
  resume: () => void;
}

const STORAGE_KEY = 'auth_otp_expiry';

export function useCountdown(initialSeconds: number = 600): CountdownReturn {
  const [countDown, setCountdown] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  // Use a ref to trigger effect re-runs on reset
  const [resetToken, setResetToken] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    // Initialize expiry if not set, or resume from existing one
    let expiry = localStorage.getItem(STORAGE_KEY);
    if (!expiry) {
      expiry = (Date.now() + initialSeconds * 1000).toString();
      localStorage.setItem(STORAGE_KEY, expiry);
    }

    // Set immediately so UI doesn't lag on first render
    const getRemaining = () =>
      Math.max(0, Math.floor((Number(expiry) - Date.now()) / 1000));

    setCountdown(getRemaining());

    const interval = setInterval(() => {
      const remaining = getRemaining();
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, resetToken]); // clean, predictable dependencies

  const reset = useCallback(
    (newDuration: number = initialSeconds) => {
      const expiryTime = (Date.now() + newDuration * 1000).toString();
      localStorage.setItem(STORAGE_KEY, expiryTime);
      setCountdown(newDuration);
      setIsRunning(true);
      setResetToken((t) => t + 1); // forces effect to re-run with new expiry
    },
    [initialSeconds]
  );

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);

  const minutes = Math.floor(countDown / 60);
  const seconds = countDown % 60;
  const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return {
    time: countDown,
    minutes,
    seconds,
    displayTime,
    isRunning,
    isFinished: countDown === 0,
    reset,
    pause,
    resume,
  };
}
