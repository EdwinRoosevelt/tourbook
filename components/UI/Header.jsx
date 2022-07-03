import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../authentication/Auth"

import { BellRinging, InfoCircle, List, PlaylistAdd, Power, Settings, UserCircle } from 'tabler-icons-react';
import { Avatar, Drawer, LoadingOverlay } from "@mantine/core";
import tourbook from "../../public/icons/tourbook-2.png";

import LoginModal from './LoginModal';
import Notifications from './Notifications';


function Header() {
  const router = useRouter();
  const { tourbookUser, logout } = useAuth();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [profileDrawer, setProfileDrawer] = useState(false);
  const [notificationDrawer, setNotificationDrawer] = useState(false);

  // useEffect(() => {
  //   if (isLoggedIn) setIsLoading(false);
  // }, [currentUser]);

  useEffect(() => {
    setNotificationDrawer(false);
    setProfileDrawer(false);
  }, [router])


  // useEffect(() => () => {
  //   router.reload();
  // }, [isLoggedIn]);


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
            {tourbookUser && (
              <>
                <button
                  className="btn btn-dark p-2"
                  type="button"
                  onClick={() => {
                    setNotificationDrawer(true);
                  }}
                  style={{ borderRadius: "200px" }}
                >
                  <BellRinging />
                </button>
                <Drawer
                  opened={notificationDrawer}
                  onClose={() => setNotificationDrawer(false)}
                  title="Notifications"
                  padding="xl"
                  size="xl"
                >
                  <Notifications tourbookUser={tourbookUser} />
                </Drawer>

                <button
                  // style={{minWidth: "12rem"}}
                  className="btn btn-dark d-flex align-items-center gap-2 text-start p-2"
                  type="button"
                  style={{ borderRadius: "200px" }}
                  onClick={() => {
                    setProfileDrawer(true);
                  }}
                >
                  <Avatar
                    src={tourbookUser.photoURL}
                    alt="user logo"
                    radius="xl"
                  />
                  {/* {userData.displayName.split(" ")[0]} */}
                </button>

                <Drawer
                  opened={profileDrawer}
                  onClose={() => setProfileDrawer(false)}
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
                  <div
                    className="card mb-3 p-3 shadow"
                    // style={{ maxWidth: "540px" }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4 col-3 flex justify-content-center align-items-center">
                        <Avatar
                          src={tourbookUser.photoURL}
                          size="xl"
                          alt="user logo"
                          style={{ borderRadius: "100px" }}
                        />
                      </div>
                      <div className="col-md-8 col-9">
                        <div className="card-body">
                          <h5 className="card-title fs-3">
                            {tourbookUser.displayName}
                          </h5>
                          {/* <p>{currentUser.userName}</p> */}
                          <p>{tourbookUser.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="fs-6 py-3">
                    <li>
                      <Link href="/tour/create">
                        <a className="dropdown-item flex align-items-center gap-4 mb-2 p-2">
                          <PlaylistAdd size="30" color="#198754" />
                          <p>New Tour</p>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/profile/${encodeURIComponent(
                          tourbookUser.userName
                        )}`}
                      >
                        <a className="dropdown-item flex align-items-center gap-4 mb-2 p-2">
                          <UserCircle size="30" />
                          <p>Profile</p>
                        </a>
                      </Link>
                    </li>
                    <li>
                      {/* <Link href="/myTours"> */}
                      <a className="dropdown-item flex align-items-center gap-4 mb-2 p-2 disabled">
                        <List size="30" color="#0dcaf0" />
                        <p>My Tours</p>
                      </a>
                      {/* </Link> */}
                    </li>

                    <li>
                      {/* <Link href="/settings"> */}
                      <a className="dropdown-item flex align-items-center gap-4 mb-2 p-2 disabled">
                        <Settings size="30" color="#fd7e14" />
                        <p>Settings</p>
                      </a>
                      {/* </Link> */}
                    </li>

                    <hr className="dropdown-divider" />
                    <li>
                      <Link href={`/about`}>
                        <a className="dropdown-item flex align-items-center gap-4 mb-2 p-2">
                          <InfoCircle size="30" />
                          <p>About</p>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item flex align-items-center gap-4 mb-2 p-2"
                        onClick={logout}
                      >
                        <Power size="30" color="#dc3545" />
                        <p>Logout</p>
                      </button>
                    </li>
                  </ul>
                </Drawer>
              </>
            )}
            {!tourbookUser && (
              <button
                type="button"
                className="btn btn-light text-light flex gap-2 px-4"
                onClick={() => {
                  setIsLoginModalOpen(true);
                }}
              >
                <i className="bi bi-box-arrow-in-right"></i>Login
              </button>
            )}
          </div>
        </div>
      </header>
      <LoginModal
        loginModalState={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
    </>
  );
}



export default Header