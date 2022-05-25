import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Container} from "@mantine/core";

import TourCard from "../components/tour/TourCard";

export default function Home({ responseData }) {

  const { Items } = responseData;

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

      <div>
        <Container size="xs" px="xs">
          <h1 className="display-6">Tours near you...</h1>
          {Items.map((tour) => {
            return (
              <TourCard
                key={tour.tourId}
                tourId={tour.tourId}
                cardData={tour.details}
              />
            );
          })}
        </Container>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`http:localhost:3000/api/tour`);
  const responseData = await response.json();

  return { props: { responseData } };
}
