import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/Transition';

import UserAvatar from '../../images/user-avatar-32.png';
import {GoogleLogin} from "@react-oauth/google";
// import {GoogleLogin} from "react-google-login";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

function UserMenu() {

  const NO_USER = "https://icon2.cleanpng.com/20180516/vgq/kisspng-computer-icons-google-account-icon-design-login-5afc02da4d77a2.5100382215264652423173.jpg"

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const [userImageUrl, setUserImageUrl] = useState(NO_USER)
  const [userFirstName, setUserFirstName] = useState("")
  const [userEmail, setUserEmail] = useState("")

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

  const responseGoogle = (response) => {
    // Handle the Google authentication response here.
    console.log("Win", response)

    fetch('/api/hello', {
          headers : {
            'Content-Type': 'application/json',
            Authorization: response.credential,
          }
        })
      .then((response) => response.json())
      .then((data) => {
        console.log("Great Win!");
        setUserImageUrl(data.picture)
        setUserFirstName(data.givenName)
        setUserEmail(data.email)
        console.log(data);
      })
      .catch((err) => {
        console.error("Great Fail");
        console.error(err.message);
      });
  }


  function handleLogOut() {
    setUserImageUrl(NO_USER)
    setUserEmail("")
    setUserFirstName("")
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => {
          handleLogOut()
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
              <div className="font-medium text-slate-800">Acme Inc.</div>
              <div className="text-xs text-slate-500 italic">Administrator</div>
            </div>
            <GoogleLogin
                clientId="604595836281-re6t95b2ipci2749o5blhpl2de38mnj2.apps.googleusercontent.com"
                // buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                // style={{display: 'none'}}
                theme={"outline"}
                shape={"circle"}
                type={"icon"}
                // useOneTap={true}
            />
          </div>
          <ul>
            {userEmail && <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>}
            {userEmail && <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
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