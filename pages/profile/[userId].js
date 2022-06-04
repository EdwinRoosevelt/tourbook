import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

import ProfileContent from '../../components/profile/ProfileContent'
import SaveChanges from '../../components/common/SaveChanges'



function profileViewPage({responseData}) {
  const router = useRouter()
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [userData, setUserData] = useState(responseData.Item)

  useEffect(() => {
    if (!isLoggedIn) router.replace("/");
  }, [isLoggedIn]);

  function dataChangeHandler (key, value) {
    const newUserData = {...userData}
    newUserData[key] = value;
    setUserData(newUserData);
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    var confirmationAnswer = window.confirm("Are you sure hehe ?");

    if (confirmationAnswer) {
      try {

        var response = await fetch("/api/user/edit", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        response = await response.json();
        console.log(response.data);

        if (response.success) {
          router.push(`/profile/${response.userId}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  
  return (
    <div className="p-4" style={{ backgroundColor: "#EEEEEE" }}>
      {responseData.success && (
        <>
          <form onSubmit={formSubmitHandler}>
            <ProfileContent
              userData={userData}
              dataChangeHandler={dataChangeHandler}
            />
            <SaveChanges
              formState={"EDIT"}
            />
          </form>
        </>
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