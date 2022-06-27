import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Image from "next/image";
import Link from "next/link";

import { BellRinging, List, PlaylistAdd, Power, Settings, UserCircle } from 'tabler-icons-react';
import { Avatar, Drawer } from "@mantine/core";

import tourbook from "../../public/icons/tourbook-2.png";
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
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [drawer, setDrawer] = useState(false)

    useEffect(() => {
      if (isNewUser) router.push("/profile/create");
    }, [isNewUser, router]);

    useEffect(() => () => {
      router.reload();
    }, [isLoggedIn]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/user/${currentUser}`);
        const responseData = await response.json();
        // setUserData(response.Item)
        if (response.success) setNotifications(responseData.Item.notifications);
        // console.log(responseData.Item);
      };
      fetchData();
    }, [currentUser]);

    


    function signOut () {
      dispatch(asynclogout());
    }

  return (
    <>
      <header className="py-sm-3 bg-dark border-bottom">
        <div className="container-fluid d-flex wrap gap-4 p-2 justify-content-between align-items-center">
          <div className="col-3 col-md-2 col-lg-1 ml-4">
            <Link href="/tours">
              <a>
                <Image src={tourbook} alt="tourbook logo" />
              </a>
            </Link>
          </div>

          <div className="d-flex mx-sm-4 gap-3 justify-content-between align-items-center">
            {isLoggedIn && (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-dark p-2"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ borderRadius: "200px" }}
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
                    className="btn btn-dark d-flex align-items-center gap-2 text-start p-2"
                    type="button"
                    style={{ borderRadius: "200px" }}
                    onClick={() => {
                      setDrawer(true);
                    }}
                  >
                    <Avatar
                      src={userData.photoURL}
                      alt="user logo"
                      radius="xl"
                    />
                    {/* {userData.displayName.split(" ")[0]} */}
                  </button>
                </div>
              </>
            )}
            {!isLoggedIn && (
              <button
                type="button"
                className="btn btn-outline-light flex gap-2"
                onClick={() => {
                  setIsLoginModalOpen(true);
                }}
              >
                <i className="bi bi-box-arrow-in-right"></i>login
              </button>
            )}
          </div>
        </div>
      </header>
      <LoginModal
        loginModalState={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <Drawer
        opened={drawer}
        onClose={() => setDrawer(false)}
        title={
          <div className="col-3">
            <Link href="/tours">
              <a>
                <Image src={tourbook} alt="tourbook logo" />
              </a>
            </Link>
          </div>
        }
        padding="xl"
        size="xl"
      >
        <div className="card mb-3 p-3 shadow" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4 col-3 flex justify-content-center align-items-center">
              <Avatar
                src={userData.photoURL}
                size="xl"
                alt="user logo"
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div className="col-md-8 col-9">
              <div className="card-body">
                <h5 className="card-title fs-3">{userData.displayName}</h5>
                <p>{userData.userName}</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="fs-5 py-3 ">
          <li>
            <Link href="/tour/create">
              <a className="dropdown-item flex gap-4 mb-2">
                <PlaylistAdd size="30" color="#198754" />
                <p className="fs-5">New Tour</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/profile/${encodeURIComponent(currentUser)}`}>
              <a className="dropdown-item flex gap-4 mb-2">
                <UserCircle size="30" />
                <p>Profile</p>
              </a>
            </Link>
          </li>
          <li>
            {/* <Link href="/myTours"> */}
            <a className="dropdown-item flex gap-4 mb-2 disabled">
              <List size="30" color="#0dcaf0" />
              <p>My Tours</p>
            </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/settings"> */}
            <a className="dropdown-item flex gap-4 mb-2 disabled">
              <Settings size="30" color="#fd7e14" />
              <p>Settings</p>
            </a>
            {/* </Link> */}
          </li>

          <hr className="dropdown-divider" />
          <li>
            <button className="dropdown-item flex gap-4" onClick={signOut}>
              <Power size="30" color="#dc3545" />
              <p>Logout</p>
            </button>
          </li>
        </ul>
      </Drawer>
    </>
  );
}



export default Header