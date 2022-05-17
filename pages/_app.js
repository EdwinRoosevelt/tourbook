import reactDom from "react-dom";
import { useState } from "react";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import "../styles/globals.css";
import { HeroBanner } from "../components/homepage/HeroBanner";
import Header from "../components/UI/Header";


function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <MantineProvider>
      <ModalsProvider>
        {isLoggedIn && (
          <div>
            <Header/>
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
