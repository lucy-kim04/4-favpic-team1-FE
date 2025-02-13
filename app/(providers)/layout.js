import { ModalProvider } from '@/contexts/ModalContext';
import TanstackQueryProvider from '@/libs/tanstack-query';

function ProvidersLayout({ children }) {
  return (
    <TanstackQueryProvider>
      <ModalProvider>{children}</ModalProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
