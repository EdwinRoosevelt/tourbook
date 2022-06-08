import React from 'react'



function SaveChanges({ formState, setFormState, formDiscardHandler }) {

  function loaclFormDiscardHandler () {
    console.log("hi")

  }
  

  return (
    <>
      {(formState === "EDIT" || formState === "NEW") && (
        <div className="fixed-bottom" style={{ zIndex: "10" }}>
          <div className="card p-3 m-4 shadow">
            <div className="flex gap-3 justify-content-end">
              <button
                className="btn btn-outline-danger px-5"
                type="button"
                onClick={formDiscardHandler}
              >
                Discard
              </button>

              {formState === "EDIT" && (
                <button
                  className="btn btn-success bg-success px-5"
                  type="submit"
                  // onClick={saveDataHandler}
                >
                  Save
                </button>
              )}
              {formState === "NEW" && (
                <button
                  className="btn btn-success bg-success px-5"
                  type="submit"
                  // onClick={saveDataHandler}
                >
                  Create
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