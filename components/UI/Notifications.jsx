import React, { useEffect, useState } from "react";
import { LoadingOverlay, Button, Group } from "@mantine/core";

import NotificationCard from "./NotificationCard"
import postToDB from "../functions/postToDB";

import styles from "./header.module.css";

function Notifications({ currentUser }) {

  const [notifications, setNotifications] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getNotification();
  }, []);

  async function getNotification() {
    const response = await fetch(`/api/user/${currentUser}`);
    const responseData = await response.json();
    if (responseData.success) setNotifications(responseData.Item.notifications);
    else console.log(responseData)
    setLoader(false);
  }

  async function discardNotification(notification) {
      setLoader(true)
      notification.method = "DEL"
      await postToDB("/api/notification/", notification).then(() => {
        getNotification();
      });
    }

  return (
    <>
      <LoadingOverlay visible={loader} />
      {!loader && (
        <>
          {Object.keys(notifications).length === 0 && (
            <div
              className="flex align-items-center justify-content-center "
              style={{ height: "80vw" }}
            >
              <p className="p-3">No new Notifications!</p>
            </div>
          )}
          <ul>
            {notifications.map((data, index) => {
              return (
                <li key={index} className="py-1">
                  <NotificationCard
                    notification={data}
                    discardNotification={discardNotification}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default Notifications