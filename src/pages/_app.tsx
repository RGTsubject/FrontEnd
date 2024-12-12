import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// provider
import { MswComponent } from '@/components/provider/MswComponent';
import { TanStackQueryProvider } from '@/components/provider/QueryClient';

export default function App({ Component, pageProps }: AppProps) {
  const MSWState = process.env.NEXT_PUBLIC_MSW_STATE === 'true';
  return (
    <TanStackQueryProvider>
      {MSWState ? (
        <MswComponent>
          <Component {...pageProps} />
        </MswComponent>
      ) : (
        <Component {...pageProps} />
      )}
    </TanStackQueryProvider>
  );
}
