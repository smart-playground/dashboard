import React, {useContext, useEffect, useState} from 'react';
import {GenericFilterContext} from "../../contexts/TimeFilterContext";


function TopExpenses() {

  const [expenseData, setExpenseData] = useState([])

  const genericFilterContext = useContext(GenericFilterContext);
  const {start, end, tags } = genericFilterContext;

  const bucketAmount = 15


  useEffect(() => {
    var url

    var filters = ""
    if (start != null && start !== "") filters = filters + ',start:' + start
    if (end != null && end !== "") filters = filters + ',end:' + end
    if (tags !== "") filters = filters + ',tags:' + tags.join(":")
    console.log("Filter = ", filters)

    if (filters !== "") {
      url = '/api/expenses-summery?filters=' + filters.substring(1)
    } else {
      url = '/api/expenses-summery'
    }
    fetch(url,
        Headers = {'Content-Type': 'application/json'})
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["expenses"] != null) {
            let sortedExpenses = data["expenses"]
            let total = 0
            for (let i = sortedExpenses.length - 1; i >= 0; i--) {
              total = total + sortedExpenses[i].expense
            }

            let top = []
            for (let i = 0; i < sortedExpenses.length; i = i + 1) {
              if (i > bucketAmount) {
                top[bucketAmount].expense = top[bucketAmount].expense + sortedExpenses[i].expense
                top[bucketAmount].percentage = top[bucketAmount].expense / total * 100
                top[bucketAmount].tag = "*"
              }
              else {
                top[i] = sortedExpenses[i]
                top[i].percentage = top[i].expense / total * 100
              }
            }
            setExpenseData(top);
          } else {
            setExpenseData([])
          }

        })
        .catch((err) => {
          console.error(err.message);
          setExpenseData([])
        });
  }, [start, end, tags]);

  return (
      <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Top {bucketAmount} Expenses</h2>
        </header>
        <div className="p-3">

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Tag</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Total Actions</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Expense</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Monthly Expense (AVG)</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">% Expense</div>
                </th>
              </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100">
              {expenseData.map( element => {
                    return (<tr>
                      <td className="p-2">
                        <div className="flex items-center">
                          <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                            <circle fill="#24292E" cx="18" cy="18" r="18"/>
                            <path
                                d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
                                fill="#FFF"/>
                          </svg>
                          <div className="text-slate-800">{element.tag}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">-</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-red-500">&#8362;{Math.round(-element.expense)}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-red-500">±&#8362;{Math.round(-element["monthly-expense"])}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">{Math.round(element.percentage)}%</div>
                      </td>
                    </tr>)
                  }
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default TopExpenses;
