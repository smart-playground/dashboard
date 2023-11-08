import React, {useContext, useEffect, useState} from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import CatalogTable from '../partials/shopping/CatalogTable';
import Tagspicker from '../partials/actions/Tagspicker';
import {GenericFilterContext, GenericFilterContextProvider} from '../contexts/TimeFilterContext';
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
import Cart from "../partials/shopping/Cart";

function ShoppingCarts() {

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [openEntryEditDialog, setOpenEntryEditDialog] = useState(false)
    const [elementEditing, setElementEditing] = useState({})

    const [selectedImage, setSelectedImage] = useState(null);

    const [carts, setCarts] = useState([])
    const [cartsAmount, setCartsAmount] = useState(0)

    const genericFilterContext = useContext(GenericFilterContext);
    const {tags, text } = genericFilterContext;

    const [page, setPage] = React.useState(1);

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

    function handleAddCart() {
        console.log("Going to add cart to")

        fetch('/api/shopping/carts', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
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
    }

    useEffect(() => {
        var url
        var countUrl

        var filters = ""
        if (tags !== "") filters = filters + ',tags:in:' + tags.join(":")
        if (text !== "") filters = filters + ',name:in:' + text
        console.log("Filter = ", filters)

        const paginationParams = 'skip=' + ((page-1) * 20) + '&limit=20';

        if (filters !== "") {
            url = 'http://localhost:8080' + '/api/shopping/carts?filters=' + filters.substring(1) + '&' + paginationParams
            countUrl = 'http://localhost:8080' + '/api/shopping/carts/count?filters=' + filters.substring(1)
        } else {
            url = 'http://localhost:8080' + '/api/shopping/carts' + '?' + paginationParams
            countUrl = 'http://localhost:8080' + '/api/shopping/carts/count'
        }

        fetch(countUrl, {
            // mode: 'no-cors',
            Headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'},
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Count Carts:", data);
                if (data["count"] !== undefined && data["count"] != null) {
                    var count = data["count"]
                    setCartsAmount(count);
                }
                else {
                    setCartsAmount(0);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setCartsAmount(0)
            });

        fetch(url, {
            // mode: 'no-cors',
            Headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("talma Carts", data);
                if (data["carts"] !== undefined && data["carts"] != null) {
                    var manipulatedData = data["carts"].map(e => {e["selected"] = false;return e})
                    setCarts(manipulatedData);
                }
                else {
                    setCarts([]);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setCarts([])
            });
    // }, [start, end, minCharge, maxCharge, InOut, tags, text, page]);
    }, [null, null, null, null, null, null, null, null]);


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

                            <div className="sm:flex sm:justify-between sm:items-center mb-3 ">
                                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                    {/*<Tagspicker/>*/}
                                    <Textpicker/>
                                </div>
                            </div>

                            <div className=" sm:justify-between sm:items-center mb-3">
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                        onClick={(e) => {handleAddCart();}}>
                                    <AddCircleOutlineRoundedIcon/>
                                </button>
                            </div>
                            <Stack gap={2}>
                            {carts.map(cart => {
                                return (
                                    <Cart cartData={cart}/>
                                )
                            })}
                            {carts.length === 0 && <div>No carts available</div>}
                            </Stack>
                        </div>
                    </GenericFilterContextProvider>
                </main>

                {/* <Banner /> */}
                {/* {data} */}
            </div>
        </div>
    );
}

export default ShoppingCarts;