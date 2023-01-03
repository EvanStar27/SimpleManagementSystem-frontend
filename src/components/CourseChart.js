import React from "react";
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
import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useFetchChartStats } from "../hooks/StatsHooks";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CourseChart = () => {
  const theme = useColorMode();
  const [chartClr, setChartClr] = useState("");

  // Queries
  const chartQuery = useFetchChartStats();

  useEffect(() => {
    if (theme.colorMode === "light") setChartClr("#3182ce");
    else setChartClr("#90cdf4");
  }, [theme]);

  const options = {
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         stepSize: 1,
    //       },
    //     },
    //   ],
    // },
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "No. of Students in each Course",
      },
    },
  };

  let labels = [];
  if (chartQuery?.data?.data)
    labels = [...chartQuery.data?.data.map((chart) => chart.courseName)];

  let data = {};
  if (chartQuery?.data?.data) {
    data = {
      labels,
      datasets: [
        {
          label: "Students",
          data: [...chartQuery.data?.data.map((chart) => chart.students)],
          backgroundColor: chartClr,
        },
      ],
    };
  }

  return chartQuery.isLoading ? (
    <>Loading</>
  ) : (
    <Bar options={options} data={data} />
  );
};

export default CourseChart;
