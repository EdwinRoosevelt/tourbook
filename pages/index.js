import { useEffect, useState } from 'react'
import Head from 'next/head'

import { useSelector } from 'react-redux';
import { HeroBanner } from "../components/homepage/HeroBanner";


export default function Home() {

  return (
    <>
      <Head>
        <title>Tourbook</title>
        <meta
          name="description"
          content="Tourbook - one place to manage all your tours!"
        />
        <link rel="icon" href="/tourbook_icon.svg" />
      </Head>

      <HeroBanner />
    </>
  );
}
