import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
// import VolumeDown from '@mui/icons-material/VolumeDown';
// import VolumeUp from '@mui/icons-material/VolumeUp';
import { GenericFilterContext } from "../../contexts/TimeFilterContext";
import TextField from '@mui/material/TextField';


function Chargespicker() {

  const { setChargeRangeMin, setChargeRangeMax } = useContext(GenericFilterContext);


  // const options = {
  //   mode: 'range',
  //   static: true,
  //   monthSelectorType: 'static',
  //   dateFormat: 'M j, Y',
  //   defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
  //   prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
  //   nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
  //   onReady: (selectedDates, dateStr, instance) => {
  //     instance.element.value = dateStr.replace('to', '-');
  //   },
  //   onChange: (selectedDates, dateStr, instance) => {
  //     instance.element.value = dateStr.replace('to', '-');
  //     console.log("DATES", selectedDates, dateStr)
  //     setDates(selectedDates)
  //   },
  // }

  const handleMinChange = (event) => {
    setChargeRangeMin(event.target.value);
  };

  const handleMaxChange = (event) => {
    setChargeRangeMax(event.target.value);
  };

  return (
    <div>
        {/* <Box sx={{ width: 300 }}> */}
        <TextField 
          label="Min Charge"
          className="form-input text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-20" 
          size="small"
          onChange={handleMinChange}
        />
        <TextField 
          label="Max Charge"
          className="form-input text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-20" 
          size="small"
          onChange={handleMaxChange}
        />
    </div>
  );
}

export default Chargespicker;
