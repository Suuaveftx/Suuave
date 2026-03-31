'use client';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <ToastProvider
        placement='bottom-right'
        toastProps={{
          variant: 'solid',

          timeout: 3000,
          shouldShowTimeoutProgress: true,
        }}
      />
      {children}
    </HeroUIProvider>
  );
}
