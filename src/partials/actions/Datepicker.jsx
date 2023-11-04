import React, {useContext, useState} from 'react';
import Flatpickr from 'react-flatpickr';
import { GenericFilterContext } from "../../contexts/TimeFilterContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Modal, Popover, Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment/moment";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Datepicker() {

    const { setDates } = useContext(GenericFilterContext);

    const [dateRangeText, setDateRangeText] = useState("Select Range")

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const options = {
        mode: 'range',
        static: true,
        monthSelectorType: 'static',
        inline: true,
        dateFormat: 'M j, Y',
        defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
        prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        onReady: (selectedDates, dateStr, instance) => {
            instance.element.value = dateStr.replace('to', '-');
        },
        onChange: (range, dateStr, instance) => {
            instance.element.value = dateStr.replace('to', '-');
            const start = range[0].valueOf()
            const end = range[1].valueOf()
            const selectedDates = [
                moment(start.valueOf()),//.format("YYYY-MM-DDTHH:mm:ssZZ"),
                moment(end.valueOf())//.format("YYYY-MM-DDTHH:mm:ssZZ")
            ];
            console.log("DATES >>>", selectedDates, dateStr)
            setDates(selectedDates)
            setDateRangeText(dateStr)
        },
    }

    function setQuickFilter(days, text) {
        const start = new Date().setDate(new Date().getDate() + days)
        const end = new Date()
        // moment(start).format("YYYY-MM-DDTHH:mm:ssZZ")
        const selectedDates = [
            moment(start.valueOf()).valueOf(),// .format("YYYY-MM-DDTHH:mm:ssZZ"),
            moment(end.valueOf()).valueOf()//.format("YYYY-MM-DDTHH:mm:ssZZ")
        ];
        console.log("DATES >>>", selectedDates)
        setDates(selectedDates)
        setDateRangeText(text)
    }

    return (
        <div className="relative">
            <Button variant="outlined" aria-describedby={id} onClick={handleClick} startIcon={<CalendarMonthIcon/>}>{dateRangeText}</Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Quick" {...a11yProps(0)} />
                        <Tab label="Custom" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Button variant="text" onClick={() => setQuickFilter(-7, "Last Week")}>Last Week</Button>
                        <Button variant="text" onClick={() => setQuickFilter(-30, "Last Month")}>Last Month</Button>
                        <Button variant="text" onClick={() => setQuickFilter(-6*4*30, "Last 6 Months")}>Last 6 Month</Button>
                        <Button variant="text" onClick={() => setQuickFilter(-365, "Last Year")}>Last Year</Button>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Flatpickr className="form-input pl-9 text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-60" options={options} />
                    </TabPanel>
                </Box>
            </Popover>
        </div>
    );
}

export default Datepicker;
