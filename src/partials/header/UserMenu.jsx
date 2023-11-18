import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/Transition';

import UserAvatar from '../../images/user-avatar-32.png';
import {GoogleLogin} from "@react-oauth/google";
// import {GoogleLogin} from "react-google-login";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

function UserMenu() {

  console.log("Loading User Menu and data")

  const NO_USER = "https://icon2.cleanpng.com/20180516/vgq/kisspng-computer-icons-google-account-icon-design-login-5afc02da4d77a2.5100382215264652423173.jpg"

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  let image = localStorage.getItem('googleImageUrl')
  if (image === null) {
    image = NO_USER
  }

  // console.log("TOKEN", localStorage.getItem('googleToken'))

  const [userImageUrl, setUserImageUrl] = useState(image)
  const [userFirstName, setUserFirstName] = useState(localStorage.getItem('googleName'))
  const [userEmail, setUserEmail] = useState(localStorage.getItem('googleEmail'))

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  function fetchUserData() {
    fetch('/api/hello', {
      headers : {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        Authorization: localStorage.getItem('googleToken'),
      }
    })
        .then((response) => response.json())
        .then((data) => {
          console.log("Great Win!");
          if (data.email === null) {
            console.warn("Token is not valid: ",localStorage.getItem('googleToken'))
            handleUserDataReset()
            window.location.href = '/';
          }
          else {
            setUserImageUrl(data.picture)
            setUserFirstName(data.name)
            setUserEmail(data.email)
            localStorage.setItem('googleEmail', data.email);
            localStorage.setItem('googleName', data.name);
            localStorage.setItem('googleImageUrl', data.picture);
          }
          console.log(data);
        })
        .catch((err) => {
          console.error("Failed to ping server with token", localStorage.getItem('googleToken'));
          console.error(err.message);
          handleUserDataReset()
          window.location.href = '/';
        });
  }

  function handleUserDataReset() {
    localStorage.setItem('googleEmail', "");
    localStorage.setItem('googleName', "");
    localStorage.setItem('googleImageUrl', NO_USER);
    localStorage.setItem('googleToken', "")
    setUserImageUrl(NO_USER)
    setUserEmail("")
    setUserFirstName("")
  }

  if (localStorage.getItem('googleToken') !== null && localStorage.getItem('googleToken') !== "") {
    console.log("Token exist, validating token")
    fetchUserData()
  }
  else {
    console.log("Token wasn't found, skipping auto-login")
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => {
          setDropdownOpen(!dropdownOpen)
        }}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full" src={userImageUrl} width="32" height="32" alt="User"  />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">{userFirstName}</span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 flex justify-between">
            <div >
              <div className="font-medium text-slate-800">{userFirstName}</div>
              <div className="text-xs text-slate-500 italic">User</div>
            </div>
          </div>
          <ul>
            {/*{userEmail && <li>*/}
            {/*  <Link*/}
            {/*    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"*/}
            {/*    to="/"*/}
            {/*    onClick={() => setDropdownOpen(!dropdownOpen)}*/}
            {/*  >*/}
            {/*    Settings*/}
            {/*  </Link>*/}
            {/*</li>}*/}
            {userEmail && <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => {
                  handleUserDataReset()
                  setDropdownOpen(!dropdownOpen)
                }}
              >
                Sign Out
              </Link>
            </li>}
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default UserMenu;