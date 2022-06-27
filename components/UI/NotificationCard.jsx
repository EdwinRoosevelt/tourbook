import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { Avatar } from "@mantine/core";
import { Notification } from "@mantine/core";
import { Check, X } from "tabler-icons-react";
import postToDB from '../functions/postToDB';

function NotificationCard({ data, discardNotification }) {

  return (
    <Notification
      // style={{ width: "20rem" }}

      px="md"
      onClose={() => discardNotification(data)}
    >
      <div className="flex align-items-center gap-3">
        <Avatar src={data.inviter.photoURL} radius="xl" size="lg" />
        <div>
          <p className="fs-6"><strong>Tour Invitation</strong></p>

          <p>
            {data.inviter.displayName} has invited you to join &nbsp;
            <Link href={`/tour/${data.tourId}`}>
              <a className="badge bg-dark px-2" href="">
                {data.tourTitle}
              </a>
            </Link>
          </p>
        </div>
      </div>
    </Notification>
  );
}

export default NotificationCard