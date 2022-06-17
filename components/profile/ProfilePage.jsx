import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import ProfileContent from "./ProfileContent";
import SaveChanges from '../common/SaveChanges'



function ProfilePage({initialUserData, formState}) {
    const router = useRouter();
    const [isFormReady, setIsFormReady] = useState(true);
    const [formLoader, setFormLoader] = useState(false);

    const isNewUser = useSelector((state) => state.isNewUser);
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const [userData, setUserData] = useState(initialUserData);

    // useEffect(() => {
    // if (!isNewUser) router.replace("/");
    // }, []);

    useEffect(() => {
    if (!isLoggedIn) router.replace("/");
    }, [isLoggedIn]);

    function dataChangeHandler(key, value) {
    const newUserData = { ...userData };
    newUserData[key] = value;
    setUserData(newUserData);
    }

    function formDiscardHandler () {
      router.push('/')
    }

    async function formSubmitHandler(event) {
        event.preventDefault();
        setFormLoader(true);
        setIsFormReady(false);
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
            console.log(response);

            if (response.success) {
                router.push("/", null, {shallow: true});
            }
            } catch (err) {
            console.log(err);
            }
        }
        setIsFormReady(true);
        setFormLoader(false);
    }

  return (
    <div className="p-sm-4 " style={{ backgroundColor: "#EEEEEE" }}>
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
          formDiscardHandler={formDiscardHandler}
        />
      </form>
    </div>
  );
}

export default ProfilePage;
