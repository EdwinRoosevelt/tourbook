import reactDom from "react-dom";
import { Provider } from 'react-redux'
import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import { HeroBanner } from "../components/homepage/HeroBanner";
import Header from "../components/UI/Header";



import store from '../store/index.js'

import "../styles/globals.css";




function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <MantineProvider>
      <ModalsProvider>
        <Provider store={store}>
          {isLoggedIn && (
            <div>
              <Header />
              <Component {...pageProps} />
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <HeroBanner />
            </div>
          )}
        </Provider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default MyApp;
