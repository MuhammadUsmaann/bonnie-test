import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const defaultDay = [
  { date_day: "sat" },
  { date_day: "sun" },
  { date_day: "mon" },
  { date_day: "tue" },
  { date_day: "wed" },
  { date_day: "thu" },
  { date_day: "fri" },
];
export const ArabicDay = {
  sat: "السبت",
  sun: "الأحد",
  mon: "الاثنين",
  tue: "الثلاثاء",
  wed: "الأربعاء",
  thu: "الخميس",
  fri: "جمعة",
};

export default function CustomerFlowChart() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const options = {
    // aspectRatio: 390 / 190,
    aspectRatio:
      ((windowSize[0] < 1024 ? windowSize[0] + 300 : windowSize[0]) * 250) /
      (290 * windowSize[1]),
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
        barPercentage: 0.1,
        barThickness: 12,
        maxBarThickness: 9,
        minBarLength: 2,
        label: "Total Order",
        data: [1, 2, 3, 4, 5, 6, 7, 8],
        backgroundColor: "#1061DB",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
