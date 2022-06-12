import React, { useState, useEffect } from 'react'

import ProfilePage from '../../components/profile/ProfilePage';



const formState = "EDIT";
function profileViewPage({responseData}) {

  
  return (
    <div className="p-4" style={{ backgroundColor: "#EEEEEE" }}>
      {responseData.success && (
        <ProfilePage
          initialUserData={responseData.Item}
          formState={formState}
        />
      )}

      {!responseData.success && (
        <p
          className="flex justify-content-center align-items-center"
          style={{ fontSize: "1.5rem", height: "80vh" }}
        >
          <strong>404</strong> &nbsp; | {responseData.message}
        </p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const userId = context.params.userId;
  const response = await fetch(`http:localhost:3000/api/user/${userId}`);
  const responseData = await response.json();

  return { props: { responseData } };
}

export default profileViewPage