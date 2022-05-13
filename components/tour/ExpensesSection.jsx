import React from 'react';

function ExpensesSection({props}) {
  return (
    <section id="expenses">
      <div class="container mt-5 p-5 bg-white">
        <h1 class="display-4">Expenses</h1>
        <p class="text-muted mb-5">
          This is a close approximation for the total expenses.
        </p>
        <p class="text-muted text-right">
          [Total calculated for 1 individuals.]
        </p>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>CATEGORY</th>
              <th>x multiplier</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {props.list.map(row => {
              return (
                <tr>
                  <td scope="row">{row.no}</td>
                  <td>
                    <strong>{row.title}</strong>
                    <p class="text-muted">{row.description}</p>
                  </td>
                  <td>₹{row.price}</td>
                  <td>₹{row.total}</td>
                </tr>
              );
            })};
            <tr>
              <td scope="row"></td>
              <td>
                <strong>TOTAL</strong>
              </td>
              <td></td>
              <td>
                <strong>₹{props.total}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpensesSection;
