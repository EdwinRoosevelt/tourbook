import React, { useState } from 'react';

import LandingSection from "../components/tour/LandingSection";
import TourPlan from "../components/tour/TourPlan";
import ExpenseSection from "../components/tour/ExpensesSection";
import OnboardingSection from "../components/tour/OnboardingSection";
import TourDetails from "../components/tour/TourDetails";

const emptyTour = {
  details: {},
  plan: [[], []],
  expenses: {},
  onboarders: []
}

function newTour() {
  const [data, setData] = useState(emptyTour)
  const [formState, setFormState] = useState("EDIT")

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
        {formState === "EDIT" && (
          <>
            <div className="fixed-bottom">
              <div className="card p-3" style={{ background: "#EEEEEE" }}>
                <div className="flex gap-5 justify-content-end">
                  <button className="btn btn-outline-danger  px-5">
                    Discard
                  </button>
                  <button
                    className="btn btn-success bg-success px-5"
                    type="submit"
                    // onClick={saveDataHandler}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default newTour