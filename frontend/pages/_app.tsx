import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales/i18n';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;

  return (
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nextProvider>
  );
}
