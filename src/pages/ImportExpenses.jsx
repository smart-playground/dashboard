import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/expenses/ExpensesBanner';
import ExpenseImport from '../partials/expenses/ExpenseImport';

import Banner from '../partials/Banner';

const mockValues = [
  {
      "business-name": "בנהפ BIT העברה ב",
      "charge": 830,
      "description": "",
      "deal-date": "2022-11-19T20:51:40.128Z"
  },
  {
      "business-name": "דן אכדיה-צמרת",
      "charge": 26,
      "description": "",
      "deal-date": "2022-11-19T20:51:40.264Z"
  },
  {
      "business-name": "HOPON-DAN",
      "charge": 100,
      "description": "",
      "deal-date": "2022-11-19T20:51:40.39Z"
  },
  {
      "business-name": "44",
      "charge": 173,
      "description": "",
      "deal-date": "2022-11-19T20:51:40.521Z"
  },
  {
      "business-name": "מקס סטוק אור עקיבא",
      "charge": 123.4,
      "description": "",
      "deal-date": "2022-11-19T20:51:40.648Z"
  },
  {
      "business-name": "רהיטי מוניטין בעמ",
      "charge": 3800,
      "description": "",
      "deal-date": "2022-11-19T20:51:40.776Z"
  },
  {
      "business-name": "מאפה נאמן",
      "charge": 19.9,
      "description": "",
      "deal-date": "2022-11-19T20:51:40.91Z"
  },
  {
      "business-name": "בנהפ BIT העברה ב",
      "charge": 600,
      "description": "",
      "deal-date": "2022-11-19T20:51:41.036Z"
  },
  {
      "business-name": "טוטם טיפוס בעמ",
      "charge": 29,
      "description": "",
      "deal-date": "2022-11-19T20:51:41.171Z"
  },
  {
      "business-name": "בנהפ BIT העברה ב",
      "charge": 150,
      "description": "",
      "deal-date": "2022-11-19T20:51:41.297Z"
  },
  {
      "business-name": "רשות הטבע והגנים עין",
      "charge": 39,
      "description": "",
      "deal-date": "2022-11-19T20:51:41.426Z"
  },
  {
      "business-name": "ראמה -הגליל חב' הדלק",
      "charge": 320.03,
      "description": "",
      "deal-date": "2022-11-19T20:51:41.555Z"
  },
  {
      "business-name": "דבאח ביג מרקט מעלות",
      "charge": 27.57,
      "description": "",
      "deal-date": "2022-11-19T20:51:41.686Z"
  },
  {
      "business-name": "שופרסל שלי בנימינה",
      "charge": 310.09,
      "description": "",
      "deal-date": "2022-11-19T20:51:41.814Z"
  },
  {
      "business-name": "בנהפ BIT העברה ב",
      "charge": 120,
      "description": "",
      "deal-date": "2022-11-19T20:51:41.942Z"
  },
  {
      "business-name": "14369001 #PAYPAL *G",
      "charge": 120,
      "description": "",
      "deal-date": "2022-11-19T20:51:42.091Z"
  },
  {
      "business-name": "בנהפ BIT העברה ב",
      "charge": 280,
      "description": "",
      "deal-date": "2022-11-19T20:51:42.218Z"
  },
  {
      "business-name": "בנהפ BIT העברה ב",
      "charge": 500.5,
      "description": "",
      "deal-date": "2022-11-19T20:51:42.349Z"
  },
  {
      "business-name": "מועצה מקומית בנימינה",
      "charge": 25,
      "description": "",
      "deal-date": "2022-11-19T20:51:42.476Z"
  },
  {
      "business-name": "NTAIN VIEW#GOOGLE ST",
      "charge": 8,
      "description": "",
      "deal-date": "2022-11-19T20:51:42.606Z"
  },
  {
      "business-name": "NTAIN VIEW#GOOGLE YO",
      "charge": 23.9,
      "description": "",
      "deal-date": "2022-11-19T20:51:42.734Z"
  },
  {
      "business-name": "PAYBOX",
      "charge": 400,
      "description": "",
      "deal-date": "2022-11-19T20:51:42.865Z"
  },
  {
      "business-name": "קרן מכבי- חיוב",
      "charge": 94.86,
      "description": "",
      "deal-date": "2022-11-19T20:51:42.998Z"
  },
  {
      "business-name": "דואלי חניונים",
      "charge": 35,
      "description": "",
      "deal-date": "2022-11-19T20:51:43.13Z"
  },
  {
      "business-name": "סופר אלונית",
      "charge": 368.16,
      "description": "",
      "deal-date": "2022-11-19T20:51:43.261Z"
  },
  {
      "business-name": "אקספרס-גמא KSP",
      "charge": 110,
      "description": "",
      "deal-date": "2022-11-19T20:51:43.386Z"
  },
  {
      "business-name": "בנהפ BIT העברה ב",
      "charge": 2280,
      "description": "",
      "deal-date": "2022-11-19T20:51:43.513Z"
  },
  {
      "business-name": "",
      "charge": 11,
      "description": "ss",
      "deal-date": "2022-11-29T00:35:32.42Z"
  }
]

function ImportExpeneses() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/expenses',
        {headers: {'Content-Type': 'application/json'}})
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setData(mockValues);
       })
       .catch((err) => {
          console.log(err.message);
          setData(mockValues)
       });
 }, []);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />
            <ExpenseImport data={[]} />
          </div>
        </main>

        {/* <Banner /> */}
        {/* {data} */}
      </div>
    </div>
  );
}

export default ImportExpeneses;