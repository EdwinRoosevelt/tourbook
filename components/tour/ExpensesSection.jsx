import React from 'react';
import { Users } from 'tabler-icons-react';


function ExpensesSection({ data, total, formState }) {

  return (
    <section id="expenses">
      <div
        className={`container ${
          formState !== "EDIT" && "mt-5"
        } p-sm-5 py-4 bg-white`}
      >
        <div className="flex justify-content-between align-items-start">
          <div>
            <h1 className="display-5">Expenses</h1>
            <p className="text-muted mb-5">
              Close approximation for the total expenses.
            </p>
          </div>
        </div>

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
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>
                    <strong>{item.type}</strong>
                    <p className="text-muted">
                      {item.details.map((subItem, index) => {
                        if (index === 0) return subItem
                        else return ` - ${subItem}`} )}
                      {/* {item.details[0]} - {item.details[1]} */}
                    </p>
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
