import React, { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import { DateRangePicker } from "@mantine/dates";
import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  ThemeIcon,
  MultiSelect,
  Card,
  Image,
  Box,
  Select
} from "@mantine/core";

import { ArrowBackUp, Container, Router, BrandTwitter, BrandYoutube, BrandInstagram } from "tabler-icons-react";

import SubPlanCard from './SubPlanCard';
import AddSubplanCard from './AddSubPlanCard';


// import { ContactIconsList } from "../ContactIcons/ContactIcons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    "&:hover": {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const social = [BrandTwitter, BrandYoutube, BrandInstagram];
const allFriendsList=[
  "Edwin Roosevelt",
  "Arpana Varma",
  "Svelte",
  "Vue",
  "Riot",
  "Next.js",
  "Blitz.js",
];

const dummySubPlanList = [
  {
    id: "23af",
    type: "Travel",
  },
  {
    id: "31",
    type: "Stay",
  },
  {
    id: "45",
  },
];

    

export default function ContactUs() {
  const [subPlanList, setSubPlanList] = useState(dummySubPlanList);
  const [invitedFriends, setInvitedFriends] = useState([]);
  const { classes } = useStyles();
  const router = useRouter();

  const [dateRange, setDateRange] = useState<
    [Date | null, Date | null]
  >([new Date(2021, 11, 1), new Date(2021, 11, 5)]);

  const deleteSubPlanCard = (idToBeDeleted) => {
    const newSubPlanList = subPlanList.filter(
      (plan) => plan.id !== idToBeDeleted
    );
    setSubPlanList(newSubPlanList)
  }

  const addSubPlanCard = () => {
    const newSubPlan = { id: uuid().slice(0,4) }
    const newSubPlanList = subPlanList.concat(newSubPlan)
    setSubPlanList(newSubPlanList);
  }


  return (
    <div className={classes.wrapper}>
      <SimpleGrid
        cols={1}
        spacing={50}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <div>
          <ActionIcon size="lg" radius={30} onClick={() => router.back()}>
            <ArrowBackUp size={30} />
          </ActionIcon>
          <Title className={classes.title} mt="sm">
            Create Tour
          </Title>
          <Text className={classes.description} mt="sm">
            Plan Tour, add Friends and make it Memorable!
          </Text>
        </div>
        <div className={classes.form}>
          <TextInput
            label="Title"
            placeholder="Ex: Goa - May 2022"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <DateRangePicker
            label="From when to when? "
            placeholder="Pick dates range"
            mt="md"
            value={dateRange}
            onChange={setDateRange}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to order your goods"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Box>
            <SimpleGrid
              mt="md"
              cols={2}
              spacing={10}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              {subPlanList.map(plan => {
                return (
                  <SubPlanCard
                    key={plan.id}
                    value={plan}
                    days={3}
                    deleteCardHandler={deleteSubPlanCard}
                  />
                );
              })}
              <AddSubplanCard onClickHandler={addSubPlanCard}/>
            </SimpleGrid >
          </Box>

          <MultiSelect
            data={allFriendsList}
            mt="md"
            label="Invite your Friends:"
            placeholder="Pick all your special friends"
            searchable
            nothingFound="Nothing found"
            value={invitedFriends}
            onChange={setInvitedFriends}
          />

          <Group position="right" mt="md">
            <Button variant="outline" className={classes.control}>
              Create
            </Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
}
