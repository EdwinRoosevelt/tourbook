import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import ProfileContent from "../../components/profile/ProfileContent";
import SaveChanges from "../../components/common/SaveChanges";

import { login } from "../../store/UserSlice";

const formState = "NEW"

function createProfile() {

    // const userData = useSelector(state => state.user)
    const router = useRouter();
    const dispatch = useDispatch();

    const [isFormReady, setIsFormReady] = useState(true)
    const [formLoader, setFormLoader] = useState(false)
    const isNewUser = useSelector((state) => state.isNewUser);
    const [userData, setUserData] = useState(
      useSelector((state) => state.user)
    );


    useEffect(() => {
      if (!isNewUser) router.replace("/");
    }, []);

    function dataChangeHandler(key, value) {
      const newUserData = { ...userData };
      newUserData[key] = value;
      setUserData(newUserData);
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

                if(response.success) {
                    dispatch(login(response.Item));
                    router.push("/");
                }

            } catch (err) {
                console.log(err);
            }
        }
        setIsFormReady(true);
        setFormLoader(false)
    }

    return (
      <div className="p-4" style={{ backgroundColor: "#EEEEEE" }}>
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

export default createProfile;