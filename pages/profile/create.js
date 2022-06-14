import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import ProfileContent from "../../components/profile/ProfileContent";
import SaveChanges from "../../components/common/SaveChanges";
import postToDB from '../../components/functions/postToDB'
import { login } from "../../store/UserSlice";

const EMPTY_PROFILE = {
  userName: "",
  displayName: "",
  photoURL: null,
  mobile: "",
  notifications: [],
  myTours: []
}

const formState = "NEW";

function createProfile() {

    // const userData = useSelector(state => state.user)
    const router = useRouter();
    const dispatch = useDispatch();

    const [isFormReady, setIsFormReady] = useState(true)
    const [formLoader, setFormLoader] = useState(false)
    const [userData, setUserData] = useState(EMPTY_PROFILE);

    const isNewUser = useSelector((state) => state.isNewUser);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const userSliceData = useSelector((state) => state.user);

    console.log(userData);


    useEffect(() => {
      if (!isNewUser || !isLoggedIn) router.replace("/");
      setUserData({ ...userData, ...userSliceData });
    }, [isNewUser, isLoggedIn]);

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
            dispatch(login(response.Item));
            router.push("/");
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