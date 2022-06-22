import { useEffect, useState } from "react";
import Head from "next/head";

import { useSelector } from "react-redux";

import TourCard from "../components/tour/TourCard";


export default function Tours({ tourData }) {
  var [loggedInUser, setLoggedInUser] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) setLoggedInUser(true);
    else setLoggedInUser(false);
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>Tourbook</title>
        <meta
          name="description"
          content="Tourbook - one place to manage all your tours!"
        />
        <link rel="icon" href="/tourbook_icon.svg" />
      </Head>

      <div
        className="container-md mt-3 col-sm-8 col-md-9 col-lg-5 col-xl-5 col-xxl-4"
        style={{ height: "90vh" }}
      >
        <h1 className="display-6">Tours near you...</h1>
        {tourData.map((tour) => {
          return (
            <TourCard
              key={tour.tourId}
              tourId={tour.tourId}
              cardData={tour.details}
            />
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`http:${process.env.API_URL}/api/tour`);
  const responseData = await response.json();

  return { props: { tourData: responseData.Items } };
}
