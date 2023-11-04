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

import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
// import {Editor} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import ContentState from "draft-js/lib/ContentState";

import { convertFromRaw } from 'draft-js';

const handleOnSubmit = (e, key) => {
    e.preventDefault();
    console.log(key)
    console.log(e)
};


const mockDataValues = {
    "balances": []
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


function NoteEditorComponent() {

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
        console.log("TAL")
        console.log(editorState.state)
        console.log("tal")
        setEditorState(editorState) }

    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
    }

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
            <div
                style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
                onClick={focusEditor}
            >
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={onEditorStateChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder="Enter some text..."
                />
            </div>

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

export default NoteEditorComponent;
