import React from 'react';

import DashboardAvatars from '../dashboard/DashboardAvatars';
import FilterButton from '../actions/FilterButton';
import Datepicker from '../actions/Datepicker';
import {Link} from 'react-router-dom';
// import { TagsInput } from "react-tag-input-component";
import { useState, useEffect, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {PlusCircleIcon} from '@primer/octicons-react'
import { getValue } from '@mui/system';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { GenericFilterContext} from "../../contexts/TimeFilterContext";
import Stack from '@mui/material/Stack';
import {Snackbar} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import { data } from 'autoprefixer';

const handleOnSubmit = (e, key) => {
    e.preventDefault();
    console.log(key)
    console.log(e)
};


const mockDataValues = {
    "balances": [
        {
            "id": "637941dcabf0ffe141487282",
            "business-name": "בנהפ BIT העברה ב",
            "charge": 830,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.128+02:00",
            "tags": ["aa"]
        },
        {
            "id": "637941dcabf0ffe141487283",
            "business-name": "דן אכדיה-צמרת",
            "charge": 26,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.264+02:00"
        },
        {
            "id": "637941dcabf0ffe141487284",
            "business-name": "HOPON-DAN",
            "charge": 100,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.39+02:00"
        },
        {
            "id": "637941dcabf0ffe141487285",
            "business-name": "44",
            "charge": 173,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.521+02:00"
        },
        {
            "id": "637941dcabf0ffe141487286",
            "business-name": "מקס סטוק אור עקיבא",
            "charge": 123.4,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.648+02:00"
        },
        {
            "id": "637941dcabf0ffe141487287",
            "business-name": "רהיטי מוניטין בעמ",
            "charge": 3800,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.776+02:00"
        },
        {
            "id": "637941dcabf0ffe141487288",
            "business-name": "מאפה נאמן",
            "charge": 19.9,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.91+02:00"
        },
        {
            "id": "637941ddabf0ffe141487289",
            "business-name": "בנהפ BIT העברה ב",
            "charge": 600,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.036+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728a",
            "business-name": "טוטם טיפוס בעמ",
            "charge": 29,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.171+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728b",
            "business-name": "בנהפ BIT העברה ב",
            "charge": 150,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.297+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728c",
            "business-name": "רשות הטבע והגנים עין",
            "charge": 39,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.426+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728d",
            "business-name": "ראמה -הגליל חב' הדלק",
            "charge": 320.03,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.555+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728e",
            "business-name": "דבאח ביג מרקט מעלות",
            "charge": 27.57,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.686+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728f",
            "business-name": "שופרסל שלי בנימינה",
            "charge": 310.09,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.814+02:00"
        },
        {
            "id": "637941ddabf0ffe141487290",
            "business-name": "בנהפ BIT העברה ב",
            "charge": 120,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.942+02:00"
        },
        {
            "id": "637941deabf0ffe141487291",
            "business-name": "14369001 #PAYPAL *G",
            "charge": 120,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.091+02:00"
        },
        {
            "id": "637941deabf0ffe141487292",
            "business-name": "בנהפ BIT העברה ב",
            "charge": 280,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.218+02:00"
        },
        {
            "id": "637941deabf0ffe141487293",
            "business-name": "בנהפ BIT העברה ב",
            "charge": 500.5,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.349+02:00"
        },
        {
            "id": "637941deabf0ffe141487294",
            "business-name": "מועצה מקומית בנימינה",
            "charge": 25,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.476+02:00"
        },
        {
            "id": "637941deabf0ffe141487295",
            "business-name": "NTAIN VIEW#GOOGLE ST",
            "charge": 8,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.606+02:00"
        },
        {
            "id": "637941deabf0ffe141487296",
            "business-name": "NTAIN VIEW#GOOGLE YO",
            "charge": 23.9,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.734+02:00"
        },
        {
            "id": "637941deabf0ffe141487297",
            "business-name": "PAYBOX",
            "charge": 400,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.865+02:00"
        },
        {
            "id": "637941deabf0ffe141487298",
            "business-name": "קרן מכבי- חיוב",
            "charge": 94.86,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.998+02:00"
        },
        {
            "id": "637941dfabf0ffe141487299",
            "business-name": "דואלי חניונים",
            "charge": 35,
            "description": "",
            "deal-date": "2022-11-19T22:51:43.13+02:00"
        },
        {
            "id": "637941dfabf0ffe14148729a",
            "business-name": "סופר אלונית",
            "charge": 368.16,
            "description": "",
            "deal-date": "2022-11-19T22:51:43.261+02:00"
        },
        {
            "id": "637941dfabf0ffe14148729b",
            "business-name": "אקספרס-גמא KSP",
            "charge": 110,
            "description": "",
            "deal-date": "2022-11-19T22:51:43.386+02:00"
        },
        {
            "id": "637941dfabf0ffe14148729c",
            "business-name": "בנהפ BIT העברה ב",
            "charge": 2280,
            "description": "",
            "deal-date": "2022-11-19T22:51:43.513+02:00"
        },
        {
            "id": "638553d474f093f4656da3df",
            "business-name": "",
            "charge": 11,
            "description": "ss",
            "deal-date": "2022-11-29T02:35:32.42+02:00"
        },
        {
            "id": "63b0ab24256c89b8a01a1d1e",
            "business-name": "העברה כלשהיא למען בדיקה",
            "charge": 444,
            "description": "שדגשדג",
            "deal-date": "2022-12-31T23:35:32.347+02:00"
        }
    ]
}

const mockValues = {
    "tags": [
        {
            "id": "63aea7ffd2898531072c3cb1",
            "name": "yyy"
        },
        {
            "id": "63aff9445f8233042c97c4d2",
            "name": "12"
        },
        {
            "id": "63b07b7e49d507f2101f6b49",
            "name": "ggg"
        },
        {
            "id": "63b08f520cfb7c2f7692ffff",
            "name": "abc"
        }
    ]
}

// const mockTaggedElements = {
//   "elements": [
//       {
//           "element": "637941dcabf0ffe141487282",
//           "tags": [
//               "63aea7ffd2898531072c3cb1",
//               "63b08f520cfb7c2f7692ffff"
//           ]
//       }
//   ]
// }

function ExpenseTable() {

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")

    const [openMultiTagDialog, setOpenMultiTagDialog] = useState(false)

    const [openEntryEditDialog, setOpenEntryEditDialog] = useState(false)
    const [elementEditing, setElementEditing] = useState({})

    const [balancesData, setBalancesData] = useState([]);
    const [balancesDataCount, setBalancesDataCount] = useState(0);
    const [availableTags, setAvailableTags] = useState([]);
    const [markAll, setMarkAll] = useState(true)

    const [refetchAllTags, setRefetchAllTags] = useState(false)
    const [refetchTaggedElement, setRefetchTaggedElement] = useState(false)

    const genericFilterContext = useContext(GenericFilterContext);
    const {start, end, minCharge, maxCharge, InOut, tags, text } = genericFilterContext;

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    function getTags(tags) {
        if (tags == undefined || tags == null)
            return []
        return tags
    }

    function setElementTags(element, tags) {
        console.log("Going to tag element", element.id, "with", tags)

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: element.id, tags: tags })
        };

        fetch('/api/balance', requestOptions)
            .then(async response => {
                const resp = await response.json()
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    return Promise.reject(error);
                }
                console.log(resp);
                // if (element.tags == undefined)
                //   element.tags = tags
                // else
                element.tags = tags
                setRefetchTaggedElement(!refetchTaggedElement);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    function appendElementTags(elements, tagsNames) {
        console.log("Going to append tag to element", elements.map(e => e.id), "with", tagsNames)

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: elements.map(e => e.id), tags: tagsNames })
        };

        fetch('/api/balance/tags', requestOptions)
            .then(async response => {
                const resp = await response.json()
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    return Promise.reject(error);
                }
                console.log(resp);
                // if (element.tags == undefined)
                //   element.tags = tags
                // else
                // element.tags = tags
                setRefetchTaggedElement(!refetchTaggedElement);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    function deleteElements(elementsId) {
        console.log("Goint to delete element", elementsId)

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: elementsId })
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
                console.error(err.message);
            });
    }

    const handleSelectAll = () => {
        setMarkAll(!markAll)
        var a = balancesData.map(e => {
            e["selected"] = markAll
            return e
        })
        setBalancesData(a)
    }

    const handleSelection = (id) => {
        var a = balancesData.map(e => {
            console.log("AA -> " + e["id"] + " " + id, e)
            if (e["id"] == id) {
                console.log("Found, before:")
                console.log(e)
                e["selected"] = !e["selected"]
                console.log("After:")
                console.log(e)
            }
            return e
        })
        console.log(a)
        setBalancesData(a)
    }

    const handleDelete = (index, element) => {
        console.error(index, element)
        setBalancesData(balancesData.filter((v, i) => v.id !== element.id));
        deleteElements([element.id])
    }

    const handleEdit = (index, element) => {
        console.log("Open screen for editing", index, element)
        const elementClone = {};
        elementClone.id = element.id
        elementClone["business-name"] = element["business-name"]
        elementClone.description = element.description
        elementClone.card = element.card
        elementClone.charge = element.charge
        elementClone["deal-date"] = element["deal-date"]
        if (element.tags == undefined)
            elementClone.tags = []
        else
            elementClone.tags = element.tags
        setElementEditing(elementClone);
        setOpenEntryEditDialog(true)
    }

    const handleMultiRemove = () => {
        var deleteTargets = balancesData.filter(e => {return e["selected"] == true}).map(e => e.id)
        deleteElements(deleteTargets)
        var a = balancesData.filter(e => {return e["selected"] != true})
        setBalancesData(a)
        setMarkAll(false)
    }

    const handleMultiTag = () => {
        setOpenMultiTagDialog(true)
    }

    function tagElementWithNonExistingTag(element, newTagName) {
        console.log("Going to tag element", element.id, "with non-existing tag", newTagName)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ names: [newTagName] })
        };

        fetch('/api/tags/tag', requestOptions)
            .then(async response => {
                const tag = await response.json()
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    return Promise.reject(error);
                }
                console.log("New tags created", tag.tags);
                setElementTags(element, tag.tags)
                setRefetchAllTags(!refetchAllTags)
            })
            .catch((err) => {
                console.error(err.message);
                console.error(mockValues["tags"])
                console.error(mockValues["tags"].push({"id": Math.random*100, "name": newTagName}))
                // setAvailableTags(mockValues["tags"].push({"id": Math.random*100, "name": newTagName}))
            });
    }

    function appendElementWithNonExistingTag(elements, newTagsName) {
        console.log("Going to append tag to element", elements.map(e => e.id), "with non-existing tag", newTagsName)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ names: newTagsName })
        };

        fetch('/api/tags/tag', requestOptions)
            .then(async response => {
                const tags = await response.json()
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    return Promise.reject(error);
                }
                console.log("New tags created", tags);
                appendElementTags(elements, newTagsName)
                setRefetchAllTags(!refetchAllTags)
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    useEffect(() => {
        /////////////////
        fetch('/api/tags/get-all',
            Headers = {'Content-Type': 'application/json'})
            .then((response) => response.json())
            .then((tags) => {
                console.log("Tags List:", tags);
                setAvailableTags(tags["tags"]);
            })
            .catch((err) => {
                console.error(err.message);
                setAvailableTags(mockValues["tags"])
            });
    }, [refetchAllTags]);

// useEffect(() => {
//     /////////////////
//     console.log(expenseData)
//     const ids = expenseData.map(e => e.id)
//     console.log(ids)
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ elements: ids })
//     };

//     fetch('/api/tagged-elements/elements', requestOptions)
//       .then((response) => response.json())
//       .then((tdata) => {
//           const elements = tdata["elements"]
//           console.log(elements);
//           setTaggedElements(elements);
//       })
//       .catch((err) => {
//           const elements = mockTaggedElements["elements"]
//           console.log(err.message);
//           setTaggedElements(elements)
//       });
// }, [expenseData, refetchTaggedElement]);

    const [multiTagsValue, setMultiTagsValue] = useState([])

    function handleMultiTagRun() {
        setOpenMultiTagDialog(false)
        console.log("Existing tags",availableTags)
        const itemsToUpdate = balancesData.filter(e => e.selected == true)
        console.log("Going to tags",itemsToUpdate.length ,"elements with the following tags", multiTagsValue)
        const existingTags = multiTagsValue.filter(e => availableTags.find(a => a.name == e) != null)
        const nonExistingTags = multiTagsValue.filter(e => availableTags.find(a => a.name == e) == null)
        console.log("The following tags need to be created first", nonExistingTags)

        if (nonExistingTags.length > 0)
            appendElementWithNonExistingTag(itemsToUpdate, nonExistingTags)

        if (existingTags.length > 0)
            appendElementTags(itemsToUpdate, existingTags)

        setMultiTagsValue([])
        setMarkAll(false)

        setBalancesData(balancesData.map(e => {e.selected = false; return e}))
    }

    function promptError(message) {
        setSnackBarMessage(message)
        setOpenSnackBar(true)
    }

    function handleEntryUpdate() {
        console.log("Going to update element to", elementEditing)

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(elementEditing)
        };

        fetch('/api/balance', requestOptions)
            .then((response) => response.json())
            .then((tdata) => {
                console.log(tdata);
                balancesData.map(value => {
                    if (value.id == elementEditing.id) {
                        value.charge = elementEditing.charge
                        value["business-name"] = elementEditing["business-name"]
                        value.description = elementEditing.description
                        value["deal-date"] = elementEditing["deal-date"]
                        value.tags = elementEditing.tags
                        value.card = elementEditing.card
                        return value
                    }
                    else
                        return value
                })
                setElementEditing({})
                setOpenEntryEditDialog(false)
                setBalancesData(balancesData)
            })
            .catch((err) => {
                console.error(err.message);
                promptError(err.message)
            });

        // const itemsToUpdate = balancesData.filter(e => e.selected == true)
        // console.log("Going to tags",itemsToUpdate.length ,"elements with the following tags", multiTagsValue)
        // const existingTags = multiTagsValue.filter(e => tags.find(a => a.name == e) != null)
        // const nonExistingTags = multiTagsValue.filter(e => tags.find(a => a.name == e) == null)
        // console.log("The following tags need to be created first", nonExistingTags)
        //
        // if (nonExistingTags.length > 0)
        //     appendElementWithNonExisxtingTag(itemsToUpdate, nonExistingTags)
        //
        // if (existingTags > 0)
        //     appendElementTags(itemsToUpdate, existingTags)


        // setBalancesData(balancesData.map(e => {e.selected = false; return e}))
    }

    function handleCloseMultiTagDialog() {
        setOpenMultiTagDialog(false)
        setMultiTagsValue([])
    }

    function handleOpenEntryEditDialog() {
        setOpenEntryEditDialog(false)
        setElementEditing({})
        // setMultiTagsValue([])
    }

    useEffect(() => {
        var url
        var countUrl

        var filters = ""
        if (start != null && start != "") filters = filters + ',start:' + start
        if (end != null && end != "") filters = filters + ',end:' + end
        if (minCharge != null && minCharge != "" && InOut !=0) filters = filters + ',minCharge:' + minCharge
        if (maxCharge != null && maxCharge != "" && InOut !=0) filters = filters + ',maxCharge:' + maxCharge
        if (InOut > 0) filters = filters + ',minCharge:0'
        if (InOut < 0) filters = filters + ',maxCharge:0'
        if (tags != "") filters = filters + ',tags:' + tags.join(":")
        if (text != "") filters = filters + ',text:' + text
        console.log("Filter = ", filters)

        const paginationParams = 'skip=' + ((page-1) * 20) + '&limit=20';

        if (filters != "") {
            url = '/api/balances?filters=' + filters.substring(1) + '&' + paginationParams
            countUrl = '/api/balances-count?filters=' + filters.substring(1)
        } else {
            url = '/api/balances' + '?' + paginationParams
            countUrl = '/api/balances-count'
        }

        fetch(countUrl,
            Headers = {'Content-Type': 'application/json'})
            .then((response) => response.json())
            .then((data) => {
                console.log("Count Balances:", data);
                if (data["count"] != undefined && data["count"] != null) {
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

        fetch(url,
            Headers = {'Content-Type': 'application/json'})
            .then((response) => response.json())
            .then((data) => {
                console.log("Balances:", data);
                if (data["balances"] != undefined && data["balances"] != null) {
                    var manipulatedData = data["balances"].map(e => {e["selected"] = false;return e})
                    setBalancesData(manipulatedData);
                }
                else {
                    setBalancesData([]);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setBalancesData(mockDataValues["balances"])
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
            <Dialog open={openMultiTagDialog} onClose={handleCloseMultiTagDialog}>
                <DialogTitle>Select Tags</DialogTitle>
                <DialogContent>
                    {balancesData.filter(e => e.selected != undefined && e.selected == true).length} Elements are going to be tags.
                    <p/>
                    Please select tags below
                    <Autocomplete
                        multiple
                        limitTags={10}
                        id="multiple-limit-tags"
                        options={availableTags.map(e => e.name)}
                        getOptionLabel={(option) => {if (option != undefined && option.name !== undefined) {return option.name} else {return option}} }
                        freeSolo={true}
                        value={multiTagsValue}
                        renderInput={(params) => (
                            <TextField variant="standard" size='small' {...params} placeholder="..." />
                        )}
                        onChange={(event, value, reason) => setMultiTagsValue(value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMultiTagDialog}>Cancel</Button>
                    <Button onClick={handleMultiTagRun}>Tag</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEntryEditDialog} onClose={handleOpenEntryEditDialog}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>

                        <TextField id="business-name" label="Business Name" variant="standard" defaultValue={elementEditing["business-name"]} onChange={value => elementEditing["business-name"] = value.target.value}/>
                        <TextField label="charge" inputProps={{ inputMode: 'numeric', pattern: '^(-?)(0|([1-9][0-9]*))(\\\\.[0-9]+)?$' }} variant="standard" defaultValue={elementEditing.charge} onChange={value => elementEditing.charge = parseFloat(value.target.value)}/>
                        <TextField id="description" label="Description" variant="standard" defaultValue={elementEditing.description} onChange={value => elementEditing.description = value.target.value}/>
                        <TextField id="card" label="Card" variant="standard" defaultValue={elementEditing.card} onChange={value => elementEditing.card = value.target.value}/>
                        <Autocomplete
                            multiple
                            limitTags={10}
                            // id="multiple-limit-tags"
                            options={availableTags.map(e => e.name)}
                            getOptionLabel={(option) => {if (option != undefined && option.name !== undefined) {return option.name} else {return option}} }
                            // freeSolo={true}
                            value={(elementEditing.tags == undefined) ? [] : elementEditing.tags}
                            renderInput={(params) => (
                                <TextField variant="standard" size='small' {...params} placeholder="..." />
                            )}
                            onChange={(event, value, reason) => elementEditing.tags = value}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpenEntryEditDialog}>Cancel</Button>
                    <Button onClick={handleEntryUpdate}>Update</Button>
                </DialogActions>
            </Dialog>

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
                                <div className="font-semibold text-left"></div>
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
                                <div className="font-semibold text-center">Tags</div>
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
                        {balancesData.map(element => {
                            {/* Row */}
                            return(
                                <tr key={element.id}>
                                    <td className="p-2">
                                        <input type="checkbox" className="form-checkbox" checked={element.selected} onChange={() => {handleSelection(element.id)}}/>
                                    </td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            {element.card == "" ? "" : <CreditCardIcon color="primary"/>}
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-slate-800">{element["business-name"]}</div>
                                    </td>
                                    <td className="p-2">
                                        {(element.charge < 0) && <div className="text-center text-red-500">{element.charge}</div>}
                                        {(element.charge >= 0) && <div className="text-center text-green-500">{element.charge}</div>}
                                    </td>
                                    <td className="p-2">
                                        <div className="text-center text-green-500">{element.description}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-center">{element["deal-date"]}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-center text-sky-500">{(element.card == undefined) ? "-" : element.card}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-center text-sky-500">
                                            {element.card == "2194\r" ? <a href="/Rotem Martsiano Shkedi">Rotem Martsiano Shkedi</a> : ""}
                                            {element.card == "6594\r" ? <a href="/Rotem Martsiano Shkedi">Rotem Martsiano Shkedi</a> : ""}
                                            {element.card === "6602\r" ? <a href="/Tal Martsiano Shkedi">Tal Martsiano Shkedi</a> : ""}
                                        </div>
                                        {/*{(element.card == undefined || element.card == "") ? <div className="text-center text-sky-500">sss</div> : ""}*/}
                                    </td>
                                    <td className="p-2">
                                        <Autocomplete
                                            multiple
                                            limitTags={2}
                                            id="multiple-limit-tags"
                                            options={availableTags}
                                            getOptionLabel={(option) => {if (option != undefined && option.name !== undefined) {return option.name} else {return option}} }
                                            freeSolo={true}
                                            // defaultValue={}
                                            // value={getTagNames(element.id)}
                                            value={getTags(element.tags)}
                                            renderInput={(params) => (
                                                <TextField variant="standard" size='small' {...params} placeholder="..." />
                                            )}
                                            onChange={(event, value, reason) => {
                                                console.log('event: ', event);
                                                console.log('reason: ', reason);
                                                if (reason == "createOption" && value != null) {
                                                    console.log("value", value, "actual", element.tags)
                                                    var last = value.at(-1)
                                                    var found = availableTags.filter((value) => value.name == last)
                                                    if (found != null && found != undefined && found.length > 0) {
                                                        // setElementTags(element.id, found[0].id)
                                                        setElementTags(element, found.map(e => e.name))
                                                    }
                                                    else {
                                                        console.log("Haven't found, need to add")
                                                        tagElementWithNonExistingTag(element, last)
                                                    }
                                                }
                                                if (reason == "removeOption") {
                                                    console.log("tags left", value)
                                                    setElementTags(element, value)
                                                }
                                                if (reason == "selectOption") {
                                                    var last = value.at(-1)
                                                    var newtags
                                                    console.log("value", value, "actual", element.tags)
                                                    if (element.tags == undefined)
                                                        newtags = [last.name]
                                                    else
                                                        newtags = element.tags
                                                    newtags.push(last.name)
                                                    // setElementTags(element.id, last.id)
                                                    setElementTags(element, newtags)

                                                }
                                                if (reason == "clear") {
                                                }
                                            }}
                                            // sx={{ width: '500px' }}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2" key={element["index"]} onClick={(e) => {handleEdit(element["index"], element);}}>
                                            <span className="sr-only">Edit</span>
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                                <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 00-.064.108l-.558 1.953 1.953-.558a.253.253 0 00.108-.064zm1.238-3.763a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354z" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="p-2">
                                        <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2" key={element["index"]} onClick={(e) => {handleDelete(element["index"], element);}}>
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
                    <Stack spacing={2} className="px-5 py-8 sm:justify-center sm:items-center" >
                        <Pagination count={Math.round(balancesDataCount / 20)} variant="outlined" color="primary"
                                    showFirstButton showLastButton page={page} onChange={handleChange} />
                    </Stack>
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
                        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => {handleMultiTag();}}>
                            <svg viewBox="0 0 16 16" width="16" height="16" className="w-4 h-4 fill-current opacity-50 shrink-0">
                                <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.752 1.752 0 011 7.775zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 00.354 0l5.025-5.025a.25.25 0 000-.354l-6.25-6.25a.25.25 0 00-.177-.073H2.75a.25.25 0 00-.25.25zM6 5a1 1 0 110 2 1 1 0 010-2z"></path>
                            </svg>
                            <span className="hidden xs:block ml-2">Tag</span>
                        </button>
                    </div>
                    {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => {handleSave()}}>
              <svg viewBox="0 0 16 16" width="16" height="16" className="w-4 h-4 fill-current opacity-50 shrink-0" >
                <path d="M0 8a8 8 0 1116 0A8 8 0 010 8zm1.5 0a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm10.28-1.72l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.751.751 0 01.018-1.042.751.751 0 011.042-.018l1.47 1.47 3.97-3.97a.751.751 0 011.042.018.751.751 0 01.018 1.042z"></path>
              </svg>                  
              <span className="hidden xs:block ml-2">Save</span>
            </button>
          </div> */}
                </div>
            </footer>
        </div>
    );
}

export default ExpenseTable;
