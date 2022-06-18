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
import tourbookLogo from "../../public/icons/tourbook-2.png";

const useStyles = createStyles((theme) => ({

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,
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
        style={{ height: "88vh" }}
      >
        <div className="row flex mt-5 justify-content-center align-items-center">
          <div className="col-lg-6 justify-content-center">
            <Image src={tourbookLogo.src} />
          </div>
          <div className="col-lg-6 p-5">
            <Title className={classes.title}>
              <span className={classes.highlight}>One Place to </span>
              <span className={classes.highlight}>manage all Tours</span>
            </Title>
            <Group mt={30}>
              <Link href="/about">
                <Button
                  variant="default" radius="xl" size="md"
                  className={classes.control}
                >
                  About us
                </Button>
              </Link>

              <Button
                variant="default" radius="xl" size="md"
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
