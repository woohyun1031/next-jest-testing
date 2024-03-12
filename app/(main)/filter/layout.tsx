import React from 'react';
import EduLayout from '@components/edu/EduLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  return <EduLayout>{children}</EduLayout>;
}
