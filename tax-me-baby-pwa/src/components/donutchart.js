import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DonutChartWithLegends = ({ taxable, deductible }) => {
	// Data for the chart

	const data = {
		labels: ["Taxable Income", "Deductibles"],
		datasets: [
			{
				label: "Dataset 1", // First legend
				data: [deductible, taxable],
				backgroundColor: ["#6dc4ed", "#34d261"],
				borderColor: "transparent",
				borderWidth: 1,
				cutout: "60%", // Makes the chart a donut (inner radius)
			},
		],
	};

	// Options to customize the chart
	const options = {
		responsive: true,
		plugins: {
			title: {
				display: false,
				text: "Donut Chart with Two Legends",
			},
			tooltip: {
				enabled: true,
			},
			legend: {
				display: false,
				position: "right", // Adjust legend position (top, bottom, left, right)
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

	return (
		<Doughnut
			data={data}
			options={options}
			style={{ width: "100%", height: "100%" }}
			// plugins={[centerTextPlugin]} // Add the custom plugin here
		/>
	);
};

export default DonutChartWithLegends;
