import React, { useState, useEffect } from "react";

import { Select, Loader } from "@mantine/core";
import { Notification } from "@mantine/core";
import { Check } from "tabler-icons-react";

// const allUsers = [ "Angular", "Svelte Roosevelt", "Vue"]

function OnboardersSection({ data, formState, allUserData }) {

  const allUsers = allUserData.map(user => {return user.userName})

  const [invitee, setInvitee] = useState();
  const [errorNotification, setErrorNotification] = useState(false)
  const [inviteSent, setInviteSent] = useState(false);

  useEffect(() => {
    if (invitee) setErrorNotification(false);
  }, [invitee])
  

  const sendNotification = async () => {
    if (invitee) {
      setInviteSent(true);
      try {
        console.log(invitee)
        
        const postData = {
          userName: invitee,
          tourId: "EFGH1234"
        }
        
        var response = await fetch('/api/user/sendNotification', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        response = await response.json();
        console.log(response.data);

      } catch (err) {
        console.log(err.message)
      }

      setTimeout(() => {
        setInviteSent(false);
      }, 2000)

      
    } else {
      setErrorNotification(true)
    }
  }

  return (
    <section id="onboarders">
      <div
        className={`container ${
          formState !== "EDIT" && "mt-5"
        } p-5 mb-5 bg-white`}
      >
        <h1 className="display-4">Onboarders</h1>
        <p className="text-muted mb-4">The people you will be touring with!</p>

        <div className="flex gap-3 mb-4">
          <Select
            placeholder="Pick your tour buddy"
            data={allUsers}
            value={invitee}
            onChange={setInvitee}
            searchable
            clearable
            maxDropdownHeight={200}
            nothingFound="No such User"
          />
          <button
            type="button"
            className={`flex btn btn-outline-success ${inviteSent && "disabled"}`}
            onClick={sendNotification}
          >
            {!inviteSent && "Send Invite"}
            {inviteSent && (
              <>
                <Check /> &nbsp; Sent
              </>
            )}
          </button>
        </div>
        {errorNotification && (
          <Notification disallowClose color="red" title="You cant't do that">
            You need to select someone before sending an invite!
          </Notification>
        )}

        <ul className="list-group list-group-flush mb-4 mt-4">
          {data
            .filter((row) => {
              return row.status === "CONFIRM";
            })
            .map((row, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={row.userId}
                >
                  <div className="flex">
                    <p>{index + 1}. &nbsp; &nbsp;</p>
                    <a href="#">
                      <strong>{row.displayName}</strong>
                    </a>
                  </div>

                  <span
                    className={`badge rounded-pill ${
                      row.status === "CONFIRM" ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {row.status}
                  </span>
                </li>
              );
            })}
        </ul>
        <ul className="list-group list-group-flush">
          {data
            .filter((row) => {
              return row.status === "INVITED";
            })
            .map((row, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={row.userId}
                >
                  <div className="flex">
                    <p>{index + 1}. &nbsp; &nbsp;</p>
                    <a href="#">
                      <strong>{row.displayName}</strong>
                    </a>
                  </div>

                  <span
                    className={`badge rounded-pill ${
                      row.status === "CONFIRM" ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {row.status}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}



export default OnboardersSection;
