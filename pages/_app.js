import reactDom from "react-dom";
import { useState } from "react";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import "../styles/globals.css";
import MainHeader from "../components/MainHeader";
import { HeroBanner } from "../components/homepage/HeroBanner";

const data = {
  user: {
    name: "Jane Spoonfighter",
    email: "janspoon@fighter.dev",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  },
  links: [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/pricing",
      label: "Pricing",
    },
    {
      link: "/learn",
      label: "Learn",
    },
    {
      link: "/community",
      label: "Community",
    },
  ],
};

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <MantineProvider>
      <ModalsProvider>
        {isLoggedIn && (
          <div>
            <MainHeader user={data.user} links={data.links} />
            <Component {...pageProps} />
          </div>
        )}
        {!isLoggedIn && (
          <div>
            <HeroBanner />
          </div>
        )}
      </ModalsProvider>
    </MantineProvider>
  );
}

export default MyApp;
