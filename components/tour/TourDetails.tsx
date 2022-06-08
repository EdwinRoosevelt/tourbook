import { useEffect, useState } from 'react'

import {
  Calendar,
  CurrencyRupee,
  MapPin,
  User,
  Edit,
  Users,
  Heart,
  Check
} from "tabler-icons-react";
import { TextInput, NumberInput } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import DateRangeCard from "../common/DateRangeCard";



function TourDetails({ data, planData, formState, setFormState, dataChangeHandler }) {
  const [refresh, setRefresh] = useState(false);
  // var date1, date2;
  useEffect(() => {
    
  }, [])

  function dateRangeChanger (value) {
    
    if (value[0] !== null && value[1] !== null) {
      const reformatedDates = value.map((date) => {
        const dateArr = date.toString().split(" ");
        return `${dateArr[0]} ${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`;
      });
      localDataChangeHandler({target: {id: "dates", value: reformatedDates}});
    }
  }



  function localDataChangeHandler({target}) {
    dataChangeHandler("details", target.id, target.value)

    if(target.id == "dates") {
      
      const newPlanData = planData;

      var date1 = new Date(target.value[0]);
      var date2 = new Date(target.value[1]);

      var requiredPlanArrSize = date2.getDate() - date1.getDate() + 1;
      var currentPlanArrSize = newPlanData.length;

      while (currentPlanArrSize < requiredPlanArrSize) {
        newPlanData.push([]);
        currentPlanArrSize++;
      }

      while (currentPlanArrSize > requiredPlanArrSize) {
        newPlanData.pop();
        currentPlanArrSize--;
      }
      console.log(newPlanData);
      // dataChangeHandler("plan", null, newPlanData);
    }

    setRefresh(!refresh)
  }


  return (
    <section id="tourdetails">
      <div
        className={`container ${formState !== "EDIT" && "mt-5"} p-5 bg-white`}
      >
        {/* Section TITLE */}
        <div className="flex justify-content-between">
          <div>
            <h1 className="display-5"> Tour Details</h1>
            <p className="text-muted mb-5">
              All the specifics about this trip!
            </p>
          </div>
          {formState === "VIEW" && (
            <div>
              {/* <button
                className={`btn btn-outline-success active mr-2 d-inline-flex gap-1`}
              >
                <Check size={25} /> <div>I'm IN</div>
              </button> */}
              <button className={`btn btn-outline-danger active mr-2`}>
                <Heart size={25} />
              </button>

              <button
                title="Edit Tour plan"
                className="btn btn-outline-secondary"
                onClick={() => setFormState("EDIT")}
              >
                <Edit size={25} />
              </button>
            </div>
          )}
        </div>
        {/* <DateRangeCard dates={data.dates}/> */}

        {/* Section CONTENT */}
        <div className="flex flex-wrap justify-content-between">
          {/* Organizer */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Organizers"
          >
            <User size={30} color="#F8B400" />
            {formState !== "VIEW" && (
              <TextInput
                size="md"
                placeholder="organizers"
                id="organizers"
                value={data.organizers}
                onChange={localDataChangeHandler}
                required
              />
            )}
            {formState === "VIEW" && <div>Edwin Roosevelt</div>}
          </div>

          {/* Venue */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Venue"
          >
            <MapPin size={30} color="#035397" />
            {formState !== "VIEW" && (
              <TextInput
                size="md"
                placeholder="venue"
                value={data.venue}
                id="venue"
                onChange={localDataChangeHandler}
                required
              />
            )}
            {formState === "VIEW" && <div>{data.venue}</div>}
          </div>

          {/* DateRange */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Tour Dates"
          >
            {/* <Calendar size={30} color="#6BCB77" /> */}
            <i
              className="bi bi-calendar-range"
              style={{ color: "#125B50", fontSize: "1.7rem" }}
            />
            {formState !== "VIEW" && (
              <DateRangePicker
                size="md"
                placeholder="pick the dates"
                value={[new Date(data.dates[0]), new Date(data.dates[1])]}
                id="dates"
                onChange={dateRangeChanger}
                required
              />
            )}
            {formState === "VIEW" && (
              <div>
                {data.dates[0]} - {data.dates[1]}
              </div>
            )}
          </div>

          {/* Days */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="_ Days / _ Night (excluding the travel plans)"
          >
            <Calendar size={30} color="#6BCB77" />
            {formState !== "VIEW" && (
              <TextInput
                size="md"
                placeholder="e.g. 3D / 4N"
                value={data.days}
                id="days"
                onChange={localDataChangeHandler}
                required
              />
            )}
            {formState === "VIEW" && <div>{data.days} days</div>}
          </div>

          {/* Budget */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Budget"
          >
            <CurrencyRupee size={30} color="#B20600" />
            {formState !== "VIEW" && (
              <TextInput
                size="md"
                placeholder="budget"
                required
                id="budget"
                value={data.budget}
                disabled
              />
            )}
            {formState === "VIEW" && <div>{data.budget} / head</div>}
          </div>

          {/* Maximum Count */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Confirm / Maximum Count"
          >
            <Users size={30} color="#30AADD" />
            {formState !== "VIEW" && (
              <NumberInput
                size="md"
                placeholder="max head count"
                id="maximumHead"
                value={Number(data.maximumHead)}
                onChange={(val) =>
                  localDataChangeHandler({ target: { id: "maximumHead", val } })
                }
                required
              />
            )}
            {formState === "VIEW" && <div>2 / {data.maximumHead}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourDetails