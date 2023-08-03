import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ro'>
      <Head>
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='apple-touch-icon' href='/icon-192x192.png' />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='white'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='black'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/npm/cookieconsent@3.1.1/build/cookieconsent.min.css'
        />
        {/*
        <script
          src='/assets/js/cookieconsent/cookieconsent.min.js'
          async
        ></script>
        <script
          src='/assets/js/cookieconsent/cookieconsent.init.js'
          async
        ></script>
        */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
