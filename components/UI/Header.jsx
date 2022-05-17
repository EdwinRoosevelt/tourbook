import React, { useState } from 'react'
import Image from 'next/image'

import tourbook from '../../public/tourbook_white.svg'
import { PlaylistAdd, Power, Settings, UserCircle } from 'tabler-icons-react';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="py-3 mb-3 bg-dark border-bottom">
      <div className="container-fluid d-flex gap-3 justify-content-between align-items-center">
        <div className="col-4 col-md-2 col-lg-1 p-2 mx-2">
          <Image src={tourbook} alt="tourbook logo" />
        </div>
        <div class="dropdown">
          <button
            class="btn btn-dark dropdown-toggle d-flex align-items-center gap-2"
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
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item flex gap-2 mb-2" href="#">
                <PlaylistAdd color="#198754" />
                <p style={{ width: "200px" }}>New project</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item flex gap-2 mb-2" href="#">
                <Settings />
                <p style={{ width: "200px" }}>Settings</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item flex gap-2 mb-2" href="#">
                <UserCircle />
                <p style={{ width: "200px" }}>Profile</p>
              </a>
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
      </div>
    </header>
  );
}

export default Header