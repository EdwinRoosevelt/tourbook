import { useEffect, useState } from 'react';

import { Plus } from "tabler-icons-react";

import PlanEditCard from "./PlanEditCard";
import PlanViewCard from "./PlanViewCard";

const EMPTY_PLAN_CARD = {
  type: "STAY",
  details: [],
  time: [],
  cost: false,
  totalCost: [0, 0],
};

function TourPlan({ data, details, formState, dataChangeHandler }) {

  // const [refresh, setRefresh] = useState(false);
  const newPlanData = data;

  const localDataChangeHandler = (mode, day, key, target) => {
    const newData = data;

    if (mode === "ADDPLAN") newData[day].push(EMPTY_PLAN_CARD);
    else if (mode === "EDIT") newData[day][key] = target;
    else if (mode === "DEL") newData[day].splice(key, 1);

    dataChangeHandler("plan", null, newData);
    // setRefresh(!refresh)
  }

  function returnNextDates(day) {
    var date = new Date(details.dates[0]);
    date.setDate(date.getDate() + day);
    return date.toDateString();
  }



  return (
    <section id="tour-plan">
      <div
        className={`container ${
          formState !== "EDIT" && "mt-5"
        } p-sm-5 py-4 bg-white`}
      >
        <div className="flex justify-content-between align-items-start">
          <div>
            <h1 className="display-5">Tour Plan</h1>
            <p className="text-muted mb-4">
              Here is the complete agenda for the trip
            </p>
          </div>
        </div>

        {formState !== "VIEW" && (
          <div className="alert alert-danger mb-4">
            <i className="bi bi-exclamation-triangle-fill mx-2" />
            Reducing <strong>Tour dates</strong> range will truncate the extra
            tour plan. In case of losing the tour plan, kindly discard the
            changes and set the dates again.
          </div>
        )}

        {newPlanData.map((dayPlan, day) => {
          return (
            <div className="card mt-2" key={day}>
              <div className="card-header">
                <strong>Day 0{day} </strong>- {returnNextDates(day)}
              </div>
              <div className="card-body p-0">
                <div
                  className="container-fluid"
                  style={{ overflowX: "scroll" }}
                >
                  <div className="row flex-row flex-nowrap">
                    {formState === "VIEW" &&
                      dayPlan.map((plan, index) => {
                        return (
                          <div
                            key={index}
                            className="col-9 col-xs-8 col-sm-8 col-md-6 col-lg-4 col-xl-4 "
                          >
                            <PlanViewCard
                              day={day}
                              index={index}
                              plan={plan}
                              dataChangeHandler={localDataChangeHandler}
                              formState={formState}
                            />
                          </div>
                        );
                      })}
                    {formState !== "VIEW" &&
                      dayPlan.map((plan, index) => {
                        return (
                          <div
                            key={index}
                            className="col-9 col-xs-8 col-sm-8 col-md-6 col-lg-5 col-xl-4 "
                          >
                            <PlanEditCard
                              day={day}
                              index={index}
                              plan={plan}
                              dataChangeHandler={localDataChangeHandler}
                              formState={formState}
                            />
                          </div>
                        );
                      })}

                    {formState !== "VIEW" && (
                      <div className="col-xs-10 col-sm-8 col-md-6 col-lg-5 col-xl-3 p-3">
                        <div
                          className="card btn justify-content-center align-items-center"
                          style={{ minHeight: "100%" }}
                          onClick={() => {
                            localDataChangeHandler("ADDPLAN", day);
                          }}
                        >
                          <Plus size={50} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TourPlan;
