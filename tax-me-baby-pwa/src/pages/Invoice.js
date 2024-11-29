// src/pages/Dashboard.js
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import InvoiceUnlabeledAccordian from "../components/InvoiceUnlabeledAccordian";
import InvoiceLabeledAccordian from "../components/InvoiceLabeledAccordian";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function Invoice() {
	const [value, setValue] = useState(0);

	// Handle tab change
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Paper sx={{ p: 2 }} elevation={0}>
			<Stack alignItems={"center"}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='simple tabs example'
				>
					<Tab label='Labeled' {...a11yProps(0)} />
					<Tab label='Unlabeled' {...a11yProps(1)} />
				</Tabs>
			</Stack>

			<CustomTabPanel value={value} index={0}>
				<InvoiceLabeledAccordian />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<InvoiceUnlabeledAccordian />
			</CustomTabPanel>
		</Paper>
	);
}

export default Invoice;
