import React from 'react'
import {
  Calendar,
  CurrencyRupee,
  MapPin,
  User,
  Edit,
  Users,
  Heart,
  Check,
} from "tabler-icons-react";
import { TextInput, NumberInput } from "@mantine/core";


function ProfileContent() {
  const formState = "VIEW";

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
          {formState === "VIEW" && (
            <div>
              <button
                className={`btn btn-outline-success active mr-2 d-inline-flex gap-1`}
              >
                <Check size={25} /> <div>I'm IN</div>
              </button>
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

        {/* Section CONTENT */}
        <div className="flex flex-wrap justify-content-start">
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
          
        </div>
      </div>
    </section>
  );
}

export default ProfileContent