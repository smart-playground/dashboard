import React, { useContext, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { GenericFilterContext } from "../../contexts/TimeFilterContext";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const mockValues = {
    "tags": [
        {
            "id": "63aea7ffd2898531072c3cb1",
            "name": "משכורת"
        },
        {
            "id": "63aff9445f8233042c97c4d2",
            "name": "דירה"
        },
        {
            "id": "63b07b7e49d507f2101f6b49",
            "name": "קניות"
        },
        {
            "id": "63b08f520cfb7c2f7692ffff",
            "name": "אוכל"
        }
    ]
}

function Tagspicker() {

    const { setElementsTags } = useContext(GenericFilterContext);

    const [tagOptions, setTagOptions] = useState([]);

    const [tagsToSearch, setTagsToSearch] = useState([])
    const [noTags, setNoTags] = React.useState(false);

    useEffect(() => {
        setElementsTags(tagsToSearch);
    }, [tagsToSearch]);

    const handleChange = () => {
        setNoTags(!noTags);
        if (!noTags === true) {
            setElementsTags(["NO-TAGS"])
        }
        else {
            setElementsTags(tagsToSearch)
        }
    };

    useEffect(() => {
        /////////////////
        fetch('/api/tags/get-all',
            {headers: {'Content-Type': 'application/json'}})
            .then((response) => response.json())
            .then((tags) => {
                console.log(tags);
                setTagOptions(tags["tags"]);
            })
            .catch((err) => {
                console.log(err.message);
                setTagOptions(mockValues["tags"])
            });
    }, []);

    return (
        <div className="flex">
            <ToggleButtonGroup
                color="primary"
                size="small"
                value={noTags}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value={true}>No Tags</ToggleButton>
            </ToggleButtonGroup>
            <Autocomplete
                disabled={noTags}
                multiple
                size="small"
                onChange={(event, newValue) => {
                    var normalized = newValue.map((opt) => {return opt.name})
                    setTagsToSearch(normalized)
                }}
                options={tagOptions}
                getOptionLabel={(option) => option.name}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip
                            label={option.name}
                            {...getTagProps({ index })}
                            // disabled={fixedOptions.indexOf(option) !== -1}
                        />
                    ))
                }
                // style={{ width: max }}
                renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Select Tags" />
                )}
            />
        </div>
    );
}

export default Tagspicker;
