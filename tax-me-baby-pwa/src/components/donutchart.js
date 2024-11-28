import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, Tooltip } from "chart.js";

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DonutChartWithLegends = () => {
  // Data for the chart
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        label: "Dataset 1", // First legend
        data: [300, 50, 100, 40],
        backgroundColor: ["red", "blue", "yellow", "green"],
        borderColor: "black",
        borderWidth: 1,
        cutout: "70%", // Makes the chart a donut (inner radius)
      },
      {
        label: "Dataset 2", // Second legend
        data: [100, 200, 150, 50],
        backgroundColor: ["orange", "purple", "pink", "cyan"],
        borderColor: "black",
        borderWidth: 1,
        cutout: "70%",
      },
    ],
  };

  // Options to customize the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Donut Chart with Two Legends",
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "top", // Adjust legend position (top, bottom, left, right)
        labels: {
          boxWidth: 20, // Width of the legend box
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2, // Border width for each segment
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutChartWithLegends;
