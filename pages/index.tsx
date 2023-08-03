import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

export default function Home({}: Props) {
  return (
    <>
      <Head>
        <title>Biserica Aviației</title>
        <meta name='description' content='Creștini după Evanghelie' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section>
        <Link href='/admin/dictionary'>Dictionary admin</Link>
      </section>
    </>
  );
}
