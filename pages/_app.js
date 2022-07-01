import { useEffect, useState } from "react";
import reactDom from "react-dom";
import { useRouter } from "next/router";

import { LoadingOverlay } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import ClientOnly from "../components/ClientOnly";
import { AuthProvider } from "../components/authentication/Auth";
import { NotifyProvider } from "../components/notification/Notify";

import "../styles/globals.css";

// import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
  }, [router]);


  return (
    <MantineProvider>
      <ModalsProvider>
        <LoadingOverlay
          visible={isLoading}
          overlayOpacity={0.9}
          loaderProps={{ size: "md", color: "blue", variant: "dots" }}
        />
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
