import React, { useState } from 'react';

import TourPage from '../components/tour/TourPage';

const today = new Date();
const twoDaysFromToday = new Date();
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);

const emptyTour = {
  success: true,
  Item: {
    tourId: "",
    details: {
      title: "",
      description: "",
      tagList: ["🤽 Water sports", "🌲 Nature"],
      venue: "",
      image:
        "https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dG91cnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      dates: [today, twoDaysFromToday],
      maximumHead: "",
      days: "",
      budget: "5500",
    },
    // plan: [[<day 00>], [<day 01>], [<day 02>], ...]
    plan: [
      [
        {
          type: "STAY",
          details: ["OYO 30456"],
          isCost: true,
          totalCost: [10000, 5],
          perHead: 1000,
        },
        {
          type: "TRAVEL",
          details: ["Yercaud Exp"],
          isCost: false,
          totalCost: [20000, 5],
          perHead: 2000,
        },
      ],
      [],
      [
        {
          type: "TRAVEL",
          details: ["Cheran Exp"],
          isCost: true,
          totalCost: [30000, 5],
          perHead: 3000,
        },
      ],
    ],
    expenses: [
      {
        id: 14,
        title: "Stay",
        description: "OYO 30546",
        total: [10000, 5],
        perHead: 2000,
      },
      {
        id: 11,
        title: "Travel",
        description: "Yercaud Exp",
        total: [10000, 10],
        perHead: 10000,
      },
    ],
    onboarders: [],
  },
};

function newTour({ allUserData }) {
  return (
    <TourPage
      originalFormState={"NEW"}
      originalData={emptyTour}
      allUserData={allUserData.Items}
    />
  );
}

export async function getServerSideProps(t) {

  const allUserDataResponse = await fetch(`http:localhost:3000/api/user/all`);
  const allUserData = await allUserDataResponse.json();

  return { props: { allUserData } };
}


export default newTour