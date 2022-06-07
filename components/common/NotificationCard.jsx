import React from 'react'

function NotificationCard({data}) {

  return (
    <div className="card m-2" style={{  width: "20rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          <strong>{data.type === "TourInvite" && "TOUR Invitation"}</strong>
        </h5>
        {data.type === "TourInvite" && (
          <p className="card-text mb-2">
            edwin_roosevelt has invited you join 
            {data.tourTitle}
          </p>
        )}
        <div className="mt-3 flex gap-3 justify-content-end">
          <button className="btn px-2 btn-success btn-sm" >Success</button>
          <button className="btn btn-danger btn-sm">Ignore</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard