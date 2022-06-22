import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Script from "next/script";
import addthis from "addthis-snippet"

import TourPage from "../../components/tour/TourPage"
import { ChevronsDownLeft } from "tabler-icons-react";
import { useWindowScroll } from "@mantine/hooks";


function TourViewPage({ tourData, allUserData }) {

  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) router.push("/", null, { shallow: true });
  }, [isLoggedIn])

  

  return (
    <div className="mt-3" style={{ backgroundColor: "#EEEEEE" }}>
      {tourData.success && (
        <>
          <Head>
            <title>{tourData.Item.details.title}</title>
            <meta
              name="description"
              content={`${tourData.Item.details.title} - ${tourData.Item.details.description}`}
            />
          </Head>
          <TourPage
            originalFormState={"VIEW"}
            originalData={tourData}
            allUserData={allUserData.Items}
          />

          {/* <Script
        type="text/javascript"
        src="//s7.addthis.com/js/300/addthis_widget.js#pubid="
        onLoad={handleAddThisLoaded}
      /> */}
        </>
      )}

      {!tourData.success && (
        <>
          <Head>
            <title>404 | Tour not found</title>
          </Head>
          <p
            className="flex justify-content-center align-items-center"
            style={{ fontSize: "1.5rem", height: "80vh" }}
          >
            <strong>404</strong> &nbsp; | {tourData.message}
          </p>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {

  const tourId = context.params.tourId
  const tourDataResponse = await fetch(`http:${process.env.API_URL}/api/tour/${tourId}`)
  const tourData = await tourDataResponse.json();

  const allUserDataResponse = await fetch(`http:${process.env.API_URL}/api/user/all`);
  const allUserData = await allUserDataResponse.json();
  

  return { props: { tourData, allUserData } };
}

export default TourViewPage;
