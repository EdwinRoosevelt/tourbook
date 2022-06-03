import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Container} from "@mantine/core";
import { useSelector } from 'react-redux';

import TourCard from "../components/tour/TourCard";
import { HeroBanner } from "../components/homepage/HeroBanner";

export default function Home({ responseData }) {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
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

      {isLoggedIn && (
        <div className="container-md col-sm-8 col-md-9 col-lg-5 col-xl-5 col-xxl-4">
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
        </div>
      )}
      {!isLoggedIn && <HeroBanner />}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`http:localhost:3000/api/tour`);
  const responseData = await response.json();

  return { props: { responseData } };
}

const userItem = {
  email: "b.edwinroosevelt@gmail.com",
  name: "Edwin Roosevelt",
  tourStats: [{ tourId: "ADF87954", status: "CONFIRM" }],
  likedTours: ["ADF87954", ],
  tourPartners: ["anandhan@gmail.com", ]
};