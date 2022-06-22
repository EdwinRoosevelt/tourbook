import reactDom from "react-dom";
import { Provider } from 'react-redux'
import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import Header from "../components/UI/Header";
import Footer from '../components/UI/Footer'
import ClientOnly from '../components/ClientOnly'

import store from '../store/index.js'
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  


  return (
    <MantineProvider>
      <ModalsProvider>
        <Provider store={store}>
          <ClientOnly>
            <Header />
          </ClientOnly>
          <Component {...pageProps} />
          {/* <Footer/> */}
        </Provider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default MyApp;
