import React, { ReactNode } from 'react';
import Providers from './providers';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <div>
      <Providers>{children}</Providers>
    </div>
  );
}
