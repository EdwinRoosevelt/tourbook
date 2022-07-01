import React, { useState, useEffect } from 'react'
import Head from "next/head";
import { useRouter } from "next/router";

import ProfilePage from '../../components/profile/ProfilePage';
import { useAuth } from '../../components/authentication/Auth'


const formState = "EDIT";
function ProfileViewPage({responseData}) {

  const router = useRouter();
  const { tourbookUser } = useAuth()
  const { pid } = router.query
  const [showUser, setShowUser] = useState(false)

  useEffect(() => {
    if (tourbookUser && pid != tourbookUser.userName) router.replace("/");
    else setShowUser(true)
  },[])


  return (
    <div className="p-4" style={{ backgroundColor: "#EEEEEE" }}>
      {responseData.success && showUser && (
        <>
          <Head>
            <title>{responseData.Item.displayName}</title>
            <meta
              name="description"
              content={`${responseData.Item.displayName}'s profile`}
            />
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