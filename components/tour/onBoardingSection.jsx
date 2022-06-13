import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Select, Loader } from "@mantine/core";
import { Notification } from "@mantine/core";
import { Check } from "tabler-icons-react";


import postToDB from '../functions/postToDB'

const availableInvitees = {userNames: [], displayNames: []}

function OnboardersSection({ formState, allUserData, tourData, user, currentUser, setData }) {
  const router = useRouter();

  const [errorNotification, setErrorNotification] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [invitee, setInvitee] = useState();

  useEffect(() => {

    // Extracting userName and displayNames from allUserData and
    // filtering out the confirm and invited users from the available invitees

    availableInvitees.userNames = allUserData.map((user) => {
      return user.userName;
    });

    availableInvitees.userNames = availableInvitees.userNames.filter((user) => {
      var validUser = true;
      tourData.onboarders.map((onBoarder) => {
        if (user === onBoarder.userName) validUser = false;
      });
      return validUser;
    });

    availableInvitees.displayNames = allUserData.map((user) => {
      return user.displayName;
    });

    availableInvitees.displayNames = availableInvitees.displayNames.filter(
      (user) => {
        var validUser = true;
        tourData.onboarders.map((onBoarder) => {
          if (user === onBoarder.displayName) validUser = false;
        });
        return validUser;
      }
    );
  });

  useEffect(() => {
    if (invitee) setErrorNotification(false);
  }, [invitee]);

  const sendInvite = async () => {
    if (invitee) {
      setInviteSent(true);
      var userIndex = 0;
      availableInvitees.userNames.map((userName, index) => {
        if (userName === invitee) userIndex = index;
      });

      // Send Notification
      const notification = {
        // inviter: {userName: currentUser, }
        inviter: {
          userName: user.userName,
          photoURL: user.photoURL,
          displayName: user.displayName,
        },
        invitee,
        inviteType: "TourInvite",
        tourId: tourData.tourId,
        tourTitle: tourData.details.title,
      };
      await postToDB("/api/notification/add", notification);

      // Send Invitation
      const newTourData = JSON.parse(JSON.stringify(tourData));
      newTourData.onboarders.push({
        userName: invitee,
        displayName: availableInvitees.displayNames[userIndex],
        status: "INVITED",
      });
      setData(newTourData);
      await postToDB("/api/tour/edit", newTourData);

      

      setTimeout(() => {
        setInviteSent(false);
        setInvitee("");
      }, 2000);
    } else {
      setErrorNotification(true);
    }
  };

  const acceptInvite = async () => {
    var confirmationAnswer = window.confirm("Are you sure ?");

    if (confirmationAnswer) {
      const newOnboardersData = JSON.parse(JSON.stringify(tourData.onboarders));
      newOnboardersData.map((item) => {
        if (item.userName === currentUser) {
          item.status = "CONFIRM";
        }
        return item;
      });

      tourData.onboarders = newOnboardersData;

      await postToDB("/api/tour/edit", tourData);
      router.push(`/tour/${tourData.tourId}`, null, { shallow: true });
    }
  };

  const rejectInvite = async () => {
    var confirmationAnswer = window.confirm("Are you sure ?");

    if (confirmationAnswer) {
      var newOnboardersData = JSON.parse(JSON.stringify(tourData.onboarders));
      newOnboardersData = newOnboardersData.filter((item) => {
        return item.userName !== currentUser;
      });

      tourData.onboarders = newOnboardersData;

      await postToDB("/api/tour/edit", tourData);
      router.push(`/tour/${tourData.tourId}`, null, { shallow: true });
    }
  };

  return (
    <section id="onboarders">
      <div
        className={`container ${
          formState !== "EDIT" && "mt-5"
        } p-5 mb-5 bg-white`}
      >
        <h1 className="display-4">Onboarders</h1>
        <p className="text-muted mb-4">The people you will be touring with!</p>

        {currentUser === tourData.details.organizers && (
          <div className="flex gap-3 mb-4">
            <Select
              placeholder="Pick your tour buddy"
              data={availableInvitees.userNames}
              value={invitee}
              onChange={setInvitee}
              searchable
              clearable
              maxDropdownHeight={200}
              nothingFound="No such User"
            />
            <button
              type="button"
              className={`flex border btn btn-outline-success ${
                inviteSent && "disabled"
              }`}
              onClick={sendInvite}
            >
              {!inviteSent && "Send Invite"}
              {inviteSent && (
                <>
                  <Check /> &nbsp; Sent
                </>
              )}
            </button>
          </div>
        )}

        {errorNotification && (
          <Notification disallowClose color="red" title="You cant't do that">
            You need to select someone before sending an invite!
          </Notification>
        )}

        <ul className="list-group list-group-flush mb-4 mt-4">
          {tourData.onboarders
            .filter((row) => {
              return row.status === "CONFIRM";
            })
            .map((row, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={row.userName}
                >
                  <div className="flex">
                    <p>{index + 1}. &nbsp; &nbsp;</p>
                    <a href="#">
                      <strong>{row.displayName}</strong>
                    </a>
                  </div>

                  <span className="badge rounded-pill bg-success">
                    {row.status}
                  </span>
                </li>
              );
            })}
        </ul>
        <ul className="list-group list-group-flush">
          {tourData.onboarders
            .filter((row) => {
              return row.status === "INVITED";
            })
            .map((row, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={row.userName}
                >
                  <div className="flex">
                    <p>{index + 1}. &nbsp; &nbsp;</p>
                    <a href="#">
                      <strong>{row.displayName}</strong>
                    </a>
                  </div>

                  {row.userName === currentUser && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-success border btn-sm"
                        onClick={acceptInvite}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger border btn-sm"
                        onClick={rejectInvite}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {row.userName !== currentUser && (
                    <span className="badge rounded-pill bg-warning">
                      {row.status}
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}



export default OnboardersSection;
