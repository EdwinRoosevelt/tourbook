import { useState } from 'react'

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

function TourDetails({ data, formState, setFormState, dataChangeHandler }) {

    const [refresh, setRefresh] = useState(false);
    const [dateRange, setDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  function localDataChangeHandler({target}) {
    dataChangeHandler("EDIT", "details", target.id, target.value)
    refresh ? setRefresh(false) : setRefresh(true)
  }


  return (
    <section id="tourdetails">
      <div
        className={`container ${formState !== "EDIT" && "mt-5"} p-5 bg-white`}
      >
        {/* Section TITLE */}
        <div className="flex justify-content-between">
          <div>
            <h1 className="display-4"> Tour Details</h1>
            <p className="text-muted mb-5">
              All the specifics about this trip!
            </p>
          </div>
          <div>
            <button
              className={`btn btn-outline-success active mr-2 d-inline-flex gap-1`}
            >
              <Check size={25} /> <div>I'm IN</div>
            </button>
            <button className={`btn btn-outline-danger active mr-2`}>
              <Heart size={25} />
            </button>
            {formState === "VIEW" && (
              <button
                title="Edit Tour plan"
                className="btn btn-outline-secondary"
                onClick={() => setFormState("EDIT")}
              >
                <Edit size={25} />
              </button>
            )}
          </div>
        </div>

        {/* Section CONTENT */}
        <div className="flex flex-wrap justify-content-around">
          {/* Organizer */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Organizers"
          >
            <User size={30} color="#F8B400" />
            {formState === "EDIT" && (
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
            {formState === "EDIT" && (
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
            {formState === "EDIT" && (
              <DateRangePicker
                size="md"
                placeholder="pick the dates"
                value={data.dates}
                id="dates"
                onChange={(value) =>
                  localDataChangeHandler({ target: { id: "dates", value } })
                }
                required
              />
            )}
            {formState === "VIEW" && (
              <div>
                {data.dates !== null && data.dates[0].toDateString()} -{" "}
                {data.dates[1].toDateString()}
              </div>
            )}
          </div>

          {/* Days */}
          <div
            className="d-flex gap-2 align-items-center p-2 me-5"
            title="Effective days"
          >
            <Calendar size={30} color="#6BCB77" />
            {formState === "EDIT" && (
              <NumberInput
                size="md"
                placeholder="pick the dates"
                value={data.days}
                id="days"
                onChange={(value) =>
                  localDataChangeHandler({ target: { id: "days", value } })
                }
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
            {formState === "EDIT" && (
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
            {formState === "EDIT" && (
              <NumberInput
                size="md"
                placeholder="max head count"
                id="maximumHead"
                value={data.maximumHead}
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