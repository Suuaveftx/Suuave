import { useState, useEffect } from 'react';

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

export function useCountdown(initialSeconds: number = 600): CountdownReturn {
  const [countDown, setCountdown] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (countDown > 0 && isRunning) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countDown, isRunning]);

  const reset = (newDuration: number = initialSeconds) => {
    setCountdown(newDuration);
    setIsRunning(true);
  };

  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);

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
