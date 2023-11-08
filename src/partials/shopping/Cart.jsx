import React, {useEffect, useState} from 'react';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import TextField from "@mui/material/TextField";
import {FormControl} from "@mui/material";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import CatalogMiniTable from "./CatalogMiniTable";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

function Cart(props) {

  const cartData = props.cartData;

    console.log("In cart", cartData)
  const [itemsData, setItemsData] = useState([])
  const [itemsIds, setItemsIds] = useState([])
  const [itemsAmount, setItemsAmount] = useState(0)

    const [titleEditMode, setTitleEditMode] = useState(false)
    const [descriptionEditMode, setDescriptionEditMode] = useState(false)
    const [contentEditMode, setContentEditMode] = useState(false)

  function deleteElements(elementsId) {
    console.log("Going to delete element", elementsId)

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: elementsId })
    };

    fetch('/api/shopping/cart/' + cartData.id, requestOptions)
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

  const handleDelete = (index, element) => {
    console.error(index, element)
    // setBalancesData(balancesData.filter((v, i) => v.id !== element.id));
    deleteElements([element.id])
  }

  const handleMarkDone = () => {

  }

  const handleMarkUndone = () => {

  }

  const handleIncrease = () => {

  }

  const handleDecrease = () => {

  }

  function updateCart() {
      console.log("Going to update with these values", cartData)

      const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartData)
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
    function handleTitleChange(e)  {
        setTitleEditMode(false);
        updateCart()
  }

  function handleDescriptionChange(e) {
      setDescriptionEditMode(false);
      updateCart()
  }

  function handleAddingItemsToCart() {

  }

    useEffect(() => {
        /////////////////
        // fetch(
        //     '/api/shopping/catalog/image',
        //     {
        //             Headers: {
        //                 'Content-Type': 'application/json',
        //                 'Access-Control-Allow-Origin': '*'
        //             },
        //         }
        //     )
        //     .then((response) => response.json())
        //     .then((tags) => {
        //         console.log("Tags List:", tags);
        //         setAvailableTags(tags["tags"]);
        //     })
        //     .catch((err) => {
        //         console.error(err.message);
        //         setAvailableTags(mockValues["tags"])
        //     });
    }, [itemsIds]);

  useEffect(() => {
    let url;
    let countUrl;

    url = 'http://localhost:8080' + '/api/shopping/carts/' + cartData.id
    countUrl = 'http://localhost:8080' + '/api/shopping/carts/' + cartData.id + '/count'

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
            setItemsAmount(count);
          }
          else {
            setItemsAmount(0);
          }
        })
        .catch((err) => {
          console.error(err.message);
          setItemsAmount(0)
        });

    fetch(url, {
      // mode: 'no-cors',
      Headers: {
        'Content-Type': 'application/json',
      }
    })
        .then((response) => response.json())
        .then((data) => {
          console.log("catalogItem:", data);
          if (data["items"] !== undefined && data["items"] != null) {
            const cartItems = data["items"]
            const ids = cartItems.map(a => a.id)
            setItemsIds(ids)
            setItemsData(cartItems);
          }
          else {
            setItemsData([]);
          }
        })
        .catch((err) => {
          console.error(err.message);
          setItemsData([])
        });
  // }, [start, end, minCharge, maxCharge, InOut, tags, text, page]);
  }, []);


    return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">
                <dev className="flex">
                    {!titleEditMode &&
                        <button
                            className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                            onClick={() => {setTitleEditMode(true);}}
                        >
                            <span className="sr-only">mark done</span>
                            <ModeEditOutlineRoundedIcon/>
                        </button>
                    }
                    {titleEditMode &&
                        <button
                            className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-green-500 border border-green-200 hover:border-white hover:text-white text-green-500 shadow-sm transition duration-150 ml-2"
                            onClick={() => {handleTitleChange();}}
                        >
                            <span className="sr-only">mark done</span>
                            <DoneRoundedIcon/>
                        </button>
                    }
                    <TextField
                        fullWidth
                        label=""
                        id="fullWidth"
                        variant="standard"
                        size="small"
                        disabled={!titleEditMode}
                        defaultValue={cartData.title}
                        inputProps={{style: {fontSize: 40, fontStyle: 'bold'}}} // font size of input text
                        InputLabelProps={{style: {fontSize: 40, fontStyle: 'bold'}}} // font size of input label
                        onChange={(event) => {cartData.title = event.target.value;}}
                    />
                    {!contentEditMode && <button
                        className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                        onClick={() => {setContentEditMode(true);}}
                    >
                        <span className="sr-only">mark done</span>
                        <PlaylistAddRoundedIcon/>
                    </button>}
                    {contentEditMode && <button
                        className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                        onClick={() => {setContentEditMode(false);}}
                    >
                        <span className="sr-only">mark done</span>
                        <SaveRoundedIcon/>
                    </button>}
                    <button
                        className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                        onClick={() => {handleAddingItemsToCart();}}
                    >
                        <span className="sr-only">mark done</span>
                        <DeleteForeverRoundedIcon/>
                    </button>
                </dev>
            </h2>
            <h4 className="font-semibold text-slate-800">

                <dev className="flex">
                    {!descriptionEditMode &&
                        <button
                            className="flex justify-center items-center w-5 h-5 rounded-full bg-white hover:bg-slate-500 border border-slate-200 hover:border-white hover:text-white text-slate-500 shadow-sm transition duration-150 ml-2"
                            onClick={() => {setDescriptionEditMode(true);}}
                        >
                            <span className="sr-only">mark done</span>
                            <ModeEditOutlineRoundedIcon/>
                        </button>
                    }
                    {descriptionEditMode &&
                        <button
                            className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-green-500 border border-green-200 hover:border-white hover:text-white text-green-500 shadow-sm transition duration-150 ml-2"
                            onClick={() => {handleDescriptionChange();}}
                        >
                            <span className="sr-only">mark done</span>
                            <DoneRoundedIcon/>
                        </button>
                    }
                    <TextField
                        fullWidth
                        label=""
                        size="small"
                        id="fullWidth"
                        variant="standard"
                        style={{border: 'none'}}
                        disabled={!descriptionEditMode}
                        defaultValue={cartData.description}
                        inputProps={{style: {fontStyle: 'italic'}}} // font size of input text
                        InputLabelProps={{style: {fontStyle: 'italic'}}} // font size of input label
                        onChange={(event) => {cartData.description = event.target.value;}}
                    />
                </dev>
            </h4>
        </header>
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
                              onClick={() => {handleMarkDone(element["index"], element);}}
                          >
                            <span className="sr-only">mark done</span>
                            <DoneRoundedIcon/>
                          </button>
                          <button
                              className="flex justify-center items-center w-9 h-9 rounded-full bg-white hover:bg-red-500 border border-red-200 hover:border-white hover:text-white text-red-500 shadow-sm transition duration-150 ml-2"
                              key={element["index"]}
                              onClick={() => {handleMarkUndone(element["index"], element);}}
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
                          <img
                              src={element.pictureUrl}
                              alt="Selected"
                              className="image-in-circle"
                          />
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
                              onClick={() => {handleIncrease(element["index"], element);}}
                          >
                            <span className="sr-only">increase</span>
                            <AddRoundedIcon/>
                          </button>

                          <button
                              className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                              key={element["index"]}
                              onClick={() => {handleDecrease(element["index"], element);}}
                          >
                            <span className="sr-only">decrease</span>
                            <RemoveRoundedIcon/>
                          </button>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <button
                            className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                            key={element["index"]}
                            onClick={() => {handleDelete(element["index"], element);}}
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
        <footer>
            {contentEditMode && <CatalogMiniTable cartData={cartData} />}
        </footer>
      </div>
  );
}


export default Cart;
