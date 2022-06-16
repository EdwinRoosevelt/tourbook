import { useEffect, useState } from 'react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import { Container} from "@mantine/core";
import { useSelector } from 'react-redux';

import TourCard from "../components/tour/TourCard";
import { HeroBanner } from "../components/homepage/HeroBanner";

// const isLoggedIn = true

// const tourData = [{
//   plan: [
//     [
//       {
//         perHead: 1000,
//         details: ["OYO 30456"],
//         type: "STAY",
//         isCost: true,
//         totalCost: [10000, 5],
//       },
//       {
//         perHead: 2000,
//         details: ["Yercaud Exp"],
//         type: "TRAVEL",
//         isCost: false,
//         totalCost: [20000, 5],
//       },
//     ],
//     [
//       {
//         details: ["🥏 Frisbee"],
//         cost: false,
//         time: ["🌥️ Evening"],
//         type: "ACTIVITY",
//         totalCost: [0, 0],
//       },
//       {
//         details: {},
//         cost: false,
//         type: "VISIT",
//         totalCost: [0, 0],
//       },
//     ],
//     [],
//     [],
//   ],
//   details: {
//     tourTags: ["🌲 Nature", "⛰️ Mountain"],
//     image:
//       "https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dG91cnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
//     venue: "Ooty",
//     maximumHead: "10",
//     organizers: "edwin_roosevelt",
//     days: "3D / 2N",
//     description: "Finally Goa porom",
//     dates: ["Fri Jul 22 2022", "Mon Jul 25 2022"],
//     title: "Goa 2022",
//     budget: 1000,
//   },
//   expenses: [
//     {
//       description: "OYO 30546",
//       perHead: 2000,
//       total: [10000, 5],
//       id: 14,
//       title: "Stay",
//     },
//     {
//       description: "Yercaud Exp",
//       perHead: 10000,
//       total: [10000, 10],
//       id: 11,
//       title: "Travel",
//     },
//   ],
//   onboarders: [
//     {
//       userName: "edwin_roosevelt",
//       displayName: "Edwin Roosevelt",
//       status: "CONFIRM",
//     },
//     {
//       userName: "banupriyasuresh",
//       displayName: "Banu Priya",
//       status: "CONFIRM",
//     },
//     {
//       userName: "harish_nandha",
//       displayName: "Harish Nandha",
//       status: "INVITED",
//     },
//   ],
//   tourId: "26CB83F5",
// }];

export default function Home({ tourData }) {
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