import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import LandingSection from "./LandingSection";
import TourPlan from "./TourPlan";
import ExpenseSection from "./ExpensesSection";
import TourDetails from "./TourDetails";
import SaveChanges from "../common/SaveChanges";

var OriginalData;

function TourPage({responseData, originalFormState}) {

  useEffect(() => {
    OriginalData = JSON.parse(JSON.stringify(responseData.Item))
    console.log("renders")
  }, [])

  const router = useRouter()
  const [data, setData] = useState(responseData.Item);
  const [formState, setFormState] = useState(originalFormState);
  const [isChangesMade, setIsChangesMade] = useState(false);
    

  function dataChangeHandler(changeType, category, key, value) {
    const newData = data;

    if (category === "plan") newData[category] = value;
    if (category === "details") newData[category][key] = value;

    setData(newData);
    setIsChangesMade(true);
  }


  async function formSubmitHandler(event) {
    event.preventDefault();

    var confirmationAnswer = window.confirm("Are you sure hehe ?");

    if (confirmationAnswer) {
      try {
        var response = await fetch("/api/tour/edit", {
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
          router.push(`/tour/${data.tourId}`);
          
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
        setData(OriginalData);
        setFormState("VIEW");
        console.log(OriginalData);
        setFormState("VIEW");
      }
    } else {
      setFormState("VIEW");
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#EEEEEE" }}>
        {responseData.success && (
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
                <ExpenseSection data={data.expenses} formState={formState} />
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
      {!responseData.success && (
        <div class="display-6 text-center mt-5">
          <strong>404</strong> | {responseData.message}
        </div>
      )}
    </>
  );
}

export default TourPage;
