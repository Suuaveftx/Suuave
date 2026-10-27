'use client';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import { QueryProvider } from '@/components/QueryProvider';

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
      <QueryProvider>{children}</QueryProvider>
    </HeroUIProvider>
  );
}
