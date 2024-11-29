import React from "react";
import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHand } from "@fortawesome/free-solid-svg-icons";
import DonutChartWithLegends from "../components/donutchart";
import AccordionComponent from "../components/AccordianComponent";

const Dashboard = () => {
	const theme = useTheme();

	const taxable = 55000;
	const deductible = 13000;

	const accountInfo = (
		<Paper
			elevation={8}
			sx={{
				backgroundColor: theme.palette.primary.main,
				borderRadius: 4,
				p: 2,
				boxShadow: "0px 4px 5px 0.8px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ mb: 2 }}>
				<Typography fontWeight={600} variant='h6' color='white'>
					Hi, Jacky!
				</Typography>
				<FontAwesomeIcon icon={faHand} size='lg' style={{ color: "#f2af52" }} />
			</Stack>

			<Stack
				direction={"row"}
				justifyContent={"space-between"}
				alignItems={"flex-end"}
			>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='flex-start'
				>
					<Typography color='white'>Taxable Income:</Typography>
					<Typography color='white'>RM {taxable.toLocaleString()}</Typography>
				</Box>
				<Box>
					<Stack
						alignItems='center'
						justifyContent={"center"}
						sx={{
							backgroundColor: "white",
							color: "#red",
							borderRadius: "30px",
							px: 1,
							py: 0.5,
						}}
					>
						<Typography variant='body2'>Category D</Typography>
					</Stack>
				</Box>
			</Stack>
		</Paper>
	);

	const chartHeight = "220px";

	const chartComponent = (
		<Stack spacing={1}>
			<Stack
				direction='row'
				alignItems={"center"}
				justifyContent='space-between'
			>
				<Typography variant='h6' color='text.secondary' fontWeight={600}>
					Total Income
				</Typography>
				<Stack direction={"row"} justifyContent={"flex-end"}>
					<Button variant='contained'>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2'>2024</Typography>
							<FontAwesomeIcon icon={faCalendar} size='lg' />
						</Stack>
					</Button>
				</Stack>
				{/* 
				<Stack
					spacing={1}
					direction='row'
					alignItems={"center"}
					justifyContent='space-between'
					sx={{
						borderRadius: 1.5,
						py: 0.5,
						px: 1,
						background: theme.palette.primary.main,
					}}
				>
					<Typography variant='body1' color='white'>
						2024
					</Typography>
					<FontAwesomeIcon icon={faCalendar} color='white' />
				</Stack> */}
			</Stack>

			<Paper
				sx={{
					borderRadius: 4,
					height: chartHeight,
					boxShadow: "0px 4px 5px 0.8px rgba(0, 0, 0, 0.1)",
				}}
				elevation={8}
			>
				<Stack
					spacing={2}
					direction={"row"}
					alignItems='center'
					justifyContent={"center"}
					sx={{ height: chartHeight }}
				>
					<Stack
						alignItems='center'
						justifyContent='center'
						sx={{ height: `calc(${chartHeight} - 40px)`, position: "relative" }}
					>
						<Typography
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
							}}
							variant='body1'
							fontWeight={600}
						>
							RM {(taxable + deductible).toLocaleString()}
						</Typography>
						<DonutChartWithLegends taxable={taxable} deductible={deductible} />
					</Stack>

					<Stack spacing={2}>
						<Stack>
							<Stack direction={"row"} alignItems='center' spacing={1}>
								<Box
									sx={{
										width: "14px",
										height: "14px",
										borderRadius: "50%",
										background: "#6dc4ed",
									}}
								/>

								<Typography variant='body1'>Taxable Income</Typography>
							</Stack>
							<Typography fontWeight={600} variant='h6' sx={{ pl: 3 }}>
								RM{taxable.toLocaleString()}
							</Typography>
						</Stack>
						<Stack>
							<Stack direction={"row"} alignItems='center' spacing={1}>
								<Box
									sx={{
										width: "14px",
										height: "14px",
										borderRadius: "50%",
										background: "#34d261",
									}}
								/>

								<Typography variant='body1'>Deductibles</Typography>
							</Stack>
							<Typography fontWeight={600} variant='h6' sx={{ pl: 3 }}>
								RM{deductible.toLocaleString()}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Paper>
		</Stack>
	);

	// Sample data

	const taxDeductibleList = (
		<Stack spacing={1}>
			<Typography variant='h6' color='text.secondary' fontWeight={600}>
				Total Deductibles
			</Typography>
			<Box>
				<AccordionComponent />
			</Box>
		</Stack>
	);

	return (
		<Stack spacing={3}>
			{accountInfo}
			{chartComponent}
			{taxDeductibleList}
		</Stack>
	);
};

export default Dashboard;
