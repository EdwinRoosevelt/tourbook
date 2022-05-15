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
import { TrashX, Copy, CurrencyRupee, Gift} from "tabler-icons-react";


const PLAN_OPTIONS = ["TRAVEL", "STAY", "VISIT", "ACTIVITY", "OTHERS"];
const INITIAL_DETAILS_OPTIONS = {
  TRAVEL: ["Bike - R15", "Car - Verna", "Train - Yercaud Exp", "Flight"],
  STAY: ["OYO", "ITC Chola", "L'Amby Bay", "Rock Fort Inn"],
  VISIT: ["KFC Restaurant", "Cubbon Park", "Film City", "Mall"],
  ACTIVITY: ["Surfing @ Marina", "Rafting"]
}
const WHEN_OPTIONS = [
  "Night",
  "Morning",
  "☀️ Afternoon",
  "Evening",
  "9 am",
  "10 am",
  "11 am",
  "12 pm",
];


function PlanCard({ day, index, plan, dataChangeHandler, formState }) {

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
    <Card mt="sm" shadow="xl" p="sm">
      {/* ROW 1 */}
      <div className="row align-items-center mb-2">
        <div className="col-3 text-center">
          <div># {index + 1}</div>
        </div>
        {formState === "EDIT" && (
          <div className="col-9">
            <Progress value={progress} />
          </div>
        )}
      </div>
      <hr></hr>

      {/* ROW 2 */}
      <div className="row align-items-end mt-3">
        <div className="col-6">
          {formState === "EDIT" && (
            <Select
              label="Type"
              placeholder="Travel, Visit, Stay, ..."
              data={PLAN_OPTIONS}
              value={plan.type}
              onChange={(value) => {
                localDataChangeHandler("EDIT", "type", value);
              }}
            />
          )}
          {formState === "VIEW" && <div className="fs-4"> {plan.type}</div>}
        </div>
        <div className="col-6">
          {formState === "EDIT" && (
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
          )}
          {formState === "VIEW" && (
            <h2>
              {plan.cost ? (
                <span class="d-inline-flex badge rounded-pill bg-danger p-2">
                  <CurrencyRupee size="20" />
                  <div className="fs-6 fw-normal">Cost</div>
                </span>
              ) : (
                <span class="d-inline-flex badge rounded-pill bg-success p-2">
                  <Gift size="20" />
                  <div className="fs-6 fw-normal">Free</div>
                </span>
              )}
            </h2>
          )}
        </div>
      </div>

      {/* ROW 3 */}

      <div className="mt-3">
        {formState === "EDIT" && (
          <MultiSelect
            label="Details"
            placeholder="Type / Choose Tags"
            data={detailsOptions[plan.type]}
            value={plan.details}
            onChange={(value) =>
              localDataChangeHandler("EDIT", "details", value)
            }
            searchable
            creatable
            getCreateLabel={(query) => `+ Add "${query}"`}
            // onCreate={(query) => setDetailsOptions((current) => {}[...current, query])}
          />
        )}
        {formState === "VIEW" && <div className="fs-4">Details {plan.details}</div>}
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
        />
      </div>

      <Group grow>
        <Button
          mt="md"
          variant="outline"
          color="red"
          onClick={() => {
            localDataChangeHandler("DEL");
          }}
        >
          <TrashX size={25} />
        </Button>
      </Group>
    </Card>
  );
}

export default PlanCard