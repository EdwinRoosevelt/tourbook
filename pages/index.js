import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Container} from "@mantine/core";

import TourCard from "../components/tour/TourCard";


const cardData = [
  {
    tourId: "ADF87954",
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Verudela Beach",
    days: "3D & 4N",
    description:
      "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    tagsList: [
      "☀️ Sunny weather",
      "🦓 Onsite zoo",
      "🌊 Sea",
      "🌲 Nature",
      "🤽 Water sports",
    ],
  },
  {
    tourId: "ADF87955",
    image:
      "https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dG91cnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    title: "Summer at Philiphines",
    days: "3D & 4N",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem ipsa placeat adipisci fugiat exercitationem nesciunt. Provident dolorem sapiente qui et! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem ipsa placeat adipisci fugiat exercitationem nesciunt.",
    tagsList: [
      "☀️ Sunny weather",
      "🦓 Onsite zoo",
      "🌊 Sea",
      "🌲 Nature",
      "🤽 Water sports",
    ],
  },
];

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
          {Items.map((tour) => {return <TourCard key={tour.tourId} tourId={tour.tourId} cardData={tour.details} />;})}
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
