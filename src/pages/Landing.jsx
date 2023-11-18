import React, {useState, useEffect, useRef} from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DailyExpenses from '../partials/dashboard/DailyExpenses';
import WeeklyExpenses from '../partials/dashboard/WeeklyExpenses';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import Banner from '../partials/Banner';
import { GoogleLogin } from '@react-oauth/google';


function Landing() {


  console.log("Loading Landing")

  const NO_USER = "https://icon2.cleanpng.com/20180516/vgq/kisspng-computer-icons-google-account-icon-design-login-5afc02da4d77a2.5100382215264652423173.jpg"


  let image = localStorage.getItem('googleImageUrl')
  if (image === null) {
    image = NO_USER
  }

  const [userImageUrl, setUserImageUrl] = useState(image)
  const [userFirstName, setUserFirstName] = useState(localStorage.getItem('googleName'))
  const [userEmail, setUserEmail] = useState(localStorage.getItem('googleEmail'))


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
          }
          else {
            setUserImageUrl(data.picture)
            setUserFirstName(data.givenName)
            setUserEmail(data.email)
            localStorage.setItem('googleEmail', data.email);
            localStorage.setItem('googleName', data.givenName);
            localStorage.setItem('googleImageUrl', data.picture);
            window.location.href = '/shopping/carts';
          }
          console.log(data);
        })
        .catch((err) => {
          console.error("Failed to ping server with token", localStorage.getItem('googleToken'));
          console.error(err.message);
          handleUserDataReset()
        });
  }

  const handleFailedLoginGoogle = (response) => {
    console.error("Failed to login", response)
    handleUserDataReset()
  }

  const handleSuccessLoginGoogle = (response) => {
    // Handle the Google authentication response here.
    console.log("Successful Login", response)

    localStorage.setItem('googleToken', response.credential)

    fetchUserData();
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

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <div className="align-middle sm:justify-center text-center sm:items-center mb-8">
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">Hi There, Welcome to Shopping Cart. 👋</h1>
              <p><br/>Log in to your account<br/></p>
              <br/>
              <GoogleLogin
                  clientId="604595836281-re6t95b2ipci2749o5blhpl2de38mnj2.apps.googleusercontent.com"
                  // buttonText="Login with Google"
                  onSuccess={handleSuccessLoginGoogle}
                  onFailure={handleFailedLoginGoogle}
                  cookiePolicy={'single_host_origin'}
                  // style={{display: 'none'}}
                  // theme={"outline"}
                  shape={"circle"}
                  type={"icon"}
                  useOneTap={true}
              />

              <p><br/>Or with email and password</p>

            </div>
          </div>
        </main>


      </div>
    </div>
  );
}

export default Landing;