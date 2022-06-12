import React from 'react'

import { Loader } from "@mantine/core";


function SaveChanges({ formState, isFormReady, formLoader, formDiscardHandler }) {


  return (
    <>
      {(formState === "EDIT" || formState === "NEW") && (
        <div className="fixed-bottom" style={{ zIndex: "10" }}>
          <div className="card p-3 m-4 shadow">
            <div className="flex gap-3 justify-content-end">
              {formState !== "NEW" && (
                <button
                  className="btn btn-outline-danger px-5"
                  type="button"
                  onClick={formDiscardHandler}
                >
                  Discard
                </button>
              )}

              {formState === "EDIT" && (
                <button
                  className={`btn btn-success bg-success px-5 ${
                    !isFormReady && "disabled"
                  }`}
                  type="submit"
                  // onClick={saveDataHandler}
                >
                  Save
                </button>
              )}
              {formState === "NEW" && (
                <button
                  className={`btn btn-success bg-success px-5 ${
                    !isFormReady && "disabled"
                  }`}
                  type="submit"
                  // onClick={saveDataHandler}
                >
                  {formLoader && <Loader size={20} color={"#000000"} />}
                  {!formLoader && "Create"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SaveChanges