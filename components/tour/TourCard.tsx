import React from "react";
import Link from 'next/link';
import { Heart } from "tabler-icons-react"
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";



export default function TourCard({ tourId, cardData }) {
  const { image, title, description, days, tourTags, dates } = cardData;

  function remainingDays () {

    var today = new Date()
    var tourDate = new Date(dates[0])

    var remainingDays = Math.round((tourDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (remainingDays < 31 ) return `${remainingDays} days to go !`
    else {
      var remainingMonths = Math.round(remainingDays/30);
      return `${remainingMonths} month to go !`;

    }

  }


  return (
    <Card withBorder radius="md" p="md" my="lg">
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section mt="md" p="sm">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
          <Badge size="md">{remainingDays()}</Badge>
        </Group>
        <Badge size="md">{dates[0]}</Badge>
        <Text size="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      {tourTags.length !== 0 && (
        <Card.Section p="sm">
          <Text mt="md" color="dimmed">
            Perfect for you, if you enjoy
          </Text>
          <Group spacing={7} mt={5}>
            {tourTags.map((tag, index) => {
              return <Badge key={index}>{tag}</Badge>;
            })}
          </Group>
        </Card.Section>
      )}

      <Group mt="xs">
        <Link href={`/tour/${tourId}`}>
          <Button radius="md" style={{ flex: 1 }} variant="outline">
            Show details
          </Button>
        </Link>
        <ActionIcon variant="default" radius="md" size={36}>
          <Heart color="#dc3545" size={18} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
