import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Script from 'next/script'
import { Helmet } from 'react-helmet'

import TourPage from "../../components/tour/TourPage"



function TourViewPage({ tourData, allUserData }) {

  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);


  

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
            <meta property="og:site_name" content="San Roque 2014 Pollos" />
            <meta property="og:title" content="San Roque 2014 Pollos" />
            <meta property="og:description" content="Programa de fiestas" />
            <meta
              property="og:image"
              itemprop="image"
              content="http://pollosweb.wesped.es/programa_pollos/play.png"
            />
            <meta property="og:type" content="website" />
            <meta property="og:updated_time" content="1440432930" />
          </Head>
          <TourPage
            originalFormState={"VIEW"}
            originalData={tourData}
            allUserData={allUserData.Items}
          />

          <Script
        type="text/javascript"
        src="//s7.addthis.com/js/300/addthis_widget.js#pubid="
      />
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
