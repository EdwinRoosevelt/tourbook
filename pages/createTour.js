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
      tagList: [],
      venue: "",
      image: "",
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

function newTour() {

  return (<TourPage originalFormState={"NEW"} originalData={emptyTour} />);
}

export default newTour