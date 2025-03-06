import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import TanstackQueryProvider from '@/libs/tanstack-query';
import { Suspense } from 'react';

function ProvidersLayout({ children }) {
  return (
    <Suspense>
      <TanstackQueryProvider>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </TanstackQueryProvider>
    </Suspense>
  );
}

export default ProvidersLayout;
