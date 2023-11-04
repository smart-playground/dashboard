import React, { useContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { GenericFilterContext } from "../../contexts/TimeFilterContext";
import TextField from '@mui/material/TextField';


function InOutpicker() {

  const { inOut, setInOutToggle } = useContext(GenericFilterContext);

  const handleChange = (event, newAlignment) => {
    setInOutToggle(newAlignment);
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={inOut}
        exclusive
        onChange={handleChange}
        size="small"
        // aria-label="Platform"
      >
        <ToggleButton value={1}>In</ToggleButton>
        <ToggleButton value={-1}>Out</ToggleButton>
        <ToggleButton value={0}>All</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default InOutpicker;
