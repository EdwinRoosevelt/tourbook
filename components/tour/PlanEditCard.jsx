import React, { useEffect, useState } from "react";
import {
  Card,
  Select,
  Switch,
  Badge,
  Button,
  Group,
  MultiSelect,
  Progress
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { TrashX } from "tabler-icons-react";


const PLAN_OPTIONS = ["TRAVEL", "STAY", "VISIT", "ACTIVITY", "OTHERS"];
const INITIAL_DETAILS_OPTIONS = {
  TRAVEL: [
    "🏍️ Bike - R1",
    "🚗 Car - Verna",
    "🚆 Train - Yercaud Exp",
    "✈️ Airplane",
  ],
  STAY: ["OYO", "ITC Chola", "L'Amby Bay", "Rock Fort Inn"],
  VISIT: ["🍟 Restaurant", "🏞️ Park", "Film City", "Mall"],
  ACTIVITY: ["🏄‍♂️ Surfing", "⚽ Football", "🥏 Frisbee", "🏏 Cricket"],
};
const WHEN_OPTIONS = [
  "✨ Night",
  "🌻 Morning",
  "☀️ Afternoon",
  "🌥️ Evening",
  "🕘 9 am",
  "12 pm",
];


function PlanEditCard({ day, index, plan, dataChangeHandler, formState }) {

    const [refresh, setRefresh] = useState(false);
    const [progress, setProgress] = useState(0);
    const [checked, setChecked] = useState(plan.cost);
    const [detailsOptions, setDetailsOptions] = useState(INITIAL_DETAILS_OPTIONS);

    const [data, setData] = useState(["React", "Angular", "Svelte", "Vue"]);


    const localDataChangeHandler = (mode, label, value) => {
      if(mode === "EDIT") {
        if (label === "type") plan.details = {}
        plan[label] = value;
        dataChangeHandler(mode, day, index, plan);
      }
      else if(mode === "DEL") {
        dataChangeHandler(mode, day, index);
      }

      refresh ? setRefresh(false) : setRefresh(true);
    }

    useEffect(() => {
      var completion = 0;
      if (plan.type != null) completion += 25
      if (plan.details != null) completion += 25;
      if (plan.when != null) completion += 25;
      setProgress(completion)
    }, [refresh, plan.details])
    
    // dayList = Array(days).fill(0).map((_, index) => `Day ${index}`)
    

  return (
    <Card mt="sm" mb="sm" shadow="xl" p="sm">
      {/* ROW 1 */}
      <div className="row align-items-center mb-2">
        <div className="col-3 text-center">
          <div># {index + 1}</div>
        </div>
        <div className="col-9">
          <Progress value={progress} />
        </div>
      </div>
      <hr></hr>

      {/* ROW 2 */}
      <div className="row flex flex-wrap gap-2 align-items-end mt-3">
        <div className="col-md-6">
          <Select
            label="Type"
            placeholder="Travel, Visit, Stay, ..."
            data={PLAN_OPTIONS}
            value={plan.type}
            onChange={(value) => {
              localDataChangeHandler("EDIT", "type", value);
            }}
          />
        </div>
        <div className="col-md-6">
          <div
            className="gap-2 d-flex justify-content-center p-1"
            title="Cost Details can be filled in the next section"
          >
            <div className="div text-success">Free</div>{" "}
            <Switch
              size="md"
              checked={plan.cost}
              onChange={(event) =>
                localDataChangeHandler(
                  "EDIT",
                  "cost",
                  event.currentTarget.checked
                )
              }
            />
            <div className="div text-danger">Cost</div>
          </div>
        </div>
      </div>

      {/* ROW 3 */}

      <div className="mt-3">
        <MultiSelect
          label="Details"
          placeholder="Type / Choose Tags"
          data={detailsOptions[plan.type]}
          value={plan.details}
          onChange={(value) => localDataChangeHandler("EDIT", "details", value)}
          getCreateLabel={(query) => `+ Add "${query}"`}
          searchable
          creatable
          required
          // onCreate={(query) => setDetailsOptions((current) => {}[...current, query])}
        />
      </div>

      {/* ROW 4 */}
      <div className="mt-3">
        <MultiSelect
          label="Time"
          placeholder="Choose Time Tags "
          data={WHEN_OPTIONS}
          value={plan.time}
          onChange={(value) => localDataChangeHandler("EDIT", "time", value)}
          creatable
          searchable
          required
        />
      </div>

      {/* DEL Button */}
      <div className="mt-3 d-grid">
        <button
          class="btn btn-outline-danger flex justify-content-center"
          type="button"
          onClick={() => {
            localDataChangeHandler("DEL");
          }}
        >
          <TrashX size={25} />
        </button>
      </div>
    </Card>
  );
}

export default PlanEditCard