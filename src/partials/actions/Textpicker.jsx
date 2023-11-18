import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { GenericFilterContext } from "../../contexts/TimeFilterContext";

function Textpicker(props) {

    console.log("Text Picker props", props.data)

    const [ pickerData, setPickerData ] = useState(props.data)

    function getLabel() {
        if (pickerData === undefined)
            return ""

        return props.data.label
    }

    const { setTextSearch } = useContext(GenericFilterContext);

    const handleTextChange = (event) => {
        setTextSearch(event.target.value);
    };

    return (
        <div className="relative">
            <TextField
                // label="Business Name"
                className="form-input text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-200"
                size="small"
                onChange={handleTextChange}
                label={getLabel()}
            />
        </div>
    );
}

export default Textpicker;
