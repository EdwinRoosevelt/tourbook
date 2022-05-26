import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const AWS = require("aws-sdk");
const uuid = require("uuidV4");

import LandingSection from "../../components/tour/LandingSection";
import TourPlan from "../../components/tour/TourPlan";
import ExpenseSection from "../../components/tour/ExpensesSection";
import OnboardingSection from "../../components/tour/OnboardingSection";
import TourDetails from "../../components/tour/TourDetails";
import SaveChanges from "../../components/common/SaveChanges";

const DUMMY_CONTENT = {
tourId: "ADF87954",
details: {
    title: "Paris - 2022",
    description:
      "Join us to celebrate a magical New Year with us in Paris, France",
    budget: "2,100",
    dates: [new Date(2022, 4, 26), new Date(2022, 4, 30)],
    days: 3,
    venue: "Paris, France",
    organizers: ["Edwin Roosevelt"],
    maximumHead: 10
  },
  plan: [
    [
      {
        type: "TRAVEL",
        details: ["Train", "Yelagiri Exp"],
        time: ["Night"],
        cost: true,
      },
      {
        type: "STAY",
        details: ["OYO", "345678"],
        time: ["Night"],
        cost: true,
      },
      {
        type: "STAY",
      },
    ],
    [
      {
        type: "VISIT",
        details: ["Central Park"],
        time: ["Evening"],
        cost: false,
      },
    ],
  ],
  expenses: {
    list: [
      {
        title: "Hotel",
        description: "L'amby Bay",
        total: ["1000", ""],
        perHead: "2,000",
      },
      {
        title: "Train Ticket",
        description: "Kovai Ecpress",
        total: "700 x 2 way",
        perHead: "1,400",
      },
    ],
    total: "3,500",
  },
  onboarders: [
    {
      name: "Edwin Roosevelt B",
      status: "confirm",
      color: "success",
    },
    {
      name: "Radha Krishnan",
      status: "pending",
      color: "warning",
    },
    {
      name: "Haresh Ulagam",
      status: "interested",
      color: "danger",
    },
  ],
};


function TourPage ({ responseData }) {
  // const { sucess, Item } = data

  const [data, setData] = useState(responseData.Item);

  const [formState, setFormState] = useState("VIEW");
  const [isChangesMade, setIsChangesMade] = useState(false);

    function dataChangeHandler(changeType, category, key, value) {
        const newData = data;

        // if (changeType === "ADDPLAN") {
        //     data.plan.push({type: "VISIT"})
        // }

        // if (changeType === "EDIT") {
            if (category === "plan") newData[category] = value;
            else if (category === "details") newData[category][key] = value;
        // }

        setData(newData);
    }

    function saveDataHandler() {
        
        setFormState("VIEW")
    }

    function formSubmitHandler(event) {
      event.preventDefault();
      alert("Are you Sure?")
      console.log("submitted");
      console.log(data);
    }


  return (
    <>
      <div style={{ backgroundColor: "#EEEEEE" }}>
        {responseData.success && (
          <>
            <form onSubmit={formSubmitHandler}>
              <LandingSection
                data={data.details}
                dataChangeHandler={dataChangeHandler}
                formState={formState}
                saveData={saveDataHandler}
              />
              <div className="container-md">
                <TourDetails
                  data={data.details}
                  dataChangeHandler={dataChangeHandler}
                  formState={formState}
                  setFormState={setFormState}
                />
                <TourPlan
                  details={data.details}
                  data={data.plan}
                  dataChangeHandler={dataChangeHandler}
                  formState={formState}
                />
                <ExpenseSection data={data.expenses} formState={formState} />
                {/* <OnboardingSection data={data.onboarders} formState={formState} /> */}
              </div>
              <div className="container mb-5">...</div>
              <SaveChanges formState={formState} setFormState={setFormState} />
            </form>
          </>
        )}
      </div>
      {!responseData.success && (
        <div class="display-6 text-center mt-5"><strong>404</strong> | {responseData.message}</div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {

  const tourId = context.params.tourId
  const response = await fetch(`http:localhost:3000/api/tour/${tourId}`)
  const responseData = await response.json()

  return { props: { responseData } };

}

export default TourPage;
