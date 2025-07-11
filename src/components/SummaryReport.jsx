import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SummaryReport = ({ summary }) => {
  const data = {
    labels: ["Connected", "Not Connected", "Shortlisted", "Rejected"],
    datasets: [
      {
        label: "Candidates",
        data: [
          summary.connected,
          summary.notConnected,
          summary.shortlisted,
          summary.rejected,
        ],
        backgroundColor: ["#10b981", "#ef4444", "#3b82f6", "#f59e0b"],
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="container my-10 ">
        <h3 className="text-xl font-semibold mb-3">Daily Summary Report</h3>
      <div className="flex w-full gap-3">

        <div className="w-1/2 ">
          {/* Summary Table */}
          <table className="w-full  h-full border border-gray-300 shadow-md  ">
            <tbody>
              <tr>
                <td className="p-3 border">Total Candidates</td>
                <td className="p-3 border">{summary.total}</td>
              </tr>
              <tr>
                <td className="p-3 border">Connected</td>
                <td className="p-3 border">{summary.connected}</td>
              </tr>
              <tr>
                <td className="p-3 border">Not Connected</td>
                <td className="p-3 border">{summary.notConnected}</td>
              </tr>
              <tr>
                <td className="p-3 border">Shortlisted</td>
                <td className="p-3 border">{summary.shortlisted}</td>
              </tr>
              <tr>
                <td className="p-3 border">Rejected</td>
                <td className="p-3 border">{summary.rejected}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Summary Chart */}

        <div className="bg-white p-4 rounded shadow-md border w-1/2 mx-auto">
          <Bar data={data} height={300} width={250} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;
