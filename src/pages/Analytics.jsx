import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import Datepicker from '../partials/actions/Datepicker';
import Tagspicker from '../partials/actions/Tagspicker';
import InOut from '../partials/analytics/InOut';
import GeneralExpenseHistogram from '../partials/analytics/GeneralExpenseHistogram';
import GeneralExpensePie from '../partials/analytics/GeneralExpensesPie';
import {GenericFilterContextProvider} from '../contexts/TimeFilterContext';
import TopExpenses from "../partials/analytics/TopExpenses";

function Analytics() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <GenericFilterContextProvider>


              {/* Dashboard actions */}
              <div className="sm:flex sm:justify-between sm:items-center mb-3">
                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  {/* Datepicker built with flatpickr */}
                  <Datepicker />
                  <Tagspicker/>
                </div>

                {/* Left: Avatars */}
                <DashboardAvatars />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-12 gap-6">

                {/* Line chart (Acme Professional) */}
                <InOut />
                {/* Bar chart (Direct vs Indirect) */}
                <GeneralExpenseHistogram />
                {/* Doughnut chart (Top Countries) */}
                <GeneralExpensePie />
                {/* Table (Top Channels) */}
                <TopExpenses />
              </div>

            </GenericFilterContextProvider>

          </div>
        </main>

        {/* <Banner /> */}

      </div>
    </div>
  );
}

export default Analytics;