import React from 'react'
import {
  Card, BackgroundImage
} from "@mantine/core";
import { CurrencyRupee, Gift } from "tabler-icons-react";

const bgImages = {
  TRAVEL:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80",
  OTHERS:
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  STAY: 
    "https://images.unsplash.com/photo-1626868449668-fb47a048d9cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  VISIT: 
    "https://images.unsplash.com/photo-1625225190720-fe534839dab6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1378&q=80",
  ACTIVITY:
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1438&q=80",
};

function PlanViewCard({ plan, index }) {
  return (
    <div>
      <Card
        my="sm"
        shadow="xl"
        className="border p-0"
        style={{ backgroundColor: "#F9F9F9" }}
      >
        {/* Row 1 */}
        <div className="row align-items-center p-2">
          <div className="col-3 text-center">
            <span
              title={`This ${plan.type} is FREE`}
              className="d-inline-flex gap-1 badge rounded-pill bg-dark text-light p-2"
            >
              {/* <Gift color="#198754" size="13" /> */}
              <div>{index + 1}</div>
            </span>
          </div>

          <div className="col-9 d-flex justify-content-end">
            {plan.isCost ? (
              <span
                title="This activity is NOT free"
                className="d-inline-flex badge rounded-pill bg-light text-danger p-2"
              >
                <CurrencyRupee size="13" color="#dc3545" />
                Costs
              </span>
            ) : (
              <span
                title="This activity is FREE"
                className="d-inline-flex gap-1 badge rounded-pill bg-light text-success p-2"
              >
                <Gift color="#198754" size="13" />
                <div>Free</div>
              </span>
            )}
          </div>
        </div>
        <hr />

        {/* Row 2 */}
        <BackgroundImage src={bgImages[plan.type]} radius="sm">
          <div className="p-3">
            <div className="flex justify-content-end mt-2 text-light">
              <div className="fs-3">
                <span
                  className="badge bg-light text-dark p-2"
                  style={{ borderRadius: "10px" }}
                >
                  {plan.type}
                </span>
              </div>
            </div>
          </div>
        </BackgroundImage>
        <div className="p-3">
          {/* Row 3 */}
          <div className="justify-content-start mt-2">
            <div className="fs-6 fst-italic">Details</div>

            <div className="container border p-2">
              {plan.details.length > 0 &&
                plan.details.map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="d-inline-flex gap-1 badge bg-dark text-light p-2 mr-2"
                    >
                      {tag}
                    </span>
                  );
                })}
            </div>
          </div>

          {/* Row 4 */}
          <div className="justify-content-start mt-2">
            <div className="fs-6 fst-italic">Time</div>

            <div className="container border p-2">
              {plan.time &&
                plan.time.map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="d-inline-flex gap-1 badge bg-dark text-light p-2 mr-2"
                    >
                      {tag}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PlanViewCard