import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import tourbook from '../../public/tourbook_white.svg'
import { List, PlaylistAdd, Power, Settings, UserCircle } from 'tabler-icons-react';
import LoginModal from './LoginModal';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        {!isLoggedIn && (
          <>
            <button
              className="btn btn-outline-warning px-4"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Log In - ! {process.env.AWS_REGION}
            </button>
            <LoginModal />
          </>
        )}
        {isLoggedIn && (
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle d-flex align-items-center gap-2 mb-1"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
              Edwin Roosevelt
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link href="/createTour">
                  <a className="dropdown-item flex gap-2 mb-2">
                    <PlaylistAdd color="#198754" />
                    <p style={{ width: "200px" }}>New Tour</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/myTours">
                  <a className="dropdown-item flex gap-2 mb-2">
                    <List color="#0dcaf0" />
                    <p style={{ width: "200px" }}>My Tours</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <a className="dropdown-item flex gap-2 mb-2">
                    <Settings color="#fd7e14" />
                    <p style={{ width: "200px" }}>Settings</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <a className="dropdown-item flex gap-2 mb-2">
                    <UserCircle />
                    <p style={{ width: "200px" }}>Profile</p>
                  </a>
                </Link>
              </li>
              <hr className="dropdown-divider" />

              <li>
                <a className="dropdown-item flex gap-2" href="#">
                  <Power color="#dc3545" />
                  <p style={{ width: "200px" }}>Logout</p>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header