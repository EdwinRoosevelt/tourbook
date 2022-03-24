import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Grid, Container, Text } from "@mantine/core";

import TourCard from "../components/tour/TourCard";


const card = {
  image:
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  title: "Verudela Beach",
  country: "Croatia",
  description:
    "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
  badges: [
    {
      emoji: "☀️",
      label: "Sunny weather",
    },
    {
      emoji: "🦓",
      label: "Onsite zoo",
    },
    {
      emoji: "🌊",
      label: "Sea",
    },
    {
      emoji: "🌲",
      label: "Nature",
    },
    {
      emoji: "🤽",
      label: "Water sports",
    },
  ],
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

      <div>
        <Container size="xs" px="xs">

          <TourCard
            shadow="sm"
            my="lg"
            image={card.image}
            title={card.title}
            description={card.description}
            country={card.country}
            badges={card.badges}
          />
        </Container>
      </div>
    </div>
  );
}
