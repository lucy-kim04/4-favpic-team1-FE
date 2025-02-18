'use client';

import Gnb from '@/components/atoms/Gnb';

function RootLayout({ children }) {
  return (
    <div>
      <Gnb />
      {children}
    </div>
  );
}

export default RootLayout;
