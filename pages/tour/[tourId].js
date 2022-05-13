import { useState } from "react";

import LandingSection from "../../components/tour/LandingSection";
import TourPlan from "../../components/tour/TourPlan";
import ExpenseSection from "../../components/tour/ExpensesSection";
import OnboardingSection from "../../components/tour/OnboardingSection";
import TourDetails from "../../components/tour/TourDetails";
import MyStatus from "../../components/tour/MyStatus";

const DUMMY_CONTENT = {
  details: {
    title: "Paris - 2022",
    description:
      "Join us to celebrate a magical New Year with us in Paris, France",
    budget: "2,100",
    dates: [new Date(2022, 6, 15), new Date(2022, 6, 15)],
    venue: "Paris, France",
    organizers: ["Edwin Roosevelt"],
  },
  plan: {},
  expenses: {
    list: [
      {
        no: "1",
        title: "Hotel",
        description: "L'amby Bay",
        price: "1,000 x 2 nights",
        total: "2,000",
      },
      {
        no: "2",
        title: "Train Ticket",
        description: "Kovai Ecpress",
        price: "700 x 2 way",
        total: "1,400",
      },
    ],
    total: "3,500",
  },
  onboarders: [
    {
      name: "Edwin Roosevelt",
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

function TourPage() {
    const [data, setData] = useState(DUMMY_CONTENT);

  const [formState, setFormState] = useState("VIEW");
  const [isChangesMade, setIsChangesMade] = useState(false);

    function dataChangeHandler(category, subCat, value) {
        const newData = data;
        newData[category][subCat] = value;
        setData(newData);
    }

  return (
    <div style={{ backgroundColor: "#EEEEEE" }}>
      <LandingSection props={DUMMY_CONTENT.details} />
      <div className="container-md">
        <MyStatus
          props={DUMMY_CONTENT.details}
          formState={formState}
          setFormState={setFormState}
        />
        <TourDetails
          data={data.details}
          dataChangeHandler={dataChangeHandler}
          formState={formState}
        />
        <TourPlan />
        <ExpenseSection props={DUMMY_CONTENT.expenses} />
        <OnboardingSection props={DUMMY_CONTENT.onboarders} />
      </div>
    </div>
  );
}

export default TourPage;
