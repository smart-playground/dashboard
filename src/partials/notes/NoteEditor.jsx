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
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
// import {Editor} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import ContentState from "draft-js/lib/ContentState";

import { convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

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

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const [balancesData, setBalancesData] = useState([]);

    const [refetchAllTags, setRefetchAllTags] = useState(false)
    const [refetchTaggedElement, setRefetchTaggedElement] = useState(false)

    const genericFilterContext = useContext(GenericFilterContext);
    const {start, end, minCharge, maxCharge, InOut, tags, text } = genericFilterContext;

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


    const handleRemove = () => {
        var deleteTargets = balancesData.filter(e => {return e["selected"] == true}).map(e => e.id)
        // deleteElements(deleteTargets)
        var a = balancesData.filter(e => {return e["selected"] !== true})
        setBalancesData(a)
    }

    const handleSave = () => {
        console.log("Save")
        const raw = convertToRaw(editorState.getCurrentContent())
        console.log(draftToHtml(raw))

    }

    const handleCancel = () => {
        console.log("Cancel")
        const raw = convertToRaw(editorState.getCurrentContent())
        console.log(draftToHtml(raw))
    }

    const handleTag = () => {
        // setOpenMultiTagDialog(true)
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


    function promptError(message) {
        setSnackBarMessage(message)
        setOpenSnackBar(true)
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


        if (filters != "") {
            url = '/api/balances?filters=' + filters.substring(1) + '&'
            countUrl = '/api/balances-count?filters=' + filters.substring(1)
        } else {
            url = '/api/balances' + '?'
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
    }, [start, end, minCharge, maxCharge, InOut, tags, text, null]);

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


                <div className="overflow-x-auto">

                    <div className="col-span-full xl:col-span-8 bg-white  rounded-sm  gap-6 py-2">
                        <TextField
                            label="Title"
                            className="form-input text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-full "
                            size="small"
                            // onChange={handleTextChange}
                        />
                    </div>

                    <Editor
                        toolbarOnFocus
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        placeholder="Enter some text..."
                            hashtag={{
                                separator: ' ',
                                trigger: '#',
                            }}
                            mention={{
                                separator: ' ',
                                trigger: '@',
                                suggestions: [
                                    { text: 'APPLE', value: 'apple', url: 'apple' },
                                    { text: 'BANANA', value: 'banana', url: 'banana' },
                                    { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                                    { text: 'DURIAN', value: 'durian', url: 'durian' },
                                    { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                                    { text: 'FIG', value: 'fig', url: 'fig' },
                                    { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                                    { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                                ],
                            }}
                    />


                    <Stack spacing={2} className="px-5 py-8 sm:justify-center sm:items-center" >
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                            <button
                                className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3"
                                onClick={(e) => {handleSave(e);}}>
                                <SaveRoundedIcon className="w-4 h-4 fill-current opacity-50 shrink-0"/>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3" onClick={(e) => {handleCancel(e);}}>
                                {/*<svg viewBox="0 0 16 16" width="16" height="16" className="w-4 h-4 fill-current opacity-50 shrink-0" >*/}
                                {/*    <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z"></path>*/}
                                {/*</svg>*/}
                                <HighlightOffRoundedIcon className="w-4 h-4 fill-current opacity-50 shrink-0"/>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3" onClick={(e) => {handleRemove(e);}}>
                                <svg viewBox="0 0 16 16" width="16" height="16" className="w-4 h-4 fill-current opacity-50 shrink-0" >
                                    <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z"></path>
                                </svg>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3" onClick={() => {handleTag();}}>
                                <svg viewBox="0 0 16 16" width="16" height="16" className="w-4 h-4 fill-current opacity-50 shrink-0">
                                    <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.752 1.752 0 011 7.775zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 00.354 0l5.025-5.025a.25.25 0 000-.354l-6.25-6.25a.25.25 0 00-.177-.073H2.75a.25.25 0 00-.25.25zM6 5a1 1 0 110 2 1 1 0 010-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </Stack>
                </div>
             </div>
         </div>
    );
}

export default NoteEditorComponent;
