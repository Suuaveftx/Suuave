import * as React from 'react';

import './globals.css';
import { Providers } from './providers';

// Metadata
export const metadata = {
  title: 'Suuave | African Artistry, Global Fashion.',
  description:
    'Connecting fashion designers and brands with African fashion artists, fostering a vibrant collaborative ecosystem.',
  keywords: [
    'Fashion illustration',
    'fashion arts',
    'collaboration',
    'innovation',
    'creativity',
    'productivity',
    'fashion design',
    'fashion brand',
  ],
};

// Root Layout Component
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`font-proximanova`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
