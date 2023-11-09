import React, {useEffect, useContext, useState} from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { GenericFilterContext} from "../../contexts/TimeFilterContext";

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function GeneralExpensePie() {

  const [expenseData, setExpenseData] = useState([])
  const [chartData, setChartData] = useState([])


  const genericFilterContext = useContext(GenericFilterContext);
  const {start, end, tags } = genericFilterContext;


  useEffect(() => {
    var url

    var filters = ""
    if (start != null && start != "") filters = filters + ',start:' + start
    if (end != null && end != "") filters = filters + ',end:' + end
    if (tags != "") filters = filters + ',tags:' + tags.join(":")
    console.log("Filter = ", filters)

    if (filters != "") {
      url = '/api/expenses-summery?filters=' + filters.substring(1)
    } else {
      url = '/api/expenses-summery'
    }
    fetch(url,
        {headers: {'Content-Type': 'application/json'}})
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["expenses"] != null) setExpenseData(data["expenses"]);
          else setExpenseData([])

        })
        .catch((err) => {
          console.error(err.message);
          setExpenseData([])
        });
  }, [start, end, tags]);

  useEffect(() => {
    console.log("TALMA - expenseData was changed to '", expenseData, "'")

    var tags = expenseData.map(e => e["tag"])
    var expenses = expenseData.map(e => -e["expense"])

    const STAT = 400
    const SELECT = 800
    var backgroundColor = [
      tailwindConfig().theme.colors.indigo[STAT],
      tailwindConfig().theme.colors.blue[STAT],
      tailwindConfig().theme.colors.red[STAT],
      tailwindConfig().theme.colors.yellow[STAT],
      tailwindConfig().theme.colors.green[STAT],
      tailwindConfig().theme.colors.orange[STAT],
      tailwindConfig().theme.colors.purple[STAT],
      tailwindConfig().theme.colors.teal[STAT],
      tailwindConfig().theme.colors.pink[STAT],
      tailwindConfig().theme.colors.sky[STAT],
      tailwindConfig().theme.colors.stone[STAT],
    ]

    var hoverBackgroundColor = [
      tailwindConfig().theme.colors.indigo[SELECT],
      tailwindConfig().theme.colors.blue[SELECT],
      tailwindConfig().theme.colors.red[SELECT],
      tailwindConfig().theme.colors.yellow[SELECT],
      tailwindConfig().theme.colors.green[SELECT],
      tailwindConfig().theme.colors.orange[SELECT],
      tailwindConfig().theme.colors.purple[SELECT],
      tailwindConfig().theme.colors.teal[SELECT],
      tailwindConfig().theme.colors.pink[SELECT],
      tailwindConfig().theme.colors.sky[SELECT],
      tailwindConfig().theme.colors.stone[SELECT],
    ]


    console.log("TALMA - label '", tags, "'")
    console.log("TALMA - expenses '", expenses, "'")
    const chartData = {
      labels: tags,
      datasets: [
        {
          label: 'Top Expenses',
          data: expenses,
          backgroundColor: backgroundColor.slice(tags.length % backgroundColor.length),
          hoverBackgroundColor: hoverBackgroundColor.slice(tags.length % hoverBackgroundColor.length),
          hoverBorderColor: tailwindConfig().theme.colors.white,
        },
      ],
    };
    setChartData(chartData)
  }, [expenseData]);

  return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Top Expenses</h2>
        </header>
        {/* Chart built with Chart.js 3 */}
        {/* Change the height attribute to adjust the chart height */}
        <DoughnutChart data={chartData} width={389} height={260} />
      </div>
  );
}

export default GeneralExpensePie;
