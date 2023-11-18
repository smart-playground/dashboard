import React, {useEffect, useState} from 'react';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import CatalogMiniTable from "./CatalogMiniTable";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {GenericFilterContextProvider} from "../../contexts/TimeFilterContext";
import {element} from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

function Cart(props) {

    const cartData = props.cartData;

    console.log("In cart", cartData)
    const [itemsData, setItemsData] = useState(cartData.items)
    const [usersData, setUsersData] = useState(cartData.users)

    const [itemsAmount, setItemsAmount] = useState(0)

    const [openAddUser, setAddUserClose] = React.useState(false);
    const [userToAdd, setUserToAdd] = React.useState(null);


    const [contentEditMode, setContentEditMode] = useState(false)

    const handleItemAdded = (itemPortion, itemInfo) => {
        console.log(itemPortion, itemInfo);
        const element = {
            id: itemPortion.id,
            amount: itemPortion.amount,
            name: itemInfo.name,
            pictureUrl: itemInfo.pictureUrl,
            comment: itemPortion.comment
        };
        setItemsData(itemsData => [...itemsData, element])
    };

    const handleDeleteElement = (element) => {
        console.log("Deleting element from the cart", element)

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: localStorage.getItem('googleToken'),
            },
            body: JSON.stringify({cartId: cartData.id, ids: [element.id]})
        };

        fetch('/api/shopping/carts/' + cartData.id + '/items', requestOptions)
            .then(async response => {
                const tag = await response.json()
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    return Promise.reject(error);
                }
                console.log(tag);
                const filteredItems = itemsData.filter(v => v.id !== element.id)
                setItemsData(filteredItems)
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    const handleMarkDone = () => {

    }

    const handleMarkUndone = () => {

    }

    function changeItemAmountOrCommentInCart(element, amount, comment) {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: localStorage.getItem('googleToken'),
            },
            body: JSON.stringify({items: [{id: element.id, amount: amount, comment: comment}]})
        };

        fetch('/api/shopping/carts/' + cartData.id + '/items', requestOptions)
            .then(async response => {
                const tag = await response.json()
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    return Promise.reject(error);
                }
                console.log(tag);
                const convertedData = itemsData.map(v => {
                    if (v.id === element.id) {
                        v.amount = amount
                        return v
                    }
                    else {
                        return v
                    }
                })
                setItemsData(convertedData)
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    const handleComment = (element, comment) => {
        console.log("Changing comment", element, comment)
        changeItemAmountOrCommentInCart(element, element.amount, comment)
    }

    const handleIncrease = (element) => {
        console.log("Increase element in cart", element)
        changeItemAmountOrCommentInCart(element, element.amount+1, element.comment)
    }

    const handleDecrease = (element) => {
        if (element.amount === 1) {
            console.log("Minimal value")
        } else {
            console.log("Increase element in cart", element)
            changeItemAmountOrCommentInCart(element, element.amount-1, element.comment)
        }
    }

    function updateCartMetadata() {
        console.log("Going to update with these values", cartData)
        let usersIds = usersData.map(u => u.userIdentifier);
        if (userToAdd !== null) {
            usersIds = [...usersIds, userToAdd]
        }
        console.log("users",  usersIds)

        const requestBody = {
            title: cartData.title,
            description: cartData.description,
            users: usersIds
        }

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: localStorage.getItem('googleToken'),

            },
            body: JSON.stringify(requestBody)
        };

        fetch("/api/shopping/carts/" + cartData.id, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log("catalogItem:", data);
            })
            .catch((err) => {
                console.error(err.message);
                setItemsData([])
            });
    }

    function shareCart() {
        console.log("Sharing the cart")
    }

    const handleAddUserClose = () => {
        setAddUserClose(false);
        setUserToAdd(null)
    };

    const handleAddUserCloseAndSubmit = () => {
        setAddUserClose(false);
        console.log("Adding user", userToAdd)
        const newUser = {userIdentifier: userToAdd}
        updateCartMetadata()
        setUsersData(usersData => [...usersData, newUser])
        setUserToAdd(null)
    };

    function addUserToCart() {
        console.log("Add user to the cart")
        setAddUserClose(true)
    }

    function handleDeleteCart() {
        console.log("Deleting the cart")

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: localStorage.getItem('googleToken'),
            },
            body: JSON.stringify({ids: [cartData.id]})
        };

        fetch('/api/shopping/carts', requestOptions)
            .then(async response => {
                const tag = await response.json()
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    return Promise.reject(error);
                }
                console.log(tag);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    return (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
            <Dialog open={openAddUser} onClose={handleAddUserClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {
                            setUserToAdd(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleAddUserClose}>Cancel</button>
                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleAddUserCloseAndSubmit}>Subscribe</button>
                </DialogActions>
            </Dialog>
            <GenericFilterContextProvider>
                <header className="px-5 py-4 border-b border-slate-100">
                    <h2 className="font-semibold text-slate-800">
                        <dev className="flex">
                            <TextField
                                fullWidth
                                label=""
                                id="fullWidth"
                                variant="standard"
                                size="small"
                                disabled={!contentEditMode}
                                defaultValue={cartData.title}
                                inputProps={{style: {fontSize: 40, fontStyle: 'bold'}}} // font size of input text
                                InputLabelProps={{style: {fontSize: 40, fontStyle: 'bold'}}} // font size of input label
                                onChange={(event) => {
                                    cartData.title = event.target.value;
                                }}
                            />
                            <dev className="flex">
                                {!contentEditMode && <button
                                    // className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"

                                    className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-white hover:bg-slate-500   hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                                    onClick={() => {
                                        setContentEditMode(true);
                                    }}
                                >
                                    {/*<span className="sr-only">mark done</span>*/}
                                    <ModeEditOutlineRoundedIcon/>
                                </button>}
                                {contentEditMode && <button
                                    className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                                    onClick={() => {
                                        setContentEditMode(false);
                                        updateCartMetadata()
                                    }}
                                >
                                    <span className="sr-only">mark done</span>
                                    <SaveRoundedIcon/>
                                </button>}
                                <button
                                    className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                                    onClick={() => {
                                        handleDeleteCart();
                                    }}
                                >
                                    <span className="sr-only">mark done</span>
                                    <DeleteForeverRoundedIcon/>
                                </button>
                            </dev>
                        </dev>
                    </h2>
                    <h4 className="font-semibold text-slate-800">

                        <dev className="flex">
                            <TextField
                                fullWidth
                                label=""
                                size="small"
                                id="fullWidth"
                                variant="standard"
                                style={{border: 'none'}}
                                disabled={!contentEditMode}
                                defaultValue={cartData.description}
                                inputProps={{style: {fontStyle: 'italic'}}} // font size of input text
                                InputLabelProps={{style: {fontStyle: 'italic'}}} // font size of input label
                                onChange={(event) => {
                                    cartData.description = event.target.value;
                                }}
                            />
                        </dev>
                    </h4>
                </header>
                {/* This is the sharing component */}
                <div className="font-semibold text-slate-800">
                    <dev className="flex justify-center items-center">
                        {usersData.map(user => {
                            if (user.pictureUrl === undefined || user.pictureUrl === "") {
                                return <span key={user.userIdentifier}
                                             className="flex justify-center items-center w-8 h-8 rounded-full bg-blue-950 border-blue-950 font-semibold  text-white ml-2 text-sm border shadow-sm group-hover:text-slate-800 "
                                >
                                    {user.userIdentifier.charAt(0).toUpperCase()}
                                    </span>
                            }
                            else {
                                return <img key={user.userIdentifier} className="w-8 h-8 rounded-full" src={user.pictureUrl} width="32" height="32"
                                            alt="User"/>
                            }
                        })}
                        <button
                            className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                            onClick={() => {
                                addUserToCart();
                            }}
                        >
                            <AddIcon/>
                        </button>
                        <button
                            className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                            onClick={() => {
                                shareCart();
                            }}
                        >
                            <ShareIcon/>
                        </button>
                    </dev>

                </div>

                {/* This is the exiting items table */}
                {itemsData.length !== 0 &&
                    <div className="p-3">

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                {/* Table header */}
                                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                                <tr>
                                    <th className="p-2">
                                        <div className="font-semibold text-center">Action</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center"></div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center"></div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center"></div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Amount</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center">Comment</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center"></div>
                                    </th>
                                </tr>
                                </thead>
                                {/* Table body */}
                                <tbody className="text-sm font-medium divide-y divide-slate-100">
                                {itemsData.map(element => {
                                    return (
                                        <tr>
                                            <td className="p-2">
                                                <div className="flex space-x-4 text-center">
                                                    <button
                                                        className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-green-500 border border-green-200 hover:border-white hover:text-white text-green-500 shadow-sm transition duration-150 ml-2"
                                                        key={element["index"]}
                                                        onClick={() => {
                                                            handleMarkDone(element["index"], element);
                                                        }}
                                                    >
                                                        <span className="sr-only">mark done</span>
                                                        <DoneRoundedIcon/>
                                                    </button>
                                                    <button
                                                        className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-red-500 border border-red-200 hover:border-white hover:text-white text-red-500 shadow-sm transition duration-150 ml-2"
                                                        key={element["index"]}
                                                        onClick={() => {
                                                            handleMarkUndone(element["index"], element);
                                                        }}
                                                    >
                                                        <span className="sr-only">mark skip</span>
                                                        <CloseRoundedIcon/>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center text-slate-500">{element.name}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="circle-container">
                                                    {element.pictureUrl !== undefined && element.pictureUrl !== "" &&
                                                        <img
                                                            src={element.pictureUrl}
                                                            alt="Selected"
                                                            className="image-in-circle"
                                                        />}
                                                    {element.pictureUrl === "" && <ImageNotSupportedIcon/>}
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <div className="text-center text-slate-500">{element.amount}</div>
                                            </td>
                                            <td className="p-2">
                                                <div className="flex space-x-4 text-center">
                                                    <button
                                                        className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                                                        key={element["index"]}
                                                        onClick={() => {
                                                            handleIncrease(element);
                                                        }}
                                                    >
                                                        <span className="sr-only">increase</span>
                                                        <AddRoundedIcon/>
                                                    </button>

                                                    <button
                                                        className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                                                        key={element["index"]}
                                                        onClick={() => {
                                                            handleDecrease(element);
                                                        }}
                                                    >
                                                        <span className="sr-only">decrease</span>
                                                        <RemoveRoundedIcon/>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-2 text-center">
                                                {/*<div className="text-center text-slate-500">{element.comment}</div>*/}
                                                <TextField
                                                    // fullWidth
                                                    label=""
                                                    // id="fullWidth"
                                                    variant="standard"
                                                    size="small"
                                                    disabled={!contentEditMode}
                                                    defaultValue={element.comment}
                                                    // inputProps={{style: {fontSize: 40, fontStyle: 'bold'}}} // font size of input text
                                                    // InputLabelProps={{style: {fontSize: 40, fontStyle: 'bold'}}} // font size of input label
                                                    onChange={event => handleComment(element, event.target.value)}
                                                />
                                            </td>
                                            <td className="p-2 text-center">
                                                <button
                                                    className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                                                    key={element["index"]}
                                                    onClick={() => {
                                                        handleDeleteElement(element);
                                                    }}
                                                >
                                                    <span className="sr-only">Delete</span>
                                                    <DeleteForeverRoundedIcon/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                }
                {/*{itemsData.length === 0 &&*/}
                {/*    <div>Empty Cart</div>*/}
                {/*}*/}

                {/* This is the adding items frame table */}
                <footer>
                    {contentEditMode && <CatalogMiniTable cartData={cartData} onItemAdded={handleItemAdded}/>}
                </footer>
            </GenericFilterContextProvider>
        </div>
    );
}


export default Cart;
