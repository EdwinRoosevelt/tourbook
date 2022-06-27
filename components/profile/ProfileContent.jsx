import React from 'react'
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useSelector } from 'react-redux';


import { Checks, Accessible, At, DeviceMobile, User } from "tabler-icons-react";
import { TextInput, NumberInput, Loader } from "@mantine/core";



function ProfileContent({ userData, dataChangeHandler, formState, setIsFormReady }) {

  var formState = formState ? formState : "EDIT";
  var rightSection;

  // const userData = useSelector(state => state.user)
  // console.log(userData)
  
  const currentUser = useSelector(state => state.currentUser)
  const [userNameLoading, setUserNameLoading] = useState(false)
  const [userNameError, setUserNameError] = useState(false)
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");

  useEffect(() => {
    setUserNameLoading(true);
    setIsFormReady(false);
    setUserNameError(false)
    const timer = setTimeout(() => {
      checkUserName(userData.userName)
    }, 1000)

    if (userData.userName == "") { 
      clearTimeout(timer) 
      setUserNameError(true)
      setUserNameErrorMessage("Invalid User Name");
      setUserNameLoading(false) 
    }
    return () => clearTimeout(timer)
  }, [userData.userName])

  async function checkUserName (userName) {
    if (formState === "EDIT" && userName === currentUser ) {
      setUserNameError(false);
      setIsFormReady(true);
    }
    else {
      const response = await fetch(`/api/user/${userName}`);
      const responseData = await response.json();
      if (responseData.success) {
        setUserNameError(true);
        setUserNameErrorMessage("User Name already taken!");
      } else {
        setUserNameError(false);
        setIsFormReady(true);
      }  
    }
    setUserNameLoading(false);
    
  }

  if (userNameLoading) rightSection = <Loader size="xs" />;
  else if (!userNameError) rightSection = <Checks size={25} strokeWidth={1} color={"#2d8648"} />;

    return (
      <section id="tourdetails">
        <div className="alert alert-warning mb-4">
          <i className="bi bi-exclamation-triangle-fill mx-2" />
          <strong>Disabled</strong> functionalities are yet to be implemented.
        </div>
        <div className={`container mt-sm-5 p-sm-5 py-3 bg-white`}>
          {/* Section TITLE */}
          <div className="flex justify-content-between flex-wrap">
            <div>
              <h1 className="display-5">
                {formState === "NEW" && "Get Started"}
                {formState !== "NEW" && "My Profile"}
              </h1>
              <p className="text-muted mb-5">
                {formState === "NEW" &&
                  "Create your profile and start TourBook right away!"}
                {formState !== "NEW" && "My personal details"}
              </p>
            </div>
            {/* <div>
            <Image src={userData.image} height={280} width={280} />
            <div className="input-group input-group-sm mb-3">
              <input type="file" className="form-control" value="" id="imageFile" onChange={(event) => {console.log(event.target.files[0])}}/>
            </div>
          </div> */}
          </div>

          <div className="row">
            <div className="col-md-4 px-4 mb-3">
              {userData.photoURL !== null && (
                <Image
                  src={userData.photoURL}
                  width={"10"}
                  height={"10"}
                  layout="responsive"
                />
              )}

              <div className="d-grid mb-3">
                {/* <button className="btn btn-outline-dark btn-sm disabled mt-3 px-4">
                  Set Avatar
                </button> */}
                <button className="btn btn-outline-dark btn-sm  disabled mt-3 px-4">
                  Upload
                </button>
              </div>
            </div>
            <div className="col-md-8 px-4">
              {/* Section CONTENT */}
              <div className="flex gap-3 flex-wrap mb-5">
                <TextInput
                  required
                  style={{ minWidth: "18rem" }}
                  label="User Name"
                  icon={<Accessible size={14} />}
                  value={userData.userName}
                  onChange={(event) =>
                    dataChangeHandler("userName", event.target.value)
                  }
                  rightSection={rightSection}
                  error={userNameError && `${userNameErrorMessage}`}
                />

                <TextInput
                  style={{ minWidth: "18rem" }}
                  label="Your email"
                  placeholder="Your email"
                  disabled
                  icon={<At size={14} />}
                  value={userData.emailId}
                  onChange={(event) =>
                    dataChangeHandler("emailId", event.target.value)
                  }
                  // error="Invalid email"
                />

                <TextInput
                  required
                  style={{ minWidth: "18rem" }}
                  label="Full Name"
                  icon={<User size={14} />}
                  value={userData.displayName}
                  onChange={(event) =>
                    dataChangeHandler("displayName", event.target.value)
                  }
                />

                <NumberInput
                  required
                  style={{ minWidth: "18rem" }}
                  label="Mobile no."
                  icon={<DeviceMobile size={14} />}
                  value={Number(userData.mobile)}
                  onChange={(value) => dataChangeHandler("mobile", value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default ProfileContent