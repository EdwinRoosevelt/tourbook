import { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";

import TourCard from "../components/tour/TourCard";
import { HeroBanner } from "../components/homepage/HeroBanner";

// const isLoggedIn = true

export default function MyTours({ tourData }) {
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loggedInUser && (
        <div className="container-md col-sm-8 col-md-9 col-lg-5 col-xl-5 col-xxl-4">
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
      )}
      {!loggedInUser && <HeroBanner />}
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`http:${process.env.API_URL}/api/tour`);
  const responseData = await response.json();

  return { props: { tourData: responseData.Items } };
}

const userItem = {
  email: "b.edwinroosevelt@gmail.com",
  name: "Edwin Roosevelt",
  tourStats: [{ tourId: "ADF87954", status: "CONFIRM" }],
  likedTours: ["ADF87954"],
  tourPartners: ["anandhan@gmail.com"],
};
