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

function Notes() {

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
                            {/* Dashboard actions */}
                            <div className="sm:flex sm:justify-between sm:items-center mb-3">
                                {/* Right: Actions */}
                                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                    <InOutpicker/>
                                    {/* Filter button */}
                                    <Chargespicker />
                                    {/* Filter button */}
                                    <FilterButton />
                                    {/* Datepicker built with flatpickr */}
                                    <Datepicker />
                                    {/* Add view button */}
                                    <DashboardAvatars />
                                </div>

                                {/* Left: Avatars */}
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <a href="/expenses/import-expenses">
                                        <span className="hidden xs:block ml-2">Import</span>
                                    </a>
                                </button>
                            </div>

                            <div className="sm:flex sm:justify-between sm:items-center mb-3 ">
                                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                    <Tagspicker/>
                                    <Textpicker/>
                                </div>
                            </div>

                            <ExpenseTable />
                        </div>
                    </GenericFilterContextProvider>
                </main>

                {/* <Banner /> */}
                {/* {data} */}
            </div>
        </div>
    );
}

export default Notes;