import React, { useState, useEffect } from 'react'
import Head from "next/head";
import { useRouter } from "next/router";
import { v4 as uuid_v4 } from "uuid";

import ProfileContent from "../../components/profile/ProfileContent";
import SaveChanges from "../../components/common/SaveChanges";
import postToDB from '../../components/functions/postToDB'
import { useAuth } from "../../components/authentication/Auth"
import { useNotify } from '../../components/notification/Notify';

var EMPTY_PROFILE = {
  userName: "",
  displayName: "",
  emailId: "",
  photoURL: "/",
  mobile: 0,
  notifications: [],
  myTours: [],
};

const formState = "NEW";

function CreateProfile() {
  const router = useRouter();

  const { addNotification } = useNotify();
  const { currentUser, tourbookUser, isNewUser, setIsNewUser } = useAuth();

  const [isFormReady, setIsFormReady] = useState(true);
  const [formLoader, setFormLoader] = useState(false);
  const [userData, setUserData] = useState(EMPTY_PROFILE);


  useEffect(() => {
    if (currentUser) {
      var filledProfile = {
        userName: currentUser.displayName.toLowerCase().replace(" ", "_"),
        displayName: currentUser.displayName,
        emailId: currentUser.email,
        photoURL: currentUser.photoURL,
        mobile: currentUser.phoneNumber,
        notifications: [],
        myTours: [],
      };
      setUserData(filledProfile);
    }
  }, []);

  useEffect(() => {
    if (!isNewUser || !currentUser) router.replace("/");
  }, [isNewUser, currentUser]);



  function dataChangeHandler(key, value) {
    const newUserData = { ...userData };
    newUserData[key] = value;
    setUserData(newUserData);
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    setFormLoader(true);
    setIsFormReady(false);
    var confirmationAnswer = window.confirm("Are you sure ?");

    if (confirmationAnswer) {
      const response = await postToDB("/api/user/edit", userData);
      if (response.success) {
        setIsNewUser(false);
        addNotification({title: "Profile Created!", message: "Happy tourbooking!" });
        router.push("/tours", null, {shallow: false});
      }
    }
    setIsFormReady(true);
    setFormLoader(false);
  }

  return (
    <div className="p-4" style={{ backgroundColor: "#EEEEEE", height: "80vw" }}>
      <Head>
        <title>New Profile</title>
      </Head>
      <form onSubmit={formSubmitHandler}>
        <ProfileContent
          userData={userData}
          dataChangeHandler={dataChangeHandler}
          formState={formState}
          setIsFormReady={setIsFormReady}
        />
        <SaveChanges
          formState={formState}
          isFormReady={isFormReady}
          formLoader={formLoader}
        />
      </form>
    </div>
  );
}

export default CreateProfile;