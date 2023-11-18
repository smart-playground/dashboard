// import { TagsInput } from "react-tag-input-component";
import React, {useContext, useEffect, useState} from 'react';
import {GenericFilterContext, GenericFilterContextProvider} from "../../contexts/TimeFilterContext";
import Stack from '@mui/material/Stack';
import {Snackbar} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import Textpicker from "../actions/Textpicker";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

function CatalogMiniTable({cartData, onItemAdded}) {

    console.log("In CatalogMiniTable", cartData, onItemAdded)
    const cartId = cartData.id;
    const {setItemsAdded} = onItemAdded;

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")

    const [itemsData, setItemsData] = useState([]);
    const [balancesDataCount, setBalancesDataCount] = useState(0);

    const genericFilterContext = useContext(GenericFilterContext);
    const {tags, text  } = genericFilterContext;
    const [refreshTable, setRefreshTable] = useState(true)

    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    function addElementsToCart(element) {
        console.log("Going to add element to cart", element.id)

        const itemToAdd = {id: element.id, amount: 1, comment: ""}
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' ,
                'Access-Control-Allow-Origin':'*',
                Authorization: localStorage.getItem('googleToken'),
            },
            body: JSON.stringify({ items: [itemToAdd] })
        };
        console.log("Sending", requestOptions)

        fetch('/api/shopping/carts/'+ cartId + '/items', requestOptions)
            .then(async response => {
                const tag = await response.json()
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    return Promise.reject(error);
                }
                console.log(tag);
                setRefreshTable(!refreshTable)

                onItemAdded(itemToAdd, element)
            })
            .catch((err) => {
                console.error(err.message);
            });
    }


    const handleAddToCart = (index, element) => {
        console.log("adding element to cart", index, element.name)
        addElementsToCart(element)
    }

    function promptError(message) {
        setSnackBarMessage(message)
        setOpenSnackBar(true)
    }


    useEffect(() => {
        var url
        var countUrl

        var filters = ""
        console.log(tags)
        if (tags.length !== 0) filters = filters + ',tags:in:' + tags.join(":")
        if (text !== "") filters = filters + ',name:in:' + text
        console.log("Filter = ", filters)

        const paginationParams = 'skip=' + ((page-1) * 20) + '&limit=20';

        // const host = 'http://localhost:8088'
        const host = ''
        if (filters !== "") {
            url = host + '/api/shopping/catalog?filters=' + filters.substring(1) + '&' + paginationParams
            countUrl = host + '/api/shopping/catalog/count?filters=' + filters.substring(1)
        } else {
            url = host + '/api/shopping/catalog' + '?' + paginationParams
            countUrl = host + '/api/shopping/catalog/count'
        }

        fetch(countUrl, {
                // mode: 'no-cors',
                headers: {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    Authorization: localStorage.getItem('googleToken'),
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Count Balances:", data);
                if (data["count"] !== undefined && data["count"] != null) {
                    var count = data["count"]
                    setBalancesDataCount(count);
                }
                else {
                    setBalancesDataCount(0);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setBalancesDataCount(0)
            });

        fetch(url, {
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    Authorization: localStorage.getItem('googleToken'),

                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("talma catalogItem:", data);
                if (data["catalogItem"] !== undefined && data["catalogItem"] != null) {
                    var manipulatedData = data["catalogItem"].map(e => {e["selected"] = false;return e})
                    setItemsData(manipulatedData);
                }
                else {
                    setItemsData([]);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setItemsData([])
            });
    }, [tags, text, page, refreshTable]);

    function handleNoneExistingItemToCart(text) {
        var element = {
            name: text,
            pictureUrl: "",
            description: ""
        }
        fetch('/api/shopping/catalog', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                Authorization: localStorage.getItem('googleToken'),
            },
            body: JSON.stringify(element),
        })
            .then((response) => response.json())
            .then((data) => {
                element.id = data.id
                console.log("New items was added", data);
                addElementsToCart(element)
                // Handle the response from the backend here
            })
            .catch((error) => {
                console.error(error);
                // Handle errors here
            });
    }

    return (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={openSnackBar}
                    onClose={_ => {setSnackBarMessage(""); setOpenSnackBar(false)}}
                    message={snackBarMessage}
                />
            </div>

            <div className="p-3">
                    <div className="sm:flex sm:justify-center sm:items-center mb-3 ">
                        <Textpicker data={{label: "Search Item"}}/>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            {/* Table header */}
                            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                            <tr>
                                <th className="p-2">

                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Name</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Description</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Picture</div>
                                </th>
                            </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="text-sm font-medium divide-y divide-slate-100">
                            {itemsData.map(element => {
                                {/* Row */}
                                return(
                                    <tr key={element.id}>
                                        <td className="p-2">
                                            <button
                                                className="flex justify-center items-center w-9 h-9 rounded-full bg-white  hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                                                key={element["id"]}
                                                onClick={(e) => {handleAddToCart(element["id"], element);}}>
                                                <span className="sr-only">Delete</span>
                                                <AddShoppingCartRoundedIcon/>
                                            </button>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-slate-800">{element.name}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-green-500">{element.description}</div>
                                        </td>
                                        <td className="p-2">

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '80px'
                                                }}
                                            >
                                                {element.pictureUrl !== undefined && element.pictureUrl !== "" &&
                                                <img
                                                    style={{ height: 'auto', maxWidth: '100px' }}
                                                    alt="my image"
                                                    src={element.pictureUrl}
                                                ></img>}
                                                {element.pictureUrl === "" && <ImageNotSupportedIcon/>}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        {itemsData.length === 0 && <div className="sm:flex sm:justify-center sm:items-center mb-3 ">
                                <div className="p-3">
                                    Nothing Found
                                </div>
                                <div className="p-3">
                                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                            onClick={(e) => {handleNoneExistingItemToCart(text);}}>
                                        Add Item
                                    </button>
                                </div>
                        </div>}
                        <Stack spacing={2} className="px-5 py-8 sm:justify-center sm:items-center" >
                            <Pagination count={Math.round(balancesDataCount / 20)} variant="outlined" color="primary"
                                        showFirstButton showLastButton page={page} onChange={handlePageChange} />
                        </Stack>
                    </div>
            </div>
        </div>
    );
}

export default CatalogMiniTable;
