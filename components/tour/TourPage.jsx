import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import LandingSection from "./LandingSection";
import TourPlan from "./TourPlan";
import ExpenseSection from "./ExpensesSection";
import TourDetails from "./TourDetails";
import SaveChanges from "../common/SaveChanges";

var initiallData;

function TourPage({originalData, originalFormState}) {

  useEffect(() => {
    if (originalData.success) {
      initiallData = JSON.parse(JSON.stringify(originalData.Item));
    }
    
  }, [])

  const router = useRouter()

  console.log(originalData.Item)
  const [data, setData] = useState(originalData.Item);
  const [formState, setFormState] = useState(originalFormState);
  const [isChangesMade, setIsChangesMade] = useState(false);

  const [reload, setReload] = useState(false)
    

  function dataChangeHandler(changeType, category, key, value) {
    const newData = data;

    if (category === "plan") newData[category] = value;
    if (category === "details") newData[category][key] = value;

    setData(newData);
    setIsChangesMade(true);
    // setReload(!reload);
  }


  async function formSubmitHandler(event) {
    event.preventDefault();

    var confirmationAnswer = window.confirm("Are you sure hehe ?");

    if (confirmationAnswer) {
      try {
        var url;
        if (formState === "EDIT") url = "/api/tour/edit";
        if (formState === "NEW") url = "/api/tour/add";
        var response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        response = await response.json();

        console.log(response.data);

        if (response.success) {
          router.push(`/tour/${response.tourId}`);
          setFormState("VIEW")
          
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function formDiscardHandler() {
    if (isChangesMade) {
      var confirmationAnswer = window.confirm("You have made some changes. Are you sure want to discard them?");
      if (confirmationAnswer) {
        setData(initiallData);
        setFormState("VIEW");
      }
    } else {
      setFormState("VIEW");
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#EEEEEE" }}>
        {originalData.success && (
          <>
            <form onSubmit={formSubmitHandler}>
              <LandingSection
                data={data.details}
                dataChangeHandler={dataChangeHandler}
                formState={formState}
              />
              <div className="container-md">
                <TourDetails
                  data={data.details}
                  planData={data.plan}
                  dataChangeHandler={dataChangeHandler}
                  formState={formState}
                  setFormState={setFormState}
                />
                <TourPlan
                  data={data.plan}
                  details={data.details}
                  dataChangeHandler={dataChangeHandler}
                  formState={formState}
                />
                <ExpenseSection
                  data={data.plan}
                  total={data.details.budget}
                  dataChangeHandler={dataChangeHandler}
                  formState={formState}
                />
                {/* <OnboardingSection data={data.onboarders} formState={formState} /> */}
              </div>
              <div className="container mb-5">...</div>
              <SaveChanges
                formState={formState}
                setFormState={setFormState}
                formDiscardHandler={formDiscardHandler}
              />
            </form>
          </>
        )}
      </div>
      {!originalData.success && (
        <div
          class="display-6 flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <strong>404</strong> | {originalData.message}
        </div>
      )}
    </>
  );
}

export default TourPage;
