import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import CatalogTable from '../partials/shopping/CatalogTable';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import Tagspicker from '../partials/actions/Tagspicker';
import Chargespicker from '../partials/actions/Chargespicker'
import InOutpicker from '../partials/actions/InOutpicker'
import {GenericFilterContextProvider} from '../contexts/TimeFilterContext';
import Textpicker from "../partials/actions/Textpicker";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

function ShoppingCatalog() {

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [openEntryEditDialog, setOpenEntryEditDialog] = useState(false)
    const [elementEditing, setElementEditing] = useState({})

    function handleOpenEntryEditDialog() {
        setOpenEntryEditDialog(false)
        setElementEditing({})
    }

    function promptError(message) {
        setSnackBarMessage(message)
        setOpenSnackBar(true)
    }

    function handleEntryUpdate() {
        console.log("Going to add element to", elementEditing)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(elementEditing)
        };

        fetch('/shopping/catalog', requestOptions)
            .then((response) => response.json())
            .then((tdata) => {
                console.log(tdata);
                // balancesData.map(value => {
                //     value.name = elementEditing.name
                //     value.pictureUrl = elementEditing.pictureUrl
                //     value.description = elementEditing.description
                //     value.tags = elementEditing.tags
                //     return value
                // })
                setElementEditing({})
                setOpenEntryEditDialog(false)
            })
            .catch((err) => {
                console.error(err.message);
                promptError(err.message)
            });

    }

    return (
        <div className="flex h-screen overflow-hidden">

            <Dialog open={openEntryEditDialog} onClose={handleOpenEntryEditDialog}>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>

                        <TextField id="name" label="Name" variant="standard"  onChange={value => elementEditing.name = value.target.value}/>
                        <TextField label="pictureUrl" variant="standard" onChange={value => elementEditing.pictureUrl = parseFloat(value.target.value)}/>
                        <TextField id="description" label="Description" variant="standard" onChange={value => elementEditing.description = value.target.value}/>
                        <Autocomplete
                            multiple
                            limitTags={10}
                            options={[]}//{availableTags.map(e => e.name)}
                            getOptionLabel={(option) => {if (option !== undefined && option.name !== undefined) {return option.name} else {return option}} }
                            // freeSolo={true}
                            value={(elementEditing.tags === undefined) ? [] : elementEditing.tags}
                            renderInput={(params) => (
                                <TextField variant="standard" size='small' {...params} placeholder="..." />
                            )}
                            onChange={(event, value, reason) => elementEditing.tags = value}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpenEntryEditDialog}>Cancel</Button>
                    <Button onClick={handleEntryUpdate}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <GenericFilterContextProvider>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                            <div className="sm:flex sm:justify-between sm:items-center mb-3 ">
                                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                    <Tagspicker/>
                                    <Textpicker/>
                                </div>
                            </div>

                            <div className="sm:flex sm:justify-between sm:items-center mb-3">
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                        onClick={() => setOpenEntryEditDialog(true)}>
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <div className="hidden xs:block ml-2">
                                        Add
                                    </div>
                                </button>
                            </div>

                            <CatalogTable />
                        </div>
                    </GenericFilterContextProvider>
                </main>

                {/* <Banner /> */}
                {/* {data} */}
            </div>
        </div>
    );
}

export default ShoppingCatalog;