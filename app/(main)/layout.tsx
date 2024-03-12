import '@styles/globals.css';
import React from 'react';
import Providers from './providers';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="ko">
      <head></head>
      <body className="bg-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
