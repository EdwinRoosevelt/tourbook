import React from 'react'
import { useState } from "react";

import { Chip, Button } from "@mantine/core";
import { Edit, Heart, LetterX } from "tabler-icons-react";

function MyStatus({ props, formState, setFormState }) {
    const [checked, setChecked] = useState(false);
    const [tourStatus, setTourStatus] = useState("OUT");

    function changeTourStatus() {
      if (tourStatus === "IN") {
        setTourStatus("OUT");
        setChecked(false);
      } else {
        setTourStatus("IN");
        setChecked(true);
      }
    }

  return (
    <div className="container bg-white p-5">
      <div className="row d-flex justify-content-between">
        <div className="col-md-6">
          <h1 className="display-4 mb-4">My status!</h1>
        </div>
        <div className="col-md-6">
          <div className="d-flex gap-2 justify-content-end align-items-center p-3">
            <Chip value="chip" checked={checked} onChange={changeTourStatus}>
              I'm {tourStatus}
            </Chip>

            <button
              className={`btn btn-outline-danger active ${
                props.userTripStatus === "confirm" && "active"
              }`}
            >
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

            {formState === "EDIT" && (
              <button
                title="Close Tour plan"
                className="btn "
                onClick={() => setFormState("VIEW")}
              >
                <LetterX size={25} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStatus