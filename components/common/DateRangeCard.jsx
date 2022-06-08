import React from 'react'

const DAY = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function DateRangeCard({dates}) {

  var date1 = new Date(dates[0])
  var date2 = new Date(dates[1]);

  return (
    <div>
      <div className="container flex gap-2 p-0">
        <div style={{ fontSize: "2.5rem" }}>04</div>
        <div style={{ fontSize: "1.5rem", height: "1rem" }}>Jun</div>
        <div>2022</div>
      </div>
      <div style={{ fontSize: "1.5rem" }}>Saturday</div>
    </div>
  );
}

export default DateRangeCard;