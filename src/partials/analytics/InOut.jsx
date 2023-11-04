import React, { useEffect, useState, useContext} from 'react';
import LineChartRealTime from '../../charts/LineChartRealTime';
import EditMenu from '../EditMenu';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { GenericFilterContext} from "../../contexts/TimeFilterContext";


// Import utilities
import { tailwindConfig } from '../../utils/Utils';

const mockDataValues = {
    "balances": [
        {
            "id": "63b9d78a3bbb4ec143e856c8",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-01-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856c9",
            "business-name": "בינלאומי-משכנתא",
            "charge": -5962.87,
            "description": "",
            "deal-date": "2022-01-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856ca",
            "business-name": "עיריית אור-עקיב",
            "charge": 5568.72,
            "description": "",
            "deal-date": "2022-01-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856cb",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-01-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856cc",
            "business-name": "2084058 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-01-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856cd",
            "business-name": "זיכוי מב.פועלים",
            "charge": 250,
            "description": "",
            "deal-date": "2022-01-05T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856ce",
            "business-name": "2084044 משיכת שיק",
            "charge": -3200,
            "description": "",
            "deal-date": "2022-01-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856cf",
            "business-name": "משכורת",
            "charge": 24082.1,
            "description": "",
            "deal-date": "2022-01-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d0",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -380.12,
            "description": "",
            "deal-date": "2022-01-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d1",
            "business-name": "0234 - כרטיסי אשראי לי",
            "charge": -963.42,
            "description": "",
            "deal-date": "2022-01-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d2",
            "business-name": "0242 - כרטיסי אשראי לי",
            "charge": -1509.37,
            "description": "",
            "deal-date": "2022-01-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d3",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -2300.19,
            "description": "",
            "deal-date": "2022-01-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d4",
            "business-name": "2194 - ישראכרט",
            "charge": -8332.97,
            "description": "",
            "deal-date": "2022-01-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d5",
            "business-name": "מס-הכנסה החזרים",
            "charge": 208,
            "description": "",
            "deal-date": "2022-01-13T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d6",
            "business-name": "זיכוי מב.פועלים",
            "charge": 100,
            "description": "",
            "deal-date": "2022-01-14T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d7",
            "business-name": "דנ'ח ניע תקופתי",
            "charge": -91.31,
            "description": "",
            "deal-date": "2022-01-16T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d8",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-01-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856d9",
            "business-name": "העברה מהחשבון",
            "charge": -1600,
            "description": "",
            "deal-date": "2022-01-23T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856da",
            "business-name": "העמותה לילדים ב",
            "charge": 4802,
            "description": "",
            "deal-date": "2022-01-31T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856db",
            "business-name": "(עמלת פעולה בערוץ ישיר (17 פעולות",
            "charge": -30.6,
            "description": "",
            "deal-date": "2022-02-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856dc",
            "business-name": "בינלאומי-משכנתא",
            "charge": -5966.9,
            "description": "",
            "deal-date": "2022-02-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856dd",
            "business-name": "2084045 משיכת שיק",
            "charge": -3200,
            "description": "",
            "deal-date": "2022-02-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856de",
            "business-name": "עיריית אור-עקיב",
            "charge": 5619.97,
            "description": "",
            "deal-date": "2022-02-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856df",
            "business-name": "2084059 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-02-04T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e0",
            "business-name": "משכורת",
            "charge": 23998.28,
            "description": "",
            "deal-date": "2022-02-07T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e1",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -1707.18,
            "description": "",
            "deal-date": "2022-02-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e2",
            "business-name": "0234 - כרטיסי אשראי לי",
            "charge": -4503.7,
            "description": "",
            "deal-date": "2022-02-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e3",
            "business-name": "0242 - כרטיסי אשראי לי",
            "charge": -6851.44,
            "description": "",
            "deal-date": "2022-02-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e4",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -9711.86,
            "description": "",
            "deal-date": "2022-02-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e5",
            "business-name": "2194 - ישראכרט",
            "charge": -5588.94,
            "description": "",
            "deal-date": "2022-02-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e6",
            "business-name": "זיכוי מב.פועלים",
            "charge": 75,
            "description": "",
            "deal-date": "2022-02-13T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e7",
            "business-name": "העברה מהחשבון",
            "charge": -2000,
            "description": "",
            "deal-date": "2022-02-17T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e8",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-02-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856e9",
            "business-name": "זיכוי מב.פועלים",
            "charge": 170,
            "description": "",
            "deal-date": "2022-02-23T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856ea",
            "business-name": "העמותה לילדים ב",
            "charge": 5713.4,
            "description": "",
            "deal-date": "2022-02-28T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856eb",
            "business-name": "(עמלת פעולה בערוץ ישיר (14 פעולות",
            "charge": -25.2,
            "description": "",
            "deal-date": "2022-03-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856ec",
            "business-name": "בינלאומי-משכנתא",
            "charge": -5969.58,
            "description": "",
            "deal-date": "2022-03-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856ed",
            "business-name": "2084060 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-03-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856ee",
            "business-name": "עיריית אור-עקיב",
            "charge": 5619.97,
            "description": "",
            "deal-date": "2022-03-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856ef",
            "business-name": "(הפקדת שיק בסלולר (2 שיקים",
            "charge": 10000,
            "description": "",
            "deal-date": "2022-03-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f0",
            "business-name": "משכורת",
            "charge": 24109.93,
            "description": "",
            "deal-date": "2022-03-07T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f1",
            "business-name": "2084046 משיכת שיק",
            "charge": -3200,
            "description": "",
            "deal-date": "2022-03-08T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f2",
            "business-name": "0234 - כרטיסי אשראי לי",
            "charge": -816.52,
            "description": "",
            "deal-date": "2022-03-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f3",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -1825.38,
            "description": "",
            "deal-date": "2022-03-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f4",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -2986.42,
            "description": "",
            "deal-date": "2022-03-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f5",
            "business-name": "2194 - ישראכרט",
            "charge": -4512.98,
            "description": "",
            "deal-date": "2022-03-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f6",
            "business-name": "העברה מהחשבון",
            "charge": -1200,
            "description": "",
            "deal-date": "2022-03-13T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f7",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-03-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f8",
            "business-name": "העמותה לילדים ב",
            "charge": 5659.5,
            "description": "",
            "deal-date": "2022-03-31T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856f9",
            "business-name": "זיכוי מב.פועלים",
            "charge": 50,
            "description": "",
            "deal-date": "2022-03-31T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856fa",
            "business-name": "(עמלת פעולה בערוץ ישיר (13 פעולות",
            "charge": -23.4,
            "description": "",
            "deal-date": "2022-04-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856fb",
            "business-name": "בינלאומי-משכנתא",
            "charge": -5978.97,
            "description": "",
            "deal-date": "2022-04-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856fc",
            "business-name": "2084047 משיכת שיק",
            "charge": -3200,
            "description": "",
            "deal-date": "2022-04-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856fd",
            "business-name": "2084061 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-04-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856fe",
            "business-name": "עיריית אור-עקיב",
            "charge": 5619.97,
            "description": "",
            "deal-date": "2022-04-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e856ff",
            "business-name": "6736219 בנקט",
            "charge": -1000,
            "description": "",
            "deal-date": "2022-04-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85700",
            "business-name": "משכורת",
            "charge": 23998.28,
            "description": "",
            "deal-date": "2022-04-07T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85701",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -4325.66,
            "description": "",
            "deal-date": "2022-04-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85702",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -5271,
            "description": "",
            "deal-date": "2022-04-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85703",
            "business-name": "2194 - ישראכרט",
            "charge": -4930.36,
            "description": "",
            "deal-date": "2022-04-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85704",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-04-14T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85705",
            "business-name": "זיכוי מב.פועלים",
            "charge": 100,
            "description": "",
            "deal-date": "2022-04-15T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85706",
            "business-name": "דנ'ח ניע תקופתי",
            "charge": -202.58,
            "description": "",
            "deal-date": "2022-04-15T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85707",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-04-17T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85708",
            "business-name": "העמותה לילדים ב",
            "charge": 4904.9,
            "description": "",
            "deal-date": "2022-04-29T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85709",
            "business-name": "(עמלת פעולה בערוץ ישיר (12 פעולות",
            "charge": -21.6,
            "description": "",
            "deal-date": "2022-05-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8570a",
            "business-name": "בינלאומי-משכנתא",
            "charge": -5998.42,
            "description": "",
            "deal-date": "2022-05-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8570b",
            "business-name": "2084048 משיכת שיק",
            "charge": -3200,
            "description": "",
            "deal-date": "2022-05-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8570c",
            "business-name": "2084062 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-05-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8570d",
            "business-name": "עיריית אור-עקיב",
            "charge": 5619.97,
            "description": "",
            "deal-date": "2022-05-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8570e",
            "business-name": "5024660 מכשיר כספונט",
            "charge": -506.9,
            "description": "",
            "deal-date": "2022-05-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8570f",
            "business-name": "5024660 מכשיר כספונט",
            "charge": -506.9,
            "description": "",
            "deal-date": "2022-05-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85710",
            "business-name": "5024660 מכשיר כספונט",
            "charge": -506.9,
            "description": "",
            "deal-date": "2022-05-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85711",
            "business-name": "5024660 מכשיר כספונט",
            "charge": -506.9,
            "description": "",
            "deal-date": "2022-05-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85712",
            "business-name": "5024660 מכשיר כספונט",
            "charge": -506.9,
            "description": "",
            "deal-date": "2022-05-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85713",
            "business-name": "משכורת",
            "charge": 23998.29,
            "description": "",
            "deal-date": "2022-05-04T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85714",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -3202.59,
            "description": "",
            "deal-date": "2022-05-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85715",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -6440.18,
            "description": "",
            "deal-date": "2022-05-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85716",
            "business-name": "2194 - ישראכרט",
            "charge": -7275.73,
            "description": "",
            "deal-date": "2022-05-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85717",
            "business-name": "העברה מהחשבון",
            "charge": -1600,
            "description": "",
            "deal-date": "2022-05-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85718",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-05-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85719",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-05-27T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8571a",
            "business-name": "זיכוי מב.פועלים",
            "charge": 50,
            "description": "",
            "deal-date": "2022-05-27T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8571b",
            "business-name": "זיכוי מב.פועלים",
            "charge": 150,
            "description": "",
            "deal-date": "2022-05-27T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8571c",
            "business-name": "6214659 בנקט",
            "charge": -400,
            "description": "",
            "deal-date": "2022-05-27T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8571d",
            "business-name": "זיכוי מב.פועלים",
            "charge": 100,
            "description": "",
            "deal-date": "2022-05-29T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8571e",
            "business-name": "העמותה לילדים ב",
            "charge": 4125.8,
            "description": "",
            "deal-date": "2022-05-31T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8571f",
            "business-name": "(עמלת פעולה בערוץ ישיר (20 פעולות",
            "charge": -36,
            "description": "",
            "deal-date": "2022-06-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85720",
            "business-name": "בינלאומי-משכנתא",
            "charge": -6024.74,
            "description": "",
            "deal-date": "2022-06-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85721",
            "business-name": "2084049 משיכת שיק",
            "charge": -3200,
            "description": "",
            "deal-date": "2022-06-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85722",
            "business-name": "2084063 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-06-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85723",
            "business-name": "זיכוי מב.פועלים",
            "charge": 10,
            "description": "",
            "deal-date": "2022-06-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85724",
            "business-name": "עיריית אור-עקיב",
            "charge": 5618.15,
            "description": "",
            "deal-date": "2022-06-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85725",
            "business-name": "זיכוי מב.פועלים",
            "charge": 20,
            "description": "",
            "deal-date": "2022-06-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85726",
            "business-name": "משכורת",
            "charge": 23998.29,
            "description": "",
            "deal-date": "2022-06-07T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85727",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -3554.74,
            "description": "",
            "deal-date": "2022-06-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85728",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -4101.41,
            "description": "",
            "deal-date": "2022-06-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85729",
            "business-name": "2194 - ישראכרט",
            "charge": -4903.32,
            "description": "",
            "deal-date": "2022-06-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8572a",
            "business-name": "זיכוי מב.פועלים",
            "charge": 40,
            "description": "",
            "deal-date": "2022-06-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8572b",
            "business-name": "זיכוי מב.פועלים",
            "charge": 160,
            "description": "",
            "deal-date": "2022-06-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8572c",
            "business-name": "זיכוי מב.פועלים",
            "charge": 360,
            "description": "",
            "deal-date": "2022-06-12T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8572d",
            "business-name": "6224660 בנקט",
            "charge": -736,
            "description": "",
            "deal-date": "2022-06-12T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8572e",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-06-13T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8572f",
            "business-name": "הזמנת שיקים",
            "charge": -17.55,
            "description": "",
            "deal-date": "2022-06-14T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85730",
            "business-name": "6216219 בנקט",
            "charge": -600,
            "description": "",
            "deal-date": "2022-06-19T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85731",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-06-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85732",
            "business-name": "זיכוי מב.פועלים",
            "charge": 1600,
            "description": "",
            "deal-date": "2022-06-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85733",
            "business-name": "העברה מהחשבון",
            "charge": -1600,
            "description": "",
            "deal-date": "2022-06-27T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85734",
            "business-name": "זיכוי מב.פועלים",
            "charge": 300,
            "description": "",
            "deal-date": "2022-06-29T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85735",
            "business-name": "העמותה לילדים ב",
            "charge": 5796.7,
            "description": "",
            "deal-date": "2022-06-30T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85736",
            "business-name": "(עמלת פעולה בערוץ ישיר (20 פעולות",
            "charge": -36,
            "description": "",
            "deal-date": "2022-07-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85737",
            "business-name": "בינלאומי-משכנתא",
            "charge": -6061.54,
            "description": "",
            "deal-date": "2022-07-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85738",
            "business-name": "2084064 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-07-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85739",
            "business-name": "6216219 בנקט",
            "charge": -800,
            "description": "",
            "deal-date": "2022-07-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8573a",
            "business-name": "2084050 משיכת שיק",
            "charge": -3200,
            "description": "",
            "deal-date": "2022-07-05T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8573b",
            "business-name": "עיריית אור-עקיב",
            "charge": 7209.29,
            "description": "",
            "deal-date": "2022-07-05T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8573c",
            "business-name": "זיכוי מב.פועלים",
            "charge": 67,
            "description": "",
            "deal-date": "2022-07-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8573d",
            "business-name": "זיכוי מב.פועלים",
            "charge": 67,
            "description": "",
            "deal-date": "2022-07-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8573e",
            "business-name": "משכורת",
            "charge": 23999.11,
            "description": "",
            "deal-date": "2022-07-07T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8573f",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -1969.74,
            "description": "",
            "deal-date": "2022-07-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85740",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -5340.84,
            "description": "",
            "deal-date": "2022-07-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85741",
            "business-name": "2194 - ישראכרט",
            "charge": -8520.48,
            "description": "",
            "deal-date": "2022-07-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85742",
            "business-name": "דנ'ח ניע תקופתי",
            "charge": -194.32,
            "description": "",
            "deal-date": "2022-07-15T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85743",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-07-17T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85744",
            "business-name": "זיכוי מב.פועלים",
            "charge": 50,
            "description": "",
            "deal-date": "2022-07-18T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85745",
            "business-name": "זיכוי מב.פועלים",
            "charge": 50,
            "description": "",
            "deal-date": "2022-07-18T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85746",
            "business-name": "זיכוי מב.פועלים",
            "charge": 50,
            "description": "",
            "deal-date": "2022-07-18T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85747",
            "business-name": "זיכוי מב.פועלים",
            "charge": 55,
            "description": "",
            "deal-date": "2022-07-19T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85748",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-07-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85749",
            "business-name": "זיכוי מב.פועלים",
            "charge": 105,
            "description": "",
            "deal-date": "2022-07-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8574a",
            "business-name": "זיכוי מב.פועלים",
            "charge": 105,
            "description": "",
            "deal-date": "2022-07-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8574b",
            "business-name": "זיכוי מב.פועלים",
            "charge": 55,
            "description": "",
            "deal-date": "2022-07-21T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8574c",
            "business-name": "זיכוי מב.פועלים",
            "charge": 55,
            "description": "",
            "deal-date": "2022-07-21T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8574d",
            "business-name": "זיכוי מב.פועלים",
            "charge": 55,
            "description": "",
            "deal-date": "2022-07-21T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8574e",
            "business-name": "זיכוי מב.פועלים",
            "charge": 55,
            "description": "",
            "deal-date": "2022-07-21T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8574f",
            "business-name": "זיכוי מב.פועלים",
            "charge": 105,
            "description": "",
            "deal-date": "2022-07-21T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85750",
            "business-name": "זיכוי מב.פועלים",
            "charge": 55,
            "description": "",
            "deal-date": "2022-07-22T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85751",
            "business-name": "זיכוי מב.פועלים",
            "charge": 50,
            "description": "",
            "deal-date": "2022-07-24T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85752",
            "business-name": "זיכוי מב.פועלים",
            "charge": 55,
            "description": "",
            "deal-date": "2022-07-24T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85753",
            "business-name": "העמותה לילדים ב",
            "charge": 6014.26,
            "description": "",
            "deal-date": "2022-07-31T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85754",
            "business-name": "(עמלת פעולה בערוץ ישיר (27 פעולות",
            "charge": -48.6,
            "description": "",
            "deal-date": "2022-08-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85755",
            "business-name": "בינלאומי-משכנתא",
            "charge": -6100.33,
            "description": "",
            "deal-date": "2022-08-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85756",
            "business-name": "2084051 משיכת שיק",
            "charge": -3200,
            "description": "",
            "deal-date": "2022-08-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85757",
            "business-name": "2084067 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-08-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85758",
            "business-name": "עיריית אור-עקיב",
            "charge": 6422.22,
            "description": "",
            "deal-date": "2022-08-04T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85759",
            "business-name": "משכורת",
            "charge": 24391.94,
            "description": "",
            "deal-date": "2022-08-08T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8575a",
            "business-name": "זיכוי מב.פועלים",
            "charge": 700,
            "description": "",
            "deal-date": "2022-08-08T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8575b",
            "business-name": "6226219 בנקט",
            "charge": -3510,
            "description": "",
            "deal-date": "2022-08-08T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8575c",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -534.25,
            "description": "",
            "deal-date": "2022-08-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8575d",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -8111.24,
            "description": "",
            "deal-date": "2022-08-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8575e",
            "business-name": "2194 - ישראכרט",
            "charge": -14507.1,
            "description": "",
            "deal-date": "2022-08-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8575f",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-08-21T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85760",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-08-30T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85761",
            "business-name": "העמותה לילדים ב",
            "charge": 5346.88,
            "description": "",
            "deal-date": "2022-08-31T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85762",
            "business-name": "(עמלת פעולה בערוץ ישיר (12 פעולות",
            "charge": -21.6,
            "description": "",
            "deal-date": "2022-09-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85763",
            "business-name": "בינלאומי-משכנתא",
            "charge": -6138.78,
            "description": "",
            "deal-date": "2022-09-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85764",
            "business-name": "עיריית אור-עקיב",
            "charge": 5618.15,
            "description": "",
            "deal-date": "2022-09-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85765",
            "business-name": "2084069 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-09-04T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85766",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-09-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85767",
            "business-name": "משכורת",
            "charge": 25845.57,
            "description": "",
            "deal-date": "2022-09-07T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85768",
            "business-name": "2316880 משיכת שיק",
            "charge": -3300,
            "description": "",
            "deal-date": "2022-09-08T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85769",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -1086.91,
            "description": "",
            "deal-date": "2022-09-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8576a",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -8105.34,
            "description": "",
            "deal-date": "2022-09-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8576b",
            "business-name": "2194 - ישראכרט",
            "charge": -6442.28,
            "description": "",
            "deal-date": "2022-09-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8576c",
            "business-name": "9894660 כספומט ב",
            "charge": -105,
            "description": "",
            "deal-date": "2022-09-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8576d",
            "business-name": "זיכוי מב.פועלים",
            "charge": 320,
            "description": "",
            "deal-date": "2022-09-19T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8576e",
            "business-name": "6216219 בנקט",
            "charge": -800,
            "description": "",
            "deal-date": "2022-09-19T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8576f",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-09-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85770",
            "business-name": "זיכוי מב.פועלים",
            "charge": 110,
            "description": "",
            "deal-date": "2022-09-23T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85771",
            "business-name": "זיכוי מב.המזרחי",
            "charge": 840,
            "description": "",
            "deal-date": "2022-09-29T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85772",
            "business-name": "העמותה לילדים ב",
            "charge": 1703.24,
            "description": "",
            "deal-date": "2022-09-30T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85773",
            "business-name": "(עמלת פעולה בערוץ ישיר (15 פעולות",
            "charge": -27,
            "description": "",
            "deal-date": "2022-10-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85774",
            "business-name": "בינלאומי-משכנתא",
            "charge": -6187.59,
            "description": "",
            "deal-date": "2022-10-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85775",
            "business-name": "2316881 משיכת שיק",
            "charge": -3300,
            "description": "",
            "deal-date": "2022-10-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85776",
            "business-name": "עיריית אור-עקיב",
            "charge": 5599.18,
            "description": "",
            "deal-date": "2022-10-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85777",
            "business-name": "2084070 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-10-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85778",
            "business-name": "שרותי בריאות כל",
            "charge": 3985.19,
            "description": "",
            "deal-date": "2022-10-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85779",
            "business-name": "משכורת",
            "charge": 24477.09,
            "description": "",
            "deal-date": "2022-10-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8577a",
            "business-name": "זיכוי מבנק יהב",
            "charge": 1400,
            "description": "",
            "deal-date": "2022-10-07T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8577b",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -567.17,
            "description": "",
            "deal-date": "2022-10-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8577c",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -7218.2,
            "description": "",
            "deal-date": "2022-10-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8577d",
            "business-name": "2194 - ישראכרט",
            "charge": -9963.04,
            "description": "",
            "deal-date": "2022-10-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8577e",
            "business-name": "העברה מהחשבון",
            "charge": -2500,
            "description": "",
            "deal-date": "2022-10-14T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8577f",
            "business-name": "דנ'ח ניע תקופתי",
            "charge": -185.83,
            "description": "",
            "deal-date": "2022-10-16T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85780",
            "business-name": "זיכוי מב.פועלים",
            "charge": 100,
            "description": "",
            "deal-date": "2022-10-18T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85781",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-10-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85782",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-10-23T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85783",
            "business-name": "זיכוי מב.פועלים",
            "charge": 70,
            "description": "",
            "deal-date": "2022-10-26T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85784",
            "business-name": "זיכוי מב.פועלים",
            "charge": 210,
            "description": "",
            "deal-date": "2022-10-26T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85785",
            "business-name": "זיכוי מבנק יהב",
            "charge": 840,
            "description": "",
            "deal-date": "2022-10-31T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85786",
            "business-name": "זיכוי מב.המזרחי",
            "charge": 840,
            "description": "",
            "deal-date": "2022-10-31T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85787",
            "business-name": "(עמלת פעולה בערוץ ישיר (17 פעולות",
            "charge": -30.6,
            "description": "",
            "deal-date": "2022-11-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85788",
            "business-name": "(הפקדת שיק בסלולר (1 שיק",
            "charge": 5000,
            "description": "",
            "deal-date": "2022-11-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85789",
            "business-name": "בינלאומי-משכנתא",
            "charge": -6235.13,
            "description": "",
            "deal-date": "2022-11-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8578a",
            "business-name": "2084071 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-11-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8578b",
            "business-name": "2316882 משיכת שיק",
            "charge": -3300,
            "description": "",
            "deal-date": "2022-11-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8578c",
            "business-name": "עיריית אור-עקיב",
            "charge": 4420.22,
            "description": "",
            "deal-date": "2022-11-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8578d",
            "business-name": "6204660 בנקט",
            "charge": -200,
            "description": "",
            "deal-date": "2022-11-03T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8578e",
            "business-name": "שרותי בריאות כל",
            "charge": 3805.97,
            "description": "",
            "deal-date": "2022-11-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8578f",
            "business-name": "6216219 בנקט",
            "charge": -1000,
            "description": "",
            "deal-date": "2022-11-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85790",
            "business-name": "משכורת",
            "charge": 24477.09,
            "description": "",
            "deal-date": "2022-11-07T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85791",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -4878.64,
            "description": "",
            "deal-date": "2022-11-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85792",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -14601.7,
            "description": "",
            "deal-date": "2022-11-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85793",
            "business-name": "2194 - ישראכרט",
            "charge": -10913.4,
            "description": "",
            "deal-date": "2022-11-10T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85794",
            "business-name": "העברה מהחשבון",
            "charge": -850,
            "description": "",
            "deal-date": "2022-11-16T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85795",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-11-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85796",
            "business-name": "זיכוי מב.פועלים",
            "charge": 160,
            "description": "",
            "deal-date": "2022-11-23T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85797",
            "business-name": "זיכוי מב.המזרחי",
            "charge": 2240,
            "description": "",
            "deal-date": "2022-11-29T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85798",
            "business-name": "(עמלת פעולה בערוץ ישיר (15 פעולות",
            "charge": -27,
            "description": "",
            "deal-date": "2022-12-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e85799",
            "business-name": "בינלאומי-משכנתא",
            "charge": -6273.57,
            "description": "",
            "deal-date": "2022-12-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8579a",
            "business-name": "עיריית אור-עקיב",
            "charge": 10633.9,
            "description": "",
            "deal-date": "2022-12-01T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8579b",
            "business-name": "2084072 משיכת שיק",
            "charge": -5000,
            "description": "",
            "deal-date": "2022-12-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8579c",
            "business-name": "זיכוי מבנק יהב",
            "charge": 2240,
            "description": "",
            "deal-date": "2022-12-02T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8579d",
            "business-name": "העברה מהחשבון",
            "charge": -1170,
            "description": "",
            "deal-date": "2022-12-04T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8579e",
            "business-name": "שרותי בריאות כל",
            "charge": 4738.31,
            "description": "",
            "deal-date": "2022-12-05T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e8579f",
            "business-name": "2316883 משיכת שיק",
            "charge": -3300,
            "description": "",
            "deal-date": "2022-12-06T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e857a0",
            "business-name": "משכורת",
            "charge": 24477.1,
            "description": "",
            "deal-date": "2022-12-08T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e857a1",
            "business-name": "6594 - כרטיסי אשראי לי",
            "charge": -3604.01,
            "description": "",
            "deal-date": "2022-12-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e857a2",
            "business-name": "6602 - כרטיסי אשראי לי",
            "charge": -8020.86,
            "description": "",
            "deal-date": "2022-12-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e857a3",
            "business-name": "2194 - ישראכרט",
            "charge": -5108.37,
            "description": "",
            "deal-date": "2022-12-11T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e857a4",
            "business-name": "קצבת ילדים",
            "charge": 52,
            "description": "",
            "deal-date": "2022-12-20T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e857a5",
            "business-name": "זיכוי מב.המזרחי",
            "charge": 1400,
            "description": "",
            "deal-date": "2022-12-29T00:00:00Z"
        },
        {
            "id": "63b9d78a3bbb4ec143e857a6",
            "business-name": "(עמלת פעולה בערוץ ישיר (12 פעולות",
            "charge": -21.6,
            "description": "",
            "deal-date": "2022-12-30T00:00:00Z"
        }
    ]
}

function InOut() {

    const genericFilterContext = useContext(GenericFilterContext);
    const { start, end, tags } = genericFilterContext;
    useEffect(() => {
        console.log("InOut Filter",start, end, tags)
    }, [start, end, tags])

    const [balanceData, setBalanceData] = useState([])
    const [datesLabel, setDatesLabel] = useState([])
    const [output, setOutput] = useState([])
    const [input, setInput] = useState([])

    const [totalIncome, setTotalIncome] = useState(0)
    const [totalOutcome, setTotalOutcome] = useState(0)

    const [chartData, setChartData] = useState({})

    const [timeResolution, setTimeResolution] = useState('MMM YY')

    const handleSetTimeResolution = (event) => {
        console.log(event)
        console.log(event.target.value)
        setTimeResolution(event.target.value)
    }

    useEffect(() => {
        var url

        var filters = ""
        if (start != null && start != "") filters = filters + ',start:' + start
        if (end != null && end != "") filters = filters + ',end:' + end
        if (tags != "") filters = filters + ',tags:' + tags.join(":")
        console.log("Filter = ", filters)

        if (filters != "") {
            url = '/api/balances?filters=' + filters.substring(1)
        } else {
            url = '/api/balances'
        }
        fetch(url,
            Headers = {'Content-Type': 'application/json'})
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data["balances"] != null) setBalanceData(data["balances"]);
                else setBalanceData([])

            })
            .catch((err) => {
                console.log(err.message);
                setBalanceData(mockDataValues["balances"])
            });
    }, [start, end, tags]);

    useEffect(() => {
        if (balanceData != undefined && balanceData.length != 0) {
            var dates = balanceData.map(value => value["deal-date"])
            console.log("deal-dates", dates)
            setDatesLabel(dates)
        }
    }, [balanceData]);

    useEffect(() => {
        if (balanceData != undefined && balanceData.length != 0) {
            var charges = balanceData.map(value => {
                if (value["charge"] < 0) return -value["charge"]
                else return 0
            })
            // console.log("charges", charges)
            setOutput(charges)
            setTotalOutcome(charges.reduce((a,v) =>  a = a + v , 0))
        }
    }, [balanceData]);

    useEffect(() => {
        if (balanceData != undefined && balanceData.length != 0) {
            var charges = balanceData.map(value => {
                if (value["charge"] >= 0) return value["charge"]
                else return 0
            })
            // console.log("charges", charges)
            setInput(charges)
            setTotalIncome(charges.reduce((a,v) =>  a = a + v , 0))
        }
    }, [balanceData]);

    useEffect(() => {
        // console.error("talma", datesLabel)
        // console.error("talma", output)
        const cData = {
            labels: datesLabel,
            datasets: [
                // Indigo line
                {
                    label: 'Outcome',
                    data: output,
                    borderColor: tailwindConfig().theme.colors.red[500],
                    fill: false,
                    borderWidth: 2,
                    tension: 0,
                    pointRadius: 0,
                    pointHoverRadius: 3,
                    pointBackgroundColor: tailwindConfig().theme.colors.red[500],
                },
                // Blue line
                {
                    label: 'Income',
                    data: input,
                    borderColor: tailwindConfig().theme.colors.green[400],
                    fill: false,
                    borderWidth: 2,
                    tension: 0,
                    pointRadius: 0,
                    pointHoverRadius: 3,
                    pointBackgroundColor: tailwindConfig().theme.colors.green[400],
                },
                // Green line
                // {
                //   label: 'Average',
                //   data: [
                //     122, 170, 192, 86, 102, 124, 115,
                //     115, 56, 104, 0, 72, 208, 186,
                //     223, 188, 114, 162, 200, 150, 118,
                //     118, 76, 122, 230, 268,
                //   ],
                //   borderColor: tailwindConfig().theme.colors.blue[500],
                //   fill: false,
                //   borderWidth: 2,
                //   tension: 0,
                //   pointRadius: 0,
                //   pointHoverRadius: 3,
                //   pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
                // },
            ],
        }
        setChartData(cData)
    }, [datesLabel, output, input]);

    return (
        <div className="flex flex-col col-span-full sm:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100 flex items-center flex justify-between">
                <h2 className="font-semibold text-slate-800">Balance</h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            <LineChartRealTime data={chartData} totalIncome={totalIncome} totalOutcome={totalOutcome} width={595} height={248} timeResolution={timeResolution}/>
        </div>
    );
}

export default InOut;
