import { useState } from 'react';
import { v4 as uuid } from "uuid";

import { Button } from "@mantine/core";
import { Plus } from "tabler-icons-react";

import PlanCard from "./PlanCard";


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
      <div className="container p-5 bg-white">
        <h1 className="display-4">Tour Plan</h1>
        <p className="text-muted mb-5">
          Here is the complete agenda for the trip
        </p>

        {data.map((dayPlan, day) => {
          return (
            <div className="card mt-2" key={day}>
              <div className="card-header">Day 0{day}</div>
              <div className="card-body">
                <div class="container-fluid" style={{ overflowX: "scroll" }}>
                  <div class="row flex-row flex-nowrap">
                    {dayPlan.map((plan, index) => {
                      return (
                        <div class="col-xs-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                          <PlanCard
                            key={index}
                            day={day}
                            index={index}
                            plan={plan}
                            dataChangeHandler={localDataChangeHandler}
                            formState={formState}
                          />
                        </div>
                      );
                    })}

                    <div class="col-xs-10 col-sm-8 col-md-6 col-lg-5 col-xl-3">
                      <div
                        className="card btn justify-content-center align-items-center mt-2"
                        style={{ minHeight: "360px" }}

                        onClick={() => {
                          localDataChangeHandler("ADDPLAN", day);
                        }}
                      >
                        <Plus size={50} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

               
        {/* <!-- Day 01 Card --> */}
        <div className="card mt-2">
          <div className="card-header">
            <h5> Day 01</h5>
          </div>
          <div className="card-body">
            <div className="d-flex flex-wrap row-hl">
              {/* <!-- Day item card --> */}
              <div className="card m-2" style={{ width: "17rem" }}>
                <div className="card-body">
                  <h4 className="card-title">Check In</h4>
                  <a className="" href="">
                    <i className="fas fa-link"></i>
                  </a>
                  <h6 className="d-inline-block card-subtitle text-muted">
                    L'amby Bay
                  </h6>
                  <p className="card-text bg-light e p-1">
                    An Amazing hotel on the shores of Kovai.
                  </p>
                  {/* <!-- <a className="btn btn-info" href="#">Know about L'amby Bay</a> --> */}
                </div>
              </div>
              <div className="card m-2" style={{ width: "17rem" }}>
                <div className="card-body">
                  <h4 className="card-title">Travel</h4>
                  <a className="" href="">
                    <i className="fas fa-link"></i>
                  </a>
                  <h6 className="d-inline-block card-subtitle text-muted">
                    Train: Kovai Express
                  </h6>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Illo, quas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourPlan;
