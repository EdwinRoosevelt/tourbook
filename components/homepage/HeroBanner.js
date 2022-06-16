import React, { useState } from "react";
import Link from "next/link";
import {
  createStyles,
  Image,
  Title,
  Button,
  Group,
  Text,
} from "@mantine/core";
// import { Check } from "tabler-icons-react";

import LoginModal from "../UI/LoginModal";

import image from "../../public/images/tourbookHero.svg";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  bigtitle: {
    fontSize: 70,
    textAlign: "center",
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
    fontSize: "3rem",
  },
}));

export function HeroBanner() {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { classes } = useStyles();
  return (
    <>
      <LoginModal
        loginModalState={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <div
        className="row flex justify-content-center align-items-center m-0"
        style={{ height: "80vh" }}
      >
        <div
          className="row flex justify-content-center align-items-center"
          // style={{ height: "80vh" }}
        >
          <div className="mb-5">
            <h1 className={classes.bigtitle}>Welcome to Tourbook</h1>
          </div>
          <div
            className="col-lg-6 justify-content-center"
            style={{ maxWidth: "500px" }}
          >
            <Image src={image.src} />
          </div>
          <div className="col-lg-6 p-5" style={{ maxWidth: "600px" }}>
            <Title className={classes.title}>
              <span className={classes.highlight}>One Place to </span>
              <span className={classes.highlight}>manage all Tours</span>
            </Title>
            <Text color="dimmed" mt="md">
              Build fully functional accessible web applications faster than
              ever – Mantine includes more than 120 customizable components and
              hooks to cover you in any situation
            </Text>
            <Group mt={30}>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                About us
              </Button>

              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
                onClick={() => setIsLoginModalOpen(true)}
              >
                Login
              </Button>
            </Group>
          </div>
        </div>
      </div>
    </>
  );
}
