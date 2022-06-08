import React, { useState, useEffect } from 'react';
import { Users } from 'tabler-icons-react';

var budget = 0;
var expenseData = []


function ExpensesSection({ data, total, dataChangeHandler, formState }) {
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {  
    data.map((dayPlan) => {
      dayPlan.map((plan) => {
        if (plan.isCost) {
          budget += plan.perHead;
          expenseData.push(plan)
        }
      });
    });

    dataChangeHandler("details", "budget", budget);
  }, [refresh]);

  


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
            {expenseData.map((item, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>
                    <strong>{item.type}</strong>
                    <p className="text-muted">{item.details}</p>
                  </td>
                  <td className="text-center">
                    <p>₹{item.totalCost[0]}</p>
                    <p className="flex gap-2 align-items-center justify-content-center">
                      <Users size={20} /> {item.totalCost[1]}
                    </p>{" "}
                  </td>
                  <td className="text-center">₹{item.perHead}</td>
                </tr>
              );
            })}

            <tr className="table-dark">
              <td scope="row"></td>
              <td>
                <strong>TOTAL</strong>
              </td>
              <td></td>
              <td className="text-center">
                <strong>₹{budget}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpensesSection;
