import React from 'react';

function ExpensesSection({ data, formState }) {
  return (
    <section id="expenses">
      <div
        className={`container ${formState !== "EDIT" && "mt-5"} p-5 bg-white`}
      >
        <h1 className="display-4">Expenses</h1>
        <p className="text-muted mb-5">
          Close approximation for the total expenses.
        </p>
        {/* <p class="text-muted text-right">
          [Total calculated for 1 individuals.]
        </p> */}
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>CATEGORY</th>
              <th>TOTAL</th>
              <th className="text-center">/ HEAD</th>
            </tr>
          </thead>
          <tbody>
            {data.list && data.list.map((row, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>
                    <strong>{row.title}</strong>
                    <p className="text-muted">{row.description}</p>
                  </td>
                  <td>₹{row.total}</td>
                  <td className="text-center">₹{row.perHead}</td>
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
                <strong>₹{data.total}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpensesSection;
