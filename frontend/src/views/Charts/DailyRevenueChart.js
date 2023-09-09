/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DailyRevenueChart() {
  let options = {
    // aspectRatio: 390 / 190,

    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    barThickness: 9,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#000000",
          padding: 10,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#000000",
          padding: 10,
          // stepSize: 300,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const labels = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 4, 5, 6, 7, 8],
        pointRadius: 0,
        borderColor: "#1061DB",
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
