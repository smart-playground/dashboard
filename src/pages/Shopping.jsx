import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ExpenseTable from '../partials/expenses/ExpenseTable';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import Tagspicker from '../partials/actions/Tagspicker';
import Chargespicker from '../partials/actions/Chargespicker'
import InOutpicker from '../partials/actions/InOutpicker'
import {GenericFilterContextProvider} from '../contexts/TimeFilterContext';
import Textpicker from "../partials/actions/Textpicker";

function Shopping() {

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
                    <GenericFilterContextProvider>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        </div>
                    </GenericFilterContextProvider>
                </main>

                {/* <Banner /> */}
                {/* {data} */}
            </div>
        </div>
    );
}

export default Shopping;