import { apolloClient } from '@/lib/apollo';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import React from 'react';

export default function Providers({ children }: any) {
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ThemeProvider>
  );
}
