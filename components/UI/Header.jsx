import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Image from "next/image";
import Link from "next/link";

import { BellRinging, List, PlaylistAdd, Power, Settings, UserCircle } from 'tabler-icons-react';
import { Avatar } from "@mantine/core";

import tourbook from "../../public/tourbook-home-icon.png";
import LoginModal from './LoginModal';
import NotificationCard from '../common/NotificationCard';
import styles from './header.module.css'

import { asynclogout } from "../../store/UserSlice";
import { useRouter } from 'next/router';
import postToDB from '../functions/postToDB';


function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [reload, setReload] = useState(false)
    
    const isNewUser = useSelector(state => state.isNewUser)
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const currentUser = useSelector(state => state.currentUser)
    const userData = useSelector((state) => state.user);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      if (isNewUser) router.push("/profile/create");
    }, [isNewUser, router]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/user/${currentUser}`);
        const responseData = await response.json();
        // setUserData(response.Item)
        if (response.success) setNotifications(responseData.Item.notifications);
      };
      fetchData();
    }, [reload, currentUser]);


    function signOut () {
      dispatch(asynclogout());
    }

  return (
    <header className="py-sm-3 bg-dark border-bottom">
      <div className="container-fluid d-flex wrap gap-4 p-2 justify-content-between align-items-center">
        <div className="col-4 col-md-2 col-lg-1 mx-2">
          <Link href="/">
            <a>
              <Image src={tourbook} alt="tourbook logo" />
            </a>
          </Link>
        </div>
        {isLoggedIn && (
          <div className="d-flex gap-3 justify-content-between align-items-center">
            <div className="dropdown">
              <button
                className="btn btn-dark"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BellRinging />
              </button>
              <ul
                className={`dropdown-menu ${styles.notificationDropdown}`}
                aria-labelledby="dropdownMenuButton1"
              >
                {Object.keys(notifications).length === 0 && (
                  <li className="p-3">No new Notifications!</li>
                )}
                {notifications.map((row, index) => {
                  return (
                    <li key={index} className="py-1">
                      <NotificationCard
                        data={row}
                        currentUser={currentUser}
                        reload={reload}
                        setReload={setReload}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="dropdown">
              <button
                // style={{minWidth: "12rem"}}
                className="btn btn-dark d-flex align-items-center gap-2 text-start  dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <Image
                  src={userData.photoURL}
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                /> */}
                <Avatar src={userData.photoURL} alt="user logo" radius="xl" />
                {/* {userData.displayName.split(" ")[0]} */}
              </button>
              <ul
                className={`dropdown-menu ${styles.profileDropdown}`}
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <Link href="/tour/create">
                    <a className="dropdown-item flex gap-2 mb-2">
                      <PlaylistAdd color="#198754" />
                      <p>New Tour</p>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/myTours">
                    <a className="dropdown-item flex gap-2 mb-2">
                      <List color="#0dcaf0" />
                      <p>My Tours</p>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/settings">
                    <a className="dropdown-item flex gap-2 mb-2">
                      <Settings color="#fd7e14" />
                      <p>Settings</p>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={`/profile/${encodeURIComponent(currentUser)}`}>
                    <a className="dropdown-item flex gap-2 mb-2">
                      <UserCircle />
                      <p>Profile</p>
                    </a>
                  </Link>
                </li>
                <hr className="dropdown-divider" />
                <li>
                  <button
                    className="dropdown-item flex gap-2"
                    onClick={signOut}
                  >
                    <Power color="#dc3545" />
                    <p>Logout</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}



export default Header