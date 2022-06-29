import reactDom from "react-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import Header from "../components/UI/Header";
import Footer from '../components/UI/Footer'
import ClientOnly from '../components/ClientOnly'
import { AuthProvider } from "../components/authentication/Auth"
import { NotifyProvider } from "../components/notification/Notify";

import "../styles/globals.css";
// import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
      <ModalsProvider>
        <NotifyProvider>
          <AuthProvider>
            <ClientOnly>
              <Header />
            </ClientOnly>
            <Component {...pageProps} />
            {/* <Footer/> */}
          </AuthProvider>
        </NotifyProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default MyApp;
