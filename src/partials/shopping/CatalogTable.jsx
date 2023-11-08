// import { TagsInput } from "react-tag-input-component";
import React, {useContext, useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {GenericFilterContext} from "../../contexts/TimeFilterContext";
import Stack from '@mui/material/Stack';
import {Snackbar} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

const handleOnSubmit = (e, key) => {
    e.preventDefault();
    console.log(key)
    console.log(e)
};


const mockDataValues = {
    "balances": [
        {
            "id": "637941dcabf0ffe141487282",
            "name": "מלפפון",
            "pictureUrl": "data:image/jpeg;base64,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",
            "description": "",
            "deal-date": "2022-11-19T22:51:40.128+02:00",
            "tags": ["aa"]
        },
        {
            "id": "637941dcabf0ffe141487283",
            "name": "עגבניות",
            "pictureUrl": "https://t4.ftcdn.net/jpg/03/27/96/23/360_F_327962332_6mb5jQLnTOjhYeXML7v45Hc5eED2GYOD.jpg",
            "description": "",
            "deal-date": "2022-11-19T22:51:40.264+02:00"
        },
        {
            "id": "637941dcabf0ffe141487284",
            "name": "מנגו",
            "pictureUrl": "https://product-images.metro.ca/images/hf6/ha2/10460988473374.jpg",
            "description": "",
            "deal-date": "2022-11-19T22:51:40.39+02:00"
        },
        {
            "id": "637941dcabf0ffe141487285",
            "name": "44",
            "pictureUrl": 173,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.521+02:00"
        },
        {
            "id": "637941dcabf0ffe141487286",
            "name": "מקס סטוק אור עקיבא",
            "pictureUrl": 123.4,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.648+02:00"
        },
        {
            "id": "637941dcabf0ffe141487287",
            "name": "רהיטי מוניטין בעמ",
            "pictureUrl": 3800,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.776+02:00"
        },
        {
            "id": "637941dcabf0ffe141487288",
            "name": "מאפה נאמן",
            "pictureUrl": 19.9,
            "description": "",
            "deal-date": "2022-11-19T22:51:40.91+02:00"
        },
        {
            "id": "637941ddabf0ffe141487289",
            "name": "בנהפ BIT העברה ב",
            "pictureUrl": 600,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.036+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728a",
            "name": "טוטם טיפוס בעמ",
            "pictureUrl": 29,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.171+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728b",
            "name": "בנהפ BIT העברה ב",
            "pictureUrl": 150,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.297+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728c",
            "name": "רשות הטבע והגנים עין",
            "pictureUrl": 39,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.426+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728d",
            "name": "ראמה -הגליל חב' הדלק",
            "pictureUrl": 320.03,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.555+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728e",
            "name": "דבאח ביג מרקט מעלות",
            "pictureUrl": 27.57,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.686+02:00"
        },
        {
            "id": "637941ddabf0ffe14148728f",
            "name": "שופרסל שלי בנימינה",
            "pictureUrl": 310.09,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.814+02:00"
        },
        {
            "id": "637941ddabf0ffe141487290",
            "name": "בנהפ BIT העברה ב",
            "pictureUrl": 120,
            "description": "",
            "deal-date": "2022-11-19T22:51:41.942+02:00"
        },
        {
            "id": "637941deabf0ffe141487291",
            "name": "14369001 #PAYPAL *G",
            "pictureUrl": 120,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.091+02:00"
        },
        {
            "id": "637941deabf0ffe141487292",
            "name": "בנהפ BIT העברה ב",
            "pictureUrl": 280,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.218+02:00"
        },
        {
            "id": "637941deabf0ffe141487293",
            "name": "בנהפ BIT העברה ב",
            "pictureUrl": 500.5,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.349+02:00"
        },
        {
            "id": "637941deabf0ffe141487294",
            "name": "מועצה מקומית בנימינה",
            "pictureUrl": 25,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.476+02:00"
        },
        {
            "id": "637941deabf0ffe141487295",
            "name": "NTAIN VIEW#GOOGLE ST",
            "pictureUrl": 8,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.606+02:00"
        },
        {
            "id": "637941deabf0ffe141487296",
            "name": "NTAIN VIEW#GOOGLE YO",
            "pictureUrl": 23.9,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.734+02:00"
        },
        {
            "id": "637941deabf0ffe141487297",
            "name": "PAYBOX",
            "pictureUrl": 400,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.865+02:00"
        },
        {
            "id": "637941deabf0ffe141487298",
            "name": "קרן מכבי- חיוב",
            "pictureUrl": 94.86,
            "description": "",
            "deal-date": "2022-11-19T22:51:42.998+02:00"
        },
        {
            "id": "637941dfabf0ffe141487299",
            "name": "דואלי חניונים",
            "pictureUrl": 35,
            "description": "",
            "deal-date": "2022-11-19T22:51:43.13+02:00"
        },
        {
            "id": "637941dfabf0ffe14148729a",
            "name": "סופר אלונית",
            "pictureUrl": 368.16,
            "description": "",
            "deal-date": "2022-11-19T22:51:43.261+02:00"
        },
        {
            "id": "637941dfabf0ffe14148729b",
            "name": "אקספרס-גמא KSP",
            "pictureUrl": 110,
            "description": "",
            "deal-date": "2022-11-19T22:51:43.386+02:00"
        },
        {
            "id": "637941dfabf0ffe14148729c",
            "name": "בנהפ BIT העברה ב",
            "pictureUrl": 2280,
            "description": "",
            "deal-date": "2022-11-19T22:51:43.513+02:00"
        },
        {
            "id": "638553d474f093f4656da3df",
            "name": "",
            "pictureUrl": 11,
            "description": "ss",
            "deal-date": "2022-11-29T02:35:32.42+02:00"
        },
        {
            "id": "63b0ab24256c89b8a01a1d1e",
            "name": "העברה כלשהיא למען בדיקה",
            "pictureUrl": 444,
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

function CatalogTable() {

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")

    const [openMultiTagDialog, setOpenMultiTagDialog] = useState(false)

    const [openEntryEditDialog, setOpenEntryEditDialog] = useState(false)
    const [elementEditing, setElementEditing] = useState({})
    const [elementImage, setElementImage] = useState(null)

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
        if (tags === undefined || tags == null)
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

    function addElementsToCart(elementsId) {
        console.log("Going to add element to cart", elementsId)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ catalogIds: elementsId })
        };

        fetch('/api/shopping/carts/1234/items', requestOptions)
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

    function deleteElements(elementsId) {
        console.log("Going to delete element", elementsId)

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: elementsId })
        };

        fetch('/api/shopping/catalog', requestOptions)
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
            if (e["id"] === id) {
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

    const handleAddToCart = (index, element) => {
        console.error(index, element)
        addElementsToCart([element.id])
    }

    const handleEdit = (index, element) => {
        console.log("Open screen for editing", index, element)
        const elementClone = {};
        elementClone.id = element.id
        elementClone.name = element.name
        elementClone.description = element.description
        elementClone.pictureUrl = element.pictureUrl
        if (element.tags === undefined)
            elementClone.tags = []
        else
            elementClone.tags = element.tags
        setElementImage(elementClone.pictureUrl)
        setElementEditing(elementClone);
        setOpenEntryEditDialog(true)
    }

    const handleMultiRemove = () => {
        var deleteTargets = balancesData.filter(e => {return e["selected"] === true}).map(e => e.id)
        deleteElements(deleteTargets)
        var a = balancesData.filter(e => {return e["selected"] !== true})
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

        function internalExec(data, handleSuccess, handleFail) {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };

            fetch('/api/shopping/catalog/' + data.id, requestOptions)
                .then((response) => response.json())
                .then((tdata) => {
                    handleSuccess(tdata)
                })
                .catch((err) => {
                    handleFail(err)
                });
        }

        function successHandler(data) {
            console.log(data);
            setElementImage(null)
            setElementEditing({})
            setOpenEntryEditDialog(false)
        }

        function failureHandler(err) {
            console.error(err.message);
            promptError(err.message)
        }

        console.log("Going to update element to", elementEditing)

        console.log("element", elementEditing)
        if (elementImage === null) {
            const reader = new FileReader();
            reader.onload = (e) => {
                elementEditing.image = e.target.result
                elementEditing.pictureUrl = null

                internalExec(elementEditing, successHandler, failureHandler)
            };

            console.log(elementImage)
            reader.readAsDataURL(elementImage);
        }
        else {
            internalExec(elementEditing, successHandler, failureHandler)
        }

        // const requestOptions = {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(elementEditing)
        // };
        //
        // fetch('/api/shopping/catalog/' + elementEditing.id, requestOptions)
        //     .then((response) => response.json())
        //     .then((tdata) => {
        //         console.log(tdata);
        //         setElementImage(null)
        //         setElementEditing({})
        //         setOpenEntryEditDialog(false)
        //     })
        //     .catch((err) => {
        //         console.error(err.message);
        //         promptError(err.message)
        //     });

    }

    function handleCloseMultiTagDialog() {
        setOpenMultiTagDialog(false)
        setMultiTagsValue([])
    }

    function handleEntryEditDialogClose() {
        setOpenEntryEditDialog(false)
        setElementImage(null)
        setElementEditing({})
        // setMultiTagsValue([])
    }

    const handleImageChange = (e) => {
        console.log("Image loaded")
        const file = e.target.files[0]
        elementEditing.pictureUrl = URL.createObjectURL(file)
        setElementEditing(elementEditing)
        setElementImage(file)
    };

    const handleImageIgnore = (e) => {
        console.log("Ignore Image")
        elementEditing.pictureUrl = null
        setElementEditing(elementEditing)
        setElementImage(null)
    };

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
                    {balancesData.filter(e => e.selected !== undefined && e.selected === true).length} Elements are going to be tags.
                    <p/>
                    Please select tags below
                    <Autocomplete
                        multiple
                        limitTags={10}
                        id="multiple-limit-tags"
                        options={availableTags.map(e => e.name)}
                        getOptionLabel={(option) => {if (option !== undefined && option.name !== undefined) {return option.name} else {return option}} }
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
            <Dialog open={openEntryEditDialog} onClose={handleEntryEditDialogClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>

                        <TextField id="name" label="Name" variant="standard" defaultValue={elementEditing["name"]} onChange={value => elementEditing["name"] = value.target.value}/>
                        <TextField id="description" label="Description" variant="standard" defaultValue={elementEditing.description} onChange={value => elementEditing.description = value.target.value}/>
                        {!elementEditing.pictureUrl &&
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
                        {elementEditing.pictureUrl &&
                            <div className="image-container">
                                <button className="image-close-button"  onClick={(e) => {handleImageIgnore(e);}}>
                                    X
                                </button>
                                <img
                                    src={elementEditing.pictureUrl}
                                    alt="Selected"
                                    width="200"
                                />
                            </div>
                        }
                        {/*<Autocomplete*/}
                        {/*    multiple*/}
                        {/*    limitTags={10}*/}
                        {/*    // id="multiple-limit-tags"*/}
                        {/*    options={availableTags.map(e => e.name)}*/}
                        {/*    getOptionLabel={(option) => {if (option !== undefined && option.name !== undefined) {return option.name} else {return option}} }*/}
                        {/*    // freeSolo={true}*/}
                        {/*    value={(elementEditing.tags === undefined) ? [] : elementEditing.tags}*/}
                        {/*    renderInput={(params) => (*/}
                        {/*        <TextField variant="standard" size='small' {...params} placeholder="..." />*/}
                        {/*    )}*/}
                        {/*    onChange={(event, value, reason) => elementEditing.tags = value}*/}
                        {/*/>*/}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEntryEditDialogClose}>Cancel</Button>
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
                            <th className="p-2">
                                <div className="font-semibold text-center">Carts</div>
                            </th>
                            {/*<th className="p-2">*/}
                            {/*    <div className="font-semibold text-center">Tags</div>*/}
                            {/*</th>*/}
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
                                    <td className="p-2">
                                        <div className="text-center text-sky-500">{(element.card === undefined) ? "-" : element.card}</div>
                                    </td>
                                    {/*<td className="p-2">*/}
                                    {/*    <div className="text-center text-sky-500">*/}
                                    {/*        {element.card == "2194\r" ? <a href="/Rotem Martsiano Shkedi">Rotem Martsiano Shkedi</a> : ""}*/}
                                    {/*        {element.card == "6594\r" ? <a href="/Rotem Martsiano Shkedi">Rotem Martsiano Shkedi</a> : ""}*/}
                                    {/*        {element.card === "6602\r" ? <a href="/Tal Martsiano Shkedi">Tal Martsiano Shkedi</a> : ""}*/}
                                    {/*    </div>*/}
                                    {/*</td>*/}
                                    {/*<td className="p-2">*/}
                                    {/*    <Autocomplete*/}
                                    {/*        multiple*/}
                                    {/*        limitTags={2}*/}
                                    {/*        id="multiple-limit-tags"*/}
                                    {/*        options={availableTags}*/}
                                    {/*        getOptionLabel={(option) => {if (option != undefined && option.name !== undefined) {return option.name} else {return option}} }*/}
                                    {/*        freeSolo={true}*/}
                                    {/*        // defaultValue={}*/}
                                    {/*        // value={getTagNames(element.id)}*/}
                                    {/*        value={getTags(element.tags)}*/}
                                    {/*        renderInput={(params) => (*/}
                                    {/*            <TextField variant="standard" size='small' {...params} placeholder="..." />*/}
                                    {/*        )}*/}
                                    {/*        onChange={(event, value, reason) => {*/}
                                    {/*            console.log('event: ', event);*/}
                                    {/*            console.log('reason: ', reason);*/}
                                    {/*            if (reason === "createOption" && value != null) {*/}
                                    {/*                console.log("value", value, "actual", element.tags)*/}
                                    {/*                var last = value.at(-1)*/}
                                    {/*                var found = availableTags.filter((value) => value.name == last)*/}
                                    {/*                if (found != null && found.length > 0) {*/}
                                    {/*                    // setElementTags(element.id, found[0].id)*/}
                                    {/*                    setElementTags(element, found.map(e => e.name))*/}
                                    {/*                }*/}
                                    {/*                else {*/}
                                    {/*                    console.log("Haven't found, need to add")*/}
                                    {/*                    tagElementWithNonExistingTag(element, last)*/}
                                    {/*                }*/}
                                    {/*            }*/}
                                    {/*            if (reason === "removeOption") {*/}
                                    {/*                console.log("tags left", value)*/}
                                    {/*                setElementTags(element, value)*/}
                                    {/*            }*/}
                                    {/*            if (reason === "selectOption") {*/}
                                    {/*                var last = value.at(-1)*/}
                                    {/*                var newtags*/}
                                    {/*                console.log("value", value, "actual", element.tags)*/}
                                    {/*                if (element.tags === undefined)*/}
                                    {/*                    newtags = [last.name]*/}
                                    {/*                else*/}
                                    {/*                    newtags = element.tags*/}
                                    {/*                newtags.push(last.name)*/}
                                    {/*                // setElementTags(element.id, last.id)*/}
                                    {/*                setElementTags(element, newtags)*/}

                                    {/*            }*/}
                                    {/*            if (reason === "clear") {*/}
                                    {/*            }*/}
                                    {/*        }}*/}
                                    {/*        // sx={{ width: '500px' }}*/}
                                    {/*    />*/}
                                    {/*</td>*/}
                                    <td className="p-2">
                                        <button
                                            className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                                            key={element["index"]}
                                            onClick={(e) => {handleEdit(element["index"], element);}}>
                                            <span className="sr-only">Edit</span>
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                                <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 00-.064.108l-.558 1.953 1.953-.558a.253.253 0 00.108-.064zm1.238-3.763a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354z" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="p-2">
                                        <button
                                            className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2"
                                            key={element["index"]}
                                            onClick={(e) => {handleDelete(element["index"], element);}}>
                                            <span className="sr-only">Delete</span>
                                            <DeleteForeverRoundedIcon/>
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
                </div>
            </footer>
        </div>
    );
}

export default CatalogTable;
