import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import LandingSection from "./LandingSection";
import TourPlan from "./TourPlan";
import ExpenseSection from "./ExpensesSection";
import TourDetails from "./TourDetails";
import SaveChanges from "../common/SaveChanges";
import OnboardingSection from './onBoardingSection'

var initiallData;

function TourPage({ originalData, originalFormState, allUserData }) {

  const router = useRouter();
  const currentUser = useSelector((state) => state.currentUser);
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(originalData.Item);
  const [formState, setFormState] = useState(originalFormState);
  const [isChangesMade, setIsChangesMade] = useState(false);

  useEffect(() => {
    if (originalData.success) {
      initiallData = JSON.parse(JSON.stringify(originalData.Item));
    }
  }, []);

  useEffect(() => {

  }, [data])

  function dataChangeHandler(category, key, value) {
    const newData = JSON.parse(JSON.stringify(data));

    if (category === "details") newData[category][key] = value;
    else newData[category] = value;

    setData(newData);
    setIsChangesMade(true);
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

        if (response.success) {
          router.push(`/tour/${response.tourId}`);
          setFormState("VIEW");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function formDiscardHandler() {
    if (isChangesMade) {
      var confirmationAnswer = window.confirm(
        "You have made some changes. Are you sure want to discard them?"
      );
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
                  currentUser={currentUser}
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
                {formState === "VIEW" && (
                  <OnboardingSection
                    tourData={data}
                    user={user}
                    currentUser={currentUser}
                    allUserData={allUserData}
                    dataChangeHandler={dataChangeHandler}
                    formState={formState}
                    formSubmitHandler={formSubmitHandler}
                  />
                )}
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
          className="display-6 flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <strong>404</strong> | {originalData.message}
        </div>
      )}
    </>
  );
}

export default TourPage;
