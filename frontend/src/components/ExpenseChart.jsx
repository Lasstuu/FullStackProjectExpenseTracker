import React, { useMemo } from "react";
import {Chart, ArcElement, Tooltip, Legend} from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses }) {

  const chartData = useMemo(() => {
    const categoryTotals =  {
        "Miscellaneous": 0,
        "Living Costs": 0,
        "Amusements/Hobbies": 0
    }
    expenses.forEach(expense => {
        categoryTotals[expense.category] += Number(expense.amount) || 0;
    })
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);

    return {
      labels: categories.map(cat => 
        cat
      ),
      datasets: [
        {
          data: amounts,
          backgroundColor: [
            "#f91e4eff",
            "#46abeeff",
            "#e48c2dff",
          ],
          borderWidth: 3,
        },
      ],
    };
  }, [expenses]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            const label = context.label;
            const tooltipText = label + ": " + value + "€" + " (" + percentage + "%)";
            return tooltipText;
          }
        }
      }
    },
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

  if (expenses.length === 0) {
    return (
      <section className="chart">
        <div className="content">
          <h2>Expense Distribution</h2>
          <p>No expenses found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="chart">
      <div className="content">
        <h2>Expense Distribution</h2>
        <Doughnut data={chartData} options={options} />
        <h3>Summary</h3>
        <p><strong>Total Expenses:</strong> {totalAmount.toLocaleString("fi-FI", {style: "currency", currency: "EUR"})}</p>
        <p><strong>Number of Expenses:</strong> {expenses.length}</p>
      </div>
    </section>
  );
}

export default ExpenseChart;