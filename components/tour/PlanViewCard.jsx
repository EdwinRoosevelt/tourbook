import React from 'react'
import {
  Card,
} from "@mantine/core";
import { CurrencyRupee, Gift } from "tabler-icons-react";

function PlanViewCard({ plan, index }) {
  return (
    <div>
      <Card mt="sm" mb="sm" shadow="xl" p="sm">
        {/* Row 1 */}
        <div className="row align-items-center mb-2">
          <div className="col-3 text-center">
            <div># {index + 1}</div>
          </div>

          <div className="col-9 d-flex justify-content-end">
            {plan.cost ? (
              <span
                title="This activity is NOT free"
                className="d-inline-flex badge rounded-pill bg-light text-danger p-2"
              >
                <CurrencyRupee size="13" color="#dc3545" />
                <CurrencyRupee size="13" color="#dc3545" />
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
        <div className="flex justify-content-end mt-2">
          <div className="fs-3">{plan.type}</div>
        </div>

        {/* Row 3 */}
        <div className="justify-content-start mt-2">
          <div className="fs-6 fst-italic">Details</div>

          <div className="container border p-2">
            {plan.details &&
              plan.details.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="d-inline-flex gap-1 badge bg-light text-dark p-2 mr-2"
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
                    className="d-inline-flex gap-1 badge bg-light text-dark p-2 mr-2"
                  >
                    {tag}
                  </span>
                );
              })}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PlanViewCard