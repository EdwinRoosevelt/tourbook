import React from 'react';
import { Grid, Container, Text } from '@mantine/core';

import MainHeader from '../components/MainHeader';
import TourCard from '../components/tour/TourCard';



const data = {
  user: {
    name: "Jane Spoonfighter",
    email: "janspoon@fighter.dev",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  },
  tabs: ["Home", "Orders", "Education", "Community", "Forums", "Account"],
  
};

const card= {
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

function feed() {
  return (
    <div>
      <Container size="xs" px="xs">
        <Text size="xl" mtpb="xs">
          Recent Activities
        </Text>
      </Container>
      <Grid justify="center" align="flex-start">
        <Grid.Col span={3} style={{ minHeight: 80 }}>
          
        </Grid.Col>
        <Grid.Col span={5} style={{ minHeight: 120 }}>
          <TourCard
            shadow="sm"
            my="lg"
            image={card.image}
            title={card.title}
            description={card.description}
            country={card.country}
            badges={card.badges}
          />
          <TourCard
            shadow="sm"
            my="lg"
            image={card.image}
            title={card.title}
            description={card.description}
            country={card.country}
            badges={card.badges}
          />
        </Grid.Col>
        <Grid.Col span={3}>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default feed