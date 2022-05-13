import { useState } from 'react';

import { DateRangePicker } from "@mantine/dates";
import { SimpleGrid } from "@mantine/core";

import SubPlanCard from "./SubPlanCard";
import AddSubplanCard from "./AddSubPlanCard";

const dummySubPlanList = [
  {
    id: "23af",
    type: "Travel",
  },
  {
    id: "31",
    type: "Stay",
  },
  {
    id: "45",
  },
];


function TourPlan() {
  
  const [subPlanList, setSubPlanList] = useState(dummySubPlanList);

  const deleteSubPlanCard = (idToBeDeleted) => {
    const newSubPlanList = subPlanList.filter(
      (plan) => plan.id !== idToBeDeleted
    );
    setSubPlanList(newSubPlanList);
  };

  const addSubPlanCard = () => {
    const newSubPlan = { id: uuid().slice(0, 4) };
    const newSubPlanList = subPlanList.concat(newSubPlan);
    setSubPlanList(newSubPlanList);
  };


  return (
    <section id="tour-plan">
      <div className="container p-5 bg-white">
        <h1 className="display-4">Tour Plan</h1>
        <p className="text-muted mb-5">
          Here is the complete agenda for the trip
        </p>

        {/* <!-- Day 00 Card --> */}
        <div className="card mt-2">
          <div className="card-header d-flex">
            <div>DAY 00</div>
          </div>
          <div className="card-body">
            <SimpleGrid
              pt="0"
              cols={2}
              spacing={10}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              {subPlanList.map((plan) => {
                return (
                  <SubPlanCard
                    key={plan.id}
                    value={plan}
                    days={3}
                    deleteCardHandler={deleteSubPlanCard}
                  />
                );
              })}
              <AddSubplanCard onClickHandler={addSubPlanCard} />
            </SimpleGrid>
          </div>
        </div>

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
