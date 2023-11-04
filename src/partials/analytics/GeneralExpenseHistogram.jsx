import React, {useEffect, useContext, useState} from 'react';
import BarChart from '../../charts/BarChart01';
import { GenericFilterContext} from "../../contexts/TimeFilterContext";

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function GeneralExpenseHistogram() {

  const [expenseData, setExpenseData] = useState([])

  const [chartData, setChartData] = useState([])


  const genericFilterContext = useContext(GenericFilterContext);
  const {start, end, tags } = genericFilterContext;
  useEffect(() => {
    console.log("GeneralExpenseHistorgram Filter",start, end, tags)
  }, [start, end, tags])

  useEffect(() => {
    var url

    var filters = ""
    if (start != null && start != "") filters = filters + ',start:' + start
    if (end != null && end != "") filters = filters + ',end:' + end
    if (tags != "") filters = filters + ',tags:' + tags.join(":")
    console.log("Filter = ", filters)

    if (filters != "") {
      url = '/api/balances-count-monthly?filters=' + filters.substring(1)
    } else {
      url = '/api/balances-count-monthly'
    }
    fetch(url,
        Headers = {'Content-Type': 'application/json'})
        .then((response) => response.json())
        .then((data) => {
          console.log("All Balances:",data["balances"]);
          console.log("Will use", data["balances"].slice(-6));
          if (data["balances"] != null) setExpenseData(data["balances"].slice(-6));
          else setExpenseData([])

        })
        .catch((err) => {
          console.error(err.message);
          setExpenseData(mockDataValues["balances"])
        });
  }, [start, end, tags]);

  useEffect(() => {
    console.log("TALMA - expenseData was changed to '", expenseData, "'")

    console.log("TALMA - label '", expenseData.map(e => [e["month"], e["year"]].join("-")), "'")
    console.log("TALMA - income '", expenseData.map(e => e["income"]), "'")
    console.log("TALMA - expense '", expenseData.map(e => -e["expense"]), "'")

    const chartData = {
      // labels: [
      //   '12-01-2020', '01-01-2021', '02-01-2021',
      //   '03-01-2021', '04-01-2021', '05-01-2021',
      // ],
      labels: expenseData.map(e => [e["month"], e["year"]].join("-")),
      datasets: [
        // Light blue bars
        {
          label: 'Income',
          // data: [
          //   800, 1600, 900, 1300, 1950, 1700,
          // ],
          data: expenseData.map(e => e["income"]),
          backgroundColor: tailwindConfig().theme.colors.green[400],
          hoverBackgroundColor: tailwindConfig().theme.colors.green[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66,
        },
        // Blue bars
        {
          label: 'Expense',
          // data: [
          //   4900, 2600, 5350, 4800, 5200, 4800,
          // ],
          data: expenseData.map(e => -e["expense"]),
          backgroundColor: tailwindConfig().theme.colors.red[400],
          hoverBackgroundColor: tailwindConfig().theme.colors.red[800],
          barPercentage: 0.66,
          categoryPercentage: 0.66,
        },
      ],
    };
    setChartData(chartData)
  }, [expenseData]);

  return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Income VS Expense</h2>
        </header>
        {/* Chart built with Chart.js 3 */}
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={248} />
      </div>
  );
}

export default GeneralExpenseHistogram;
