import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function EduLayout({
  children,
}: LayoutProps): React.ReactElement {
  return (
    // TODO: 하위 padding값 디테일 수정
    // TODO: min-h-screen 상세 조정
    <main className="mx-auto flex max-w-container justify-center p-6">
      <div className="flex min-h-screen w-full flex-col align-middle">
        {children}
      </div>
    </main>
  );
}
