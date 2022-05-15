import { useState } from 'react';
import { v4 as uuid } from "uuid";

import { Plus } from "tabler-icons-react";

import PlanEditCard from "./PlanEditCard";
import PlanViewCard from "./PlanViewCard";

function TourPlan({ data, formState, dataChangeHandler }) {

  const [refresh, setRefresh] = useState(false);

  const localDataChangeHandler = (mode, day, key, target) => {
    const newData = data;

    if (mode === "ADDPLAN") newData[day].push({type: "STAY"});
    else if (mode === "EDIT") newData[day][key] = target;
    else if (mode === "DEL") newData[day].splice(key, 1);

    dataChangeHandler(mode, "plan", null, newData);
    refresh ? setRefresh(false) : setRefresh(true);
  }

  return (
    <section id="tour-plan">
      <div
        className={`container ${formState !== "EDIT" && "mt-5"} p-5 bg-white`}
      >
        <h1 className="display-4">Tour Plan</h1>
        <p className="text-muted mb-5">
          Here is the complete agenda for the trip
        </p>

        {data.map((dayPlan, day) => {
          return (
            <div className="card mt-2" key={day}>
              <div className="card-header">Day 0{day}</div>
              <div className="card-body">
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
                            className="col-8 col-sm-8 col-md-6 col-lg-4 col-xl-3 "
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
                    {formState === "EDIT" &&
                      dayPlan.map((plan, index) => {
                        return (
                          <div
                            key={index}
                            className="col-10 col-xs-8 col-sm-8 col-md-6 col-lg-5 col-xl-4 "
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

                    {formState === "EDIT" && (
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
