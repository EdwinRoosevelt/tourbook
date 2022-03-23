import Head from 'next/head'
import Image from 'next/image'
import { HeroBanner } from '../components/homepage/HeroBanner';
import styles from '../styles/Home.module.css'

const style = {
  subtitle: `text-base tracking-wider`,
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tourbook</title>
        <meta
          name="description"
          content="Tourbook - one place to manage all your tours!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Tourbook</a>
          <p className={style.subtitle}>One place to manage all your tours</p>
        </h1>
        <HeroBanner />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
