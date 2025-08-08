import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function Earnings() {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Monthly Earnings ($)",
        data: [120, 230, 310, 400, 520, 610, 750, 890],
        backgroundColor: "#fb923c",
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Profile Views",
        data: [500, 600, 450, 700],
        fill: false,
        borderColor: "#60a5fa",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8 font-manrope">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Earnings & Analytics</h1>

      {/* Top Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">Revenue Breakdown</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Profile Analytics</h2>
          <Line data={lineData} />
        </div>
      </div>

      {/* Bottom Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          "Total Earnings",
          "Sessions Completed",
          "Pending Payouts",
          "Avg. Session Time",
          "Tips Received",
          "Refunds Issued",
          "Session CTR",
          "Page Views",
          "Profile Clicks",
          "New Messages",
          "Avg. Time on Profile",
          "Session Booking Rate",
          "Returning Clients",
          "Daily Visitors",
          "Conversion Rate",
          "Top Performing Days",
          "Mentor Rating Avg",
          "Review Count",
          "Most Viewed Time Slot",
          "New Client Growth",
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="text-sm font-medium text-gray-600 mb-1">{item}</h3>
            <p className="text-lg font-bold text-orange-600">--</p>
          </div>
        ))}
      </div>
    </div>
  );
}
