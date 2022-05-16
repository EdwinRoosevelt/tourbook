import React, { useState } from 'react';

import LandingSection from "../components/tour/LandingSection";
import TourPlan from "../components/tour/TourPlan";
import ExpenseSection from "../components/tour/ExpensesSection";
import OnboardingSection from "../components/tour/OnboardingSection";
import TourDetails from "../components/tour/TourDetails";
import SaveChanges from '../components/common/SaveChanges';

const emptyTour = {
  details: {},
  plan: [[{type: "TRAVEL", cost: true}], []],
  expenses: {},
  onboarders: []
}

function newTour() {
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

  function saveDataHandler() {
    setFormState("VIEW");
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    
    console.log("submitted")
    console.log(data)
  }
   

  return (
    <div style={{ backgroundColor: "#EEEEEE" }}>
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
            data={data.plan}
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