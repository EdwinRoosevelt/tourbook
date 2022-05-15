import { useState } from 'react'

import { Calendar, CurrencyRupee, MapPin, User } from "tabler-icons-react";
import { TextInput } from "@mantine/core"
import { DateRangePicker } from "@mantine/dates";

function TourDetails({ data, formState, dataChangeHandler }) {

    const [refresh, setRefresh] = useState(false);
    const [dateRange, setDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  function localDataChangeHandler({target}) {
    dataChangeHandler("EDIT", "details", target.id, target.value)
    refresh ? setRefresh(false) : setRefresh(true)
  }

  console.log("reloaded!")

  return (
    <section id="tourdetails">
      <div className="container my-5 p-5 bg-white">
        <h1 className="display-4"> Tour Details</h1>
        <p className="text-muted mb-5">All the specifics about this trip!</p>

        <div className="d-inline-flex flex-wrap flex-fill">
          {/* Organizer */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Organizers"
          >
            <User size={30} color="#F8B400" />
            {formState === "EDIT" && (
              <TextInput
                size="md"
                placeholder="Organizers"
                required
                id="organizers"
                value={data.organizers[0]}
                onChange={localDataChangeHandler}
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
            {formState === "EDIT" && (
              <TextInput
                size="md"
                placeholder="Venue"
                value={data.venue}
                id="venue"
                onChange={localDataChangeHandler}
                required
              />
            )}
            {formState === "VIEW" && <div>{data.venue}</div>}
          </div>

          {/* Budget */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Budget"
          >
            <CurrencyRupee size={30} color="#B20600" />
            {formState === "EDIT" && (
              <TextInput
                size="md"
                placeholder="Budget"
                required
                id="budget"
                value={data.budget}
                disabled
              />
            )}
            {formState === "VIEW" && <div >{data.budget} / head</div>}
          </div>

          {/* DateRange */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Tour Dates"
          >
            <Calendar size={30} color="#6BCB77" />
            {formState === "EDIT" && (
              <DateRangePicker
                size="md"
                placeholder="Pick the dates"
                value={dateRange}
                onChange={setDateRange}
              />
            )}
            {formState === "VIEW" && (
              <div>
                {data.dates[0].toDateString()} - {data.dates[1].toDateString()}{" "}
                : __ days
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourDetails