import React from "react";

function OnboardersSection({ props }) {
  return (
    <section id="onboarders">
      <div className="container my-5 p-5 bg-white">
        <h1 className="display-4">Onboarders</h1>
        <p className="text-muted mb-5">The people you will be touring with!</p>

        <ul className="list-group list-group-flush">
          {/* <!-- Members --> */}
          {props.map((row) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <a href="#" className="text-dark">
                  {row.name}
                </a>
                <span className={`badge rounded-pill bg-${row.color}`}>
                  {row.status}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default OnboardersSection;
