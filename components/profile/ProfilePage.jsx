import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import ProfileContent from "./ProfileContent";
import SaveChanges from '../common/SaveChanges'
import { useAuth } from "../authentication/Auth";


function ProfilePage({initialUserData, formState}) {
    const router = useRouter();
    const { tourbookUser } = useAuth()
    const [isFormReady, setIsFormReady] = useState(true);
    const [formLoader, setFormLoader] = useState(false);
    const [userData, setUserData] = useState(initialUserData);

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
              router.push("/", null, { shallow: true });
            }
        }
        setIsFormReady(true);
        setFormLoader(false);
    }

  return (
    <div className="p-sm-4 " style={{ backgroundColor: "#EEEEEE" }}>
      <form onSubmit={formSubmitHandler}>
        {tourbookUser && (
          <>
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
          </>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
