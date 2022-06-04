import React from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux';
import {
  Calendar,
  CurrencyRupee,
  MapPin,
  User,
  Edit,
  Users,
  Heart,
  Check,
} from "tabler-icons-react";
import { TextInput, NumberInput } from "@mantine/core";


function ProfileContent({ userData, dataChangeHandler }) {
  const formState = "VIEW";

  // const userId = useSelector((state) => state.userData.userId);

  return (
    <section id="tourdetails">
      <div
        className={`container ${formState !== "EDIT" && "mt-5"} p-5 bg-white`}
      >
        {/* Section TITLE */}
        <div className="flex justify-content-between flex-wrap">
          <div>
            <h1 className="display-5"> My Profile</h1>
            <p className="text-muted mb-5">My personal details</p>
          </div>
          {/* <div>
            <Image src={userData.image} height={280} width={280} />
            <div className="input-group input-group-sm mb-3">
              <input type="file" className="form-control" value="" id="imageFile" onChange={(event) => {console.log(event.target.files[0])}}/>
            </div>
          </div> */}
        </div>

        {/* Section CONTENT */}
        <div className="flex gap-3 flex-wrap">
          {/* UserId */}
          <div className="input-group mb-3">
            <span className="input-group-text">User ID</span>
            <input
              type="email"
              id="userId"
              className="form-control"
              placeholder="Email"
              value={userData.userId}
              onChange={(event) =>
                dataChangeHandler(event.target.id, event.target.value)
              }
            />
          </div>

          {/* displayName */}
          <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input
              type="text"
              id="displayName"
              className="form-control"
              placeholder="Display Name"
              value={userData.displayName}
              onChange={(event) =>
                dataChangeHandler(event.target.id, event.target.value)
              }
            />
          </div>

          {/* Mobile Number */}
          <div className="input-group mb-3">
            <span className="input-group-text">Mobile No.</span>
            <input
              type="tel"
              id="mobile"
              className="form-control"
              placeholder="mobile number"
              value={userData.mobile}
              onChange={(event) =>
                dataChangeHandler(event.target.id, event.target.value)
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileContent