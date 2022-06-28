import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { Avatar } from "@mantine/core";
import { Notification } from "@mantine/core";

// const NOTIFICATION_TYPES = {
//   TOURINVITE: {
//     title: "Tour Invitation",

//   },
// };

function NotificationCard({ notification, discardNotification }) {

  const timeDiff = () => {
    const timeDiffinSeconds = Math.round((Date.now() - notification.time_sent) / 1000)
    if (timeDiffinSeconds <= 60) return `sent ${timeDiffinSeconds} seconds ago`
    else {
      const timeDiffinMinutes = Math.round(timeDiffinSeconds / 60)
      if (timeDiffinMinutes <= 60) return `sent ${timeDiffinMinutes} minutes ago`;
      else {
        const timeDiffinHours = Math.round(timeDiffinMinutes / 60);
        if (timeDiffinHours <= 24) return `sent ${timeDiffinHours} hours ago`;
        else {
          const timeDiffinDays = Math.round(timeDiffinHours / 24);
          if (timeDiffinDays <= 30) return `sent ${timeDiffinDays} days ago`;
          else return `sent ${Math.round(timeDiffinDays / 60)} months ago`;
        }
      }
    }
  }

  return (
    <Notification
      // style={{ width: "20rem" }}
      px="md"
      onClose={() => discardNotification(notification)}
    >
      <div className="flex align-items-center gap-3">
        <Avatar src={notification.sender.photoURL} radius="xl" size="lg" />
        {notification.notificationType === "TOURINVITE" && (
          <div>
            <p className="fs-6">
              <strong>Tour Invitation</strong>
            </p>
            <p>
              {notification.sender.displayName} has invited you to join &nbsp;
              <Link href={`/tour/${notification.payload.tourId}`}>
                <a className="badge bg-dark px-2" href="">
                  {notification.payload.tourTitle}
                </a>
              </Link>
            </p>
            <p className="text-secondary text-end">{timeDiff()}</p>
          </div>
        )}
        {notification.notificationType === "NEWONBOARDER" && (
          <div>
            <p className="fs-6">
              <strong>New Onboarder</strong>
            </p>
            <p>
              {notification.sender.displayName} has joined you in the tour &nbsp;
              <Link href={`/tour/${notification.payload.tourId}`}>
                <a className="badge bg-dark px-2" href="">
                  {notification.payload.tourTitle}
                </a>
              </Link>
            </p>
            <p className="text-secondary text-end">{timeDiff()}</p>
          </div>
        )}
      </div>
    </Notification>
  );
}

export default NotificationCard