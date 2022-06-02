import React, { useState } from 'react';
import { useRouter } from 'next/router'

import LandingSection from "../components/tour/LandingSection";
import TourPlan from "../components/tour/TourPlan";
import ExpenseSection from "../components/tour/ExpensesSection";
import OnboardingSection from "../components/tour/OnboardingSection";
import TourDetails from "../components/tour/TourDetails";
import SaveChanges from '../components/common/SaveChanges';

const today = new Date();
const twoDaysFromToday = new Date();
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);

const emptyTour = {
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
    budget: "",
  },
  // plan: [[<day 00>], [<day 01>], [<day 02>], ...]
  plan: [[{ type: "TRAVEL", cost: true }], [], []],
  expenses: {},
  onboarders: [],
};

function newTour() {
  const router = useRouter();
  const [data, setData] = useState(emptyTour)
  const [formState, setFormState] = useState("EDIT")

  function dataChangeHandler(changeType, category, key, value) {
    const newData = data;

    // if (changeType === "EDIT") {
    if (category === "plan") newData[category] = value;
    else if (category === "details") newData[category][key] = value;
    // }

    setData(newData);
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    var answer = window.confirm("Are you sure ?");

    if (answer) {
      try {
        var response = await fetch("/api/tour/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        response = await response.json();

        console.log(response.data);

        if (response.success) {
          router.push(`/tour/${response.tourId}`);
          setData(emptyTour);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
   

  return (
    <div style={{ backgroundColor: "#EEEEEE" }}>
      <form onSubmit={formSubmitHandler}>
        <LandingSection
          data={data.details}
          dataChangeHandler={dataChangeHandler}
          formState={formState}
        />
        <div className="container-md">
          <TourDetails
            data={data.details}
            planData={data.plan}
            dataChangeHandler={dataChangeHandler}
            formState={formState}
            setFormState={setFormState}
          />
          <TourPlan
            data={data.plan}
            details={data.details}
            dataChangeHandler={dataChangeHandler}
            formState={formState}
          />
          <ExpenseSection data={data.expenses} formState={formState} />
          <OnboardingSection data={data.onboarders} formState={formState} />
        </div>
        <div className="container mb-5">...</div>
        <SaveChanges formState={formState} setFormState={setFormState} />
      </form>
    </div>
  );
}

export default newTour