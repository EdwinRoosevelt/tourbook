import React from "react";

function LandingSection({ props }) {
  return (
    <div>
      <section
        id="landingSection"
        style={{
          backgroundImage: `url("https://tour-with-eddy.s3.ap-south-1.amazonaws.com/ooty.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <div className="container py-5 w-75 mb-5">
          <h1 className="display-2">{props.title}</h1>
          <p className="">{props.description}</p>
        </div>
      </section>
    </div>
  );
}

export default LandingSection;
