import React, { useState, useEffect } from 'react'
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import ProfilePage from '../../components/profile/ProfilePage';



const formState = "EDIT";
function ProfileViewPage({responseData}) {
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const isNewUser = useSelector((state) => state.isNewUser);

    useEffect(() => {
      if (!isLoggedIn) router.push("/", null, { shallow: true });
      if (isNewUser) router.push("/profile/create", null, { shallow: true });
    });

  
  return (
    <div className="p-4" style={{ backgroundColor: "#EEEEEE" }}>
      {responseData.success && (
        <>
          <Head>
            <title>{responseData.Item.displayName}</title>
            {/* <meta
              name="description"
              content={`${tourData.Item.details.title} - ${tourData.Item.details.description}`}
            /> */}
          </Head>
          <ProfilePage
            initialUserData={responseData.Item}
            formState={formState}
          />
        </>
      )}

      {!responseData.success && (
        <>
          <Head>
            <title>404 | User not found</title>
          </Head>
          <p
            className="flex justify-content-center align-items-center"
            style={{ fontSize: "1.5rem", height: "80vh" }}
          >
            <strong>404</strong> &nbsp; | {responseData.message}
          </p>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const userId = context.params.userId;
  const response = await fetch(`http:${process.env.API_URL}/api/user/${userId}`);
  const responseData = await response.json();

  return { props: { responseData } };
}

export default ProfileViewPage