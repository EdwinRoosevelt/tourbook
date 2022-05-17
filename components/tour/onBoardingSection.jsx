import React from "react";

function OnboardersSection({ data, formState }) {
  return (
    <section id="onboarders">
      <div
        className={`container ${
          formState !== "EDIT" && "mt-5"
        } p-5 mb-5 bg-white`}
      >
        <h1 className="display-4">Onboarders</h1>
        <p className="text-muted mb-5">The people you will be touring with!</p>

        {/* <ul className="list-group list-group-flush"> */}
        <ul>
          <li>Edwin</li>
          
          {/* {data.map((row, index) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <a href="#" className="text-dark">
                    {row.userName} : {row.userId}
                </a>
                <span className={`badge rounded-pill bg-primary`}>
                  {row.status}
                </span>
              </li>
            );
          })} */}
        </ul>
      </div>
    </section>
  );
}

export default OnboardersSection;
