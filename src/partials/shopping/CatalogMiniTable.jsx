// import { TagsInput } from "react-tag-input-component";
import React, {useContext, useEffect, useState} from 'react';
import {GenericFilterContext, GenericFilterContextProvider} from "../../contexts/TimeFilterContext";
import Stack from '@mui/material/Stack';
import {Snackbar} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import Textpicker from "../actions/Textpicker";

function CatalogMiniTable(props) {

    const cartId = props.cartData.id;

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")

    const [balancesData, setBalancesData] = useState([]);
    const [balancesDataCount, setBalancesDataCount] = useState(0);

    const genericFilterContext = useContext(GenericFilterContext);
    const {start, end, minCharge, maxCharge, InOut, tags, text } = genericFilterContext;

    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    function addElementsToCart(elementsId) {
        console.log("Going to add element to cart", elementsId)

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: [{id: elementsId, amount: 1, comment: ""}] })
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
            })
            .catch((err) => {
                console.error(err.message);
            });
    }


    const handleAddToCart = (index, element) => {
        console.error(index, element)
        addElementsToCart(element.id)
    }

    function promptError(message) {
        setSnackBarMessage(message)
        setOpenSnackBar(true)
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
            url = 'http://localhost:8080' + '/api/shopping/catalog?filters=' + filters.substring(1) + '&' + paginationParams
            countUrl = 'http://localhost:8080' + '/api/shopping/catalog-count?filters=' + filters.substring(1)
        } else {
            url = 'http://localhost:8080' + '/api/shopping/catalog' + '?' + paginationParams
            countUrl = 'http://localhost:8080' + '/api/shopping/catalog-count'
        }

        fetch(countUrl, {
                // mode: 'no-cors',
                Headers: {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'},
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
                Headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("talma catalogItem:", data);
                if (data["catalogItem"] !== undefined && data["catalogItem"] != null) {
                    var manipulatedData = data["catalogItem"].map(e => {e["selected"] = false;return e})
                    setBalancesData(manipulatedData);
                }
                else {
                    setBalancesData([]);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setBalancesData([])
            });
    }, [start, end, minCharge, maxCharge, InOut, tags, text, page]);

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

                <GenericFilterContextProvider>

                    <div className="sm:flex sm:justify-center sm:items-center mb-3 ">
                            <Textpicker/>
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
                            {balancesData.map(element => {
                                {/* Row */}
                                return(
                                    <tr key={element.id}>
                                        <td className="p-2">
                                            <button
                                                className="flex justify-center items-center w-9 h-9 rounded-full bg-white  hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                                                key={element["index"]}
                                                onClick={(e) => {handleAddToCart(element["index"], element);}}>
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
                                                <img
                                                    style={{ height: 'auto', maxWidth: '100px' }}
                                                    alt="my image"
                                                    src={element.pictureUrl}
                                                ></img>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <Stack spacing={2} className="px-5 py-8 sm:justify-center sm:items-center" >
                            <Pagination count={Math.round(balancesDataCount / 20)} variant="outlined" color="primary"
                                        showFirstButton showLastButton page={page} onChange={handlePageChange} />
                        </Stack>
                    </div>
                </GenericFilterContextProvider>
            </div>
        </div>
    );
}

export default CatalogMiniTable;
