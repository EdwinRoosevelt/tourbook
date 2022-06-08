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
  const { image, title, description, days, tourTags } = cardData;
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
          <Badge size="md">{days}</Badge>
        </Group>
        <Text size="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

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
