import reactDom from "react-dom";
import { Provider } from 'react-redux'
import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import Header from "../components/UI/Header";
import Footer from '../components/UI/Footer'
import ClientOnly from '../components/ClientOnly'
import { AuthProvider } from "../components/authentication/Auth"

import store from '../store/index.js'
import "../styles/globals.css";
// import "../styles/main.css";



function MyApp({ Component, pageProps }) {

  return (
    <MantineProvider>
      <ModalsProvider>
        {/* <Provider store={store}> */}
        <AuthProvider>
          <ClientOnly>
            <Header />
          </ClientOnly>
          <Component {...pageProps} />
          {/* <Footer/> */}
        </AuthProvider>
        {/* </Provider> */}
      </ModalsProvider>
    </MantineProvider>
  );
}

export default MyApp;
