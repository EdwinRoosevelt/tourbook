import React, { useState, useEffect } from 'react';
import { Users } from 'tabler-icons-react';

function ExpensesSection({ data, total, formState }) {

  const [refresh, setRefresh] = useState(false);

  return (
    <section id="expenses">
      <div
        className={`container ${formState !== "EDIT" && "mt-5"} p-5 bg-white`}
      >
        <div className="flex justify-content-between align-items-start">
          <div>
            <h1 className="display-5">Expenses</h1>
            <p className="text-muted mb-5">
              Close approximation for the total expenses.
            </p>
          </div>
          {formState !== "VIEW" && (
            <div>
              <button
                title="Refresh Tour plan"
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setRefresh(!refresh)}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          )}
        </div>

        {/* <p class="text-muted text-right">
          [Total calculated for 1 individuals.]
        </p> */}
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>CATEGORY</th>
              <th className="text-center">TOTAL</th>
              <th className="text-center">/ HEAD</th>
            </tr>
          </thead>
          <tbody>
            {/* {data &&
              data.sort((a, b) => {return a.id - b.id}).map((row, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>
                      <strong>{row.title}</strong>
                      <p className="text-muted">{row.description}</p>
                    </td>
                    <td className="text-center">
                      ₹{row.total[0]} for {row.total[1]} person(s)
                    </td>
                    <td className="text-center">₹{row.perHead}</td>
                  </tr>
                );
              })} */}

            {data.map((dayPlan, day) => {
              return (
                <>
                  {dayPlan.map((plan, index) => {
                    return (
                      <>
                        {plan.isCost && (
                          <tr key={`${day}${index}`}>
                            <td scope="row">#</td>
                            <td>
                              <strong>{plan.type}</strong>
                              <p className="text-muted">{plan.details}</p>
                            </td>
                            <td className="text-center">
                              <p>₹{plan.totalCost[0]}</p>
                              <p className="flex gap-2 align-items-center justify-content-center">
                                <Users size={20} /> {plan.totalCost[1]}
                              </p>{" "}
                            </td>
                            <td className="text-center">₹{plan.perHead}</td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}

            {/* {data.map((dayPlan, day) => {
              return dayPlan.map((plan, index) => {
                {
                  plan.isCost && (
                    <tr key={`${day}${index}`}>
                      <td scope="row">{index + 1}</td>
                      <td>
                        <strong>{plan.type}</strong>
                        <p className="text-muted">{plan.details}</p>
                      </td>
                      <td className="text-center">
                        ₹{plan.totalCost[0]} for {plan.totalCost[1]} person(s)
                      </td>
                      <td className="text-center">₹{plan.perHead}</td>
                    </tr>
                  );
                }
              });
            })} */}

            <tr className="table-dark">
              <td scope="row"></td>
              <td>
                <strong>TOTAL</strong>
              </td>
              <td></td>
              <td className="text-center">
                <strong>₹{total}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpensesSection;
