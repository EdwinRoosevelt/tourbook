import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { Avatar } from "@mantine/core";
import { Notification } from "@mantine/core";
import { Check, X } from "tabler-icons-react";
import postToDB from '../functions/postToDB';

function NotificationCard({ currentUser, data, reload, setReload }) {
  async function discardNotification() {
    const response = await postToDB("/api/notification/del", {
      user: currentUser,
      tourId: data.tourId,
      inviteType: data.inviteType,
    });
    console.log(response);
    setReload(!reload);
  }

  useEffect(() => {}, [data]);

  return (
    <Notification
      style={{ width: "20rem" }}
      icon={<Avatar src={data.inviter.photoURL} radius="xl" size="lg" />}
      title="Tour Invitation"
      px="md"
      onClose={discardNotification}
    >
      {data.inviter.displayName} has invited you to join &nbsp;
      <Link href={`/tour/${data.tourId}`}>
        <a className="badge bg-dark px-2" href="">
          {data.tourTitle}
        </a>
      </Link>
    </Notification>
  );
}

export default NotificationCard