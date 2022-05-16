import React from 'react'



function SaveChanges({ formState, setFormState }) {

    function discardChangeHandler () {
        if (formState === "EDIT") setFormState("VIEW")
        console.log("Hi");
        console.log(process.env.DUMMY_KEY);
    }

    return (
      <>
        {(formState === "EDIT" || formState === "CREATE") && (
          <div className="fixed-bottom">
            <div className="card p-3" style={{ background: "#F0ECE3" }}>
              <div className="flex gap-5 justify-content-end">
                <button
                  className="btn btn-danger  bg-danger px-5"
                  onClick={discardChangeHandler}
                >
                  Discard
                </button>
                <button
                  className="btn btn-success bg-success px-5"
                  type="submit"
                  // onClick={saveDataHandler}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default SaveChanges