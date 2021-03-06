import { useEffect, useState } from "react";
import Script from "next/script"
import { useRouter } from "next/router";
import { Drawer} from "@mantine/core";
import { InlineShareButtons } from "sharethis-reactjs";

import { useNotify } from "../notification/Notify";
import { useAuth } from "../authentication/Auth"

import LandingSection from "./LandingSection";
import TourPlan from "./TourPlan";
import ExpenseSection from "./ExpensesSection";
import TourDetails from "./TourDetails";
import SaveChanges from "../common/SaveChanges";
import OnboardingSection from './onBoardingSection'

var initiallData;

function TourPage({ originalData, originalFormState, allUserData }) {

  const router = useRouter();
  const { addNotification } = useNotify();
  const { tourbookUser } = useAuth();

  const [data, setData] = useState(originalData.Item);
  const [formState, setFormState] = useState(originalFormState);

  const [isChangesMade, setIsChangesMade] = useState(false);
  const [isFormReady, setIsFormReady] = useState(true);
  const [formLoader, setFormLoader] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [shareButton, setShareButton] = useState(false)

  useEffect(() => {
    if (originalData.success) {
      initiallData = JSON.parse(JSON.stringify(originalData.Item));
    }
    if (originalFormState == "NEW") {
      dataChangeHandler("details", "organizers", currentUser)
    }
    var newExpenseData = [];
    data.plan.map((dayPlan) => {
      dayPlan.map((plan) => {
        if (plan.isCost) {
          newExpenseData.push(plan);
        }
      });
    });
    setExpenseData(newExpenseData);
    // console.log(newExpenseData);
  }, []);


  function dataChangeHandler(category, key, value) {
    const newData = JSON.parse(JSON.stringify(data));

    if (category === "details") newData[category][key] = value;
    else if (category === "plan") {
      // Calculating Budget
      newData[category] = value;
      var budget = 0;
      var newExpenseData = [];
      newData.plan.map((dayPlan) => {
        dayPlan.map((plan) => {
          if (plan.isCost) {
            budget += plan.perHead;
            newExpenseData.push(plan);
          }
        });
      });
      setExpenseData(newExpenseData);
      newData.details.budget = budget;
    }
    else newData[category] = value;

    if (key === "dates") {
       var date1 = new Date(value[0]);
       var date2 = new Date(value[1]);

       var requiredPlanArrSize = date2.getDate() - date1.getDate() + 1;
       var currentPlanArrSize = newData.plan.length;

       while (currentPlanArrSize < requiredPlanArrSize) {
         newData.plan.push([]);
         currentPlanArrSize++;
       }

       while (currentPlanArrSize > requiredPlanArrSize) {
         newData.plan.pop();
         currentPlanArrSize--;
       }
    }

    setData(newData);
    setIsChangesMade(true);
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    setFormLoader(true);
    setIsFormReady(false);
    var confirmationAnswer = window.confirm("Are you sure ?");

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
          if (formState === "NEW") {
            addNotification({title: "Tour Created successfully!", message: ""});
          }
          if (formState === "EDIT") {
            addNotification({title: "Tour Edited successfully!", message: ""});
            router.reload();
          }
          setFormState("VIEW");
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsFormReady(true);
    setFormLoader(false);
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
            {/* {data.details.organizers === tourbookUser.userName && (
              <Script
                strategy="lazyOnload"
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=initMap`}
              ></Script>
            )} */}
            <form onSubmit={formSubmitHandler}>
              <LandingSection
                data={data.details}
                dataChangeHandler={dataChangeHandler}
                formState={formState}
              />
              <div className="container-md">
                <TourDetails
                  data={data.details}
                  tourbookUser={tourbookUser}
                  dataChangeHandler={dataChangeHandler}
                  formState={formState}
                  setFormState={setFormState}
                  setShareButton={setShareButton}
                />
                <TourPlan
                  data={data.plan}
                  details={data.details}
                  dataChangeHandler={dataChangeHandler}
                  formState={formState}
                />
                <ExpenseSection
                  data={expenseData}
                  total={data.details.budget}
                  dataChangeHandler={dataChangeHandler}
                  formState={formState}
                />
                {formState === "VIEW" && (
                  <OnboardingSection
                    tourData={data}
                    tourbookUser={tourbookUser}
                    allUserData={allUserData}
                    setData={setData}
                    formState={formState}
                  />
                )}
              </div>
              <div className="container mb-5">...</div>
              <SaveChanges
                formState={formState}
                setFormState={setFormState}
                formDiscardHandler={formDiscardHandler}
                isFormReady={isFormReady}
                formLoader={formLoader}
              />
            </form>
            <Drawer
              opened={shareButton}
              position="bottom"
              onClose={() => setShareButton(false)}
              title="Share"
              padding="xl"
              size="auto"
            >
              {/* <Group>
                <FacebookShareButton
                  url={"http://www.camperstribe.com"}
                  quote={"CampersTribe - World is yours to explore"}
                  hashtag="#camperstribe"
                  // className={classes.socialMediaButton}
                >
                  <FacebookIcon size={36} />
                </FacebookShareButton>
                <WhatsappShareButton
                  title={`Join me on this tour - ${data.details.title} - ${data.details.description}`}
                  description={data.details.description}
                  url={`http://www.tourbook.edwinroosevelt.com/${data.tourId}`}
                  separator=":: "
                >
                  <WhatsappIcon size={36} />
                </WhatsappShareButton>
              </Group> */}

              <InlineShareButtons
                config={{
                  alignment: "center", // alignment of buttons (left, center, right)
                  color: "social", // set the color of buttons (social, white)
                  enabled: true, // show/hide buttons (true, false)
                  font_size: 16, // font size for the buttons
                  labels: "cta", // button labels (cta, counts, null)
                  language: "en", // which language to use (see LANGUAGES)
                  networks: [
                    // which networks to include (see SHARING NETWORKS)
                    "whatsapp",
                    "messenger",
                    "facebook",
                    "twitter",
                    "sharethis",
                  ],
                  padding: 12, // padding within buttons (INTEGER)
                  radius: 25, // the corner radius on each button (INTEGER)
                  // show_total: true,
                  size: 40, // the size of each button (INTEGER)

                  // OPTIONAL PARAMETERS
                  // url: "https://www.sharethis.com", // (defaults to current url)
                  // image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
                  // description: "custom text", // (defaults to og:description or twitter:description)
                  // title: "custom title", // (defaults to og:title or twitter:title)
                  // message: "custom email text", // (only for email sharing)
                  // subject: "custom email subject", // (only for email sharing)
                  // username: "custom twitter handle", // (only for twitter sharing)
                }}
              />
            </Drawer>
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
