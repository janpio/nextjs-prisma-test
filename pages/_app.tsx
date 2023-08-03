import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import 'tailwindcss/tailwind.css';
import Layout from '@/components/layout';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
