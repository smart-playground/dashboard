import React, {useState} from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import CatalogTable from '../partials/shopping/CatalogTable';
import Tagspicker from '../partials/actions/Tagspicker';
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
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

function ShoppingCatalog() {

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [openEntryEditDialog, setOpenEntryEditDialog] = useState(false)
    const [elementEditing, setElementEditing] = useState({})

    const [selectedImage, setSelectedImage] = useState(null);


    function handleOpenEntryEditDialog() {
        setOpenEntryEditDialog(false)
        setElementEditing({})
    }

    function promptError(message) {
        setSnackBarMessage(message)
        setOpenSnackBar(true)
    }

    const handleImageChange = (e) => {
        console.log("Image loaded")
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleQuickImageUpload = (e) => {
        console.log("Image quick loaded")
        const file = e.target.files[0];
        setSelectedImage(file);
        setOpenEntryEditDialog(true);
    }

    const handleImageIgnore = (e) => {
        console.log("Ignore Image")
        setSelectedImage(null);
    };

    function handleEntryUpdate() {
        console.log("Going to add element to", elementEditing)

        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                elementEditing.image = e.target.result

                fetch('/api/shopping/catalog', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':'*',
                        Authorization: localStorage.getItem('googleToken'),
                    },
                    body: JSON.stringify(elementEditing),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        // Handle the response from the backend here
                    })
                    .catch((error) => {
                        console.error(error);
                        // Handle errors here
                    });
            };

            reader.readAsDataURL(selectedImage);
        } else {

        }

    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Dialog open={openEntryEditDialog} onClose={handleOpenEntryEditDialog}>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>

                        <TextField id="name" label="Name" variant="standard"  onChange={value => elementEditing.name = value.target.value}/>
                        <TextField id="description" label="Description" variant="standard" onChange={value => elementEditing.description = value.target.value}/>
                        <div>
                            {!selectedImage &&
                                <button className="btn hover:bg-indigo-600 " onClick={() => document.getElementById('image-upload').click()}>
                                    <CloudUploadRoundedIcon className="w-4 h-4 fill-current opacity-50 shrink-0"/>
                                </button>
                            }
                            <input
                                type="file"
                                accept="image/*"
                                id="image-upload"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <div className="image-container" >
                            {selectedImage && (
                                <div>
                                    <button className="image-close-button"  onClick={(e) => {handleImageIgnore(e);}}>
                                        X
                                    </button>
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected"
                                        width="200"
                                    />
                                </div>
                            )}
                            </div>
                        </div>
                        <div>
                            {!selectedImage && <TextField label="Paste a picture link here.." variant="standard" onChange={value => elementEditing.pictureUrl = parseFloat(value.target.value)}/>}
                        </div>
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
                                    {/*<Tagspicker/>*/}
                                    <Textpicker/>
                                </div>
                            </div>

                            <div className=" sm:justify-between sm:items-center mb-3">
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                        onClick={() => setOpenEntryEditDialog(true)}>
                                    <AddCircleOutlineRoundedIcon/>
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="image-quick-upload"
                                    style={{ display: 'none' }}
                                    onChange={handleQuickImageUpload}
                                />
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                        onClick={() => document.getElementById('image-quick-upload').click()}>
                                    <AddAPhotoRoundedIcon/>
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