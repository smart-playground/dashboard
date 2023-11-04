import React, { useState } from 'react';
import Moment from 'moment';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';

import {FoldUpIcon, FoldDownIcon} from '@primer/octicons-react'

const BUSINESS_NAME = "business-name"
const DEAL_DATE = "deal-date"
const CARD = "card"
const CHARGE = "charge"
const DESCRIPTION = "description"

const DD_MM_YYYY_SLASH_FORMAT = "DD/MM/YYYY"
const DD_MM_YYYY_DASH__FORMAT = "DD-MM-YYYY"
const YYYY_MM_DD_SLASH_FORMAT = "YYYY/MM/DD"
const YYYY_MM_DD_DASH__FORMAT = "YYYY-MM-DD"

function ExpenseImport() {
  
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [headers, setHeaders] = useState([])
  const [headerMap, setHeaderMap] = useState(new Map())
  const [markAll, setMarkAll] = useState(true)

  const [dateFormater,setDateFormater] = useState("")

  const [openMapHeader, setOpenMapHeader] = useState(false)

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    console.log("File selected");
    console.log(file)
  };

  const parseDateByFormat = (format, value) => {
    let arr;switch (format) {
      case DD_MM_YYYY_SLASH_FORMAT:
        arr = value.split("/");
        return arr[2] + "/" + arr[1] + "/" + arr[0]

      case DD_MM_YYYY_DASH__FORMAT:
        arr = value.split("-");
        return arr[2] + "/" + arr[1] + "/" + arr[0]

      case YYYY_MM_DD_SLASH_FORMAT:
        return value

      case YYYY_MM_DD_DASH__FORMAT:
        arr = value.split("-");
        return arr[0] + "/" + arr[1] + "/" + arr[2]
    }
  }

  const csvFileToArray = csvText => {
    var headerNewMap = new Map()
    headerMap.forEach((value, key, _) => {
      let tmpArr;
      if (headerNewMap.has(value)) {
        tmpArr = headerNewMap.get(value);
        tmpArr.push(key)
        headerNewMap = headerNewMap.set(value, tmpArr)
      } else {
        tmpArr = [];
        tmpArr.push(key)
        headerNewMap = headerNewMap.set(value, tmpArr)
      }
    })

    const csvHeaders = csvText.slice(0, csvText.indexOf("\n")).split(",");
    const csvRows = csvText.slice(csvText.indexOf("\n") + 1).split("\n");

    var idx = 0
    const array = csvRows.map(row => {
      const values = row.split(",");
      const obj = csvHeaders.reduce((object, header, index) => {
        if (headerNewMap.has(header)) {
          headerNewMap.get(header).map(standardValue => {
            if (standardValue === DEAL_DATE) {
              //parse date correctly
              var finalVal = parseDateByFormat(dateFormater, values[index])
              if (!Moment(finalVal).isValid()) {
                console.error("Failed to parse date", "value", values[index], "parser", dateFormater)
                object[standardValue] = "**" + values[index]
              }
              else {
                object[standardValue] = Moment(finalVal).format("YYYY-MM-DD")
              }
            }
            else {
              object[standardValue] = values[index]
            }
          })
        }
        return object;
      }, {});
      obj["index"] = idx
      obj["selected"] = false
      idx = idx + 1
      return obj;
    });

    setArray(array);
    console.log("CSV Details");
    console.log(array)
  };

  const extractHeaders = csvText => {
    setHeaders(csvText.slice(0, csvText.indexOf("\n")).split(","));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setOpenMapHeader(true)
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        // csvFileToArray(text);
        extractHeaders(text)
        // setOpenMapHeader(true)
      };

      fileReader.readAsText(file);
      console.log("Done")
    }
  };

  // const handleClickOpen = () => {
  //   setOpenMapHeader(true);
  // };

  const handleClose = () => {
    setOpenMapHeader(false);
  };

  const handleSaveMap = () => {
    setOpenMapHeader(false);
    // headerMap.map((tuple))
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text)
      };

      fileReader.readAsText(file);
      console.log("Done")
    }
  }

  function addExpenses() {
    console.log("Going to add expenses")

    const normalized = (value, defVal) => {
      if (value) return value
      else return defVal
    }

    const balances = array.map(e => {
      if (!e[BUSINESS_NAME] || !e[CHARGE] || !e[DEAL_DATE])
        console.error("Unexpected empty value", e)
      return {
        "business-name": normalized(e[BUSINESS_NAME], ""),
        "charge": normalized(+(e[CHARGE]),0),
        "description": normalized(e[DESCRIPTION],""),
        "card": normalized(e[CARD],""),
        "deal-date": normalized(e[DEAL_DATE], Moment(Date.now()).format("YYYY-MM-DD"))+"T00:00:00.000+00:00"
      }
    })

    console.log(balances)


    const request = {
      "balances": balances
    }

    console.log(request)
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    };
  
    fetch('/api/balances', requestOptions)
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
      console.log(err.message);
    });
  }

  const handleSave = () => {
    console.log(array)
    addExpenses()
  }

  const handleMultiRemove = () => {
    const a = array.filter(e => {
      return e["selected"] !== true
    });
    setArray(a)
    setMarkAll(false)
  }

  const handleSelectAll = () => {
    setMarkAll(!markAll)
    var a = array.map(e => {
      e["selected"] = !markAll
      return e
    })
    setArray(a)
  }

  const handleSelection = (index) => {
    const a = array.map(e => {
      console.log("AA -> " + e["index"] + " " + index)
      if (e["index"] === index) {
        console.log("Found, before:")
        console.log(e)
        e["selected"] = !e["selected"]
        console.log("After:")
        console.log(e)
      }
      return e
    });
    console.log(a)
    setArray(a)
  }

  const handleDelete = (index, element) => {
    setArray(array.filter((v, _) => v["index"] !== element["index"]));
  }

  const handleToggleIncomeOutcome = (index) => {
    var a = array.map(e => {
      console.log("AA -> " + e["index"] + " " + index)
      if (e["index"] === index) {
        console.log("Found, before:")
        console.log(e)
        e[CHARGE] = -e[CHARGE]
        console.log("After:")
        console.log(e)
      }
      return e
    })
    console.log(a)
    setArray(a)  
  }

  const handleHeaderMapChange = (event) => {
    const value = event.target.value
    const key = event.target.name
    if (value === "")
      return
    console.log(key, value);
    headerMap.set(key, value)
    setHeaderMap(headerMap)
    console.log(headerMap)
  }

  const handleSetDateFormatter = (event) => {
    const value = event.target.value
    const key = event.target.name
    if (value === "")
      return
    console.log("formatter",key, value);
    setDateFormater(value)
  }

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <div>
        <Dialog open={openMapHeader} onClose={handleClose}>
          <DialogTitle>Choose Headers Mapping</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
            <InputLabel id="business-name-label">Business Name</InputLabel>
            <Select labelId="business-name-label" id={BUSINESS_NAME} label="Business Name" name={BUSINESS_NAME} onChange={handleHeaderMapChange}>
              <MenuItem value={''}>None</MenuItem>
              {headers.map(e => {return <MenuItem value={e}>{e}</MenuItem>})}
            </Select>
            <InputLabel id="charge-label">Charge</InputLabel>
            <Select labelId="charge-label" id={CHARGE} label="Charge" name={CHARGE} onChange={handleHeaderMapChange}>
              <MenuItem value={''}>None</MenuItem>
              {headers.map(e => {return <MenuItem value={e}>{e}</MenuItem>})}
            </Select>
            <InputLabel id="description-label">Description</InputLabel>
            <Select labelId="description-label" id={DESCRIPTION} label="Description" name={DESCRIPTION} onChange={handleHeaderMapChange}>
              <MenuItem value={''}>None</MenuItem>
              {headers.map(e => {return <MenuItem value={e}>{e}</MenuItem>})}
            </Select>
            <InputLabel id="deal-date-label">Deal Date</InputLabel>
            <Select labelId="deal-date-label" id={DEAL_DATE} label="Deal Date" name={DEAL_DATE} onChange={handleHeaderMapChange}>
              <MenuItem value={''}>None</MenuItem>
              {headers.map(e => {return <MenuItem value={e}>{e}</MenuItem>})}
            </Select>
            <InputLabel id="deal-date-format-label">Date Format</InputLabel>
            <Select labelId="deal-date-format-label" id={"deal-date-format"} label="Date Format" name={"deal-date-format"} onChange={handleSetDateFormatter}>
              <MenuItem value={'DD/MM/YYYY'}>DD/MM/YYYY</MenuItem>
              <MenuItem value={'DD-MM-YYYY'}>DD-MM-YYYY</MenuItem>
              <MenuItem value={'YYYY-MM-DD'}>YYYY-MM-DD</MenuItem>
              <MenuItem value={'YYYY/MM/DD'}>YYYY/MM/DD</MenuItem>
            </Select>
            <InputLabel id="card-label">Card ID</InputLabel>
            <Select labelId="card-label" id={CARD} label="Card ID" name={CARD} onChange={handleHeaderMapChange}>
              <MenuItem value={''}>None</MenuItem>
              {headers.map(e => {return <MenuItem value={e}>{e}</MenuItem>})}
            </Select>
            <InputLabel id="card-owner-label">Card Owner</InputLabel>
            <Select labelId="card-owner-label" id="card-owner" label="Card Owner" name='card-owner' onChange={handleHeaderMapChange}>
              <MenuItem value={''}>None</MenuItem>
              {headers.map(e => {return <MenuItem value={e}>{e}</MenuItem>})}
            </Select>
            <InputLabel id="type-label">Income/Outcome</InputLabel>
            <Select labelId="type-label" id="type" label="Card Owner" name='type' onChange={handleHeaderMapChange}>
              <MenuItem value={''}>None</MenuItem>
              {headers.map(e => {return <MenuItem value={e}>{e}</MenuItem>})}
            </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSaveMap}>Load</Button>
          </DialogActions>
        </Dialog>
      </div>
      <header className="px-5 py-4 border-b border-slate-100">
        
        {/* <div className="sm:flex sm:justify-between sm:items-center mb-8"> */}
        <div className="sm:flex sm:justify-between sm:items-center">
          <h2 className="font-semibold text-slate-800">Expenses Info</h2>


          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <form>
            <input
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-2"
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
              size="small"
            />
            {/* Add view button */}
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={(e) => {handleOnSubmit(e);}}>
                {/*<svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">*/}
                {/*    /!* <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" /> *!/*/}
                {/*    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />*/}
                {/*</svg>*/}
                <span className="hidden xs:block ml-2">Import</span>
            </button>                
            </form>
          </div>

        </div>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">
                    <input type="checkbox" className="form-checkbox" checked={!markAll} onChange={handleSelectAll} />
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Business Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Charge</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Description</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Deal Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Card ID</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Card Owner</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Income/Outcome</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center"></div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
                              {/* Row */}
              {array.map(element => {
                return(
                  <tr>
                    <td className="p-2">
                      <input type="checkbox" className="form-checkbox" checked={element.selected} onChange={() => {handleSelection(element.index)}}/>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                          <circle fill="#24292E" cx="18" cy="18" r="18" />
                          <path d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" fill="#FFF" />
                        </svg>
                        <div className="text-slate-800">{element[BUSINESS_NAME]}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      {(element[CHARGE] >= 0) && <div className="text-center text-green-500">{element[CHARGE]}</div>}
                      {(element[CHARGE] < 0) && <div className="text-center text-red-500">{element[CHARGE]}</div>}                      
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">{element[DESCRIPTION]}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{element[DEAL_DATE]}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">{(element[CARD] === undefined) ? "-" : element[CARD]}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500"><a href="/Tal Martsiano Shkedi">Tal Martsiano Shkedi</a></div>
                    </td>
                    <td className="p-2">
                      {(element[CHARGE] >= 0) &&
                      <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2" key={element["index"]} onClick={() => {handleToggleIncomeOutcome(element.index);}}>
                        <FoldUpIcon size={16} />
                      </button>}
                      {(element[CHARGE] < 0) &&
                      <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2" key={element["index"]} onClick={() => {handleToggleIncomeOutcome(element.index);}}>
                        <FoldDownIcon size={16} />
                      </button>}  
                    </td>
                    <td className="p-2">
                      <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2">
                        <span className="sr-only">Edit</span>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                          <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 00-.064.108l-.558 1.953 1.953-.558a.253.253 0 00.108-.064zm1.238-3.763a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354z" />
                        </svg>
                      </button>
                    </td>
                    <td className="p-2">
                    <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2" key={element["index"]} onClick={() => {handleDelete(element["index"], element);}}>
                      <span className="sr-only">Delete</span>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                        <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 0114.25 6H1.75A1.75 1.75 0 010 4.25zM1.75 7a.75.75 0 01.75.75v5.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25v-5.5a.75.75 0 011.5 0v5.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25v-5.5A.75.75 0 011.75 7zm0-4.5a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25zM6.25 8h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 010-1.5z" />
                      </svg>
                    </button> 
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="px-5 py-4 border-b border-slate-100">
        <div className="sm:flex sm:justify-between sm:items-center">
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={(e) => {handleMultiRemove(e);}}>
              <svg viewBox="0 0 16 16" width="16" height="16" className="w-4 h-4 fill-current opacity-50 shrink-0" >
                <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z"></path>
              </svg>
              <span className="hidden xs:block ml-2">Remove</span>
            </button>
          </div>
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => {handleSave()}}>
              <svg viewBox="0 0 16 16" width="16" height="16" className="w-4 h-4 fill-current opacity-50 shrink-0" >
                <path d="M0 8a8 8 0 1116 0A8 8 0 010 8zm1.5 0a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm10.28-1.72l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.751.751 0 01.018-1.042.751.751 0 011.042-.018l1.47 1.47 3.97-3.97a.751.751 0 011.042.018.751.751 0 01.018 1.042z"></path>
              </svg>                  
              <span className="hidden xs:block ml-2">Save</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ExpenseImport;
