import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Image from "next/image";
import Link from "next/link";

import { BellRinging, List, PlaylistAdd, Power, Settings, UserCircle } from 'tabler-icons-react';

import tourbook from "../../public/tourbook_white.svg";
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
    }, [isNewUser]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/user/${currentUser}`);
        const responseData = await response.json();
        // setUserData(response.Item)

        setNotifications(responseData.Item.notifications);
      }
      fetchData()
    }, [reload]);

    async function discardNotification ({ tourId }) {
      const newNotifications = notifications.map(item => {
        if (item.tourId !== tourId) return item
      })

      console.log(newNotifications)
      console.log(notifications)

      // const response = await fetch(`/api/user/${currentUser}`);
      // const responseData = await response.json();

      // responseData.Item.notifications = newNotifications;
      // await postToDB('/api/user/edit', responseData.Item)
      // router.push('/')
    }

    // console.log(userData)



    function signOut () {
      dispatch(asynclogout());
    }

  return (
    <header className="py-3 mb-3 bg-dark border-bottom">
      <div className="container-fluid d-flex gap-3 justify-content-between align-items-center">
        <div className="col-4 col-md-2 col-lg-1 p-2 mx-2">
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
                className="btn btn-dark d-flex align-items-center gap-2 mb-1"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={userData.photoURL}
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
                {userData.displayName}
              </button>
              <ul
                className={`dropdown-menu ${styles.profileDropdown}`}
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <Link href="/createTour">
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