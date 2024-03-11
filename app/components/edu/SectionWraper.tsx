import React from 'react';

export default function SectionWraper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`mb-2.5 w-full ${className}`}>{children}</section>;
}
