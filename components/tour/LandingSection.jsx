import React, { useState } from "react";

import { TextInput } from "@mantine/core";



function LandingSection({ data, formState, dataChangeHandler, saveData }) {

  const [refresh, setRefresh] = useState(false);

  function localDataChangeHandler({ target }) {
    dataChangeHandler("EDIT", "details", target.id, target.value);
    refresh ? setRefresh(false) : setRefresh(true);
  }

  return (
    <div>
      <section
        id="landingSection"
        style={{
          backgroundImage: `url("https://tour-with-eddy.s3.ap-south-1.amazonaws.com/ooty.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <div className="container py-5 mb-5">
          {formState === "VIEW" && (
            <>
              <h1 className="display-2">
                {data.title!==undefined && data.title}
              </h1>
              <p className="">{data.description}</p>
              
            </>
          )}
          {formState === "EDIT" && (
            <>
              <TextInput
                size="xl"
                placeholder="Tour Title"
                id="title"
                value={data.title}
                onChange={localDataChangeHandler}
                required
              />
              <TextInput
                size="sm"
                mt="xs"
                placeholder="Description"
                id="description"
                value={data.description}
                onChange={localDataChangeHandler}
                required
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default LandingSection;
